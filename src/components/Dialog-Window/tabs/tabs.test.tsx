import { render } from "@testing-library/react";
import * as React from "react";
import { Tabs } from "./tabs";


describe(Tabs.name, () => {
  it("should have rendered.", () => {
  const tabs = render(
    <Tabs tabContents={[{ title: "Text", content: <h1>Content for text goes here!</h1> }]} />
  ).container;

  expect(tabs.querySelector("div")).toBeTruthy();
  });
})