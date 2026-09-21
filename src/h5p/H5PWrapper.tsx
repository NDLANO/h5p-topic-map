import type { H5PExtras, IH5PContentType } from 'h5p-types';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { L10nContext } from 'use-h5p';
import { App } from '../components/App/App';
import { ContentIdContext } from '../contexts/ContentIdContext';
import { H5PContext } from '../contexts/H5PContext';
import { Params } from '../types/Params';
import { sanitizeRecord } from '../utils/h5p.utils';
import { getEmptyParams } from '../utils/semantics.utils';
import { defaultTranslations } from '../constants/defaultTranslations';
import {
  H5P,
  normalizeArrowDialogAudioPaths,
  normalizeArrowItemPaths,
  normalizeDialogAudioPaths,
  normalizeGridBackgroundImagePath,
  normalizeSizes,
  normalizeTopicMapItemPaths,
} from './H5P.util';

export class H5PWrapper extends H5P.EventDispatcher implements IH5PContentType {
  public containerElement: HTMLElement | undefined;

  private wrapper: HTMLElement;

  private isIPhoneFullscreenActive: boolean;

  private toggleIPhoneFullscreen: () => void;

  private observer: IntersectionObserver;

  private root: Root;

  public contentId: string;

  public params: Required<Params>;

  private title: string | undefined;

  private l10n: Record<string, string>;

  /** Body overflow value from before iPhone fullscreen, if we changed it. */
  private savedBodyOverflow: string | undefined;

  constructor(params: Params, contentId: string, extras?: H5PExtras) {
    super();

    this.isIPhoneFullscreenActive = false;

    this.toggleIPhoneFullscreen = () => {
      this.isIPhoneFullscreenActive = !this.isIPhoneFullscreenActive;
      if (this.isIPhoneFullscreenActive) {
        this.savedBodyOverflow = document.body.style.overflow;
      }
      document.body.style.overflow = this.isIPhoneFullscreenActive
        ? 'hidden'
        : this.savedBodyOverflow ?? 'auto';
      const topicMapContainer = document.querySelector('.h5p-topic-map');
      if (this.isIPhoneFullscreenActive) {
        topicMapContainer?.classList.add('iPhoneFullscreenStyle');
      }
      else {
        topicMapContainer?.classList.remove('iPhoneFullscreenStyle');
      }
    };

    this.wrapper = H5PWrapper.createWrapperElement();

    let paramsWithFallbacks: Required<Params> = {
      ...getEmptyParams(),
      ...params,
    };
    paramsWithFallbacks = normalizeTopicMapItemPaths(paramsWithFallbacks, contentId);
    paramsWithFallbacks = normalizeArrowItemPaths(paramsWithFallbacks, contentId);
    paramsWithFallbacks = normalizeGridBackgroundImagePath(paramsWithFallbacks, contentId);
    paramsWithFallbacks = normalizeDialogAudioPaths(paramsWithFallbacks, contentId);
    paramsWithFallbacks = normalizeArrowDialogAudioPaths(paramsWithFallbacks, contentId);
    paramsWithFallbacks = normalizeSizes(paramsWithFallbacks);

    this.contentId = contentId;
    this.params = paramsWithFallbacks;
    this.l10n = sanitizeRecord({ ...defaultTranslations, ...params.l10n });
    this.title = extras?.metadata.title;

    this.on('enterFullScreen', () => {
      setTimeout(() => {
        this.trigger('resize');
      }, 250); // DOM might need time to change size
    });

    this.on('exitFullScreen', () => {
      this.trigger('resize');
      setTimeout(() => {
        this.trigger('resize');
      }, 250); // DOM might need time to change size
    });

    // The React tree is rendered exactly once; it is only ever updated
    // through React's own state. 'resize' is a plain notification that
    // components subscribe to via stable, single subscriptions.
    this.root = createRoot(this.wrapper);
    this.root.render(
      <ContentIdContext.Provider value={this.contentId}>
        <L10nContext.Provider value={this.l10n}>
          <H5PContext.Provider value={this}>
            <App
              params={this.params}
              title={this.title}
              // TODO: Check if this is still required
              toggleIPhoneFullscreen={this.toggleIPhoneFullscreen}
              instance={this}
            />
          </H5PContext.Provider>
        </L10nContext.Provider>
      </ContentIdContext.Provider>,
    );

    // React components require 'resize' once the H5P container is attached
    // to the DOM. `threshold: 0` instead of `[1]`: the container only needs
    // to be *partially* visible. A tall container never reaches 100%
    // intersection in a short viewport/iframe, so `[1]` would keep the
    // observer silent — and the map blank — until some resize event.
    // TODO: Use common onceVisible helper function
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.observer.unobserve(this.containerElement as Element); // Only need instantiate once.
          window.requestAnimationFrame(() => {
            this.trigger('resize');
          });
        }
      },
      {
        root: document.documentElement,
        threshold: 0,
      },
    );
  }

  /**
   * Toggle fullscreen button.
   */
  handleToggleFullscreen(): void {
    if (!this.containerElement) {
      return;
    }

    const newState = !H5P?.isFullscreen;
    if (newState === true) {
      H5P?.fullScreen(H5P.jQuery(this.containerElement), this);
    }
    else {
      H5P?.exitFullScreen();
    }
  }

  /**
   * Remove everything this content type added.
   */
  destroy(): void {
    this.root.unmount();
    this.observer.disconnect();
    this.off('resize');
    this.off('enterFullScreen');
    this.off('exitFullScreen');

    if (this.isIPhoneFullscreenActive) {
      document.body.style.overflow = this.savedBodyOverflow ?? 'auto';
      this.isIPhoneFullscreenActive = false;
    }
  }

  attach($container: JQuery<HTMLElement>): void {
    this.containerElement = $container.get(0);
    if (!this.containerElement) {
      console.error(
        'Found no containing element to attach `h5p-topic-map` to.',
      );
      return;
    }

    this.containerElement.appendChild(this.wrapper);
    this.containerElement.classList.add('h5p-topic-map');

    this.observer.observe(this.containerElement as Element);
  }

  // TODO: What is this good for?! Overengineering
  private static createWrapperElement(): HTMLDivElement {
    return document.createElement('div');
  }
}
