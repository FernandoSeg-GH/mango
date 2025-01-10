import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Handle from "@/components/range/handle";

describe("Handle Component", () => {
    test("calls onDrag when dragged", () => {
        const onDrag = jest.fn();

        render(
            <div style={{ position: "relative", width: "500px" }}>
                <Handle
                    value={50}
                    min={0}
                    max={100}
                    index={0}
                    onDrag={onDrag}
                    hoveredHandle={null}
                    setHoveredHandle={jest.fn()}
                />
            </div>
        );

        const handle = screen.getByRole("slider");

        fireEvent.mouseDown(handle, { clientX: 100 });
        fireEvent.mouseMove(document, { clientX: 200 });
        fireEvent.mouseUp(document);

        expect(onDrag).toHaveBeenCalled();
        expect(onDrag).toHaveBeenCalledWith(expect.any(Number), 0);
    });
});
