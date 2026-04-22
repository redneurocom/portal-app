# portal-app

## Descripción del proyecto

`portal-app` es una aplicación web desarrollada con Angular para gestionar la reserva de áreas comunes en edificios y condominios residenciales, tales como piscina, sala de reuniones, zona de parrillas u otros espacios compartidos.

La solución está orientada a mejorar la organización de las reservas, reducir cruces de horario y facilitar el control por parte de la administración del edificio o condominio.

## Objetivo

Implementar una aplicación web que permita a los residentes:

- visualizar las áreas comunes disponibles;
- consultar horarios de uso;
- registrar reservas;
- tener un mejor control sobre sus solicitudes.

Además, el sistema podrá contemplar una vista administrativa para supervisar y gestionar las reservas registradas.

## Tecnologías utilizadas

- Angular
- TypeScript
- HTML
- CSS
- Node.js
- npm
- Git
- GitHub

## Estructura general del proyecto

Este proyecto fue generado con Angular CLI y actualmente cuenta con una estructura base similar a la siguiente:

```text
portal-app/
├── public/
├── src/
├── .editorconfig
├── .gitignore
├── .prettierrc
├── angular.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## Requisitos previos para continuar el proyecto

Antes de clonar o ejecutar el proyecto, se recomienda tener instalado lo siguiente en la PC:

### 1. Git

Permite clonar el repositorio, descargar cambios y subir commits.

Verificar instalación:

```bash
git --version
```

Si no está instalado, debe instalarse previamente.

### 2. Node.js

Se recomienda usar una versión compatible con Angular 21.

Versión recomendada para este proyecto:

- **Node.js 22.14.x** o superior dentro de la rama 22.x

Verificar instalación:

```bash
node -v
npm -v
```

### 3. IDE o editor

Puede trabajarse sin problemas en cualquiera de los siguientes:

- WebStorm
- Visual Studio Code

## Configuración inicial de Git en una PC nueva

Si el integrante nunca ha usado Git en su computadora, primero debe configurar su identidad local:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu_correo@ejemplo.com"
```

Verificar configuración:

```bash
git config --global --list
```

## Cómo clonar el proyecto

### Opción 1: desde terminal

Ubicarse en la carpeta donde se desea guardar el proyecto y ejecutar:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Luego ingresar a la carpeta del proyecto:

```bash
cd portal-app
```

### Opción 2: desde WebStorm o VS Code

También puede abrirse directamente el repositorio desde el IDE usando la opción de clonado, pero igual será necesario instalar dependencias luego de descargarlo.

## Instalación de dependencias

Después de clonar el proyecto, se deben instalar las dependencias definidas en `package.json`.

Se recomienda usar:

```bash
npm ci
```

Si por alguna razón `npm ci` no funciona, usar:

```bash
npm install
```

## Ejecución del proyecto

Una vez instaladas las dependencias, ejecutar el servidor de desarrollo con alguno de estos comandos:

```bash
npx ng serve
```

o también:

```bash
npm start
```

Luego abrir en el navegador:

```text
http://localhost:4200/
```

## Flujo básico para un integrante nuevo

El flujo recomendado es este:

### Paso 1: instalar herramientas

Debe tener instalado:

- Git
- Node.js
- un editor como WebStorm o VS Code

### Paso 2: clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd portal-app
```

### Paso 3: instalar dependencias

```bash
npm ci
```

### Paso 4: ejecutar el proyecto

```bash
npx ng serve
```

### Paso 5: abrir el proyecto en su editor

Puede abrir la carpeta `portal-app` en WebStorm o VS Code y continuar el desarrollo.

## Archivos que sí deben subirse al repositorio

Se deben versionar los siguientes archivos y carpetas:

- `src/`
- `public/`
- `angular.json`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.spec.json`
- `.editorconfig`
- `.gitignore`
- `.prettierrc`
- `README.md`

## Archivos que no deben subirse

No se debe subir al repositorio lo siguiente:

- `node_modules/`
- `dist/`
- archivos temporales del sistema
- configuraciones locales innecesarias del IDE


## Flujo básico de trabajo con Git

### Descargar cambios del repositorio

```bash
git pull
```

### Ver archivos modificados

```bash
git status
```

### Agregar cambios

```bash
git add .
```

### Crear commit

```bash
git commit -m "feat: agrega vista de reservas"
```

### Subir cambios

```bash
git push
```

## Posible estructura dentro de `src/app`

```text
src/app/
├── components/
├── pages/
├── services/
├── models/
├── app.ts
├── app.html
├── app.css
├── app.config.ts
└── app.routes.ts
```
