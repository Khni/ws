export type OrganizationModel = {
  /**
   * The name of the organization.
   *
   * @minLength 2
   * @maxLength 50
   */
  name: string;
  id: string;
  /**
   * The name of the organization.
   *
   * @minLength 2
   * @maxLength 250
   */
  description: string | null;
  stateId: number;
  currencyId: number;
  timeZoneId: number;
  inventoryStartDate: Date;
  languageId: number | null;
  industryCategoryId: number | null;
  fiscalYearPatternId: number | null;
  ownerId: string;
  address: string | null;
  zipCode: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// type PartialOrg = Omit<OrganizationModel, "id" | "createdAt" | "updatedAt"> &
//   Partial<Pick<OrganizationModel, "createdAt" | "id">>;

export type OrganizationCreateInput = Omit<
  OrganizationModel,
  "id" | "createdAt" | "updatedAt"
>;
export type OrganizationUpdateInput = Partial<OrganizationModel>;
export type OrganizationWhereUniqueInput =
  | { id: string }
  | { name_ownerId: { name: string; ownerId: string } };
export type OrganizationWhereInput = Partial<OrganizationModel>;
export type OrganizationOrderByInput =
  | Partial<Record<keyof OrganizationModel, "asc" | "desc">>
  | undefined;
