import { getRange } from "@/actions/getData";
import Range from "@/components/range";
import ErrorMessage from "@/components/ui/error";

export default async function Exercise1() {
    try {
        const rangeValues = await getRange();

        return (
            <div className="flex flex-col items-center justify-center h-full grow">
                <h1 className="text-xl font-semibold mb-4">
                    Exercise 1: Range Component
                </h1>
                <Range min={rangeValues.min} max={rangeValues.max} />
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
