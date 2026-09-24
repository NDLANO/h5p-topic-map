import type { H5PAudio, H5PVideo } from 'h5p-types';
import { Link } from './Link';

export type DialogContent = {
  hasNote: boolean;
  links?: Array<Link>;
  showAddLinks: boolean;
  maxLength?: number;
  text?: string;
  video?: Array<H5PVideo>;
  audio?: {
    /* "Optional": can't force users to add a file, so the value may be nullish. */
    audioFile?: Array<H5PAudio>;
    subtext?: string;
  };
};
