"use client";

import { ErrorResponse } from "@khaled/error-handler";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import InputField from "@workspace/ui/core/form/input-field";
import DatePickerField from "@workspace/ui/core/form/datePicker-field";
import RadioGroupFormField from "@workspace/ui/core/form/radio-input";
import SelectFormField from "@workspace/ui/core/form/select-field";
import { ReactNode, ComponentType } from "react";

export type BaseDynamicField<T extends FieldValues, E> = {
  name: Path<T>; // optional if we just render a custom component
  form?: UseFormReturn<T>;
  label?: string;
  getLabel?: (name: Path<T>) => string;
  errorResponse?: ErrorResponse<E>;
};

export type DynamicField<T extends FieldValues, E> =
  | (BaseDynamicField<T, E> & { type: "text" | "password" | "date" | "hidden" })
  | (BaseDynamicField<T, E> & {
      type: "select" | "radio";
      options: { id: string; name: string | number }[];
    })
  | {
      /** New type for custom component */
      type: "custom";
      /** Passing ReactNode or a component to render */
      component?: ReactNode | ComponentType<any>;
    };

export type DynamicFieldsProps<T extends FieldValues, E> = {
  fields: DynamicField<T, E>[];
};

export const DynamicFields = <
  T extends FieldValues,
  E,
  P extends DynamicFieldsProps<T, E>,
>({
  fields,
}: P) => {
  return (
    <>
      {fields.map((field, index) => {
        switch (field.type) {
          case "text":
          case "password":
            return (
              <InputField
                key={field.name}
                form={field.form!}
                name={field.name!}
                label={field.getLabel?.(field.name) || field.label || ""}
                type={field.type}
                errorResponse={field.errorResponse}
              />
            );

          case "date":
            return (
              <DatePickerField
                key={field.name}
                form={field.form!}
                name={field.name!}
                label={field.getLabel?.(field.name) || field.label || ""}
                errorResponse={field.errorResponse}
              />
            );

          case "select":
            return (
              <SelectFormField
                key={field.name}
                form={field.form!}
                name={field.name!}
                label={field.getLabel?.(field.name) || field.label || ""}
                options={field.options}
                errorResponse={field.errorResponse}
              />
            );

          case "radio":
            return (
              <RadioGroupFormField
                key={field.name}
                form={field.form!}
                name={field.name!}
                label={field.getLabel?.(field.name) || field.label || ""}
                options={field.options}
                errorResponse={field.errorResponse}
              />
            );

          case "custom":
            if (typeof field.component === "function") {
              const Component = field.component;
              return <Component key={index} {...field} />;
            }
            return <div key={index}>{field.component}</div>;

          default:
            return null;
        }
      })}
    </>
  );
};

export default DynamicFields;
