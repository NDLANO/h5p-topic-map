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
    <div className="dialogText">
      {introduction ? (
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
      ) : null}
      {topicImage ? (
        <>
          <img
            className="topicImage"
            src={topicImage.path}
            alt={topicImageAltText ?? ''}
            width={topicImage.width}
            height={topicImage.height}
          />
          {topicImage?.copyright ? (
            <div
              className="copyright"
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
          className="bodyText"
          dangerouslySetInnerHTML={{ __html: bodyText }}
        />
      ) : null}
    </div>
  );
};
