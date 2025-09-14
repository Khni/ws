export interface IBaseRepository<
  Model extends object,
  WhereUniqueInput extends object,
  CreateInput extends object = Model,
  UpdateInput extends Partial<Model> = Partial<Model>,
> {
  create(params: { data: CreateInput; tx?: unknown }): Promise<Model>;

  update<Keys extends keyof Model>(params: {
    data: UpdateInput;
    where: WhereUniqueInput;
    tx?: unknown;
  }): Promise<Model>;

  findMany(params: {
    offset: number;
    limit: number;
    orderBy?: Partial<Record<keyof Model, "asc" | "desc">>;
    where?: Partial<Model>;
  }): Promise<Model[]>;
  findFirst({
    where,
    orderBy,
  }: {
    where: Partial<Model>;
    orderBy?: Partial<Record<keyof Model, "asc" | "desc">>;
  }): Promise<Model | null>;

  delete(params: {
    where: WhereUniqueInput;
    tx?: unknown;
  }): Promise<{ id: string }>;

  findUnique<Keys extends keyof Model>(
    where: WhereUniqueInput
  ): Promise<Model | null>;

  count(params?: { where?: Partial<Model> }): Promise<number>;
  createTransaction<T>(callback: (tx: unknown) => Promise<T>): Promise<T>;
}
