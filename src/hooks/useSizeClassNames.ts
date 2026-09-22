import { useMemo } from 'react';
import { getSizeClassNames } from '../utils/style.utils';
import { useAppWidth } from './useAppWidth';

export const useSizeClassNames = (): string => {
  const appWidth = useAppWidth();

  const sizeClassNames = useMemo(
    () => getSizeClassNames(appWidth),
    [appWidth],
  );

  return sizeClassNames;
};
