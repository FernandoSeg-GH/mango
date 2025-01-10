import React from "react";
import { render, screen } from "@testing-library/react";
import Price from "@/components/range/price";

describe("Price Component", () => {
    test("renders a number input by default", () => {
        render(
            <Price
                label="Min Value"
                value={50}
                onChange={jest.fn()}
                onBlur={jest.fn()}
            />
        );

        expect(screen.getByLabelText(/min value/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/min value/i)).toHaveValue(50);
    });

    test("renders as read-only if isFixed is true", () => {
        render(
            <Price
                label="Fixed Value"
                value={1.99}
                onChange={jest.fn()}
                onBlur={jest.fn()}
                isFixed={true}
            />
        );

        expect(screen.getByText("1.99 €")).toBeInTheDocument();
        expect(screen.queryByRole("spinbutton")).toBeNull();
    });

    test("displays an error message if error is passed", () => {
        render(
            <Price
                label="Max Value"
                value={100}
                onChange={jest.fn()}
                onBlur={jest.fn()}
                error="Max Value cannot exceed limit"
            />
        );

        expect(screen.getByText(/max value cannot exceed limit/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/max value/i)).toHaveAttribute(
            "aria-invalid",
            "true"
        );
    });
});
