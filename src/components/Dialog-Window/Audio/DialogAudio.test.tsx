import { render } from "@testing-library/react";
import * as React from "react";
import { DialogAudio } from "./DialogAudio";

describe(DialogAudio.name, () => {
  it("should have rendered", () => {
    const audio = render(
      <DialogAudio audioTrack={{ path: "" }} subText={<></>} description="" />,
    ).container;

    expect(audio.querySelector("audio"));
    expect(audio.querySelector("p"));
  });
});
