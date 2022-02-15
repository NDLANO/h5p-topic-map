import { ColorTheme } from "./types/ColorTheme";
import { H5PBehaviour } from "./types/H5P/H5PBehaviour";
import { H5PFieldGroup } from "./types/H5P/H5PField";
import { H5PFieldType } from "./types/H5P/H5PFieldType";
import { H5PL10n } from "./types/H5P/H5PL10n";
import { colorThemes, itemDialog } from "./utils/semantics.utils";

export const semantics: Readonly<[H5PFieldGroup, H5PBehaviour, H5PL10n]> = [
  {
    label: "Topic map editor",
    name: "topicMap",
    type: H5PFieldType.Group,
    widget: "topicMap",
    importance: "high",
    fields: [
      {
        label: "Topic map items",
        name: "topicMapItems",
        type: H5PFieldType.List,
        entity: "Topic map item",
        importance: "low",
        field: {
          label: "Item",
          name: "topicMapItem",
          importance: "low",
          type: H5PFieldType.Group,
          fields: [
            {
              name: "id",
              label: "Id",
              type: H5PFieldType.Text,
              widget: "none",
            },
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
            {
              label: "Label",
              description: "The label is shown on top of the background image",
              name: "label",
              type: H5PFieldType.Text,
            },
            {
              label: "Description",
              description:
                "The description is shown on top of the background image, below the label",
              name: "description",
              type: H5PFieldType.Text,
              optional: true,
            },
            {
              label: "Topic image",
              description:
                "Background image for card and image above text in dialog",
              name: "topicImage",
              type: H5PFieldType.Image,
            },

            ...itemDialog,

            {
              label: "Index",
              description:
                "⚠️ Advanced feature: Used for manually setting tab order.",
              name: "index",
              type: H5PFieldType.Number,
              optional: true,
            },
          ],
        },
      },
      {
        label: "Arrows",
        name: "arrowItems",
        type: H5PFieldType.List,
        entity: "arrowItem",
        field: {
          label: "Arrow",
          name: "arrow",
          type: H5PFieldType.Group,
          fields: [
            {
              name: "id",
              label: "Id",
              type: H5PFieldType.Text,
              widget: "none",
            },
            {
              name: "startElementId",
              label: "Id of start element",
              type: H5PFieldType.Text,
              widget: "none",
            },
            {
              name: "endElementId",
              label: "Id of end element",

              type: H5PFieldType.Text,
              widget: "none",
            },
            {
              label: "Label",
              description:
                "The label is used by screen readers and on the summary page",
              name: "label",
              type: H5PFieldType.Text,
              widget: "none",
            },
            {
              label: "Description",
              description:
                "The description is shown on top of the background image, below the label",
              name: "description",
              type: H5PFieldType.Text,
              optional: true,
            },
            {
              label: "Topic image",
              description: "Image above text in dialog",
              name: "topicImage",
              type: H5PFieldType.Image,
            },

            {
              label: "Show start arrow-head",
              name: "showStartHead",
              type: H5PFieldType.Boolean,
              widget: "none",
              default: false,
            },
            {
              label: "Show end arrow-head",
              name: "showEndHead",
              type: H5PFieldType.Boolean,
              widget: "none",
              default: true,
            },

            ...itemDialog,

            {
              label: "Index",
              name: "index",
              type: H5PFieldType.Number,
              optional: true,
              widget: "none",
            },
          ],
        },
      },
      {
        label: "Background image",
        name: "gridBackgroundImage",
        type: H5PFieldType.Image,
        optional: true,
      },
      {
        label: "Appearance",
        name: "appearance",
        type: H5PFieldType.Group,
        importance: "low",
        widget: "none",
        fields: [
          {
            label: "Color theme",
            name: "colorTheme",
            type: H5PFieldType.Select,
            default: ColorTheme.Blue,
            options: [...colorThemes],
          },
        ],
      },
    ],
  },

  {
    label: "Behavioral settings",
    name: "behaviour",
    type: H5PFieldType.Group,
    importance: "low",
    fields: [],
  },

  {
    name: "l10n",
    type: H5PFieldType.Group,
    common: true,
    label: "Localize",
    fields: [
      {
        label: "Close dialog",
        description: "Used by screen readers",
        name: "closeDialog",
        default: "Close dialog",
        type: H5PFieldType.Text,
      },
      {
        label: "Audio",
        description: "Shown in front of copyright statements",
        name: "copyrightAudio",
        default: "Audio",
        type: H5PFieldType.Text,
      },
      {
        label: "Photo",
        description: "Shown in front of copyright statements",
        name: "copyrightPhoto",
        default: "Photo",
        type: H5PFieldType.Text,
      },
      {
        label: "Video",
        description: "Shown in front of copyright statements",
        name: "copyrightVideo",
        default: "Video",
        type: H5PFieldType.Text,
      },
      {
        label: "Saving note label",
        name: "dialogNoteSaving",
        default: "Saving…",
        type: H5PFieldType.Text,
      },
      {
        label: "Saved note label",
        name: "dialogNoteSaved",
        default: "Saved",
        type: H5PFieldType.Text,
      },
      {
        label: "Note placeholder",
        name: "dialogNotePlaceholder",
        default: "Write your notes here…",
        type: H5PFieldType.Text,
      },
      {
        label: "Mark note as completed",
        name: "dialogNoteMarkAsCompleted",
        default: "Mark as completed",
        type: H5PFieldType.Text,
      },
      {
        label: "Dialog resources labels: Relevant links",
        name: "dialogResourcesRelevantLinks",
        default: "Relevant links",
        type: H5PFieldType.Text,
      },
      {
        label: "Dialog resources labels: Custom links",
        name: "dialogResourcesCustomLinks",
        default: "Your links",
        type: H5PFieldType.Text,
      },
      {
        label: "Dialog resources labels: Add",
        name: "dialogResourcesAdd",
        default: "Add",
        type: H5PFieldType.Text,
      },
      {
        label: "Dialog words text label",
        name: "dialogWordsLabel",
        default: "Words",
        type: H5PFieldType.Text,
      },
      {
        label: "Fullscreen button label",
        name: "fullscreenButtonLabel",
        default: "Toggle fullscreen mode",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar tabs list aria label",
        name: "navbarTabsListAriaLabel",
        default: "Navigation bar",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar topic map section label",
        name: "navbarTopicMapSectionLabel",
        default: "Topic map",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar notes section label",
        name: "navbarNotesSectionLabel",
        default: "See notes",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar help section label",
        name: "navbarHelpSectionLabel",
        default: "Help",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar help section title",
        name: "navbarHelpSectionTitle",
        default: "Help",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar help section body",
        name: "navbarHelpSectionBody",
        widget: "html",
        default:
          "<p>The purpose of this exercise is to enhance your learning by linking your own notes to a topic map. The topic map consists of events (boxes) and connections (arrows). You must enter notes for both events and connections.</p><br /><p>Click or tap the boxes and arrows to add a note to an event or connection. The notes you enter are automatically saved locally in the browser of the device you are using, so you can continue on or read the notes at a later time.</p><br /><p><strong>Progress bar</strong> shows what percentage of the events and connections have received notes. 100% means you have posted notes in all available places.</p><br /><p><strong>Export the notes</strong> gives you an overview of all the notes you have written. There you can print or copy the notes to e.g. paste them into a document or email.</p><br /><p><strong>Delete all notes</strong> removes all notes from the browser on the device you are using.</p>",
        type: H5PFieldType.Text,
      },
      {
        label: "Dialog resources labels",
        name: "dialogResourcesLabel",
        default: "Resources",
        type: H5PFieldType.Text,
      },
      {
        label: "Text",
        name: "dialogTextLabel",
        default: "Text",
        type: H5PFieldType.Text,
      },
      {
        label: "Note",
        name: "dialogNoteLabel",
        default: "Note",
        type: H5PFieldType.Text,
      },
      {
        label: "Note",
        name: "dialogTabListAriaLabel",
        default: "Tabs List",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar notes section title",
        name: "navbarNotesSectionTitle",
        default: "See notes",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar notes section body",
        name: "navbarNotesSectionBody",
        default:
          "Here you see an overview of all the notes you have written. You can print or copy the notes to paste them into a document or e-mail, for example.",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar notes print button label",
        name: "navbarNotesSectionPrintLabel",
        default: "Print",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar notes delete all notes button label",
        name: "navbarNotesSectionDeleteLabel",
        default: "Delete all notes",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar notes empty list label",
        name: "navbarNotesEmptyListLabel",
        default: "No dialogue notes available in this topic map.",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar notes missing note label",
        name: "navbarNotesMissingNoteLabel",
        default: "━ Notes are missing for this card!",
        type: H5PFieldType.Text,
      },
      {
        label: "Delete all notes confirmation window label",
        name: "deleteNotesConfirmationWindowLabel",
        default: "Are you sure you want to delete all your notes?",
        type: H5PFieldType.Text,
      },
      {
        label: "Delete all notes confirm deletion label",
        name: "deleteNotesConfirmLabel",
        default: "Confirm deletion",
        type: H5PFieldType.Text,
      },
      {
        label: "Delete all notes deny deletion label",
        name: "deleteNotesDenyLabel",
        default: "Cancel",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar progress bar label",
        name: "progressBarLabel",
        default: "Progress bar",
        type: H5PFieldType.Text,
      },
    ],
  },
];
