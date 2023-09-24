import { Component, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Intento } from "src/app/core/models/Intento";
import { Mazo } from "src/app/core/models/Mazo";
import { IntentoService } from "src/app/modules/jugar/services/intento.service";
import { MazoService } from "src/app/shared/services/mazoService/mazo.service";
import { Chart, registerables } from "chart.js";
import { Title } from "@angular/platform-browser";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";

@Component({
  selector: "app-estadisticas-mazo",
  templateUrl: "./estadisticas-mazo.component.html",
  styleUrls: ["./estadisticas-mazo.component.css"],
  animations: [fadeInOutAnimation],
})
export class EstadisticasMazoComponent {
  constructor(
    private mazoService: MazoService,
    private router: Router,
    private route: ActivatedRoute,
    private intentoService: IntentoService,
    private titleService: Title,
  ) {}
  mazoId: string = null;
  mazo: Mazo = null;
  intentos: Array<Intento>;
  intentosMostrados: Array<Intento>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.mazoId = param.get("mazoId");
      this.mazoService.getMazoById(this.mazoId).then((mazo) => {
        this.mazo = new Mazo(mazo);
        this.titleService.setTitle(
          `${this.mazo.nombre} | Estadísticas - VocabMaster`,
        );
      });

      this.intentoService.getIntentosForMazo(this.mazoId).then((intentos) => {
        this.intentos = Intento.mapArray(intentos);
        this.intentos.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
        this.procesarIntentos();
        setTimeout(() => {
          if (this.intentos.length <= 10) {
            this.intentosMostrados = this.intentos.slice();
          } else {
            this.intentosMostrados = this.intentos.slice(
              this.intentos.length - 10,
            );
          }
          this.crearGraficas();
        }, 2000);
      });
    });
  }

  //estadísticas
  vecesJugado: number;
  ultimaVezJugado: string;
  maximoPalabrasAcertadas: number;
  totalDePalabras: number;
  porcentajeAciertoMedio: number;
  palabrasAcertadasPorIntento: number;
  palabraMasAcertada: string;
  palabraMasFallada: string;

  procesarIntentos() {
    this.vecesJugado = this.intentos.length;
    this.ultimaVezJugado = this.calcularFechaMasReciente(
      this.intentos,
    ).toLocaleDateString();
    this.maximoPalabrasAcertadas = this.calcularMaxPalabrasAcertadas(
      this.intentos,
    );
    this.totalDePalabras = this.calcularTotalPalabrasDiferentes(this.intentos);
    this.porcentajeAciertoMedio = this.calcularPorcentajeAciertoMedio(
      this.intentos,
    );
    this.palabrasAcertadasPorIntento = this.calcularMediaPalabrasAcertadas(
      this.intentos,
    );
    this.palabraMasAcertada = this.calcularPalabraMasAcertada(this.intentos);
    this.palabraMasFallada = this.calcularPalabraMasFallada(this.intentos);
  }

  calcularFechaMasReciente(intentos) {
    const fechas = intentos.map((intento) => intento.fecha);
    return new Date(Math.max(...fechas));
  }

  calcularMaxPalabrasAcertadas(intentos) {
    const maxAcertadas = intentos.map((intento) => intento.acertadas);
    return Math.max(...maxAcertadas);
  }

  calcularTotalPalabrasDiferentes(intentos) {
    const palabrasDiferentes = new Set();
    intentos.forEach((intento) => {
      intento.palabras.forEach((palabraIntento) => {
        palabrasDiferentes.add(palabraIntento.natal);
      });
    });
    let numeroPalabrasActual = this.mazo?.palabras?.length || 0;
    return Math.max(palabrasDiferentes.size, numeroPalabrasActual);
  }

  calcularPorcentajeAciertoMedio(intentos) {
    const totalIntentos = intentos.length;
    const totalAciertos = intentos.reduce(
      (sum, intento) => sum + intento.acertadas,
      0,
    );
    return (totalAciertos / (totalIntentos * intentos[0].totales)) * 100;
  }

  calcularMediaPalabrasAcertadas(intentos) {
    const totalIntentos = intentos.length;
    const totalAciertos = intentos.reduce(
      (sum, intento) => sum + intento.acertadas,
      0,
    );
    return totalAciertos / totalIntentos;
  }

  calcularPalabraMasAcertada(intentos) {
    const palabrasAcertadas = {};
    intentos.forEach((intento) => {
      intento.palabras.forEach((palabraIntento) => {
        if (palabraIntento.acertada) {
          if (!palabrasAcertadas[palabraIntento.natal]) {
            palabrasAcertadas[palabraIntento.natal] = 1;
          }
          palabrasAcertadas[palabraIntento.natal]++;
        }
      });
    });

    let maxPalabra = "";
    let maxAciertos = 0;
    for (const palabra in palabrasAcertadas) {
      if (palabrasAcertadas[palabra] > maxAciertos) {
        maxPalabra = palabra;
        maxAciertos = palabrasAcertadas[palabra];
      }
    }
    if (maxPalabra === "") return "Ninguna";
    else return maxPalabra + ` (${maxAciertos})`;
  }

  calcularPalabraMasFallada(intentos) {
    const palabrasFalladas = {};
    intentos.forEach((intento) => {
      intento.palabras.forEach((palabraIntento) => {
        if (!palabraIntento.acertada) {
          if (!palabrasFalladas[palabraIntento.natal]) {
            palabrasFalladas[palabraIntento.natal] = 0;
          }
          palabrasFalladas[palabraIntento.natal]++;
        }
      });
    });

    let maxPalabra = "";
    let maxFallos = 0;
    for (const palabra in palabrasFalladas) {
      if (palabrasFalladas[palabra] > maxFallos) {
        maxPalabra = palabra;
        maxFallos = palabrasFalladas[palabra];
      }
    }
    if (maxPalabra === "") return "Ninguna";
    else return maxPalabra + ` (${maxFallos})`;
  }

  chartACiertosYErrores: any;
  chartPorcentajeAcierto: any;

  aumentarNumeroIntentosMostrados() {
    if (this.chartACiertosYErrores) {
      this.chartACiertosYErrores.destroy();
    }
    if (this.chartPorcentajeAcierto) {
      this.chartPorcentajeAcierto.destroy();
    }
    let mostrados = this.intentosMostrados.length;
    if (this.intentos.length - mostrados <= 10) {
      this.intentosMostrados = this.intentos.slice();
    } else {
      this.intentosMostrados = this.intentos.slice(
        this.intentos.length - mostrados - 10,
      );
    }
    this.crearGraficas();
  }

  disminuirNumeroIntentosMostrados() {
    if (this.chartACiertosYErrores) {
      this.chartACiertosYErrores.destroy();
    }
    if (this.chartPorcentajeAcierto) {
      this.chartPorcentajeAcierto.destroy();
    }
    let mostrados = this.intentosMostrados.length;

    if (mostrados <= 19) {
      //si se muestran 19
      this.intentosMostrados = this.intentos.slice(this.intentos.length - 10);
    } else {
      this.intentosMostrados = this.intentos.slice(
        this.intentos.length - mostrados + 10,
      );
    }
    this.crearGraficas();
  }

  crearGraficas() {
    Chart.register(...registerables);
    let fechas = this.intentosMostrados.map((intento) =>
      intento.fecha.toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
    let aciertos = this.intentosMostrados.map((intento) => intento.acertadas);
    let errores = this.intentosMostrados.map(
      (intento) => intento.totales - intento.acertadas,
    );
    let porcentajeAcierto = this.intentosMostrados.map(
      (intento) => (intento.acertadas / intento.totales) * 100,
    );
    let stats = {
      fechas: fechas,
      aciertos: aciertos,
      errores: errores,
      porcentajeAcierto: porcentajeAcierto,
    };
    this.chartACiertosYErrores = new Chart("aciertosYErrores", {
      type: "bar",

      data: {
        labels: stats["fechas"],
        datasets: [
          {
            label: "Aciertos",
            data: stats["aciertos"],
          },
          {
            label: "Fallos",
            data: stats["errores"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Aciertos y fallos",
            font: {
              size: 16,
              weight: "bold",
            },
          },
        },
        scales: {
          y: {
            min: 0,
            max:
              this.totalDePalabras % 2 == 0
                ? this.totalDePalabras
                : this.totalDePalabras + 1,
            ticks: {
              stepSize: 2,
            },
          },
        },
      },
    });

    this.chartPorcentajeAcierto = new Chart("porcentajeAcierto", {
      type: "line",

      data: {
        labels: stats["fechas"],
        datasets: [
          {
            label: "%",
            data: stats["porcentajeAcierto"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Porcentaje de aciertos",
            font: {
              size: 16,
              weight: "bold",
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: function (value) {
                return value + "%";
              },
            },
          },
        },
      },
    });
  }
}
