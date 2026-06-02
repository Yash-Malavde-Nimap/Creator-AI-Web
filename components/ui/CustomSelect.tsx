"use client";

import ReactSelect, { type StylesConfig, type SingleValue } from "react-select";

export interface SelectOption {
  label: string;
  value: string;
}

export type SelectVariant = "filled" | "outlined";

interface CustomSelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  variant?: SelectVariant;
  className?: string;
}

function buildStyles(variant: SelectVariant): StylesConfig<SelectOption, false> {
  const isFilled = variant === "filled";

  return {
    control: (base) => ({
      ...base,
      background: isFilled ? "#F5F5F5" : "transparent",
      border: isFilled ? "none" : "1.5px solid rgba(100, 150, 220, 0.35)",
      boxShadow: "none",
      borderRadius: "999px",
      minHeight: "36px",
      paddingLeft: "8px",
      paddingRight: "4px",
      cursor: "pointer",
      "&:hover": {
        borderColor: isFilled ? "transparent" : "rgba(100, 150, 220, 0.6)",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 4px",
    }),
    singleValue: (base) => ({
      ...base,
      color: isFilled ? "#9E9E9E" : "#D7E2FF",
      fontSize: "14px",
      fontWeight: 500,
    }),
    placeholder: (base) => ({
      ...base,
      color: isFilled ? "#9E9E9E" : "rgba(215, 226, 255, 0.5)",
      fontSize: "14px",
      fontWeight: 500,
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({
      ...base,
      color: isFilled ? "#6B6B6B" : "#9ABBFF",
      padding: "0 8px 0 2px",
      "&:hover": { color: isFilled ? "#6B6B6B" : "#9ABBFF" },
    }),
    menu: (base) => ({
      ...base,
      background: isFilled ? "#F5F5F5" : "#0A152F",
      borderRadius: "16px",
      boxShadow: isFilled
        ? "0 4px 20px rgba(0,0,0,0.12)"
        : "0 4px 24px rgba(0,0,0,0.5)",
      overflow: "hidden",
      border: isFilled ? "none" : "1px solid rgba(100, 150, 220, 0.2)",
    }),
    menuList: (base) => ({
      ...base,
      padding: "4px",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      background: isFilled
        ? isSelected ? "#E0E0E0" : isFocused ? "#EBEBEB" : "transparent"
        : isSelected ? "rgba(100, 150, 220, 0.2)" : isFocused ? "rgba(100, 150, 220, 0.1)" : "transparent",
      color: isFilled ? "#333333" : "#D7E2FF",
      fontSize: "14px",
      fontWeight: 500,
      borderRadius: "12px",
      cursor: "pointer",
      padding: "8px 12px",
    }),
  };
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select",
  variant = "filled",
  className,
}: CustomSelectProps) {
  const selected = options.find((o) => o.value === value) ?? null;

  const handleChange = (opt: SingleValue<SelectOption>) => {
    if (opt) onChange?.(opt.value);
  };

  return (
    <div className={className}>
      <ReactSelect
        options={options}
        value={selected}
        onChange={handleChange}
        placeholder={placeholder}
        styles={buildStyles(variant)}
        isSearchable={false}
        instanceId={`custom-select-${variant}`}
      />
    </div>
  );
}
