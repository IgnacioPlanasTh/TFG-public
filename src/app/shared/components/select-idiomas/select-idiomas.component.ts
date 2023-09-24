import { Component, forwardRef, Input, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-select-idiomas",
  templateUrl: "./select-idiomas.component.html",
  styleUrls: ["./select-idiomas.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectIdiomasComponent),
      multi: true,
    },
  ],
})
export class SelectIdiomasComponent implements ControlValueAccessor {
  @Input() public label: string;
  @Input() public options: { value: number; description: string }[];
  selected: string;

  valueChanged(value: any) {
    this.onChange(value);
    this.onTouched();
  }

  // CVA implementation

  public onChange = (_: any) => {};
  public onTouched = () => {};

  // register onChange which we will call when the selected value is changed
  // so that the value is passed back to the form model
  public registerOnChange(fn): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  // sets the selected value based on the corresponding form model value
  public writeValue(value: any): void {
    this.selected = value;
  }

  ngOnInit(): void {}

  renderIdiomaImg(idioma: string) {
    return "*bandera*";
  }
}
