import Home from "../views/Home.vue";
import SearchPokemon from "../views/SearchPokemon.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/search-pokemon",
    name: "SearchPokemon",
    component: SearchPokemon,
  },

];

export default routes;