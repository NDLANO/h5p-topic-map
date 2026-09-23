import type { H5PAudio } from 'h5p-types';
import * as React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { formatCopyright } from '../../../utils/dialog.utils';
import './DialogAudio.scss';

export type DialogAudioProps = {
  audioTrack: H5PAudio;
  subtext?: string;
};

export const DialogAudio: React.FC<DialogAudioProps> = ({
  audioTrack,
  subtext,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <audio src={audioTrack.path} controls />

      {audioTrack.copyright ? (
        <p className="h5p-topic-map-dialog-copyright">
          {formatCopyright(t('copyrightAudio'), audioTrack.copyright)}
        </p>
      ) : null}

      {subtext ? (
        <div
          className="h5p-topic-map-dialog-audio-subtext"
          dangerouslySetInnerHTML={{ __html: subtext }}
        />
      ) : null}
    </>
  );
};
