import * as React from 'react';
import { useTranslation } from 'use-h5p';
import { H5P } from '../../h5p/H5P.util';
import { useH5PInstance } from '../../hooks/useH5PInstance';
import './FullscreenButton.scss';

export const FullscreenButton: React.FC = () => {
  const h5pInstance = useH5PInstance();
  const { t } = useTranslation();
  const fullscreenButtonLabelEnter = t('fullscreenButtonLabelEnter');
  const fullscreenButtonLabelExit = t('fullscreenButtonLabelExit');
  const isFullscreen = H5P?.isFullscreen;

  const handleFullscreen = (): void => {
    setTimeout(() => {
      if (!h5pInstance) {
        return;
      }
      h5pInstance.handleToggleFullscreen();
    }, 300); // Some devices don't register user gesture before call to to requestFullscreen
  };

  /*
   * Instead of adding an SVG, use a pseudo before element on .fullscreenButton, visually centered,
   * using font-family: "h5p-theme" and content: "" when not in fullscreen mode and
   * content: "" when in fullscreen mode
   */
  return (
    <button
      className="fullscreenButton"
      type="button"
      aria-label={isFullscreen ? fullscreenButtonLabelExit : fullscreenButtonLabelEnter}
      onClick={handleFullscreen}
    >
    </button>
  );
};
