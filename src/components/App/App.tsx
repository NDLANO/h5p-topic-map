import * as React from 'react';
import { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import type { IH5PContentType } from 'h5p-types';
import { AppWidthContext } from '../../contexts/AppWidthContext';
import { Params } from '../../types/Params';
import { defaultTheme } from '../../utils/semantics.utils';
import { Navbar } from '../Navbar/Navbar';
import styles from './App.module.scss';
import { AriaLiveContext } from '../../contexts/AriaLiveContext';
import { AriaLive } from '../AriaLive/AriaLive';

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
  const [width, setWidth] = React.useState(0);
  const [ariaLiveText, setAriaLiveText] = useState('');

  React.useEffect(() => {
    const initialWidth =
      containerRef.current?.getBoundingClientRect().width ?? 0;
    setWidth(initialWidth);
  }, []);

  const themeClassName = React.useMemo(
    () => `theme-${params.topicMap?.colorTheme ?? defaultTheme}`,
    [params.topicMap?.colorTheme],
  );

  /*
   * React supplies useResizeObserver hook, but H5P may trigger `resize` not
   * only when the window resizes
   */
  instance.on('resize', () => {
    window.requestAnimationFrame(() => {
      if (!containerRef.current) {
        return;
      }

      setWidth(containerRef.current.getBoundingClientRect().width);
    });
  });

  return (
    <div
      className={
        isIPhoneFullscreenActive ? styles.iPhoneFullscreenStyle : undefined
      }
    >
      <AriaLiveContext.Provider value={{ ariaLiveText, setAriaLiveText }}>
        <AppWidthContext.Provider value={width}>
          <div
            className={`${themeClassName} ${isIPhoneFullscreenActive && styles.iPhoneFullscreenThemeStyle
            }`}
          >
            <FullScreen
              className={styles.fullscreenStyle}
              handle={fullscreenHandle}
            >
              <div className={styles.navbarWrapper} ref={containerRef}>
                <Navbar
                  navbarTitle={title ?? ''}
                  params={params}
                  toggleIPhoneFullscreen={handleToggleIPhoneFullscreen}
                  isIPhoneFullscreenActive={isIPhoneFullscreenActive}
                  instance={instance}
                />
              </div>
              <AriaLive />
            </FullScreen>
          </div>
        </AppWidthContext.Provider>
      </AriaLiveContext.Provider>
    </div>
  );
};
