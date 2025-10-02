"use client";
import { UseFormReturn, FieldValues, SubmitHandler } from "react-hook-form";

import { FC, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import SubmitButton from "@workspace/ui/core/form/submit-button";
import React from "react";
import { Form } from "@workspace/ui/components/form";

// ------------------
// Props
// ------------------
interface CustomFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;

  cardTitle?: string;
  cardDescription?: string;
  submitButtonText?: string;
  submitButtonPosition?: "center" | "left" | "right" | "full";
  submitButtonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  onSubmit: SubmitHandler<T>;
  footerContent?: ReactNode;
  className?: string;
  formClassName?: string;

  children: React.ReactNode;
  isLoading: boolean;
  isLoadingText: string;
}

// ------------------
// Component
// ------------------
const CustomForm = <T extends FieldValues>({
  form,

  cardTitle = "Form",
  cardDescription = "",
  submitButtonText = "submit",
  submitButtonPosition = "full",
  submitButtonVariant = "default",
  onSubmit,
  footerContent,
  className = "w-full max-w-md mx-auto",
  formClassName = "space-y-6",
  isLoading,
  isLoadingText = "isLoading...",

  children,
}: CustomFormProps<T>) => {
  const getButtonPositionClass = () => {
    switch (submitButtonPosition) {
      case "left":
        return "justify-start";
      case "center":
        return "justify-center";
      case "right":
        return "justify-end";
      default:
        return "";
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        {cardDescription && (
          <CardDescription>{cardDescription}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={formClassName}
          >
            {children}
            <div className={`flex ${getButtonPositionClass()} mt-6`}>
              <SubmitButton
                isLoading={isLoading}
                loadingText={isLoadingText}
                submitText={submitButtonText}
              />
            </div>

            {footerContent && <div className="mt-4">{footerContent}</div>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CustomForm;
