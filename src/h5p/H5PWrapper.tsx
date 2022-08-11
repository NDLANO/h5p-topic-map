import type { H5PExtras, IH5PContentType } from "h5p-types";
import * as React from "react";
import { render } from "react-dom";
import { App } from "../components/App/App";
import { ContentIdContext } from "../contexts/ContentIdContext";
import { H5PContext } from "../contexts/H5PContext";
import { LocalizationContext } from "../contexts/LocalizationContext";
import { Params } from "../types/Params";
import { Translations } from "../types/Translations";
import { getEmptyParams } from "../utils/semantics.utils";
import {
  H5P,
  normalizeArrowDialogAudioPaths,
  normalizeArrowItemPaths,
  normalizeDialogAudioPaths,
  normalizeGridBackgroundImagePath,
  normalizeSizes,
  normalizeTopicMapItemPaths,
} from "./H5P.util";

export class H5PWrapper extends H5P.EventDispatcher implements IH5PContentType {
  public containerElement: HTMLElement|undefined;

  private wrapper: HTMLElement;

  private isIPhoneFullscreenActive: boolean;

  private toggleIPhoneFullscreen: () => void;

  constructor(params: Params, contentId: string, extras?: H5PExtras) {
    super();

    this.isIPhoneFullscreenActive = false;

    this.toggleIPhoneFullscreen = () => {
      this.isIPhoneFullscreenActive = !this.isIPhoneFullscreenActive;
      document.body.style.overflow = this.isIPhoneFullscreenActive
        ? "hidden"
        : "auto";
      const topicMapContainer = document.querySelector(".h5p-topic-map");
      if (this.isIPhoneFullscreenActive) {
        topicMapContainer?.classList.add("iPhoneFullscreenStyle");
      } else {
        topicMapContainer?.classList.remove("iPhoneFullscreenStyle");
      }
    };

    this.wrapper = H5PWrapper.createWrapperElement();

    let paramsWithFallbacks: Required<Params> = {
      ...getEmptyParams(),
      ...params,
    };

    paramsWithFallbacks = normalizeTopicMapItemPaths(
      paramsWithFallbacks,
      contentId,
    );

    paramsWithFallbacks = normalizeArrowItemPaths(
      paramsWithFallbacks,
      contentId,
    );

    paramsWithFallbacks = normalizeGridBackgroundImagePath(
      paramsWithFallbacks,
      contentId,
    );

    paramsWithFallbacks = normalizeDialogAudioPaths(
      paramsWithFallbacks,
      contentId,
    );

    paramsWithFallbacks = normalizeArrowDialogAudioPaths(
      paramsWithFallbacks,
      contentId,
    );

    paramsWithFallbacks = normalizeSizes(paramsWithFallbacks);

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const l10n = params.l10n ?? ({} as Translations);
    const title = extras?.metadata.title;

    /*
     * Trick components to rerender after resize.
     * Instead of using a the resize observer, one would normally simply listen
     * to the `resize` event dispatched by H5P and call components to
     * resize.
     */
    const trickReactResizeObserver = (): void => {
      if (!this.containerElement) {
        return;
      }

      this.containerElement.style.width = '100.01%';
      setTimeout(() => {
        if (!this.containerElement) {
          return;
        }

        this.containerElement.style.width = '';
      }, 0);
    }

    this.on('enterFullScreen', () => {
      setTimeout(() => {
        trickReactResizeObserver();
      }, 250); // DOM might need time to change size
    });

    this.on('exitFullScreen', () => {
      setTimeout(() => {
        trickReactResizeObserver();
      }, 250); // DOM might need time to change size
    });

    render(
      <ContentIdContext.Provider value={contentId}>
        <LocalizationContext.Provider value={l10n}>
          <H5PContext.Provider value={this}>
            <App
              params={paramsWithFallbacks}
              title={title}
              toggleIPhoneFullscreen={this.toggleIPhoneFullscreen}
            />
          </H5PContext.Provider>
        </LocalizationContext.Provider>
      </ContentIdContext.Provider>,
      this.wrapper,
    );
  }

  /**
   * Toggle fullscreen button.
   * @param {string|boolean} state enter|false for enter, exit|true for exit.
   */
  handleToggleFullscreen(state?: string|boolean): void {
    if (!this.containerElement) {
      return;
    }

    let newState: boolean|undefined;
    if (typeof state === 'string') {
      if (state === 'enter') {
        newState = false;
      }
      else if (state === 'exit') {
        newState = true;
      }
    }

    if (typeof newState !== 'boolean') {
      newState = !H5P.isFullscreen;
    }

    if (newState === true) {
      H5P.fullScreen(H5P.jQuery(this.containerElement), this);
    }
    else {
      H5P.exitFullScreen();
    }
  };

  attach($container: JQuery<HTMLElement>): void {
    this.containerElement = $container.get(0);
    if (!this.containerElement) {
      console.error(
        "Found no containing element to attach `h5p-topic-map` to.",
      );
      return;
    }

    this.containerElement.appendChild(this.wrapper);
    this.containerElement.classList.add("h5p-topic-map");
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}
