import { render } from "@testing-library/react";
import * as React from "react";
import { TopicMapItem } from "./TopicMapItem";

describe(TopicMapItem.name, () => {
  it("should render", () => {
    const topicMapItem = render(
      <TopicMapItem
        id="1"
        backgroundImage={{ path: "", alt: "" }}
        title="Title"
        editAction={() => {
          /* Intentionally left empty */
        }}
      />,
    ).container;

    expect(topicMapItem.querySelector("button")).toBeTruthy();
  });
});
