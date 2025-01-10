"use client";

import React, { useState, useCallback } from "react";

import Price from "./price";
import Handle from "./handle";
import Slider from "./slider";

export type RangeProps = {
    min: number;
    max: number;
    isFixed?: boolean;
    fixedValues?: number[];
};

const Range: React.FC<RangeProps> = ({
    min,
    max,
    isFixed = false,
    fixedValues = [],
}) => {
    const [handle1, setHandle1] = useState(min);
    const [handle2, setHandle2] = useState(max);
    const [hoveredHandle, setHoveredHandle] = useState<number | null>(null);
    const [maxError, setMaxError] = useState<string | null>(null);
    const [minError, setMinError] = useState<string | null>(null);

    const clamp = (value: number) => Math.max(min, Math.min(max, value));

    const getClosestFixedValue = useCallback(
        (value: number) => {
            if (!fixedValues.length) return value;
            return fixedValues.reduce((prev, curr) =>
                Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
            );
        },
        [fixedValues]
    );

    const handleDrag = (value: number, index: number) => {
        value = clamp(value);
        if (isFixed) value = getClosestFixedValue(value);

        if (index === 0 && value <= handle2) {
            setHandle1(value);
            if (minError && value < handle2) setMinError(null);
        } else if (index === 1 && value >= handle1) {
            setHandle2(value);
            if (maxError && value > handle1) setMaxError(null);
        }
    };

    return (
        <div className="relative w-full sm:max-w-[80%] mx-auto md:max-w-md" role="region" aria-labelledby="range-slider-title">
            <h2 id="range-slider-title" className="sr-only">Range Selector</h2>

            <div className="mb-6">
                <Slider min={min} max={max} handle1={handle1} handle2={handle2} />

                {[handle1, handle2].map((handle, index) => (
                    <Handle
                        key={index}
                        value={handle}
                        min={min}
                        max={max}
                        index={index}
                        onDrag={handleDrag}
                        hoveredHandle={hoveredHandle}
                        setHoveredHandle={setHoveredHandle}
                        aria-label={`Handle ${index + 1}, value: ${handle}`}
                    />
                ))}
            </div>
            <div className="flex flex-col 2xs:flex-row justify-between mt-4 gap-4">
                <Price
                    label="Min Value"
                    value={handle1}
                    onChange={(e) => {
                        const value = clamp(Number(e.target.value));
                        setMinError(null);
                        if (value <= handle2) setHandle1(value);
                    }}
                    onBlur={() => {
                        if (handle1 >= handle2) {
                            setHandle1(handle2);
                            setMinError("Min Price cannot be greater than Max Price");
                        } else {
                            setMinError(null);
                        }
                    }}
                    error={minError}
                    isFixed={isFixed}
                    aria-describedby="min-error"
                />

                <Price
                    label="Max Value"
                    value={handle2}
                    onChange={(e) => {
                        const value = clamp(Number(e.target.value));
                        setMaxError(null);
                        setHandle2(value);
                    }}
                    onBlur={() => {
                        if (handle2 <= handle1) {
                            setHandle2(handle1);
                            setMaxError("Max Price cannot be less than Min Price");
                        } else {
                            setMaxError(null);
                        }
                    }}
                    error={maxError}
                    isFixed={isFixed}
                    aria-describedby="max-error"
                />
            </div>
        </div>

    );
};

export default Range