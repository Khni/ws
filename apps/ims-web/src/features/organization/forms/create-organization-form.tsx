"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { useTranslations } from "next-intl";
import CustomForm from "@workspace/ui/core/form/custom-form";
import SelectField from "@workspace/ui/core/form/select-field";

//----changeable
import {
  ErrorResponse,
  OrganizationErrorCodesType,
  organizationCreateBodySchema as schema,
} from "@khaled/ims-shared";
const defaultValues = {
  name: "",
  description: "",
  stateId: "",
  currencyId: "",
  timeZoneId: "",
  inventoryStartDate: "",
  languageId: "",
  industryCategoryId: "",
  fiscalYearPatternId: "",
  address: "",
  zipCode: "",
};

//----

import { useState } from "react";
import { ErrorAlert } from "@workspace/ui/core/ErrorAlert";
import {
  useGetFilterdTimeZones,
  useGetStates,
  useOrganizationFormData,
} from "@/api";
import { useCreateOrgnizationHanler } from "@/features/organization/hooks/useCreateOrganizationHandler";
import LoadingPage from "@workspace/ui/core/loading/loading-page";
import InputField from "@workspace/ui/core/form/input-field";
import DatePickerField from "@workspace/ui/core/form/datePicker-field";

const Form = () => {
  const t = useTranslations();
  const organizationErrors = useTranslations("organization.errors");
  const [errorResponse, setErrorResponse] =
    useState<ErrorResponse<OrganizationErrorCodesType>>();
  const { isPending, submit } = useCreateOrgnizationHanler({
    setErrorResponse,
  });
  const [countryId, setCountryId] = useState<string | null>(null);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const { isLoading: isStatesLoading, data: statesData } = useGetStates(
    countryId || "",
    {},
    {
      query: {
        enabled: !!countryId,
        queryKey: ["states", countryId],
      },
    }
  );
  const { isLoading: isTimeZonesLoading, data: timeZones } =
    useGetFilterdTimeZones(countryId || "", {
      query: {
        enabled: !!countryId,
        queryKey: ["time-zones", countryId],
      },
    });
  const { data, isLoading } = useOrganizationFormData();
  if (isLoading) return <LoadingPage />;
  if (!data) return <div>No data</div>;
  const {
    countries,
    currencies,
    fiscalYearPattern,
    languages,
    industryCategories,
  } = data;
  const countryTimezones = statesData?.[0]?.country.timezones;
  console.log(countryTimezones);
  const formTitleFallback = t("organization.form.createOrganization");

  const submitButtonTextFallBack = t("submitButton");

  const isLoadingTextFallBack = t("loading");

  return (
    <CustomForm
      cardTitle={formTitleFallback}
      submitButtonText={submitButtonTextFallBack}
      form={form}
      onSubmit={submit}
      isLoadingText={isLoadingTextFallBack}
      isLoading={isPending}
    >
      <div className="flex flex-row gap-2">
        <InputField
          name="name"
          label={t("organization.form.organizationName")}
          type="text"
          form={form}
          errorResponse={errorResponse}
        />
        <InputField
          name="description"
          label={t("organization.form.organizationDescription")}
          type="text"
          form={form}
          errorResponse={errorResponse}
        />
      </div>

      <DatePickerField
        name="inventoryStartDate"
        label={t("organization.form.inventoryStartDate")}
        form={form}
        errorResponse={errorResponse}
      />

      <div className="flex flex-row gap-2">
        <SelectField
          name="countryId"
          label={t("organization.form.country")}
          options={countries.map((country) => country)}
          setValue={(value) => {
            setCountryId(value);
          }}
        />
        <SelectField
          name="stateId"
          label={t("organization.form.state")}
          options={statesData?.map((state) => state) || []}
          form={form}
        />
        <SelectField
          name="timeZoneId"
          label={t("organization.form.timeZone")}
          options={timeZones?.map((timezone) => timezone) || []}
          form={form}
        />
      </div>
      <div className="flex flex-row gap-2">
        <SelectField
          name="industryCategoryId"
          label={t("organization.form.industryCategory")}
          options={industryCategories.map((ic) => ({
            name: ic.label,
            id: ic.id,
          }))}
          form={form}
        />

        <SelectField
          name="fiscalYearPatternId"
          label={t("organization.form.fiscalYearPattern")}
          options={fiscalYearPattern.map((fyp) => ({
            name: fyp.label,
            id: fyp.id,
          }))}
          form={form}
        />
      </div>
      <div className="flex flex-row gap-2">
        <SelectField
          name="languageId"
          label={t("organization.form.language")}
          options={languages.map((language) => language)}
          form={form}
        />
        <SelectField
          name="currencyId"
          label={t("organization.form.currency")}
          options={currencies.map((currency) => currency)}
          form={form}
        />
      </div>

      {
        <ErrorAlert
          errorTitle={t("error")}
          errorDescriptionFallback={t("unknownError")}
          error={errorResponse}
          codeTransform={(code) => organizationErrors(code)}
        />
      }
    </CustomForm>
  );
};

export default Form;
