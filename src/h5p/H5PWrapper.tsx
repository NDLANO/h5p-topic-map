import type { H5PExtras, IH5PContentType } from 'h5p-types';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { L10nContext } from 'use-h5p';
import { Content } from '../components/Content/Content';
import { ContentIdContext } from '../contexts/ContentIdContext';
import { H5PContext } from '../contexts/H5PContext';
import { Params } from '../types/Params';
import { callOnceVisible, sanitizeRecord } from '../utils/h5p.utils';
import { defaultTheme, getSemanticsDefaults } from '../utils/semantics.utils';
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

  private observer: IntersectionObserver | undefined;

  private root: Root | undefined;

  public contentId: string;

  public isVisible: boolean;

  public params: Required<Params>;

  public extras: H5PExtras | undefined;

  private title: string | undefined;

  private l10n: Record<string, string>;

  constructor(params: Params, contentId: string, extras?: H5PExtras) {
    super();

    // Defaults come from semantics.json (single source of truth); l10n merges per key so older content keeps working.
    const defaults = getSemanticsDefaults();
    let paramsWithFallbacks = {
      ...defaults,
      ...params,
      l10n: {
        ...(defaults.l10n as Record<string, string>),
        ...params.l10n,
      },
    } as Required<Params>;

    paramsWithFallbacks = normalizeTopicMapItemPaths(paramsWithFallbacks, contentId);
    paramsWithFallbacks = normalizeArrowItemPaths(paramsWithFallbacks, contentId);
    paramsWithFallbacks = normalizeGridBackgroundImagePath(paramsWithFallbacks, contentId);
    paramsWithFallbacks = normalizeDialogAudioPaths(paramsWithFallbacks, contentId);
    paramsWithFallbacks = normalizeArrowDialogAudioPaths(paramsWithFallbacks, contentId);
    paramsWithFallbacks = normalizeSizes(paramsWithFallbacks);

    this.contentId = contentId;
    this.params = paramsWithFallbacks;
    this.l10n = sanitizeRecord(this.params.l10n);
    this.extras = extras;
    this.title = extras?.metadata.title;
    this.isVisible = false;

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
  }

  /**
   * Workaround for H5P core mutating prototype to inject isRoot, but ES6 inheritance here.
   * @returns {boolean} True, if content type is root. Else false.
   */
  isRoot(): boolean {
    return !!this.extras?.standalone;
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
    this.root?.unmount();
    this.observer?.disconnect();
    this.off('resize');
    this.off('enterFullScreen');
    this.off('exitFullScreen');
  }

  attach($container: JQuery<HTMLElement>): void {
    this.containerElement = $container.get(0);
    if (!this.containerElement) {
      console.error(
        'Found no containing element to attach `h5p-topic-map` to.',
      );
      return;
    }

    this.containerElement.classList.add('h5p-topic-map');
    this.containerElement.classList.add(
      `h5p-topic-map-theme-${this.params.topicMap?.colorTheme ?? defaultTheme}`,
    );

    // React tree renders once directly into H5P container; 'resize' notifies subscribed components.
    this.root = createRoot(this.containerElement);
    this.root.render(
      <ContentIdContext.Provider value={this.contentId}>
        <L10nContext.Provider value={this.l10n}>
          <H5PContext.Provider value={this}>
            <Content
              navbarTitle={this.title ?? ''}
              params={this.params}
            />
          </H5PContext.Provider>
        </L10nContext.Provider>
      </ContentIdContext.Provider>,
    );

    // Fire 'resize' once container is visible.
    callOnceVisible(this.containerElement, () => {
      window.requestAnimationFrame(() => {
        this.trigger('resize');
        this.isVisible = true;
        this.trigger('visible');
      });
    }, {
      root: document.documentElement,
      threshold: 0,
    }).then((observer) => {
      this.observer = observer;
    });
  }
}
