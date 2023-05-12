import type { Audio, Video } from 'h5p-types';
import { Link } from './Link';

export type DialogContent = {
  hasNote: boolean;
  links?: Array<Link>;
  showAddLinks: boolean;
  maxWordCount?: number;
  text?: string;
  video?: Array<Video>;
  audio?: {
    /**
     * "Optional" because we can't force the user
     * to add a file, therefore there's an off-chance
     * that the value will be nullish
     *  */
    audioFile?: Array<Audio>;
    subtext?: string;
  };
};
