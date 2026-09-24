import * as React from 'react';
import { ReactNode } from 'react';
import './NavigationBar.scss';

type NavigationBarProps = {
  navbarTitle: string;
  onHeightChange: (height: number) => void;
  children?: ReactNode;
};

export const NavigationBar: React.FC<NavigationBarProps> = ({
  navbarTitle,
  onHeightChange,
  children,
}) => {
  const navigationBarRef = React.useRef<HTMLDivElement>(null);

  // Observe the bar itself instead of reading its height during render,
  // so the height is correct on first paint and stays current when the
  // bar resizes (e.g. the container-width padding breakpoint).
  React.useEffect(() => {
    const element = navigationBarRef.current;
    if (!element) {
      return;
    }

    const reportHeight = (): void => {
      onHeightChange(element.getBoundingClientRect().height);
    };

    const observer = new ResizeObserver(reportHeight);
    observer.observe(element);
    reportHeight();

    return (): void => {
      observer.disconnect();
    };
  }, [onHeightChange]);

  return (
    <div className="h5p-topic-map-navigation-bar" ref={navigationBarRef}>
      <div className="h5p-topic-map-navigation-bar-title">
        {navbarTitle}
      </div>
      {children}
    </div>
  );
};
