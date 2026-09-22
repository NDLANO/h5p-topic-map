import { decode } from 'he';

// Required to sanitize H5P text field values will be HTML encoded
export const sanitizeRecord = <TRec extends Record<string, string>>(
  record: TRec,
): TRec => {
  const output = record;
  const entries: [keyof typeof record, string][] = Object.entries(record);

  for (const [key, value] of entries) {
    output[key] = decode(value) as TRec[keyof TRec];
  }

  return output;
};

/**
 * Call callback function once dom element gets visible in viewport.
 * @async
 * @param {HTMLElement} dom DOM element to wait for.
 * @param {function} callback Function to call once DOM element is visible.
 * @param {object} [options] IntersectionObserver options.
 * @returns {IntersectionObserver|undefined} Promise for IntersectionObserver or undefined.
 */
export const callOnceVisible = async (
  dom: HTMLElement,
  callback: () => void,
  options: IntersectionObserverInit = {}
): Promise<IntersectionObserver | undefined> => {
  options.threshold = options.threshold || 0;

  return await new Promise((resolve) => {
    // iOS is behind ... Again ...
    const idleCallback = window.requestIdleCallback ?
      window.requestIdleCallback :
      window.requestAnimationFrame;

    idleCallback(() => {
      // Get started once visible and ready
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          observer.unobserve(dom);
          observer.disconnect();

          callback();
        }
      }, {
        ...(options.root && { root: options.root }),
        threshold: options.threshold,
      });
      observer.observe(dom);

      resolve(observer);
    });
  });
};
