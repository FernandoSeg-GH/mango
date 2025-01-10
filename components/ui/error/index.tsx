"use client";

type ErrorMessageProps = {
    title: string
    message: string;
};

export default function ErrorMessage({ title, message }: ErrorMessageProps) {
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div
            className="flex flex-col items-center justify-center h-full grow"
            role="alert"
            aria-live="assertive"
        >
            <h1
                id="error-message-title"
                className="text-xl font-semibold mb-4"
            >
                {title}
            </h1>
            <p
                id="error-message"
                className="text-red-500 font-medium"
            >
                {message}
            </p>
            <button
                onClick={handleRetry}
                className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black border transition-all ease-in font-semibold"
                aria-labelledby="error-message-title error-message"
            >
                Retry
            </button>
        </div>
    );
}
