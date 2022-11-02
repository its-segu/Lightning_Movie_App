import { Lightning, Router, Utils } from "@lightningjs/sdk";
import { getMovie } from "../lib/Api";
import { MovieAsset } from "../components/MovieAsset";

export class Home extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff111111,
      },
      Title: {
        x: 700,
        y: 10,
        color: 0xfff5c242,
        text: {
          text: "LIGHTNING MOVIE APP",
          fontSize: 35,
        },
      },
      MovieImage: {
        x: 100,
        y: 330,
        flex: {
          direction: "row",
        },
      },
    };
  }

  async _init() {
    const apiKey = "c49ffedbc528b3e97a1110dbfb4fb5e3";
    let data = await getMovie();
    let movieData = [];
    data.results.map((item) => {
      movieData.push({
        w: 250,
        h: 350,
        flexItem: {
          marginRight: 50,
        },
        shader: { type: Lightning.shaders.RoundedRectangle, radius: 12 },
        title: item.title,
        overview: item.overview,
        releaseDate: item.release_date,
        movieID: item.id,
        type: MovieAsset,
        src:
          "https://image.tmdb.org/t/p/w500" +
          item.poster_path +
          "?api_key=" +
          apiKey,
      });
    });

    this.tag("MovieImage").children = movieData;

    this.index = 0;
  }

  getActiveItem() {
    return this.tag("MovieImage").children[this.index];
  }

  _getFocused() {
    return this.getActiveItem();
  }

  _handleEnter() {
    let activeItem = this.getActiveItem();
    Router.navigate("Movie", {
      src: activeItem.src,
      title: activeItem.title,
      overview: activeItem.overview,
      releaseDate: activeItem.releaseDate,
      id: activeItem.movieID,
    });
  }

  _handleLeft() {
    if (this.index > 0) {
      this.index--;
    } else {
      Router.focusWidget("Menu");
    }
    if (this.index > 0)
      this.tag("MovieImage").patch({
        smooth: { x: -220 - (this.index - 1) * 295 },
      });
    else {
      this.tag("MovieImage").patch({ smooth: { x: 300 } });
    }
  }

  _handleRight() {
    if (this.index < this.tag("MovieImage").children.length - 1) {
      this.index++;
    }
    if (this.index > 0) {
      this.tag("MovieImage").patch({
        smooth: { x: -50 - (this.index - 1) * 295 },
      });
    } else {
      this.tag("MovieImage").patch({ smooth: { x: 0 } });
    }
  }
}
