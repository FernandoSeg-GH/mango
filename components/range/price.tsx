"use client";

import React from "react";

interface PriceProps {
    label: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    error?: string | null;
    isFixed?: boolean;
}

const Price: React.FC<PriceProps> = ({
    label,
    value,
    onChange,
    onBlur,
    error,
    isFixed,
}) => {
    return (
        <div className={`flex flex-col ${error ? "items-end" : "items-center"}`}>
            <label htmlFor={`price-input-${label}`} className="text-sm text-gray-500">
                {label}
            </label>
            {isFixed ? (
                <span id={`price-input-${label}`} className="w-20 p-2 rounded text-center">
                    {value.toFixed(2)} €
                </span>
            ) : (
                <>
                    <input
                        id={`price-input-${label}`}
                        type="number"
                        step="1"
                        className={`w-full 2xs:w-20 p-2 border rounded text-center ${error ? "border-red-500" : "border-gray-300"}`}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={!!error}
                        aria-describedby={`${label.toLowerCase()}-error`}
                    />
                </>
            )}
            <div id={`${label.toLowerCase()}-error`} className="h-5 mt-1">
                {error ? <span className="text-red-500 text-sm">{error}</span> : "\u00A0"}
            </div>
        </div>
    );
};

export default Price;
