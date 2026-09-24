import type { H5PField } from 'h5p-types';
import { ColorTheme } from '../types/ColorTheme';
import semantics from '../../semantics.json';

export const itemDialog: Array<H5PField> = [
  {
    label: 'Dialog',
    name: 'dialog',
    type: 'group',
    fields: [
      {
        label: 'Show notes textarea',
        name: 'hasNote',
        type: 'boolean',
        default: true,
      },
      {
        label: 'Maximum number of characters',
        description:
          'Specifies the maximum number of characters for the note.',
        name: 'maxLength',
        type: 'number',
        optional: true,
      },
      {
        label: 'Text',
        name: 'text',
        type: 'text',
        widget: 'html',
        optional: true,
        tags: ['h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'a'],
      },
      {
        label: 'Video',
        name: 'video',
        type: 'video',
        optional: true,
      },
      {
        label: 'Audio',
        name: 'audio',
        type: 'group',
        optional: true,
        importance: 'low',
        fields: [
          {
            label: 'Audio',
            name: 'audioFile',
            type: 'audio',
          },
          {
            label: 'Subtext',
            name: 'subtext',
            type: 'text',
            widget: 'html',
            optional: true,
            tags: ['p', 'br', 'strong', 'em'],
          },
        ],
      },
      {
        label: 'Links',
        name: 'links',
        description:
          'These links are as auxiliary links for the user in the element\'s modal window',
        type: 'list',
        optional: true,
        entity: 'linkItem',
        field: {
          label: 'Link',
          name: 'link',
          type: 'group',
          fields: [
            {
              label: 'Id',
              name: 'id',
              type: 'text',
              widget: 'uuid',
            },
            {
              label: 'Label',
              name: 'label',
              type: 'text',
            },
            {
              label: 'Url',
              name: 'url',
              type: 'text',
            },
          ],
        },
      },
      {
        label: 'Show add links option',
        name: 'showAddLinks',
        type: 'boolean',
        default: false,
      },
    ],
  },
];

export const colorThemes: Array<{ label: string; value: string }> =
  Object.entries(ColorTheme).map(([label, value]) => ({ label, value }));

export const defaultTheme = ColorTheme.Blue;

type SemanticsEntry = {
  name?: unknown;
  default?: unknown;
  type?: unknown;
  fields?: SemanticsEntry[];
};

/**
 * Get default values from semantics fields.
 * @param start Start semantics field.
 * @returns Default values from semantics.
 */
export const getSemanticsDefaults = (
  start: SemanticsEntry[] = semantics as SemanticsEntry[],
): Record<string, unknown> => {
  const defaults: Record<string, unknown> = {};

  if (!Array.isArray(start)) {
    return defaults; // Must be array, root or list
  }

  start.forEach((entry) => {
    if (typeof entry.name !== 'string') {
      return;
    }

    if (typeof entry.default !== 'undefined') {
      defaults[entry.name] = entry.default;
    }
    if (entry.type === 'list') {
      defaults[entry.name] = []; // Does not set defaults within list items!
    }
    else if (entry.type === 'group' && entry.fields) {
      const groupDefaults = getSemanticsDefaults(entry.fields);
      // Workaround for H5P core treating groups with one child as the
      // child itself
      if (Object.keys(groupDefaults).length === 1) {
        defaults[entry.name] = Object.values(groupDefaults)[0];
      }
      else if (Object.keys(groupDefaults).length > 1) {
        defaults[entry.name] = groupDefaults;
      }
    }
  });

  return defaults;
};
