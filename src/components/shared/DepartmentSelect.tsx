import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";
import { Field } from "@/components/ui/field";
import type { UseFormRegisterReturn } from "react-hook-form";
import { DEPARTMENTS_LIST, DEPARTMENT_FILTER_LIST } from "@/schemas/department.schema";

interface DepartmentSelectProps {
  variant?: "form" | "filter";
  registration: UseFormRegisterReturn;
  errorText?: string;
  helperText?: string;
}

/**
 * Reusable Select component that switches between Form and Filter modes
 * using centralized schema constants
 */
export const DepartmentSelect = ({ 
  variant = "form", 
  registration, 
  errorText,
  helperText 
}: DepartmentSelectProps) => {
  const isFilter = variant === "filter";
  
  // Dynamically select source list based on usage context
  const options = isFilter ? DEPARTMENT_FILTER_LIST : DEPARTMENTS_LIST;
  const placeholder = isFilter ? undefined : "Select department...";

  return (
    <Field 
      label={!isFilter ? "Department" : undefined} 
      invalid={!!errorText} 
      errorText={errorText}
      helperText={helperText}
    >
      <NativeSelectRoot>
        <NativeSelectField {...registration}>
          {!isFilter && <option value="">{placeholder}</option>}
          {options.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </NativeSelectField>
      </NativeSelectRoot>
    </Field>
  );
};