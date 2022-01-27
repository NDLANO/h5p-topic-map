import { ColorTheme } from "../types/ColorTheme";
import { H5PField } from "../types/H5P/H5PField";
import { H5PFieldType } from "../types/H5P/H5PFieldType";
import { Params } from "../types/H5P/Params";
import { Translations } from "../types/Translations";

export const itemPosition: Array<H5PField> = [
  {
    name: "xPercentagePosition",
    label: "X-position as a percentage of the container width",
    type: H5PFieldType.Number,
    widget: "none",
  },
  {
    name: "yPercentagePosition",
    label: "Y-position as a percentage of the container height",
    type: H5PFieldType.Number,
    widget: "none",
  },
  {
    name: "widthPercentage",
    label: "Width as a percentage of the container width",
    type: H5PFieldType.Number,
    widget: "none",
  },
  {
    name: "heightPercentage",
    label: "Height as a percentage of the container height",
    type: H5PFieldType.Number,
    widget: "none",
  },
];

export const itemDialog: Array<H5PField> = [
  {
    label: "Dialog",
    name: "dialog",
    type: H5PFieldType.Group,
    fields: [
      {
        label: "Text",
        name: "text",
        type: H5PFieldType.Text,
        widget: "html",
        optional: true,
      },
      {
        label: "Video",
        name: "video",
        type: H5PFieldType.Video,
        optional: true,
      },
      {
        label: "Audio",
        name: "audio",
        type: H5PFieldType.Group,
        optional: true,
        importance: "low",
        fields: [
          {
            label: "Audio",
            name: "audioFile",
            type: H5PFieldType.Audio,
          },
          {
            label: "Subtext",
            name: "subtext",
            type: H5PFieldType.Text,
            widget: "html",
            optional: true,
          },
        ],
      },
      {
        label: "Links",
        name: "links",
        description:
          "These links are as auxiliary links for the user in the element's modal window",
        type: H5PFieldType.List,
        optional: true,
        entity: "linkItem",
        field: {
          label: "Link",
          name: "link",
          type: H5PFieldType.Text,
        },
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
      appearance: {
        colorTheme: defaultTheme,
      },
    },
    behaviour: null,
    l10n: {} as Translations,
  };
};
