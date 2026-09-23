import type { H5PImage } from 'h5p-types';
import * as React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { formatCopyright } from '../../../utils/dialog.utils';
import './DialogText.scss';

export type DialogTextProps = {
  topicImage: H5PImage | undefined;
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
  const { t } = useTranslation();

  return (
    <div className="h5p-topic-map-dialog-text">
      {introduction ? (
        <div
          className="h5p-topic-map-dialog-text-description"
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
      ) : null}
      {topicImage ? (
        <>
          <img
            className="h5p-topic-map-dialog-text-image"
            src={topicImage.path}
            alt={topicImageAltText ?? ''}
            width={topicImage.width}
            height={topicImage.height}
          />
          {topicImage?.copyright ? (
            <div
              className="h5p-topic-map-dialog-copyright"
            >
              {formatCopyright(
                t('copyrightPhoto'),
                topicImage.copyright,
              )}
            </div>
          ) : null}
        </>
      ) : null}

      {bodyText ? (
        <div
          className="h5p-topic-map-dialog-text-body"
          dangerouslySetInnerHTML={{ __html: bodyText }}
        />
      ) : null}
    </div>
  );
};
