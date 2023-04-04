import * as React from "react";
import { FC } from "react";
import { H5P } from "h5p-utils";
import { IH5PContentType, H5PEvent } from "h5p-types";
import { useContentId } from "../../hooks/useContentId";
import { useSizeClassNames } from "../../hooks/useSizeClassNames";
import { TopicMapSubcontentType } from "../../types/TopicMapSubcontentType";
import styles from "./TopicMapSubcontent.module.scss";

export type TopicMapSubcontentProps = {
  item: TopicMapSubcontentType;
  rootInstance: IH5PContentType;
};

export const TopicMapSubcontent: FC<TopicMapSubcontentProps> = ({
  item,
  rootInstance,
}) => {
  const contentId = useContentId();
  const sizeClassNames = useSizeClassNames(styles);

  const [contentInstance, setInstance] =
    React.useState<IH5PContentType | null>();

  // Bubble H5P events from child to parent
  const bubbleUp = (
    origin: IH5PContentType,
    eventName: string,
    target: IH5PContentType & { bubblingUpwards?: boolean },
  ): void => {
    origin.on(eventName, (event: H5PEvent): void => {
      const targetReference = target; // Avoiding parameter mutation

      // Prevent target from sending event back down
      targetReference.bubblingUpwards = true;

      // Trigger event
      target.trigger(eventName, event);

      // Reset
      targetReference.bubblingUpwards = false;
    });
  };

  // Bubble H5P events from parent to children
  const bubbleDown = (
    origin: IH5PContentType & { bubblingUpwards?: boolean },
    eventName: string,
    targets: Array<IH5PContentType>,
  ): void => {
    origin.on(eventName, (event: H5PEvent): void => {
      if (origin.bubblingUpwards) {
        return; // Prevent send event back down.
      }

      for (let i = 0; i < targets.length; i += 1) {
        targets[i].trigger(eventName, event);
      }
    });
  };

  // Build H5P library instance
  const buildLibrary = (contentRef: HTMLDivElement | null): void => {
    if (item.subcontent && contentRef && contentInstance === undefined) {
      const subcontentInstance = H5P.newRunnable(
        item.subcontent,
        contentId,
        H5P.jQuery(contentRef),
        false,
      ) as unknown as IH5PContentType;

      setInstance(subcontentInstance);

      if (!subcontentInstance) {
        return;
      }

      // Resize parent when children resize
      bubbleUp(subcontentInstance, "resize", rootInstance);

      // Resize children to fit inside parent
      bubbleDown(rootInstance, "resize", [subcontentInstance]);
    }
  };

  return (
    <div
      className={[styles.topicMapSubcontentContainer, sizeClassNames].join(" ")}
    >
      <div ref={element => buildLibrary(element)} />
    </div>
  );
};
