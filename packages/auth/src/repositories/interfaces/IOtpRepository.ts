export type OtpModel<OtpType> = {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  type: OtpType;
  hashedOtp: string;
};

export type OtpCreateInput<OtpType> = Pick<
  OtpModel<OtpType>,
  "userId" | "type" | "expiresAt" | "hashedOtp"
>;

export type OtpUpdateInput<OtpType> = Partial<OtpModel<OtpType>>;

export type OtpWhereUniqueInput = { id: string };

export interface IOtpRepository<OtpType> {
  create(params: {
    data: OtpCreateInput<OtpType>;
    tx?: unknown;
  }): Promise<OtpModel<OtpType>>;

  update(params: {
    data: OtpUpdateInput<OtpType>;
    where: OtpWhereUniqueInput;
    tx?: unknown;
  }): Promise<OtpModel<OtpType>>;

  findMany(params: {
    offset: number;
    limit: number;
    orderBy?: Partial<Record<keyof OtpModel<OtpType>, "asc" | "desc">>;
    where?: Partial<OtpModel<OtpType>>;
  }): Promise<OtpModel<OtpType>[]>;

  delete(params: {
    where: OtpWhereUniqueInput;
    tx?: unknown;
  }): Promise<{ id: string }>;

  findUnique(params: {
    where: OtpWhereUniqueInput;
  }): Promise<OtpModel<OtpType> | null>;

  count(params?: { where?: Partial<OtpModel<OtpType>> }): Promise<number>;
  createTransaction<T>(callback: (tx: unknown) => Promise<T>): Promise<T>;
}
