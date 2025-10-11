export type OrganizationUniqueInput =
  | { id: string }
  | { name: string; ownerId: string };

export type OrganizationFilterInput = {
  ownerId?: string;
  userId?: string;
};

export type OrganizationCreateInput = {
  name: string;
  ownerId: string;
  description?: string;
};

export type OrganizationUpdateInput = {
  name?: string;
  description?: string;
};

export interface Organization {
  id: string;
  name: string;
  ownerId: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ===== REPOSITORY INTERFACES =====
export interface IOrganizationRepository<
  TOrganization extends Organization = Organization,
  TCreateInput extends OrganizationCreateInput = OrganizationCreateInput,
> {
  findUnique(where: OrganizationUniqueInput): Promise<TOrganization | null>;
  findMany(where: OrganizationFilterInput): Promise<TOrganization[]>;
  count(where: OrganizationFilterInput): Promise<number>;
  create(data: TCreateInput): Promise<TOrganization>;
  update(
    data: OrganizationUpdateInput,
    where: { id: string }
  ): Promise<TOrganization>;
  // findUserMembership(where: {
  //   organizationId: string;
  //   userId: string;
  // }): Promise<{ userId: string; role: string } | null>;
  // findUserOrganizations(userId: string): Promise<TOrganization[]>;
}
