import type { Image } from 'h5p-types';
import * as React from 'react';
import { useL10n } from '../../../hooks/useLocalization';
import { formatCopyright } from '../../../utils/dialog.utils';
import styles from './DialogText.module.scss';

export type DialogTextProps = {
  topicImage: Image | undefined;
  introduction: string | undefined;
  bodyText: string | undefined;
  topicImageAltText: string | undefined;
};

export const DialogText: React.FC<DialogTextProps> = ({
  topicImage,
  introduction,
  bodyText,
  topicImageAltText,
}) => {
  const copyrightTitle = useL10n('copyrightPhoto');

  return (
    <div className={styles.dialogText}>
      {introduction ? (
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
      ) : null}
      {topicImage ? (
        <>
          <img
            className={styles.topicImage}
            src={topicImage.path}
            alt={topicImageAltText ?? ''}
            width={topicImage.width}
            height={topicImage.height}
          />
          {topicImage?.copyright ? (
            <div
              className={styles.copyright}
              
              dangerouslySetInnerHTML={{
                __html: formatCopyright(copyrightTitle, topicImage.copyright),
              }}
            />
          ) : null}
        </>
      ) : null}

      {bodyText ? (
        <div
          className={styles.bodyText}
          dangerouslySetInnerHTML={{ __html: bodyText }}
        />
      ) : null}
    </div>
  );
};
