"use client";

type ErrorMessageProps = {
    message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center h-full grow">
            <h1 className="text-xl font-semibold mb-4">Exercise 1: Range Component</h1>
            <p className="text-red-500 font-medium">{message}</p>
            <button
                onClick={handleRetry}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Retry
            </button>
        </div>
    );
}
