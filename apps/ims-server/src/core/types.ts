export type FindManyRepoParams<TModel, IFilters> = {
  offset: number;
  limit: number;
  orderBy?: Partial<Record<keyof TModel, "asc" | "desc">>;
  filters?: IFilters;
};
