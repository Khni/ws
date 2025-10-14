"use client";

import NavbarLayout from "@/features/layout/navbar";
import CreateOrganizationForm from "@/features/organization/forms/create-organization-form";

export default function CreateOrgPage() {
  return (
    <NavbarLayout>
      <CreateOrganizationForm />
    </NavbarLayout>
  );
}
