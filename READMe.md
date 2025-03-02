# CaracolTechnicalProof

Este proyecto es una aplicación para desplegar archivos de audio, desarrollada siguiendo las directrices de la plantilla dispuesta, con un diseño amigable e intuitivo para el usuario.

## Descripción

Esta aplicación permite la reproducción de archivos de audio, con una interfaz fácil de interpretar para los usuarios. Está construida utilizando Handlebars como motor de plantillas y cuenta con un proceso de compilación optimizado mediante Gulp.

# Tecnologías Utilizadas
## Dependencias Principales

- express: Framework web para Node.js que facilita la creación de aplicaciones web y APIs.
- express-handlebars: Motor de plantillas que extiende Express para utilizar Handlebars.
- howler: Biblioteca de audio para la web que simplifica el trabajo con sonido en navegadores.

## Dependencias de Desarrollo

- gulp: Sistema de automatización de tareas utilizado para el proceso de compilación.
- browser-sync: Herramienta que facilita el desarrollo web con recarga automática de páginas.
- gulp-less: Compilador de LESS a CSS.
- gulp-clean-css: Minificador de archivos CSS.
- gulp-concat: Concatena múltiples archivos en uno solo.
- gulp-uglify: Minificador de código JavaScript.
- gulp-htmlmin: Minificador de archivos HTML.
- gulp-handlebars: Precompilador de plantillas Handlebars.
- gulp-rename: Permite renombrar archivos durante el proceso de compilación.
- gulp-replace: Realiza reemplazos en el contenido de los archivos.
- fs-extra: Extensión de las funcionalidades del módulo fs de Node.js.
-through2: Implementación de streams simplificada.

## Estructura del Proyecto

El proyecto utiliza una estructura donde los archivos fuente son procesados y compilados a una carpeta dist que contiene la versión optimizada para producción.

# Instalación

## Clona este repositorio:

```js
git clone https://github.com/Jhon-GG/caracolTechnicalProof.git
```

##  Instala las dependencias:

```js
npm install
```

# Comandos Disponibles

### Compilar el proyecto:

```js
npm run gulp
```

Este comando procesa todos los archivos fuente, minifica el CSS y JavaScript, compila las plantillas Handlebars y genera la versión optimizada en la carpeta dist.

## Compilar el archivo main.less en main.css

```js
npm run less
```

Este comando nos permitirá compilar nuestro archivo .less en uno .css teniendo en cuenta que se guardará en la misma localización donde se encuentra nuestro archivo .less

## Ejecutar el proyecto en modo desarrollo:

```js
npm run dev
```

Este comando inicia un servidor HTTP en la carpeta dist. Para acceder a la aplicación, utiliza el primer enlace de conexión que aparece en la consola.

## Características

- Diseño amigable e intuitivo para el usuario
- Interfaz fácil de interpretar
- Optimización de recursos mediante minificación de archivos
- Uso eficiente de plantillas con Handlebars
- Reproducción de audio con Howler.js

## Estilos y Diseño

Se utilizó la tecnología LESS para el CSS, permitiendo un desarrollo más organizado y mantenible de los estilos
Los archivos LESS son procesados y compilados a CSS mediante Gulp durante el proceso de construcción
El diseño sigue las directrices de la plantilla proporcionada, manteniendo coherencia visual y buenas prácticas de UX/UI

## Notas Adicionales

- La aplicación está diseñada siguiendo las directrices de la plantilla dispuesta
- Es altamente funcional para el propósito específico de desplegar archivos de audio
- El proceso de compilación está totalmente automatizado con Gulp para facilitar el mantenimiento y las actualizaciones.