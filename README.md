# JACUSys

Sistema operativo retro con el portafolio de Juan Alejandro Cárdenas. Se muestra
dentro del monitor de la escena 3D
([portfolio-websit](https://github.com/OtroMigala/portfolio-websit)), pero
también funciona como sitio independiente.

Sitio publicado: https://otromigala.github.io/portfolio-inner-site/

## Créditos

Adaptación de
[portfolio-inner-site](https://github.com/henryjeff/portfolio-inner-site) de
[Henry Heffernan](https://henryheffernan.com/). Los juegos (Doom, The Oregon
Trail, Scrabble y Henordle) se mantienen del proyecto original. Licencia MIT
(ver [LICENSE.md](LICENSE.md)).

## Desarrollo

```bash
npm install
npm start
```

Mis datos personales (correo, redes, nombre) están en
`src/constants/profile.ts`.

## Despliegue

Cada push a `main` compila el sitio (`npm run build`, salida en `build/`) y lo
publica en GitHub Pages mediante `.github/workflows/deploy.yml`. La ruta base
sale del campo `homepage` de `package.json`.
