import { useTranslation as useH5PTranslation } from 'use-h5p';
import { TranslationKey } from '../types/TranslationKey';

export const useTranslation = () => {
  const { t } = useH5PTranslation();

  return {
    ...useH5PTranslation,
    t: (
      key: TranslationKey,
      values?: Record<string, string | number>,
    ): string => {
      const translation = t(key);

      if (!values) {
        return translation;
      }

      // Replaces every `@placeholder` in the translation with its value.
      return Object.entries(values).reduce(
        (text, [name, value]) => text.split(`@${name}`).join(String(value)),
        translation,
      );
    },
  };
};
