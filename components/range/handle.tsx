import { clamp } from "@/lib"

interface HandleProps {
    value: number;
    min: number;
    max: number;
    index: number;
    onDrag: (value: number, index: number) => void;
    hoveredHandle: number | null;
    setHoveredHandle: (index: number | null) => void;
}


const Handle: React.FC<HandleProps> = ({
    value,
    min,
    max,
    index,
    onDrag,
    hoveredHandle,
    setHoveredHandle,
}) => {
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const slider = e.currentTarget.parentElement!;
        const rect = slider.getBoundingClientRect();

        const onMouseMove = (event: MouseEvent) => {
            const newValue =
                min +
                Math.round(((event.clientX - rect.left) / rect.width) * (max - min));
            onDrag(clamp(newValue, min, max), index);
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const slider = e.currentTarget.parentElement!;
        const rect = slider.getBoundingClientRect();

        const onTouchMove = (event: TouchEvent) => {
            const touch = event.touches[0];
            const newValue =
                min +
                Math.round(((touch.clientX - rect.left) / rect.width) * (max - min));
            onDrag(clamp(newValue, min, max), index);
        };

        const onTouchEnd = () => {
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
        };

        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onTouchEnd);
    };

    return (
        <div
            role="slider"
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-label={`Value: ${value}`}
            tabIndex={0}
            className={`absolute w-6 h-6 bg-white border-2 border-black rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${hoveredHandle === index ? "scale-110" : "scale-100"} transition-transform ease-in duration-200`}
            style={{
                left: `${((value - min) / (max - min)) * 100}%`,
                top: "23.5%",
            }}
            onMouseEnter={() => setHoveredHandle(index)}
            onMouseLeave={() => setHoveredHandle(null)}
            onKeyDown={(e) => {
                const step = (max - min) / 10;
                if (e.key === "ArrowRight" || e.key === "ArrowUp") onDrag(clamp(value + step, min, max), index);
                if (e.key === "ArrowLeft" || e.key === "ArrowDown") onDrag(clamp(value - step, min, max), index);
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        />
    );
};

export default Handle;
