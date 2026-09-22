import { BreakpointSize } from '../types/BreakpointSize';

export const getSizeClassNames = (size: BreakpointSize): string => {
  const sizeClassname = {
    [BreakpointSize.Large]: 'large largeUp mediumUp smallUp xSmallUp xxSmallUp',
    [BreakpointSize.Medium]: 'medium mediumUp smallUp xSmallUp xxSmallUp',
    [BreakpointSize.Small]: 'small smallUp xSmallUp xxSmallUp',
    [BreakpointSize.XSmall]: 'xSmall xSmallUp xxSmallUp',
    [BreakpointSize.XXSmall]: 'xxSmall xxSmallUp',
  };

  return sizeClassname[size];
};
