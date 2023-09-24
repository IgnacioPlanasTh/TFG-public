var idiomas = {
  values: ["es", "en", "fr", "de", "it", "pt", "zh", "ja"],
  angular: [
    { value: "es", name: "Español" },
    { value: "en", name: "Inglés" },
    { value: "fr", name: "Francés" },
    { value: "de", name: "Alemán" },
    { value: "it", name: "Italiano" },
    { value: "pt", name: "Portugués" },
    { value: "zh", name: "Chino" },
    { value: "ja", name: "Japonés" },
  ],

  toSchemaEnum() {
    return {
      values: this.values,
    };
  },
  toAngular() {
    return this.angular;
  },
};

module.exports = idiomas;
