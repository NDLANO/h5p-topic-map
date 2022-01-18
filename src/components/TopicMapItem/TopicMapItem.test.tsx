import { render } from "@testing-library/react";
import * as React from "react";
import { TopicMapItem } from "./TopicMapItem";

describe(TopicMapItem.name, () => {
  it("should render", () => {
    const topicMapItem = render(
      <TopicMapItem backgroundImage={{ path: "", alt: "" }} title="Title" />,
    ).container;

    expect(topicMapItem.querySelector("button")).toBeTruthy();
  });
});
