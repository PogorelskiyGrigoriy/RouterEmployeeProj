import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";
import { Field } from "@/components/ui/field";
import type { UseFormRegisterReturn } from "react-hook-form";
import { DEPARTMENTS_LIST } from "@/models/Departments";

interface DepartmentSelectProps {
  variant?: "form" | "filter";
  registration: UseFormRegisterReturn;
  errorText?: string;
  helperText?: string;
}

export const DepartmentSelect = ({ 
  variant = "form", 
  registration, 
  errorText, 
  helperText 
}: DepartmentSelectProps) => {
  
  const isFilter = variant === "filter";
  const label = isFilter ? undefined : "Department";
  const placeholder = isFilter ? "All Departments" : "Select department...";
  const emptyValue = isFilter ? "All" : "";

  return (
    <Field 
      label={label} 
      invalid={!!errorText} 
      errorText={errorText}
      helperText={helperText}
    >
      <NativeSelectRoot>
        <NativeSelectField {...registration}>
          <option value={emptyValue}>{placeholder}</option>
          {DEPARTMENTS_LIST.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </NativeSelectField>
      </NativeSelectRoot>
    </Field>
  );
};