"use client";

import * as RadixSlider from "@radix-ui/react-slider";
import { twMerge } from "tailwind-merge";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
      className={twMerge(
        "relative",
        "flex items-center",
        "w-full h-10",
        "select-none touch-none"
      )}
    >
      <RadixSlider.Track
        className={twMerge(
          "relative",
          "grow",
          "h-[3px]",
          "rounded-full",
          "bg-neutral-600"
        )}
      >
        <RadixSlider.Range
          className={twMerge("absolute", "h-full", "rounded-full", "bg-white")}
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
