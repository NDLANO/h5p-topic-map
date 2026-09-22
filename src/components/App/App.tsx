import * as React from 'react';
import { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useH5PInstance } from '../../hooks/useH5PInstance';
import { Params } from '../../types/Params';
import { defaultTheme } from '../../utils/semantics.utils';
import { Navbar } from '../Navbar/Navbar';
import './App.scss';

export type AppProps = {
  params: Params;
  title: string | undefined;
  toggleIPhoneFullscreen: () => void;
};

export const App: React.FC<AppProps> = ({
  params,
  title,
  toggleIPhoneFullscreen,
}) => {
  const fullscreenHandle = useFullScreenHandle();
  const [isIPhoneFullscreenActive, setIsIPhoneFullscreenActive] =
    useState(false);

  const handleToggleIPhoneFullscreen = (): void => {
    setIsIPhoneFullscreenActive(!isIPhoneFullscreenActive);
    toggleIPhoneFullscreen();
  };

  const themeClassName = React.useMemo(
    () => `theme-${params.topicMap?.colorTheme ?? defaultTheme}`,
    [params.topicMap?.colorTheme],
  );

  // Make sure theme is applied to the root element
  const h5pInstance = useH5PInstance();
  h5pInstance?.containerElement?.classList.add(themeClassName);

  return (
    <div
      className={
        isIPhoneFullscreenActive ? 'iPhoneFullscreenStyle' : undefined
      }
    >
      <div
        className={isIPhoneFullscreenActive ? 'iPhoneFullscreenThemeStyle' : ''}
      >
        <FullScreen
          className="fullscreenStyle"
          handle={fullscreenHandle}
        >
          <div className="appNavbarWrapper">
            <Navbar
              navbarTitle={title ?? ''}
              params={params}
              toggleIPhoneFullscreen={handleToggleIPhoneFullscreen}
              isIPhoneFullscreenActive={isIPhoneFullscreenActive}
            />
          </div>
        </FullScreen>
      </div>
    </div>
  );
};
