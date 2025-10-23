import { ErrorAlert, ErrorAlertProps } from "@workspace/ui/core/ErrorAlert";
import CustomForm, {
  CustomFormProps,
} from "@workspace/ui/core/form/custom-form";
import { useCommonTranslations } from "messages/common/hooks/useCommonTranslations";
import { FieldValues } from "react-hook-form";

export type FormProps<T extends FieldValues, E, S extends string> = {
  children?: React.ReactNode;
} & Omit<
  CustomFormProps<T, E>,
  "isLoadingText" | "submitButtonText" | "children"
> &
  Pick<ErrorAlertProps<S>, "error" | "codeTransform" | "className">;
export const Form = <T extends FieldValues, E, S extends string>({
  form,
  isLoading,
  onSubmit,
  fields,
  getLabel,
  error,
  codeTransform,
  cardTitle,
  cardDescription,
  children,
}: FormProps<T, E, S>) => {
  const {
    placeholderTranslations,
    alertMsgsTranslations,
    statusTranslations,
    actionTranslations,
  } = useCommonTranslations();
  return (
    <CustomForm
      form={form}
      getLabel={getLabel}
      onSubmit={onSubmit}
      fields={fields}
      isLoading={isLoading}
      isLoadingText={placeholderTranslations("loading")}
      submitButtonText={actionTranslations("submit")}
      cardTitle={cardTitle}
      cardDescription={cardDescription}
    >
      {children}
      <ErrorAlert
        errorTitle={statusTranslations("error")}
        errorDescriptionFallback={alertMsgsTranslations("unknownError")}
        error={error}
        codeTransform={(code) => codeTransform?.(code)}
      />
    </CustomForm>
  );
};
