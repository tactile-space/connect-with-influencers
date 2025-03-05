
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  defaultValue?: [number, number];
  formatValue?: (value: number) => string;
  onChange?: (values: [number, number]) => void;
  className?: string;
}

const RangeSlider = ({
  label,
  min,
  max,
  step = 1,
  defaultValue = [min, max],
  formatValue = (value) => value.toString(),
  onChange,
  className,
}: RangeSliderProps) => {
  const [values, setValues] = useState<[number, number]>(defaultValue);

  const handleChange = (newValues: number[]) => {
    const typedValues: [number, number] = [newValues[0], newValues[1]];
    setValues(typedValues);
    onChange?.(typedValues);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <div className="flex items-center text-sm font-medium text-muted-foreground">
          <span>{formatValue(values[0])}</span>
          <span className="mx-1">-</span>
          <span>{formatValue(values[1])}</span>
        </div>
      </div>
      <Slider
        defaultValue={values}
        min={min}
        max={max}
        step={step}
        onValueChange={handleChange}
        className="[&>span:first-child]:h-1.5"
      />
    </div>
  );
};

export default RangeSlider;
