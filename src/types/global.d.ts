/// <reference types="jquery" />
/// <reference types="jest" />

interface Window {
  /**
   * The H5P core runtime object. Content type scripts always run after the
   * H5P core library has defined this global (in unit tests it is provided
   * by the jest setup).
   */
  H5P: import('h5p-types').H5PObject;

  /**
   * The per-page integration settings injected by H5P core. Not available
   * in standalone contexts (e.g. unit tests).
   */
  H5PIntegration: import('h5p-types').H5PIntegrationObject | undefined;
}

declare module '*.scss';
