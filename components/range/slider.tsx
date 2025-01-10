interface SliderProps {
    min: number;
    max: number;
    handle1: number;
    handle2: number;
}

const Slider: React.FC<SliderProps> = ({ min, max, handle1, handle2 }) => {
    return (
        <div className="relative w-full h-2 bg-gray-300 rounded-full">
            <div
                className="absolute h-2 bg-black rounded-full"
                style={{
                    left: `${((handle1 - min) / (max - min)) * 100}%`,
                    width: `${((handle2 - handle1) / (max - min)) * 100}%`,
                }}
            />
        </div>
    );
};

export default Slider