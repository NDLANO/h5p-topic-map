import { H5P } from './h5p/H5P.util';
import { H5PWrapper } from './h5p/H5PWrapper';
import './styles.scss';

// TODO: Why was this not typed correctly to begin with?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(H5P as any).TopicMap = H5PWrapper;
