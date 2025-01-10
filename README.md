# Prueba Técnica

Esta prueba fue desarrollada utilizando Vue 3, Vue Router, Pinia, SASS, Axios y TypeScript para crear una experiencia web moderna y eficiente. El proyecto está estructurado en vistas y componentes reutilizables, lo que permitió mantener el código limpio y fácil de mantener.

- Vue 3 y Vue Router se encargan de la estructura y navegación de la aplicación, asegurando una experiencia dinámica y fluida para el usuario.

- Para los estilos, se utilizó SASS, lo que permitió aprovechar variables reutilizables y otras características avanzadas, asegurando un diseño coherente y fácil de modificar a lo largo del proyecto.
  Axios fue la herramienta elegida para interactuar con la API, simplificando las peticiones HTTP y gestionando las respuestas de manera eficiente.

- La lista de favoritos se guarda y gestiona con Pinia, aprovechando su capacidad para manejar el estado de forma centralizada y reactiva.
  Y, para garantizar un código más robusto y libre de errores, se utilizó TypeScript, asegurando un tipado estricto que ayuda a detectar problemas desde el desarrollo.

## Repositorio y Despliegue

- [Repositorio](https://github.com/miguelse549/proyecto-global66)

- [Despliegue Proyecto](https://api-project-pokemon.netlify.app/)

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/miguelse549/proyecto-global66.git
```

2. Instala las dependencias:

```bash
npm install
```

## Uso

Ejecuta el proyecto con el siguiente comando:

```bash

npm  run  dev

```

## Estructura del Proyecto

```bash

src
├── assets
│   ├── img
│   │   ├── bg-image.png
│   │   ├── img-home.svg
│   │   ├── img-loading.svg
│   │   └── vue.svg
├── components
│   ├── ui
│   │   ├── Button.vue
│   │   ├── CardPokemon.vue
│   │   ├── Input.vue
│   │   ├── Loading.vue
│   │   └── Modal.vue
├── composables
│   └── usePokemonFilter.ts
├── constants
│   └── urls.ts
├── plugins
│   └── http-client-plugin.ts
├── router
│   ├── index.ts
│   └── routesPokemon.ts
├── services
│   ├── interfaces.ts
│   └── pokemon-api.ts
├── stores
│   └── favorites-store.ts
├── styles
│   ├── _base.scss
│   ├── _mixins.scss
│   ├── _variables.scss
│   └── main.scss
├── views
│   ├── Home.vue
│   └── ListPokemon.vue
├── App.vue
├── main.ts

```

Este proyecto utiliza el siguiente stack de desarrollo:

- [Vue 3 (script setup)](https://vuejs.org/)

- [Pinia](https://pinia.vuejs.org/)

- [TypeScript](https://www.typescriptlang.org/)

- [Vite](https://vitejs.dev/)

- [SASS](https://sass-lang.com/)

- [Vue Router 4](https://router.vuejs.org/)

- [Axios](https://axios-http.com/es/docs/intro)
