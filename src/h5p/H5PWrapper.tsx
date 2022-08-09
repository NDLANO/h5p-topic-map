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

  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-topic-map` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-topic-map");
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}
