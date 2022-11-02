import { Home } from "../pages/Home";
import { Movie } from "../pages/Movie";

export default {
  routes: [
    {
      path: "$",
      component: Home,
      widgets: ["Menu"],
    },
    {
      path: "Movie",
      component: Movie,
    },
  ],
};
