import { getFixedRange } from "@/actions/getData";
import Range from "@/components/range";
import ErrorMessage from "@/components/ui/error";

export default async function Exercise2() {
    try {
        const rangeValues = await getFixedRange();

        if (!rangeValues.fixedValues?.length) {
            return (
                <div className="flex flex-col items-center justify-center h-full grow">
                    <h1 className="text-xl font-semibold mb-4">Exercise 2: Fixed Range Component</h1>
                    <p className="text-gray-500">No fixed range values available.</p>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center h-full grow">
                <h1 className="text-xl font-semibold mb-4">Exercise 2: Fixed Range Component</h1>
                <Range
                    min={rangeValues.min}
                    max={rangeValues.max}
                    isFixed
                    fixedValues={rangeValues.fixedValues}
                />
            </div>
        );
    } catch (error) {
        return (
            <ErrorMessage
                message={(error as Error).message || "An unexpected error occurred"}
            />
        );
    }
}
