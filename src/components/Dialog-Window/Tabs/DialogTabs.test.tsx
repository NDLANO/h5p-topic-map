import { render } from "@testing-library/react";
import * as React from "react";
import { DialogTabs } from "./DialogTabs";

describe(DialogTabs.name, () => {
  it("should have rendered.", () => {
    const tabs = render(
      <DialogTabs
        tabContents={[
          { title: "Text", content: <h1>Content for text goes here!</h1> },
        ]}
      />,
    ).container;

    expect(tabs.querySelector("div")).toBeTruthy();
  });
});
