import { css } from "styled-components";

const theme = {
  COLOR: {
    PRIMARY_COLOR: "#01ffb9",
    SECONDARY_COLOR: "#f8e3f3",
    BLACK: "#000",
    WHITE: "#fff",
    GRAY: "#d9cece",
    ERROR: "#f64747",
    DARK_GREY: "#8b8b8b",
    TEXT_COLOR: "#474747",
    DIVIDER: "#ebeaea"
  },
  WRAPPER: {
    WIDTH: "95%",
    MAX_WIDTH: "1250px",
    COLOR: "#e2f5e7"
  },
  SNIPPETS: {
    BOX_SHADOW: css`
      box-shadow: 4px 8px 15px 0 rgba(0, 0, 0, 0.14);
    `,
    HEADING: css`
      font-family: "Nunito", sans-serif;
      font-size: 30px;
      font-weight: bold;
      text-align: center;
    `,
    PARAGRAPH_TEXT: css`
      font-family: "Nunito", sans-serif;
      font-size: 16px;
      color: #474747;
    `,
    HELPER_TEXT: css`
      font-family: "Nunito", sans-serif;
      font-size: 13px;
      font-weight: bold;
      text-align: center;
      color: #696969;
    `
  }
};

export default function configureTheme() {
  return theme;
}
