import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Range, { RangeProps } from "@/components/range";

describe("Range Component", () => {
    function setup(props: RangeProps) {
        return render(<Range {...props} />);
    }

    test("renders two handles and their respective inputs", () => {
        setup({ min: 1, max: 100 });
        expect(screen.getAllByRole("slider")).toHaveLength(2);
        expect(screen.getByLabelText(/min value/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/max value/i)).toBeInTheDocument();
    });

    test("prevents min handle from exceeding max handle", () => {
        setup({ min: 1, max: 100 });
        const minInput = screen.getByLabelText(/min value/i);

        fireEvent.change(minInput, { target: { value: "120" } });
        fireEvent.blur(minInput);

        expect(minInput).toHaveValue(100);
    });

    test("renders fixed values as read-only when isFixed is true", () => {
        setup({
            min: 1.99,
            max: 70.99,
            isFixed: true,
            fixedValues: [1.99, 10.99, 30.99, 70.99],
        });

        expect(screen.getByText("1.99 €")).toBeInTheDocument();
        expect(screen.getByText("70.99 €")).toBeInTheDocument();
        expect(screen.queryAllByRole("spinbutton")).toHaveLength(0);
    });
});
