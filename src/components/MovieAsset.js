import { Lightning } from "@lightningjs/sdk";

export class MovieAsset extends Lightning.Component {
  static _template() {
    return {
      transitions: {
        x: {
          duration: 0.5,
        },
      },
      MovieTitle: {
        y: 400,
        w: 280,
        color: 0xffffffff,
        text: {
          text: this.bindProp("title"),
          fontSize: 30,
        },
      },
    };
  }

  _focus() {
    this.patch({
      smooth: {
        w: 300,
        h: 420,
        y: -70,
      },
    });

    this.patch({
      MovieTitle: {
        color: 0xfff5c242,
        text: {
          fontSize: 33,
        },
        y: 470,
      },
    });
  }

  _unfocus() {
    this.patch({
      smooth: {
        w: 250,
        h: 350,
        y: 0,
      },
    });
    this.patch({
      MovieTitle: {
        color: 0xffffffff,
        text: {
          fontSize: 30,
        },
        y: 400,
      },
    });
  }
}
