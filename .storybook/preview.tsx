import "!style-loader!css-loader!sass-loader!../src/styles.scss";
import * as React from "react";
import { FC } from "react";
import { L10nContext } from "use-h5p";
import { defaultTranslations } from "../src/constants/defaultTranslations";
import { ContentIdContext } from "../src/contexts/ContentIdContext";
import { H5PContext } from "../src/contexts/H5PContext";
import { H5PWrapper } from "../src/h5p/H5PWrapper";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ["Atoms", "Molecules", "Organisms", "Templates", "Pages"],
    },
  },
  themes: {
    default: "Blue",
    list: [
      { name: "Blue", class: "theme-1", color: "#40586f" },
      { name: "Green", class: "theme-2", color: "#3d6060" },
      { name: "Red", class: "theme-3", color: "#981b1e" },
      { name: "Grey", class: "theme-4", color: "#373d3f" },
    ],
    target: ".h5p-topic-map .h5p-topic-map, .h5p-topic-map",
    clearable: false,
  },
};

const h5pInstance = new H5PWrapper(
  {
    behaviour: {},
    l10n: defaultTranslations,
    topicMap: {},
  },
  "1",
  {
    metadata: {
      title: "",
      license: "",
      extraTitle: "",
      authors: [],
      changes: []
    },
    standalone: false,
  },
);

export const decorators = [
  (Story: FC) => (
    <ContentIdContext.Provider value="1">
      <L10nContext.Provider value={defaultTranslations}>
        <H5PContext.Provider value={h5pInstance}>
          <Story />
        </H5PContext.Provider>
      </L10nContext.Provider>
    </ContentIdContext.Provider>
  ),
];
