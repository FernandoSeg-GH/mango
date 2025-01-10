import React from "react";
import { render } from "@testing-library/react";
import Slider from "@/components/range/slider";

describe("Slider Component", () => {
    test("renders the range bar with correct styles", () => {
        const { container } = render(
            <Slider min={0} max={100} handle1={25} handle2={75} />
        );

        const rangeBar = container.querySelector("div > div");
        expect(rangeBar).toHaveStyle("left: 25%; width: 50%;");
    });

    test("does not render if min equals max", () => {
        const { container } = render(<Slider min={50} max={50} handle1={50} handle2={50} />);
        expect(container.firstChild).toBeNull();
    });
});
