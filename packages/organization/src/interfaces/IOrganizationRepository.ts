export type OrganizationUniqueInput =
  | { id: string }
  | { name: string; ownerId: string };

export type OrganizationFilterInput = {
  ownerId?: string;
  userId?: string;
};

export interface Organization {
  id: string;
  name: string;
  ownerId: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export type OrganizationCreateInput = {
  name: string;
  ownerId: string;
};

// ===== REPOSITORY INTERFACES =====
export interface IOrganizationRepository<
  TOrganization extends Organization = Organization,
  TCreateInput extends OrganizationCreateInput = OrganizationCreateInput,
> {
  create(data: TCreateInput): Promise<TOrganization>;
  findUnique(where: OrganizationUniqueInput): Promise<TOrganization | null>;
  findMany(where: OrganizationFilterInput): Promise<TOrganization[]>;
  count(where: OrganizationFilterInput): Promise<number>;

  update(
    data: Partial<Organization>,
    where: { id: string }
  ): Promise<TOrganization>;
  // findUserMembership(where: {
  //   organizationId: string;
  //   userId: string;
  // }): Promise<{ userId: string; role: string } | null>;
  // findUserOrganizations(userId: string): Promise<TOrganization[]>;
}
