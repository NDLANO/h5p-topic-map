import * as React from 'react';
import { useCallback, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import type { IH5PContentType } from 'h5p-types';
import { AppWidthContext } from '../../contexts/AppWidthContext';
import { useH5PInstance } from '../../hooks/useH5PInstance';
import { Params } from '../../types/Params';
import { defaultTheme } from '../../utils/semantics.utils';
import { Navbar } from '../Navbar/Navbar';
import './App.scss';

export type AppProps = {
  params: Params;
  title: string | undefined;
  toggleIPhoneFullscreen: () => void;
  instance: IH5PContentType;
};

export const App: React.FC<AppProps> = ({
  params,
  title,
  toggleIPhoneFullscreen,
  instance,
}) => {
  const fullscreenHandle = useFullScreenHandle();
  const [isIPhoneFullscreenActive, setIsIPhoneFullscreenActive] =
    useState(false);

  const handleToggleIPhoneFullscreen = (): void => {
    setIsIPhoneFullscreenActive(!isIPhoneFullscreenActive);
    toggleIPhoneFullscreen();
  };

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Single stable 'resize' subscription feeding the AppWidthContext. The
  // listener identity never changes, so it can be cleaned up reliably.
  // H5P triggers 'resize' for window resizes and fullscreen changes, so no
  // window-level listener is needed.
  const updateWidth = useCallback((): void => {
    setWidth(containerRef.current?.getBoundingClientRect().width ?? 0);
  }, []);

  const handleResize = useCallback((): void => {
    window.requestAnimationFrame(updateWidth);
  }, [updateWidth]);

  React.useEffect(() => {
    instance.on('resize', handleResize);
    updateWidth();
    return (): void => {
      instance.off('resize', handleResize);
    };
  }, [handleResize, instance, updateWidth]);

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
      <AppWidthContext.Provider value={width}>
        <div
          className={isIPhoneFullscreenActive ? 'iPhoneFullscreenThemeStyle' : ''}
        >
          <FullScreen
            className="fullscreenStyle"
            handle={fullscreenHandle}
          >
            <div className="appNavbarWrapper" ref={containerRef}>
              <Navbar
                navbarTitle={title ?? ''}
                params={params}
                toggleIPhoneFullscreen={handleToggleIPhoneFullscreen}
                isIPhoneFullscreenActive={isIPhoneFullscreenActive}
              />
            </div>
          </FullScreen>
        </div>
      </AppWidthContext.Provider>
    </div>
  );
};
