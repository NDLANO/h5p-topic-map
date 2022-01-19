import { render } from "@testing-library/react";
import * as React from "react";
import { DialogVideo } from "./DialogVideo";

describe(DialogVideo.name, () => {
  it("should have rendered", () => {
    const video = render(
      <DialogVideo video={{ path: "" }} description="" />,
    ).container;

    expect(video.querySelector("video"));
    expect(video.querySelector("p"));
  });
});
