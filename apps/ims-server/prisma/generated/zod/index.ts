import { z } from 'zod';
import type { Prisma } from '../../../generated/prisma';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const OtpScalarFieldEnumSchema = z.enum(['id','type','otp','identifier','expiresIn','isActive','createdAt','updatedAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','password','isActive','createdAt','updatedAt']);

export const UserIdentifierScalarFieldEnumSchema = z.enum(['id','userId','type','value','isVerified','isPrimary','isActive','createdAt','updatedAt']);

export const UserProfileScalarFieldEnumSchema = z.enum(['id','userId','firstName','lastName','avatarUrl','contactEmail','isActive','createdAt','updatedAt']);

export const RefreshTokenScalarFieldEnumSchema = z.enum(['id','token','userId','userAgent','ipAddress','expiresAt','revokedAt','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const OtpTypeSchema = z.enum(['VERIFY_EMAIL','LOGIN','FORGET_PASSWORD']);

export type OtpTypeType = `${z.infer<typeof OtpTypeSchema>}`

export const OauthProviderSchema = z.enum(['NONE','FACEBOOK','GOOGLE']);

export type OauthProviderType = `${z.infer<typeof OauthProviderSchema>}`

export const IdentifierTypeSchema = z.enum(['email','phone','username','google','apple','github','facebook']);

export type IdentifierTypeType = `${z.infer<typeof IdentifierTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// OTP SCHEMA
/////////////////////////////////////////

export const OtpSchema = z.object({
  type: OtpTypeSchema,
  id: z.string().uuid(),
  otp: z.string(),
  identifier: z.string(),
  expiresIn: z.coerce.date(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Otp = z.infer<typeof OtpSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  password: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER IDENTIFIER SCHEMA
/////////////////////////////////////////

export const UserIdentifierSchema = z.object({
  type: IdentifierTypeSchema,
  id: z.string().uuid(),
  userId: z.string(),
  value: z.string(),
  isVerified: z.boolean(),
  isPrimary: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type UserIdentifier = z.infer<typeof UserIdentifierSchema>

/////////////////////////////////////////
// USER PROFILE SCHEMA
/////////////////////////////////////////

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  contactEmail: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type UserProfile = z.infer<typeof UserProfileSchema>

/////////////////////////////////////////
// REFRESH TOKEN SCHEMA
/////////////////////////////////////////

export const RefreshTokenSchema = z.object({
  id: z.string().uuid(),
  token: z.string(),
  userId: z.string(),
  userAgent: z.string().nullable(),
  ipAddress: z.string().nullable(),
  expiresAt: z.coerce.date(),
  revokedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type RefreshToken = z.infer<typeof RefreshTokenSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// OTP
//------------------------------------------------------

export const OtpSelectSchema: z.ZodType<Prisma.OtpSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  otp: z.boolean().optional(),
  identifier: z.boolean().optional(),
  expiresIn: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  identifiers: z.union([z.boolean(),z.lazy(() => UserIdentifierFindManyArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => UserProfileArgsSchema)]).optional(),
  refreshTokens: z.union([z.boolean(),z.lazy(() => RefreshTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  identifiers: z.boolean().optional(),
  refreshTokens: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  password: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  identifiers: z.union([z.boolean(),z.lazy(() => UserIdentifierFindManyArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => UserProfileArgsSchema)]).optional(),
  refreshTokens: z.union([z.boolean(),z.lazy(() => RefreshTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER IDENTIFIER
//------------------------------------------------------

export const UserIdentifierIncludeSchema: z.ZodType<Prisma.UserIdentifierInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UserIdentifierArgsSchema: z.ZodType<Prisma.UserIdentifierDefaultArgs> = z.object({
  select: z.lazy(() => UserIdentifierSelectSchema).optional(),
  include: z.lazy(() => UserIdentifierIncludeSchema).optional(),
}).strict();

export const UserIdentifierSelectSchema: z.ZodType<Prisma.UserIdentifierSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  value: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  isPrimary: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER PROFILE
//------------------------------------------------------

export const UserProfileIncludeSchema: z.ZodType<Prisma.UserProfileInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UserProfileArgsSchema: z.ZodType<Prisma.UserProfileDefaultArgs> = z.object({
  select: z.lazy(() => UserProfileSelectSchema).optional(),
  include: z.lazy(() => UserProfileIncludeSchema).optional(),
}).strict();

export const UserProfileSelectSchema: z.ZodType<Prisma.UserProfileSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  avatarUrl: z.boolean().optional(),
  contactEmail: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// REFRESH TOKEN
//------------------------------------------------------

export const RefreshTokenIncludeSchema: z.ZodType<Prisma.RefreshTokenInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const RefreshTokenArgsSchema: z.ZodType<Prisma.RefreshTokenDefaultArgs> = z.object({
  select: z.lazy(() => RefreshTokenSelectSchema).optional(),
  include: z.lazy(() => RefreshTokenIncludeSchema).optional(),
}).strict();

export const RefreshTokenSelectSchema: z.ZodType<Prisma.RefreshTokenSelect> = z.object({
  id: z.boolean().optional(),
  token: z.boolean().optional(),
  userId: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  ipAddress: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  revokedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const OtpWhereInputSchema: z.ZodType<Prisma.OtpWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OtpWhereInputSchema),z.lazy(() => OtpWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OtpWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OtpWhereInputSchema),z.lazy(() => OtpWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumOtpTypeFilterSchema),z.lazy(() => OtpTypeSchema) ]).optional(),
  otp: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresIn: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const OtpOrderByWithRelationInputSchema: z.ZodType<Prisma.OtpOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  otp: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  expiresIn: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OtpWhereUniqueInputSchema: z.ZodType<Prisma.OtpWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => OtpWhereInputSchema),z.lazy(() => OtpWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OtpWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OtpWhereInputSchema),z.lazy(() => OtpWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumOtpTypeFilterSchema),z.lazy(() => OtpTypeSchema) ]).optional(),
  otp: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresIn: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const OtpOrderByWithAggregationInputSchema: z.ZodType<Prisma.OtpOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  otp: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  expiresIn: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => OtpCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => OtpMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => OtpMinOrderByAggregateInputSchema).optional()
}).strict();

export const OtpScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OtpScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => OtpScalarWhereWithAggregatesInputSchema),z.lazy(() => OtpScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => OtpScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OtpScalarWhereWithAggregatesInputSchema),z.lazy(() => OtpScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumOtpTypeWithAggregatesFilterSchema),z.lazy(() => OtpTypeSchema) ]).optional(),
  otp: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresIn: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  identifiers: z.lazy(() => UserIdentifierListRelationFilterSchema).optional(),
  profile: z.union([ z.lazy(() => UserProfileNullableScalarRelationFilterSchema),z.lazy(() => UserProfileWhereInputSchema) ]).optional().nullable(),
  refreshTokens: z.lazy(() => RefreshTokenListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  identifiers: z.lazy(() => UserIdentifierOrderByRelationAggregateInputSchema).optional(),
  profile: z.lazy(() => UserProfileOrderByWithRelationInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  identifiers: z.lazy(() => UserIdentifierListRelationFilterSchema).optional(),
  profile: z.union([ z.lazy(() => UserProfileNullableScalarRelationFilterSchema),z.lazy(() => UserProfileWhereInputSchema) ]).optional().nullable(),
  refreshTokens: z.lazy(() => RefreshTokenListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserIdentifierWhereInputSchema: z.ZodType<Prisma.UserIdentifierWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserIdentifierWhereInputSchema),z.lazy(() => UserIdentifierWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserIdentifierWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserIdentifierWhereInputSchema),z.lazy(() => UserIdentifierWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumIdentifierTypeFilterSchema),z.lazy(() => IdentifierTypeSchema) ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isPrimary: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UserIdentifierOrderByWithRelationInputSchema: z.ZodType<Prisma.UserIdentifierOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  isPrimary: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const UserIdentifierWhereUniqueInputSchema: z.ZodType<Prisma.UserIdentifierWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    type_value: z.lazy(() => UserIdentifierTypeValueCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    type_value: z.lazy(() => UserIdentifierTypeValueCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  type_value: z.lazy(() => UserIdentifierTypeValueCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UserIdentifierWhereInputSchema),z.lazy(() => UserIdentifierWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserIdentifierWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserIdentifierWhereInputSchema),z.lazy(() => UserIdentifierWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumIdentifierTypeFilterSchema),z.lazy(() => IdentifierTypeSchema) ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isPrimary: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const UserIdentifierOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserIdentifierOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  isPrimary: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserIdentifierCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserIdentifierMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserIdentifierMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserIdentifierScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserIdentifierScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserIdentifierScalarWhereWithAggregatesInputSchema),z.lazy(() => UserIdentifierScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserIdentifierScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserIdentifierScalarWhereWithAggregatesInputSchema),z.lazy(() => UserIdentifierScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumIdentifierTypeWithAggregatesFilterSchema),z.lazy(() => IdentifierTypeSchema) ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isVerified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isPrimary: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserProfileWhereInputSchema: z.ZodType<Prisma.UserProfileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserProfileWhereInputSchema),z.lazy(() => UserProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProfileWhereInputSchema),z.lazy(() => UserProfileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contactEmail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UserProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.UserProfileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatarUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contactEmail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const UserProfileWhereUniqueInputSchema: z.ZodType<Prisma.UserProfileWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    userId: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => UserProfileWhereInputSchema),z.lazy(() => UserProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProfileWhereInputSchema),z.lazy(() => UserProfileWhereInputSchema).array() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contactEmail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const UserProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserProfileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatarUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contactEmail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserProfileCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserProfileMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserProfileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserProfileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => UserProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProfileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => UserProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  avatarUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  contactEmail: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RefreshTokenWhereInputSchema: z.ZodType<Prisma.RefreshTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RefreshTokenWhereInputSchema),z.lazy(() => RefreshTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokenWhereInputSchema),z.lazy(() => RefreshTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  revokedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const RefreshTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.RefreshTokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ipAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  revokedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const RefreshTokenWhereUniqueInputSchema: z.ZodType<Prisma.RefreshTokenWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    token: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    token: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  token: z.string().optional(),
  AND: z.union([ z.lazy(() => RefreshTokenWhereInputSchema),z.lazy(() => RefreshTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokenWhereInputSchema),z.lazy(() => RefreshTokenWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  revokedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const RefreshTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.RefreshTokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ipAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  revokedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RefreshTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RefreshTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RefreshTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const RefreshTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RefreshTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userAgent: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ipAddress: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  revokedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const OtpCreateInputSchema: z.ZodType<Prisma.OtpCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => OtpTypeSchema),
  otp: z.string(),
  identifier: z.string(),
  expiresIn: z.coerce.date(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const OtpUncheckedCreateInputSchema: z.ZodType<Prisma.OtpUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => OtpTypeSchema),
  otp: z.string(),
  identifier: z.string(),
  expiresIn: z.coerce.date(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const OtpUpdateInputSchema: z.ZodType<Prisma.OtpUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => OtpTypeSchema),z.lazy(() => EnumOtpTypeFieldUpdateOperationsInputSchema) ]).optional(),
  otp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresIn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OtpUncheckedUpdateInputSchema: z.ZodType<Prisma.OtpUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => OtpTypeSchema),z.lazy(() => EnumOtpTypeFieldUpdateOperationsInputSchema) ]).optional(),
  otp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresIn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OtpCreateManyInputSchema: z.ZodType<Prisma.OtpCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => OtpTypeSchema),
  otp: z.string(),
  identifier: z.string(),
  expiresIn: z.coerce.date(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const OtpUpdateManyMutationInputSchema: z.ZodType<Prisma.OtpUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => OtpTypeSchema),z.lazy(() => EnumOtpTypeFieldUpdateOperationsInputSchema) ]).optional(),
  otp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresIn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OtpUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OtpUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => OtpTypeSchema),z.lazy(() => EnumOtpTypeFieldUpdateOperationsInputSchema) ]).optional(),
  otp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresIn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  password: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  identifiers: z.lazy(() => UserIdentifierCreateNestedManyWithoutUserInputSchema).optional(),
  profile: z.lazy(() => UserProfileCreateNestedOneWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  password: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  identifiers: z.lazy(() => UserIdentifierUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  profile: z.lazy(() => UserProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  identifiers: z.lazy(() => UserIdentifierUpdateManyWithoutUserNestedInputSchema).optional(),
  profile: z.lazy(() => UserProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  identifiers: z.lazy(() => UserIdentifierUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  profile: z.lazy(() => UserProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  password: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserIdentifierCreateInputSchema: z.ZodType<Prisma.UserIdentifierCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => IdentifierTypeSchema),
  value: z.string(),
  isVerified: z.boolean().optional(),
  isPrimary: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutIdentifiersInputSchema)
}).strict();

export const UserIdentifierUncheckedCreateInputSchema: z.ZodType<Prisma.UserIdentifierUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  type: z.lazy(() => IdentifierTypeSchema),
  value: z.string(),
  isVerified: z.boolean().optional(),
  isPrimary: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserIdentifierUpdateInputSchema: z.ZodType<Prisma.UserIdentifierUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IdentifierTypeSchema),z.lazy(() => EnumIdentifierTypeFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPrimary: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutIdentifiersNestedInputSchema).optional()
}).strict();

export const UserIdentifierUncheckedUpdateInputSchema: z.ZodType<Prisma.UserIdentifierUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IdentifierTypeSchema),z.lazy(() => EnumIdentifierTypeFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPrimary: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserIdentifierCreateManyInputSchema: z.ZodType<Prisma.UserIdentifierCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  type: z.lazy(() => IdentifierTypeSchema),
  value: z.string(),
  isVerified: z.boolean().optional(),
  isPrimary: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserIdentifierUpdateManyMutationInputSchema: z.ZodType<Prisma.UserIdentifierUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IdentifierTypeSchema),z.lazy(() => EnumIdentifierTypeFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPrimary: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserIdentifierUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserIdentifierUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IdentifierTypeSchema),z.lazy(() => EnumIdentifierTypeFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPrimary: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProfileCreateInputSchema: z.ZodType<Prisma.UserProfileCreateInput> = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  contactEmail: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema)
}).strict();

export const UserProfileUncheckedCreateInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  contactEmail: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserProfileUpdateInputSchema: z.ZodType<Prisma.UserProfileUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional()
}).strict();

export const UserProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProfileCreateManyInputSchema: z.ZodType<Prisma.UserProfileCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  contactEmail: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.UserProfileUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenCreateInputSchema: z.ZodType<Prisma.RefreshTokenCreateInput> = z.object({
  id: z.string().uuid().optional(),
  token: z.string(),
  userAgent: z.string().optional().nullable(),
  ipAddress: z.string().optional().nullable(),
  expiresAt: z.coerce.date(),
  revokedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRefreshTokensInputSchema)
}).strict();

export const RefreshTokenUncheckedCreateInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  token: z.string(),
  userId: z.string(),
  userAgent: z.string().optional().nullable(),
  ipAddress: z.string().optional().nullable(),
  expiresAt: z.coerce.date(),
  revokedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RefreshTokenUpdateInputSchema: z.ZodType<Prisma.RefreshTokenUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revokedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRefreshTokensNestedInputSchema).optional()
}).strict();

export const RefreshTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revokedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenCreateManyInputSchema: z.ZodType<Prisma.RefreshTokenCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  token: z.string(),
  userId: z.string(),
  userAgent: z.string().optional().nullable(),
  ipAddress: z.string().optional().nullable(),
  expiresAt: z.coerce.date(),
  revokedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RefreshTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.RefreshTokenUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revokedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revokedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const EnumOtpTypeFilterSchema: z.ZodType<Prisma.EnumOtpTypeFilter> = z.object({
  equals: z.lazy(() => OtpTypeSchema).optional(),
  in: z.lazy(() => OtpTypeSchema).array().optional(),
  notIn: z.lazy(() => OtpTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => OtpTypeSchema),z.lazy(() => NestedEnumOtpTypeFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const OtpCountOrderByAggregateInputSchema: z.ZodType<Prisma.OtpCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  otp: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  expiresIn: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OtpMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OtpMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  otp: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  expiresIn: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OtpMinOrderByAggregateInputSchema: z.ZodType<Prisma.OtpMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  otp: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  expiresIn: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const EnumOtpTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumOtpTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => OtpTypeSchema).optional(),
  in: z.lazy(() => OtpTypeSchema).array().optional(),
  notIn: z.lazy(() => OtpTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => OtpTypeSchema),z.lazy(() => NestedEnumOtpTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumOtpTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumOtpTypeFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserIdentifierListRelationFilterSchema: z.ZodType<Prisma.UserIdentifierListRelationFilter> = z.object({
  every: z.lazy(() => UserIdentifierWhereInputSchema).optional(),
  some: z.lazy(() => UserIdentifierWhereInputSchema).optional(),
  none: z.lazy(() => UserIdentifierWhereInputSchema).optional()
}).strict();

export const UserProfileNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserProfileNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserProfileWhereInputSchema).optional().nullable()
}).strict();

export const RefreshTokenListRelationFilterSchema: z.ZodType<Prisma.RefreshTokenListRelationFilter> = z.object({
  every: z.lazy(() => RefreshTokenWhereInputSchema).optional(),
  some: z.lazy(() => RefreshTokenWhereInputSchema).optional(),
  none: z.lazy(() => RefreshTokenWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UserIdentifierOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserIdentifierOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RefreshTokenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RefreshTokenOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const EnumIdentifierTypeFilterSchema: z.ZodType<Prisma.EnumIdentifierTypeFilter> = z.object({
  equals: z.lazy(() => IdentifierTypeSchema).optional(),
  in: z.lazy(() => IdentifierTypeSchema).array().optional(),
  notIn: z.lazy(() => IdentifierTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => IdentifierTypeSchema),z.lazy(() => NestedEnumIdentifierTypeFilterSchema) ]).optional(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserIdentifierTypeValueCompoundUniqueInputSchema: z.ZodType<Prisma.UserIdentifierTypeValueCompoundUniqueInput> = z.object({
  type: z.lazy(() => IdentifierTypeSchema),
  value: z.string()
}).strict();

export const UserIdentifierCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserIdentifierCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  isPrimary: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserIdentifierMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserIdentifierMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  isPrimary: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserIdentifierMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserIdentifierMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  isPrimary: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumIdentifierTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumIdentifierTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => IdentifierTypeSchema).optional(),
  in: z.lazy(() => IdentifierTypeSchema).array().optional(),
  notIn: z.lazy(() => IdentifierTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => IdentifierTypeSchema),z.lazy(() => NestedEnumIdentifierTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumIdentifierTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumIdentifierTypeFilterSchema).optional()
}).strict();

export const UserProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  contactEmail: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  contactEmail: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  contactEmail: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const RefreshTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.RefreshTokenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  revokedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RefreshTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RefreshTokenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  revokedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RefreshTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.RefreshTokenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  revokedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const EnumOtpTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumOtpTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => OtpTypeSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserIdentifierCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserIdentifierCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserIdentifierCreateWithoutUserInputSchema),z.lazy(() => UserIdentifierCreateWithoutUserInputSchema).array(),z.lazy(() => UserIdentifierUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserIdentifierUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserIdentifierCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserIdentifierCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserIdentifierCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserIdentifierWhereUniqueInputSchema),z.lazy(() => UserIdentifierWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserProfileCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.UserProfileCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional()
}).strict();

export const RefreshTokenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateWithoutUserInputSchema).array(),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RefreshTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserIdentifierUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserIdentifierUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserIdentifierCreateWithoutUserInputSchema),z.lazy(() => UserIdentifierCreateWithoutUserInputSchema).array(),z.lazy(() => UserIdentifierUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserIdentifierUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserIdentifierCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserIdentifierCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserIdentifierCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserIdentifierWhereUniqueInputSchema),z.lazy(() => UserIdentifierWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserProfileUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional()
}).strict();

export const RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateWithoutUserInputSchema).array(),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RefreshTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const UserIdentifierUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserIdentifierUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserIdentifierCreateWithoutUserInputSchema),z.lazy(() => UserIdentifierCreateWithoutUserInputSchema).array(),z.lazy(() => UserIdentifierUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserIdentifierUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserIdentifierCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserIdentifierCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserIdentifierUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserIdentifierUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserIdentifierCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserIdentifierWhereUniqueInputSchema),z.lazy(() => UserIdentifierWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserIdentifierWhereUniqueInputSchema),z.lazy(() => UserIdentifierWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserIdentifierWhereUniqueInputSchema),z.lazy(() => UserIdentifierWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserIdentifierWhereUniqueInputSchema),z.lazy(() => UserIdentifierWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserIdentifierUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserIdentifierUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserIdentifierUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserIdentifierUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserIdentifierScalarWhereInputSchema),z.lazy(() => UserIdentifierScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserProfileUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.UserProfileUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => UserProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserProfileUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => UserProfileUpdateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RefreshTokenUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateWithoutUserInputSchema).array(),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RefreshTokenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RefreshTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RefreshTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RefreshTokenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RefreshTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RefreshTokenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RefreshTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RefreshTokenScalarWhereInputSchema),z.lazy(() => RefreshTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserIdentifierUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserIdentifierUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserIdentifierCreateWithoutUserInputSchema),z.lazy(() => UserIdentifierCreateWithoutUserInputSchema).array(),z.lazy(() => UserIdentifierUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserIdentifierUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserIdentifierCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserIdentifierCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserIdentifierUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserIdentifierUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserIdentifierCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserIdentifierWhereUniqueInputSchema),z.lazy(() => UserIdentifierWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserIdentifierWhereUniqueInputSchema),z.lazy(() => UserIdentifierWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserIdentifierWhereUniqueInputSchema),z.lazy(() => UserIdentifierWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserIdentifierWhereUniqueInputSchema),z.lazy(() => UserIdentifierWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserIdentifierUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserIdentifierUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserIdentifierUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserIdentifierUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserIdentifierScalarWhereInputSchema),z.lazy(() => UserIdentifierScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserProfileUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => UserProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserProfileUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => UserProfileUpdateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateWithoutUserInputSchema).array(),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RefreshTokenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RefreshTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RefreshTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RefreshTokenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RefreshTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RefreshTokenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RefreshTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RefreshTokenScalarWhereInputSchema),z.lazy(() => RefreshTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutIdentifiersInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutIdentifiersInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutIdentifiersInputSchema),z.lazy(() => UserUncheckedCreateWithoutIdentifiersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutIdentifiersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumIdentifierTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumIdentifierTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => IdentifierTypeSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutIdentifiersNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutIdentifiersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutIdentifiersInputSchema),z.lazy(() => UserUncheckedCreateWithoutIdentifiersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutIdentifiersInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutIdentifiersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutIdentifiersInputSchema),z.lazy(() => UserUpdateWithoutIdentifiersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIdentifiersInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutProfileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProfileInputSchema),z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRefreshTokensInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRefreshTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRefreshTokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateOneRequiredWithoutRefreshTokensNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRefreshTokensNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRefreshTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRefreshTokensInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRefreshTokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRefreshTokensInputSchema),z.lazy(() => UserUpdateWithoutRefreshTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRefreshTokensInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedEnumOtpTypeFilterSchema: z.ZodType<Prisma.NestedEnumOtpTypeFilter> = z.object({
  equals: z.lazy(() => OtpTypeSchema).optional(),
  in: z.lazy(() => OtpTypeSchema).array().optional(),
  notIn: z.lazy(() => OtpTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => OtpTypeSchema),z.lazy(() => NestedEnumOtpTypeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedEnumOtpTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumOtpTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => OtpTypeSchema).optional(),
  in: z.lazy(() => OtpTypeSchema).array().optional(),
  notIn: z.lazy(() => OtpTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => OtpTypeSchema),z.lazy(() => NestedEnumOtpTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumOtpTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumOtpTypeFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumIdentifierTypeFilterSchema: z.ZodType<Prisma.NestedEnumIdentifierTypeFilter> = z.object({
  equals: z.lazy(() => IdentifierTypeSchema).optional(),
  in: z.lazy(() => IdentifierTypeSchema).array().optional(),
  notIn: z.lazy(() => IdentifierTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => IdentifierTypeSchema),z.lazy(() => NestedEnumIdentifierTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumIdentifierTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumIdentifierTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => IdentifierTypeSchema).optional(),
  in: z.lazy(() => IdentifierTypeSchema).array().optional(),
  notIn: z.lazy(() => IdentifierTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => IdentifierTypeSchema),z.lazy(() => NestedEnumIdentifierTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumIdentifierTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumIdentifierTypeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const UserIdentifierCreateWithoutUserInputSchema: z.ZodType<Prisma.UserIdentifierCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => IdentifierTypeSchema),
  value: z.string(),
  isVerified: z.boolean().optional(),
  isPrimary: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserIdentifierUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserIdentifierUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => IdentifierTypeSchema),
  value: z.string(),
  isVerified: z.boolean().optional(),
  isPrimary: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserIdentifierCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserIdentifierCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserIdentifierWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserIdentifierCreateWithoutUserInputSchema),z.lazy(() => UserIdentifierUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserIdentifierCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserIdentifierCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserIdentifierCreateManyUserInputSchema),z.lazy(() => UserIdentifierCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserProfileCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  contactEmail: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  contactEmail: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserProfileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserProfileCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RefreshTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  token: z.string(),
  userAgent: z.string().optional().nullable(),
  ipAddress: z.string().optional().nullable(),
  expiresAt: z.coerce.date(),
  revokedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RefreshTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  token: z.string(),
  userAgent: z.string().optional().nullable(),
  ipAddress: z.string().optional().nullable(),
  expiresAt: z.coerce.date(),
  revokedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RefreshTokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RefreshTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RefreshTokenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RefreshTokenCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RefreshTokenCreateManyUserInputSchema),z.lazy(() => RefreshTokenCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserIdentifierUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserIdentifierUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserIdentifierWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserIdentifierUpdateWithoutUserInputSchema),z.lazy(() => UserIdentifierUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserIdentifierCreateWithoutUserInputSchema),z.lazy(() => UserIdentifierUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserIdentifierUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserIdentifierUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserIdentifierWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserIdentifierUpdateWithoutUserInputSchema),z.lazy(() => UserIdentifierUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserIdentifierUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserIdentifierUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserIdentifierScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserIdentifierUpdateManyMutationInputSchema),z.lazy(() => UserIdentifierUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserIdentifierScalarWhereInputSchema: z.ZodType<Prisma.UserIdentifierScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserIdentifierScalarWhereInputSchema),z.lazy(() => UserIdentifierScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserIdentifierScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserIdentifierScalarWhereInputSchema),z.lazy(() => UserIdentifierScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumIdentifierTypeFilterSchema),z.lazy(() => IdentifierTypeSchema) ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isPrimary: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserProfileUpsertWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => UserProfileUpdateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => UserProfileWhereInputSchema).optional()
}).strict();

export const UserProfileUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserProfileUpdateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserProfileUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RefreshTokenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RefreshTokenUpdateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RefreshTokenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RefreshTokenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RefreshTokenUpdateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const RefreshTokenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RefreshTokenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RefreshTokenUpdateManyMutationInputSchema),z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RefreshTokenScalarWhereInputSchema: z.ZodType<Prisma.RefreshTokenScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RefreshTokenScalarWhereInputSchema),z.lazy(() => RefreshTokenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokenScalarWhereInputSchema),z.lazy(() => RefreshTokenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  revokedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutIdentifiersInputSchema: z.ZodType<Prisma.UserCreateWithoutIdentifiersInput> = z.object({
  id: z.string().uuid().optional(),
  password: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  profile: z.lazy(() => UserProfileCreateNestedOneWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutIdentifiersInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutIdentifiersInput> = z.object({
  id: z.string().uuid().optional(),
  password: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  profile: z.lazy(() => UserProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutIdentifiersInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutIdentifiersInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutIdentifiersInputSchema),z.lazy(() => UserUncheckedCreateWithoutIdentifiersInputSchema) ]),
}).strict();

export const UserUpsertWithoutIdentifiersInputSchema: z.ZodType<Prisma.UserUpsertWithoutIdentifiersInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutIdentifiersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIdentifiersInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutIdentifiersInputSchema),z.lazy(() => UserUncheckedCreateWithoutIdentifiersInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutIdentifiersInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutIdentifiersInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutIdentifiersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIdentifiersInputSchema) ]),
}).strict();

export const UserUpdateWithoutIdentifiersInputSchema: z.ZodType<Prisma.UserUpdateWithoutIdentifiersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => UserProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutIdentifiersInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutIdentifiersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => UserProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateWithoutProfileInput> = z.object({
  id: z.string().uuid().optional(),
  password: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  identifiers: z.lazy(() => UserIdentifierCreateNestedManyWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().uuid().optional(),
  password: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  identifiers: z.lazy(() => UserIdentifierUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const UserUpsertWithoutProfileInputSchema: z.ZodType<Prisma.UserUpsertWithoutProfileInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export const UserUpdateWithoutProfileInputSchema: z.ZodType<Prisma.UserUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  identifiers: z.lazy(() => UserIdentifierUpdateManyWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  identifiers: z.lazy(() => UserIdentifierUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserCreateWithoutRefreshTokensInput> = z.object({
  id: z.string().uuid().optional(),
  password: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  identifiers: z.lazy(() => UserIdentifierCreateNestedManyWithoutUserInputSchema).optional(),
  profile: z.lazy(() => UserProfileCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRefreshTokensInput> = z.object({
  id: z.string().uuid().optional(),
  password: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  identifiers: z.lazy(() => UserIdentifierUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  profile: z.lazy(() => UserProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRefreshTokensInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRefreshTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputSchema) ]),
}).strict();

export const UserUpsertWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUpsertWithoutRefreshTokensInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRefreshTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRefreshTokensInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRefreshTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRefreshTokensInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRefreshTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRefreshTokensInputSchema) ]),
}).strict();

export const UserUpdateWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUpdateWithoutRefreshTokensInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  identifiers: z.lazy(() => UserIdentifierUpdateManyWithoutUserNestedInputSchema).optional(),
  profile: z.lazy(() => UserProfileUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRefreshTokensInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  identifiers: z.lazy(() => UserIdentifierUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  profile: z.lazy(() => UserProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserIdentifierCreateManyUserInputSchema: z.ZodType<Prisma.UserIdentifierCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => IdentifierTypeSchema),
  value: z.string(),
  isVerified: z.boolean().optional(),
  isPrimary: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RefreshTokenCreateManyUserInputSchema: z.ZodType<Prisma.RefreshTokenCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  token: z.string(),
  userAgent: z.string().optional().nullable(),
  ipAddress: z.string().optional().nullable(),
  expiresAt: z.coerce.date(),
  revokedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserIdentifierUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserIdentifierUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IdentifierTypeSchema),z.lazy(() => EnumIdentifierTypeFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPrimary: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserIdentifierUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserIdentifierUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IdentifierTypeSchema),z.lazy(() => EnumIdentifierTypeFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPrimary: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserIdentifierUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserIdentifierUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IdentifierTypeSchema),z.lazy(() => EnumIdentifierTypeFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPrimary: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revokedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revokedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revokedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const OtpFindFirstArgsSchema: z.ZodType<Prisma.OtpFindFirstArgs> = z.object({
  select: OtpSelectSchema.optional(),
  where: OtpWhereInputSchema.optional(),
  orderBy: z.union([ OtpOrderByWithRelationInputSchema.array(),OtpOrderByWithRelationInputSchema ]).optional(),
  cursor: OtpWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OtpScalarFieldEnumSchema,OtpScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OtpFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OtpFindFirstOrThrowArgs> = z.object({
  select: OtpSelectSchema.optional(),
  where: OtpWhereInputSchema.optional(),
  orderBy: z.union([ OtpOrderByWithRelationInputSchema.array(),OtpOrderByWithRelationInputSchema ]).optional(),
  cursor: OtpWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OtpScalarFieldEnumSchema,OtpScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OtpFindManyArgsSchema: z.ZodType<Prisma.OtpFindManyArgs> = z.object({
  select: OtpSelectSchema.optional(),
  where: OtpWhereInputSchema.optional(),
  orderBy: z.union([ OtpOrderByWithRelationInputSchema.array(),OtpOrderByWithRelationInputSchema ]).optional(),
  cursor: OtpWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OtpScalarFieldEnumSchema,OtpScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OtpAggregateArgsSchema: z.ZodType<Prisma.OtpAggregateArgs> = z.object({
  where: OtpWhereInputSchema.optional(),
  orderBy: z.union([ OtpOrderByWithRelationInputSchema.array(),OtpOrderByWithRelationInputSchema ]).optional(),
  cursor: OtpWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const OtpGroupByArgsSchema: z.ZodType<Prisma.OtpGroupByArgs> = z.object({
  where: OtpWhereInputSchema.optional(),
  orderBy: z.union([ OtpOrderByWithAggregationInputSchema.array(),OtpOrderByWithAggregationInputSchema ]).optional(),
  by: OtpScalarFieldEnumSchema.array(),
  having: OtpScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const OtpFindUniqueArgsSchema: z.ZodType<Prisma.OtpFindUniqueArgs> = z.object({
  select: OtpSelectSchema.optional(),
  where: OtpWhereUniqueInputSchema,
}).strict() ;

export const OtpFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OtpFindUniqueOrThrowArgs> = z.object({
  select: OtpSelectSchema.optional(),
  where: OtpWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserIdentifierFindFirstArgsSchema: z.ZodType<Prisma.UserIdentifierFindFirstArgs> = z.object({
  select: UserIdentifierSelectSchema.optional(),
  include: UserIdentifierIncludeSchema.optional(),
  where: UserIdentifierWhereInputSchema.optional(),
  orderBy: z.union([ UserIdentifierOrderByWithRelationInputSchema.array(),UserIdentifierOrderByWithRelationInputSchema ]).optional(),
  cursor: UserIdentifierWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserIdentifierScalarFieldEnumSchema,UserIdentifierScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserIdentifierFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserIdentifierFindFirstOrThrowArgs> = z.object({
  select: UserIdentifierSelectSchema.optional(),
  include: UserIdentifierIncludeSchema.optional(),
  where: UserIdentifierWhereInputSchema.optional(),
  orderBy: z.union([ UserIdentifierOrderByWithRelationInputSchema.array(),UserIdentifierOrderByWithRelationInputSchema ]).optional(),
  cursor: UserIdentifierWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserIdentifierScalarFieldEnumSchema,UserIdentifierScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserIdentifierFindManyArgsSchema: z.ZodType<Prisma.UserIdentifierFindManyArgs> = z.object({
  select: UserIdentifierSelectSchema.optional(),
  include: UserIdentifierIncludeSchema.optional(),
  where: UserIdentifierWhereInputSchema.optional(),
  orderBy: z.union([ UserIdentifierOrderByWithRelationInputSchema.array(),UserIdentifierOrderByWithRelationInputSchema ]).optional(),
  cursor: UserIdentifierWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserIdentifierScalarFieldEnumSchema,UserIdentifierScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserIdentifierAggregateArgsSchema: z.ZodType<Prisma.UserIdentifierAggregateArgs> = z.object({
  where: UserIdentifierWhereInputSchema.optional(),
  orderBy: z.union([ UserIdentifierOrderByWithRelationInputSchema.array(),UserIdentifierOrderByWithRelationInputSchema ]).optional(),
  cursor: UserIdentifierWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserIdentifierGroupByArgsSchema: z.ZodType<Prisma.UserIdentifierGroupByArgs> = z.object({
  where: UserIdentifierWhereInputSchema.optional(),
  orderBy: z.union([ UserIdentifierOrderByWithAggregationInputSchema.array(),UserIdentifierOrderByWithAggregationInputSchema ]).optional(),
  by: UserIdentifierScalarFieldEnumSchema.array(),
  having: UserIdentifierScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserIdentifierFindUniqueArgsSchema: z.ZodType<Prisma.UserIdentifierFindUniqueArgs> = z.object({
  select: UserIdentifierSelectSchema.optional(),
  include: UserIdentifierIncludeSchema.optional(),
  where: UserIdentifierWhereUniqueInputSchema,
}).strict() ;

export const UserIdentifierFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserIdentifierFindUniqueOrThrowArgs> = z.object({
  select: UserIdentifierSelectSchema.optional(),
  include: UserIdentifierIncludeSchema.optional(),
  where: UserIdentifierWhereUniqueInputSchema,
}).strict() ;

export const UserProfileFindFirstArgsSchema: z.ZodType<Prisma.UserProfileFindFirstArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  where: UserProfileWhereInputSchema.optional(),
  orderBy: z.union([ UserProfileOrderByWithRelationInputSchema.array(),UserProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProfileScalarFieldEnumSchema,UserProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserProfileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserProfileFindFirstOrThrowArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  where: UserProfileWhereInputSchema.optional(),
  orderBy: z.union([ UserProfileOrderByWithRelationInputSchema.array(),UserProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProfileScalarFieldEnumSchema,UserProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserProfileFindManyArgsSchema: z.ZodType<Prisma.UserProfileFindManyArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  where: UserProfileWhereInputSchema.optional(),
  orderBy: z.union([ UserProfileOrderByWithRelationInputSchema.array(),UserProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProfileScalarFieldEnumSchema,UserProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserProfileAggregateArgsSchema: z.ZodType<Prisma.UserProfileAggregateArgs> = z.object({
  where: UserProfileWhereInputSchema.optional(),
  orderBy: z.union([ UserProfileOrderByWithRelationInputSchema.array(),UserProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserProfileGroupByArgsSchema: z.ZodType<Prisma.UserProfileGroupByArgs> = z.object({
  where: UserProfileWhereInputSchema.optional(),
  orderBy: z.union([ UserProfileOrderByWithAggregationInputSchema.array(),UserProfileOrderByWithAggregationInputSchema ]).optional(),
  by: UserProfileScalarFieldEnumSchema.array(),
  having: UserProfileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserProfileFindUniqueArgsSchema: z.ZodType<Prisma.UserProfileFindUniqueArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  where: UserProfileWhereUniqueInputSchema,
}).strict() ;

export const UserProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserProfileFindUniqueOrThrowArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  where: UserProfileWhereUniqueInputSchema,
}).strict() ;

export const RefreshTokenFindFirstArgsSchema: z.ZodType<Prisma.RefreshTokenFindFirstArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithRelationInputSchema.array(),RefreshTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RefreshTokenScalarFieldEnumSchema,RefreshTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RefreshTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RefreshTokenFindFirstOrThrowArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithRelationInputSchema.array(),RefreshTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RefreshTokenScalarFieldEnumSchema,RefreshTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RefreshTokenFindManyArgsSchema: z.ZodType<Prisma.RefreshTokenFindManyArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithRelationInputSchema.array(),RefreshTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RefreshTokenScalarFieldEnumSchema,RefreshTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RefreshTokenAggregateArgsSchema: z.ZodType<Prisma.RefreshTokenAggregateArgs> = z.object({
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithRelationInputSchema.array(),RefreshTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RefreshTokenGroupByArgsSchema: z.ZodType<Prisma.RefreshTokenGroupByArgs> = z.object({
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithAggregationInputSchema.array(),RefreshTokenOrderByWithAggregationInputSchema ]).optional(),
  by: RefreshTokenScalarFieldEnumSchema.array(),
  having: RefreshTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RefreshTokenFindUniqueArgsSchema: z.ZodType<Prisma.RefreshTokenFindUniqueArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereUniqueInputSchema,
}).strict() ;

export const RefreshTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RefreshTokenFindUniqueOrThrowArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereUniqueInputSchema,
}).strict() ;

export const OtpCreateArgsSchema: z.ZodType<Prisma.OtpCreateArgs> = z.object({
  select: OtpSelectSchema.optional(),
  data: z.union([ OtpCreateInputSchema,OtpUncheckedCreateInputSchema ]),
}).strict() ;

export const OtpUpsertArgsSchema: z.ZodType<Prisma.OtpUpsertArgs> = z.object({
  select: OtpSelectSchema.optional(),
  where: OtpWhereUniqueInputSchema,
  create: z.union([ OtpCreateInputSchema,OtpUncheckedCreateInputSchema ]),
  update: z.union([ OtpUpdateInputSchema,OtpUncheckedUpdateInputSchema ]),
}).strict() ;

export const OtpCreateManyArgsSchema: z.ZodType<Prisma.OtpCreateManyArgs> = z.object({
  data: z.union([ OtpCreateManyInputSchema,OtpCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const OtpCreateManyAndReturnArgsSchema: z.ZodType<Prisma.OtpCreateManyAndReturnArgs> = z.object({
  data: z.union([ OtpCreateManyInputSchema,OtpCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const OtpDeleteArgsSchema: z.ZodType<Prisma.OtpDeleteArgs> = z.object({
  select: OtpSelectSchema.optional(),
  where: OtpWhereUniqueInputSchema,
}).strict() ;

export const OtpUpdateArgsSchema: z.ZodType<Prisma.OtpUpdateArgs> = z.object({
  select: OtpSelectSchema.optional(),
  data: z.union([ OtpUpdateInputSchema,OtpUncheckedUpdateInputSchema ]),
  where: OtpWhereUniqueInputSchema,
}).strict() ;

export const OtpUpdateManyArgsSchema: z.ZodType<Prisma.OtpUpdateManyArgs> = z.object({
  data: z.union([ OtpUpdateManyMutationInputSchema,OtpUncheckedUpdateManyInputSchema ]),
  where: OtpWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const OtpUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.OtpUpdateManyAndReturnArgs> = z.object({
  data: z.union([ OtpUpdateManyMutationInputSchema,OtpUncheckedUpdateManyInputSchema ]),
  where: OtpWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const OtpDeleteManyArgsSchema: z.ZodType<Prisma.OtpDeleteManyArgs> = z.object({
  where: OtpWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserIdentifierCreateArgsSchema: z.ZodType<Prisma.UserIdentifierCreateArgs> = z.object({
  select: UserIdentifierSelectSchema.optional(),
  include: UserIdentifierIncludeSchema.optional(),
  data: z.union([ UserIdentifierCreateInputSchema,UserIdentifierUncheckedCreateInputSchema ]),
}).strict() ;

export const UserIdentifierUpsertArgsSchema: z.ZodType<Prisma.UserIdentifierUpsertArgs> = z.object({
  select: UserIdentifierSelectSchema.optional(),
  include: UserIdentifierIncludeSchema.optional(),
  where: UserIdentifierWhereUniqueInputSchema,
  create: z.union([ UserIdentifierCreateInputSchema,UserIdentifierUncheckedCreateInputSchema ]),
  update: z.union([ UserIdentifierUpdateInputSchema,UserIdentifierUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserIdentifierCreateManyArgsSchema: z.ZodType<Prisma.UserIdentifierCreateManyArgs> = z.object({
  data: z.union([ UserIdentifierCreateManyInputSchema,UserIdentifierCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserIdentifierCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserIdentifierCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserIdentifierCreateManyInputSchema,UserIdentifierCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserIdentifierDeleteArgsSchema: z.ZodType<Prisma.UserIdentifierDeleteArgs> = z.object({
  select: UserIdentifierSelectSchema.optional(),
  include: UserIdentifierIncludeSchema.optional(),
  where: UserIdentifierWhereUniqueInputSchema,
}).strict() ;

export const UserIdentifierUpdateArgsSchema: z.ZodType<Prisma.UserIdentifierUpdateArgs> = z.object({
  select: UserIdentifierSelectSchema.optional(),
  include: UserIdentifierIncludeSchema.optional(),
  data: z.union([ UserIdentifierUpdateInputSchema,UserIdentifierUncheckedUpdateInputSchema ]),
  where: UserIdentifierWhereUniqueInputSchema,
}).strict() ;

export const UserIdentifierUpdateManyArgsSchema: z.ZodType<Prisma.UserIdentifierUpdateManyArgs> = z.object({
  data: z.union([ UserIdentifierUpdateManyMutationInputSchema,UserIdentifierUncheckedUpdateManyInputSchema ]),
  where: UserIdentifierWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserIdentifierUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserIdentifierUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserIdentifierUpdateManyMutationInputSchema,UserIdentifierUncheckedUpdateManyInputSchema ]),
  where: UserIdentifierWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserIdentifierDeleteManyArgsSchema: z.ZodType<Prisma.UserIdentifierDeleteManyArgs> = z.object({
  where: UserIdentifierWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserProfileCreateArgsSchema: z.ZodType<Prisma.UserProfileCreateArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  data: z.union([ UserProfileCreateInputSchema,UserProfileUncheckedCreateInputSchema ]),
}).strict() ;

export const UserProfileUpsertArgsSchema: z.ZodType<Prisma.UserProfileUpsertArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  where: UserProfileWhereUniqueInputSchema,
  create: z.union([ UserProfileCreateInputSchema,UserProfileUncheckedCreateInputSchema ]),
  update: z.union([ UserProfileUpdateInputSchema,UserProfileUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserProfileCreateManyArgsSchema: z.ZodType<Prisma.UserProfileCreateManyArgs> = z.object({
  data: z.union([ UserProfileCreateManyInputSchema,UserProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserProfileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserProfileCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserProfileCreateManyInputSchema,UserProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserProfileDeleteArgsSchema: z.ZodType<Prisma.UserProfileDeleteArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  where: UserProfileWhereUniqueInputSchema,
}).strict() ;

export const UserProfileUpdateArgsSchema: z.ZodType<Prisma.UserProfileUpdateArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  data: z.union([ UserProfileUpdateInputSchema,UserProfileUncheckedUpdateInputSchema ]),
  where: UserProfileWhereUniqueInputSchema,
}).strict() ;

export const UserProfileUpdateManyArgsSchema: z.ZodType<Prisma.UserProfileUpdateManyArgs> = z.object({
  data: z.union([ UserProfileUpdateManyMutationInputSchema,UserProfileUncheckedUpdateManyInputSchema ]),
  where: UserProfileWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserProfileUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserProfileUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserProfileUpdateManyMutationInputSchema,UserProfileUncheckedUpdateManyInputSchema ]),
  where: UserProfileWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserProfileDeleteManyArgsSchema: z.ZodType<Prisma.UserProfileDeleteManyArgs> = z.object({
  where: UserProfileWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RefreshTokenCreateArgsSchema: z.ZodType<Prisma.RefreshTokenCreateArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  data: z.union([ RefreshTokenCreateInputSchema,RefreshTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const RefreshTokenUpsertArgsSchema: z.ZodType<Prisma.RefreshTokenUpsertArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereUniqueInputSchema,
  create: z.union([ RefreshTokenCreateInputSchema,RefreshTokenUncheckedCreateInputSchema ]),
  update: z.union([ RefreshTokenUpdateInputSchema,RefreshTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const RefreshTokenCreateManyArgsSchema: z.ZodType<Prisma.RefreshTokenCreateManyArgs> = z.object({
  data: z.union([ RefreshTokenCreateManyInputSchema,RefreshTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RefreshTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RefreshTokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ RefreshTokenCreateManyInputSchema,RefreshTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RefreshTokenDeleteArgsSchema: z.ZodType<Prisma.RefreshTokenDeleteArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereUniqueInputSchema,
}).strict() ;

export const RefreshTokenUpdateArgsSchema: z.ZodType<Prisma.RefreshTokenUpdateArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  data: z.union([ RefreshTokenUpdateInputSchema,RefreshTokenUncheckedUpdateInputSchema ]),
  where: RefreshTokenWhereUniqueInputSchema,
}).strict() ;

export const RefreshTokenUpdateManyArgsSchema: z.ZodType<Prisma.RefreshTokenUpdateManyArgs> = z.object({
  data: z.union([ RefreshTokenUpdateManyMutationInputSchema,RefreshTokenUncheckedUpdateManyInputSchema ]),
  where: RefreshTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RefreshTokenUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RefreshTokenUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RefreshTokenUpdateManyMutationInputSchema,RefreshTokenUncheckedUpdateManyInputSchema ]),
  where: RefreshTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RefreshTokenDeleteManyArgsSchema: z.ZodType<Prisma.RefreshTokenDeleteManyArgs> = z.object({
  where: RefreshTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;