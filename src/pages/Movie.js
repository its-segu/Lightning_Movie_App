import { Lightning, Utils, Router } from "@lightningjs/sdk";
import { getSimilarMovies } from "../lib/Api";

export class Movie extends Lightning.Component {
  static _template() {
    return {
      Backround: {
        x: 0,
        y: 0,
        w: 1920,
        h: 1080,
        color: 0xff000000,
        rect: true,
      },
      Poster: {
        Backround: {
          w: 350,
          h: 500,
          x: 200,
          y: 175,
          rect: true,
          shader: { type: Lightning.shaders.RoundedRectangle, radius: 12 },
        },
      },
      MenuLogo: {
        x: 1800,
        y: 5,
        w: 110,
        h: 150,
        src: Utils.asset("images/backgroundLogo.png"),
      },
      MovieTitle: {
        x: 615,
        y: 175,
        color: 0xfff5c242,
        text: {
          text: "Movie Name",
          fontSize: 37,
        },
      },
      MovieDetails: {
        x: 615,
        y: 250,
        w: 900,
        color: 0xffffffff,
        text: {
          text: "Movie Overview",
          fontSize: 30,
        },
      },
      ReleaseDate: {
        x: 615,
        y: 635,
        w: 900,
        color: 0xffffffff,
        text: {
          text: "Release Date",
          fontSize: 23,
        },
      },
      SimilarMovies: {
        x: 200,
        y: 725,
        color: 0xfff5c242,
        text: {
          text: "SIMILAR MOVIES",
          fontSize: 20,
        },
        flex: {
          direction: "row",
        },
      },
    };
  }

  async _init() {}

  set params(details) {
    this.tag("Poster").patch({ Backround: { src: details.src } });
    this.tag("MovieTitle").patch({
      text: { text: details.title.toUpperCase() },
    });
    this.tag("MovieDetails").patch({ text: { text: details.overview } });
    this.tag("ReleaseDate").patch({
      text: { text: "Released: " + details.releaseDate },
    });

    this.movieID = details.id;
    this.getSimilar();
  }

  async getSimilar() {
    const apiKey = "c49ffedbc528b3e97a1110dbfb4fb5e3";
    let data = await getSimilarMovies(this.movieID);
    let movieData = [];
    data.results.map((item) => {
      movieData.push({
        y: 50,
        flexItem: {
          marginRight: 25,
        },
        w: 140,
        h: 200,
        shader: { type: Lightning.shaders.RoundedRectangle, radius: 12 },
        src:
          "https://image.tmdb.org/t/p/w500" +
          item.poster_path +
          "?api_key=" +
          apiKey,
      });
    });

    this.tag("SimilarMovies").children = movieData.slice(0, 9);
  }

  // handleExit() doesnt work  on Macs, Using handleBack instead
  // _handleExit() {
  //   Router.navigate("$");
  // }

  _handleBack() {
    Router.navigate("$");
  }
}
