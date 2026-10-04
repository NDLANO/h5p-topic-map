/**
 * Params accepted by the H5P.Components.Button factory
 * (H5P.Components-1.0/src/components/h5p-button.js).
 */
type H5PButtonParams = {
  label?: string;
  ariaLabel?: string;
  tooltip?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  styleType?: 'primary' | 'secondary' | 'nav';
  icon?: string | undefined;
  classes?: string[];
  onClick?: (event: MouseEvent) => void;
  buttonType?: string;
  disabled?: boolean;
};

/**
 * Factory methods exposed by the H5P.Components library.
 */
type H5PComponents = {
  /** Create a themed, responsive button element */
  Button(params: H5PButtonParams): HTMLElement;
};

declare module 'h5p-types' {
  interface H5PObject {
    /** H5P.Components library, available as a preloaded dependency. */
    Components?: H5PComponents;
  }
}

export {};
