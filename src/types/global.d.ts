/// <reference types="jquery" />
/// <reference types="jest" />

interface Window {
  /** H5P core runtime object. Always defined before content type scripts run (jest setup provides it in tests). */
  H5P: import('h5p-types').H5PObject;

  /** Per-page integration settings injected by H5P core. Unavailable in standalone contexts, e.g. unit tests. */
  H5PIntegration: import('h5p-types').H5PIntegrationObject | undefined;
}

declare module '*.scss';
