import { BreakpointSize } from '../types/BreakpointSize';

export const getSizeClassNames = (size: BreakpointSize): string => {
  const sizeClassname = {
    [BreakpointSize.Large]: 'large',
    [BreakpointSize.Medium]: 'medium',
    [BreakpointSize.Small]: 'small',
    [BreakpointSize.XSmall]: 'xSmall',
    [BreakpointSize.XXSmall]: 'xxSmall',
  };

  return sizeClassname[size];
};
