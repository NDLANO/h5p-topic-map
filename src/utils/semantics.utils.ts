import { H5PField } from "h5p-types";
import { ColorTheme } from "../types/ColorTheme";
import { Params } from "../types/Params";
import { Translations } from "../types/Translations";

export const itemDialog: Array<H5PField> = [
  {
    label: "Dialog",
    name: "dialog",
    type: "group",
    fields: [
      {
        label: "Show notes textarea",
        name: "hasNote",
        type: "boolean",
        default: true,
      },
      {
        label: "Maximum number of words",
        description:
          "Specifies the maximum number of words for the note. Default is 160 words.",
        name: "maxWordCount",
        type: "number",
        optional: true,
        default: 160,
      },
      {
        label: "Text",
        name: "text",
        type: "text",
        widget: "html",
        optional: true,
        tags: ["h2", "h3", "h4", "h5", "h6", "p", "br", "strong", "em", "a"],
      },
      {
        label: "Video",
        name: "video",
        type: "video",
        optional: true,
      },
      {
        label: "Audio",
        name: "audio",
        type: "group",
        optional: true,
        importance: "low",
        fields: [
          {
            label: "Audio",
            name: "audioFile",
            type: "audio",
          },
          {
            label: "Subtext",
            name: "subtext",
            type: "text",
            widget: "html",
            optional: true,
            tags: ["p", "br", "strong", "em"],
          },
        ],
      },
      {
        label: "Links",
        name: "links",
        description:
          "These links are as auxiliary links for the user in the element's modal window",
        type: "list",
        optional: true,
        entity: "linkItem",
        field: {
          label: "Link",
          name: "link",
          type: "group",
          fields: [
            {
              label: "Id",
              name: "id",
              type: "text",
              widget: "uuid",
            },
            {
              label: "Label",
              name: "label",
              type: "text",
            },
            {
              label: "Url",
              name: "url",
              type: "text",
            },
          ],
        },
      },
      {
        label: "Show add links option",
        name: "showAddLinks",
        type: "boolean",
        default: false,
      },
    ],
  },
];

export const colorThemes: Array<{ label: string; value: string }> =
  Object.entries(ColorTheme).map(([label, value]) => ({ label, value }));

export const defaultTheme = ColorTheme.Blue;

export const getEmptyParams = (): Required<Params> => {
  return {
    topicMap: {
      topicMapItems: [],
      colorTheme: defaultTheme,
    },
    behaviour: null,
    l10n: {} as Translations,
  };
};
