"use client";

import { ErrorResponse } from "@khaled/error-handler";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import InputField from "@workspace/ui/core/form/input-field";
import DatePickerField from "@workspace/ui/core/form/datePicker-field";
import RadioGroupFormField from "@workspace/ui/core/form/radio-input";
import SelectFormField from "@workspace/ui/core/form/select-field";

export type BaseDynamicField<T extends FieldValues, E> = {
  name: Path<T>;
  form: UseFormReturn<T>;
  label: string;
  errorResponse?: ErrorResponse<E>;
};

export type DynamicField<T extends FieldValues, E> =
  | (BaseDynamicField<T, E> & { type: "text" | "password" | "date" | "hidden" })
  | (BaseDynamicField<T, E> & {
      type: "select" | "radio";
      options: { id: string; name: string | number }[];
    });

export type DynamicFieldsProps<T extends FieldValues, E> = {
  fields: DynamicField<T, E>[];
};

/**
 * Dynamically render form fields based on their type.
 * Supports: text, password, date, select, radio
 */
export const DynamicFields = <
  T extends FieldValues,
  E,
  P extends DynamicFieldsProps<T, E>,
>({
  fields,
}: P) => {
  return (
    <>
      {fields.map((field) => {
        switch (field.type) {
          case "text":
          case "password":
            return (
              <InputField
                key={field.name}
                form={field.form}
                name={field.name}
                label={field.label}
                type={field.type}
                errorResponse={field.errorResponse}
              />
            );

          case "date":
            return (
              <DatePickerField
                key={field.name}
                form={field.form}
                name={field.name}
                label={field.label}
                errorResponse={field.errorResponse}
              />
            );

          case "select":
            return (
              <SelectFormField
                key={field.name}
                form={field.form}
                name={field.name}
                label={field.label}
                options={field.options}
                errorResponse={field.errorResponse}
              />
            );

          case "radio":
            return (
              <RadioGroupFormField
                key={field.name}
                form={field.form}
                name={field.name}
                label={field.label}
                options={field.options}
                errorResponse={field.errorResponse}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default DynamicFields;
