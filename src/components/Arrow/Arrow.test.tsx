import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { ArrowType } from "../../types/ArrowType";
import { Arrow } from "./Arrow";

describe(Arrow.name, () => {
  it("should have a body and an arrow head if the arrow is directional.", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        type={ArrowType.Directional}
        notes=""
        completed={false}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(5);
  });

  it("should add two arrow heads if the arrow is bidirectional.", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        type={ArrowType.BiDirectional}
        notes=""
        completed={false}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(6);
  });

  it("should only have one svg, the arrow body, if the arrow is nondirectional.", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        type={ArrowType.NonDirectional}
        notes=""
        completed={false}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(4);
  });

  it("should show a button while hovered over when it is nondirectional.", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        type={ArrowType.NonDirectional}
        notes=""
        completed={false}
      />,
    ).container;

    fireEvent.mouseOver(screen.getByTestId("ndArrow"));
    expect(arrow.querySelectorAll("svg").length).toBe(4);
  });

  it("should show a button while hovered over when it is directional.", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        type={ArrowType.Directional}
        notes=""
        completed={false}
      />,
    ).container;

    fireEvent.mouseOver(screen.getByTestId("dArrow"));
    expect(arrow.querySelectorAll("svg").length).toBe(5);
  });

  it("should render button when completed when it is nondirectional.", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        type={ArrowType.NonDirectional}
        notes=""
        completed
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(4);
  });

  it("should render button when completed when it is directional.", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        type={ArrowType.Directional}
        notes=""
        completed
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(5);
  });

  it("should render button when completed when it is bidirectional.", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        type={ArrowType.BiDirectional}
        notes=""
        completed
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(6);
  });
});
