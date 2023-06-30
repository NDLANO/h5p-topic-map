import * as React from 'react';
import { useAriaLive } from '../../hooks/useAriaLive';
import styles from './AriaLive.module.scss';

export const AriaLive: React.FC = () => {
  const { ariaLiveText } = useAriaLive();

  return (
    <div aria-live="polite" className={styles.visuallyHidden}>
      {ariaLiveText}
    </div >
  );
};