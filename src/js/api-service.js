const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// Leer el archivo de plantilla .hbs
const templatePath = path.join(__dirname, 'index.hbs');
const templateSource = fs.readFileSync(templatePath, 'utf8');

// Leer el archivo JSON de datos
const jsonPath = path.join(__dirname, 'test.json');
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Compilar la plantilla
const template = Handlebars.compile(templateSource);

// Renderizar la plantilla con los datos
const renderedHtml = template(jsonData);

// Escribir el resultado en un archivo HTML
const outputPath = path.join(__dirname, 'index.html');
fs.writeFileSync(outputPath, renderedHtml, 'utf8');

console.log(`Plantilla compilada exitosamente en ${outputPath}`);