import { z } from 'zod';
import { Prisma } from '../../../generated/prisma';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const OtpScalarFieldEnumSchema = z.enum(['id','type','hashedOtp','identifier','expiresAt','isActive','createdAt','updatedAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','password','isActive','createdAt','updatedAt']);

export const UserIdentifierScalarFieldEnumSchema = z.enum(['id','userId','type','value','isVerified','isPrimary','isActive','createdAt','updatedAt']);

export const UserProfileScalarFieldEnumSchema = z.enum(['id','userId','name','avatarUrl','contactEmail','isActive','createdAt','updatedAt']);

export const RefreshTokenScalarFieldEnumSchema = z.enum(['id','token','userId','userAgent','ipAddress','expiresAt','revokedAt','createdAt','updatedAt']);

export const RegionScalarFieldEnumSchema = z.enum(['id','name','translations','wikiDataId']);

export const SubregionScalarFieldEnumSchema = z.enum(['id','name','translations','wikiDataId','regionId']);

export const CurrencyScalarFieldEnumSchema = z.enum(['id','code','name','symbol']);

export const PhoneCodeScalarFieldEnumSchema = z.enum(['id','code']);

export const TimeZoneScalarFieldEnumSchema = z.enum(['id','name','offset']);

export const TranslationScalarFieldEnumSchema = z.enum(['id','language','value','countryId']);

export const CountryScalarFieldEnumSchema = z.enum(['id','name','iso3','iso2','numericCode','capital','tld','native','latitude','longitude','emoji','emojiU','wikiDataId','regionId','subregionId','currencyId','phoneCodeId']);

export const StateScalarFieldEnumSchema = z.enum(['id','name','iso2','fipsCode','type','latitude','longitude','wikiDataId','countryId']);

export const CityScalarFieldEnumSchema = z.enum(['id','name','stateCode','countryCode','latitude','longitude','wikiDataId','stateId','countryId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const OtpTypeSchema = z.enum(['SIGN_UP','LOGIN','FORGET_PASSWORD']);

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
  hashedOtp: z.string(),
  identifier: z.string(),
  expiresAt: z.coerce.date(),
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
  name: z.string(),
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
// REGION SCHEMA
/////////////////////////////////////////

export const RegionSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  translations: JsonValueSchema.nullable(),
  wikiDataId: z.string().nullable(),
})

export type Region = z.infer<typeof RegionSchema>

/////////////////////////////////////////
// SUBREGION SCHEMA
/////////////////////////////////////////

export const SubregionSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  translations: JsonValueSchema.nullable(),
  wikiDataId: z.string().nullable(),
  regionId: z.number().int(),
})

export type Subregion = z.infer<typeof SubregionSchema>

/////////////////////////////////////////
// CURRENCY SCHEMA
/////////////////////////////////////////

export const CurrencySchema = z.object({
  id: z.number().int(),
  code: z.string(),
  name: z.string().nullable(),
  symbol: z.string().nullable(),
})

export type Currency = z.infer<typeof CurrencySchema>

/////////////////////////////////////////
// PHONE CODE SCHEMA
/////////////////////////////////////////

export const PhoneCodeSchema = z.object({
  id: z.number().int(),
  code: z.string(),
})

export type PhoneCode = z.infer<typeof PhoneCodeSchema>

/////////////////////////////////////////
// TIME ZONE SCHEMA
/////////////////////////////////////////

export const TimeZoneSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  offset: z.string().nullable(),
})

export type TimeZone = z.infer<typeof TimeZoneSchema>

/////////////////////////////////////////
// TRANSLATION SCHEMA
/////////////////////////////////////////

export const TranslationSchema = z.object({
  id: z.number().int(),
  language: z.string(),
  value: JsonValueSchema,
  countryId: z.number().int().nullable(),
})

export type Translation = z.infer<typeof TranslationSchema>

/////////////////////////////////////////
// COUNTRY SCHEMA
/////////////////////////////////////////

export const CountrySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  iso3: z.string().nullable(),
  iso2: z.string().nullable(),
  numericCode: z.string().nullable(),
  capital: z.string().nullable(),
  tld: z.string().nullable(),
  native: z.string().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
  emoji: z.string().nullable(),
  emojiU: z.string().nullable(),
  wikiDataId: z.string().nullable(),
  regionId: z.number().int().nullable(),
  subregionId: z.number().int().nullable(),
  currencyId: z.number().int().nullable(),
  phoneCodeId: z.number().int().nullable(),
})

export type Country = z.infer<typeof CountrySchema>

/////////////////////////////////////////
// STATE SCHEMA
/////////////////////////////////////////

export const StateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  iso2: z.string().nullable(),
  fipsCode: z.string().nullable(),
  type: z.string().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
  wikiDataId: z.string().nullable(),
  countryId: z.number().int(),
})

export type State = z.infer<typeof StateSchema>

/////////////////////////////////////////
// CITY SCHEMA
/////////////////////////////////////////

export const CitySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  stateCode: z.string().nullable(),
  countryCode: z.string().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
  wikiDataId: z.string().nullable(),
  stateId: z.number().int(),
  countryId: z.number().int(),
})

export type City = z.infer<typeof CitySchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// OTP
//------------------------------------------------------

export const OtpSelectSchema: z.ZodType<Prisma.OtpSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  hashedOtp: z.boolean().optional(),
  identifier: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
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
  name: z.boolean().optional(),
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

// REGION
//------------------------------------------------------

export const RegionIncludeSchema: z.ZodType<Prisma.RegionInclude> = z.object({
  subregions: z.union([z.boolean(),z.lazy(() => SubregionFindManyArgsSchema)]).optional(),
  countries: z.union([z.boolean(),z.lazy(() => CountryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RegionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RegionArgsSchema: z.ZodType<Prisma.RegionDefaultArgs> = z.object({
  select: z.lazy(() => RegionSelectSchema).optional(),
  include: z.lazy(() => RegionIncludeSchema).optional(),
}).strict();

export const RegionCountOutputTypeArgsSchema: z.ZodType<Prisma.RegionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RegionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RegionCountOutputTypeSelectSchema: z.ZodType<Prisma.RegionCountOutputTypeSelect> = z.object({
  subregions: z.boolean().optional(),
  countries: z.boolean().optional(),
}).strict();

export const RegionSelectSchema: z.ZodType<Prisma.RegionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  translations: z.boolean().optional(),
  wikiDataId: z.boolean().optional(),
  subregions: z.union([z.boolean(),z.lazy(() => SubregionFindManyArgsSchema)]).optional(),
  countries: z.union([z.boolean(),z.lazy(() => CountryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RegionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SUBREGION
//------------------------------------------------------

export const SubregionIncludeSchema: z.ZodType<Prisma.SubregionInclude> = z.object({
  region: z.union([z.boolean(),z.lazy(() => RegionArgsSchema)]).optional(),
  countries: z.union([z.boolean(),z.lazy(() => CountryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SubregionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SubregionArgsSchema: z.ZodType<Prisma.SubregionDefaultArgs> = z.object({
  select: z.lazy(() => SubregionSelectSchema).optional(),
  include: z.lazy(() => SubregionIncludeSchema).optional(),
}).strict();

export const SubregionCountOutputTypeArgsSchema: z.ZodType<Prisma.SubregionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SubregionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SubregionCountOutputTypeSelectSchema: z.ZodType<Prisma.SubregionCountOutputTypeSelect> = z.object({
  countries: z.boolean().optional(),
}).strict();

export const SubregionSelectSchema: z.ZodType<Prisma.SubregionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  translations: z.boolean().optional(),
  wikiDataId: z.boolean().optional(),
  regionId: z.boolean().optional(),
  region: z.union([z.boolean(),z.lazy(() => RegionArgsSchema)]).optional(),
  countries: z.union([z.boolean(),z.lazy(() => CountryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SubregionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CURRENCY
//------------------------------------------------------

export const CurrencyIncludeSchema: z.ZodType<Prisma.CurrencyInclude> = z.object({
  countries: z.union([z.boolean(),z.lazy(() => CountryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CurrencyCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CurrencyArgsSchema: z.ZodType<Prisma.CurrencyDefaultArgs> = z.object({
  select: z.lazy(() => CurrencySelectSchema).optional(),
  include: z.lazy(() => CurrencyIncludeSchema).optional(),
}).strict();

export const CurrencyCountOutputTypeArgsSchema: z.ZodType<Prisma.CurrencyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CurrencyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CurrencyCountOutputTypeSelectSchema: z.ZodType<Prisma.CurrencyCountOutputTypeSelect> = z.object({
  countries: z.boolean().optional(),
}).strict();

export const CurrencySelectSchema: z.ZodType<Prisma.CurrencySelect> = z.object({
  id: z.boolean().optional(),
  code: z.boolean().optional(),
  name: z.boolean().optional(),
  symbol: z.boolean().optional(),
  countries: z.union([z.boolean(),z.lazy(() => CountryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CurrencyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PHONE CODE
//------------------------------------------------------

export const PhoneCodeIncludeSchema: z.ZodType<Prisma.PhoneCodeInclude> = z.object({
  countries: z.union([z.boolean(),z.lazy(() => CountryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PhoneCodeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PhoneCodeArgsSchema: z.ZodType<Prisma.PhoneCodeDefaultArgs> = z.object({
  select: z.lazy(() => PhoneCodeSelectSchema).optional(),
  include: z.lazy(() => PhoneCodeIncludeSchema).optional(),
}).strict();

export const PhoneCodeCountOutputTypeArgsSchema: z.ZodType<Prisma.PhoneCodeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PhoneCodeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PhoneCodeCountOutputTypeSelectSchema: z.ZodType<Prisma.PhoneCodeCountOutputTypeSelect> = z.object({
  countries: z.boolean().optional(),
}).strict();

export const PhoneCodeSelectSchema: z.ZodType<Prisma.PhoneCodeSelect> = z.object({
  id: z.boolean().optional(),
  code: z.boolean().optional(),
  countries: z.union([z.boolean(),z.lazy(() => CountryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PhoneCodeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TIME ZONE
//------------------------------------------------------

export const TimeZoneIncludeSchema: z.ZodType<Prisma.TimeZoneInclude> = z.object({
  countries: z.union([z.boolean(),z.lazy(() => CountryFindManyArgsSchema)]).optional(),
  Country: z.union([z.boolean(),z.lazy(() => CountryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TimeZoneCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TimeZoneArgsSchema: z.ZodType<Prisma.TimeZoneDefaultArgs> = z.object({
  select: z.lazy(() => TimeZoneSelectSchema).optional(),
  include: z.lazy(() => TimeZoneIncludeSchema).optional(),
}).strict();

export const TimeZoneCountOutputTypeArgsSchema: z.ZodType<Prisma.TimeZoneCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TimeZoneCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TimeZoneCountOutputTypeSelectSchema: z.ZodType<Prisma.TimeZoneCountOutputTypeSelect> = z.object({
  countries: z.boolean().optional(),
  Country: z.boolean().optional(),
}).strict();

export const TimeZoneSelectSchema: z.ZodType<Prisma.TimeZoneSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  offset: z.boolean().optional(),
  countries: z.union([z.boolean(),z.lazy(() => CountryFindManyArgsSchema)]).optional(),
  Country: z.union([z.boolean(),z.lazy(() => CountryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TimeZoneCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRANSLATION
//------------------------------------------------------

export const TranslationIncludeSchema: z.ZodType<Prisma.TranslationInclude> = z.object({
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
}).strict()

export const TranslationArgsSchema: z.ZodType<Prisma.TranslationDefaultArgs> = z.object({
  select: z.lazy(() => TranslationSelectSchema).optional(),
  include: z.lazy(() => TranslationIncludeSchema).optional(),
}).strict();

export const TranslationSelectSchema: z.ZodType<Prisma.TranslationSelect> = z.object({
  id: z.boolean().optional(),
  language: z.boolean().optional(),
  value: z.boolean().optional(),
  countryId: z.boolean().optional(),
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
}).strict()

// COUNTRY
//------------------------------------------------------

export const CountryIncludeSchema: z.ZodType<Prisma.CountryInclude> = z.object({
  region: z.union([z.boolean(),z.lazy(() => RegionArgsSchema)]).optional(),
  subregion: z.union([z.boolean(),z.lazy(() => SubregionArgsSchema)]).optional(),
  currency: z.union([z.boolean(),z.lazy(() => CurrencyArgsSchema)]).optional(),
  phoneCode: z.union([z.boolean(),z.lazy(() => PhoneCodeArgsSchema)]).optional(),
  timezones: z.union([z.boolean(),z.lazy(() => TimeZoneFindManyArgsSchema)]).optional(),
  translations: z.union([z.boolean(),z.lazy(() => TranslationFindManyArgsSchema)]).optional(),
  states: z.union([z.boolean(),z.lazy(() => StateFindManyArgsSchema)]).optional(),
  TimeZone: z.union([z.boolean(),z.lazy(() => TimeZoneFindManyArgsSchema)]).optional(),
  City: z.union([z.boolean(),z.lazy(() => CityFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CountryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CountryArgsSchema: z.ZodType<Prisma.CountryDefaultArgs> = z.object({
  select: z.lazy(() => CountrySelectSchema).optional(),
  include: z.lazy(() => CountryIncludeSchema).optional(),
}).strict();

export const CountryCountOutputTypeArgsSchema: z.ZodType<Prisma.CountryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CountryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CountryCountOutputTypeSelectSchema: z.ZodType<Prisma.CountryCountOutputTypeSelect> = z.object({
  timezones: z.boolean().optional(),
  translations: z.boolean().optional(),
  states: z.boolean().optional(),
  TimeZone: z.boolean().optional(),
  City: z.boolean().optional(),
}).strict();

export const CountrySelectSchema: z.ZodType<Prisma.CountrySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  iso3: z.boolean().optional(),
  iso2: z.boolean().optional(),
  numericCode: z.boolean().optional(),
  capital: z.boolean().optional(),
  tld: z.boolean().optional(),
  native: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  emoji: z.boolean().optional(),
  emojiU: z.boolean().optional(),
  wikiDataId: z.boolean().optional(),
  regionId: z.boolean().optional(),
  subregionId: z.boolean().optional(),
  currencyId: z.boolean().optional(),
  phoneCodeId: z.boolean().optional(),
  region: z.union([z.boolean(),z.lazy(() => RegionArgsSchema)]).optional(),
  subregion: z.union([z.boolean(),z.lazy(() => SubregionArgsSchema)]).optional(),
  currency: z.union([z.boolean(),z.lazy(() => CurrencyArgsSchema)]).optional(),
  phoneCode: z.union([z.boolean(),z.lazy(() => PhoneCodeArgsSchema)]).optional(),
  timezones: z.union([z.boolean(),z.lazy(() => TimeZoneFindManyArgsSchema)]).optional(),
  translations: z.union([z.boolean(),z.lazy(() => TranslationFindManyArgsSchema)]).optional(),
  states: z.union([z.boolean(),z.lazy(() => StateFindManyArgsSchema)]).optional(),
  TimeZone: z.union([z.boolean(),z.lazy(() => TimeZoneFindManyArgsSchema)]).optional(),
  City: z.union([z.boolean(),z.lazy(() => CityFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CountryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STATE
//------------------------------------------------------

export const StateIncludeSchema: z.ZodType<Prisma.StateInclude> = z.object({
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
  cities: z.union([z.boolean(),z.lazy(() => CityFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StateCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const StateArgsSchema: z.ZodType<Prisma.StateDefaultArgs> = z.object({
  select: z.lazy(() => StateSelectSchema).optional(),
  include: z.lazy(() => StateIncludeSchema).optional(),
}).strict();

export const StateCountOutputTypeArgsSchema: z.ZodType<Prisma.StateCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => StateCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StateCountOutputTypeSelectSchema: z.ZodType<Prisma.StateCountOutputTypeSelect> = z.object({
  cities: z.boolean().optional(),
}).strict();

export const StateSelectSchema: z.ZodType<Prisma.StateSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  iso2: z.boolean().optional(),
  fipsCode: z.boolean().optional(),
  type: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  wikiDataId: z.boolean().optional(),
  countryId: z.boolean().optional(),
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
  cities: z.union([z.boolean(),z.lazy(() => CityFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StateCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CITY
//------------------------------------------------------

export const CityIncludeSchema: z.ZodType<Prisma.CityInclude> = z.object({
  state: z.union([z.boolean(),z.lazy(() => StateArgsSchema)]).optional(),
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
}).strict()

export const CityArgsSchema: z.ZodType<Prisma.CityDefaultArgs> = z.object({
  select: z.lazy(() => CitySelectSchema).optional(),
  include: z.lazy(() => CityIncludeSchema).optional(),
}).strict();

export const CitySelectSchema: z.ZodType<Prisma.CitySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  stateCode: z.boolean().optional(),
  countryCode: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  wikiDataId: z.boolean().optional(),
  stateId: z.boolean().optional(),
  countryId: z.boolean().optional(),
  state: z.union([z.boolean(),z.lazy(() => StateArgsSchema)]).optional(),
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
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
  hashedOtp: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const OtpOrderByWithRelationInputSchema: z.ZodType<Prisma.OtpOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  hashedOtp: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
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
  hashedOtp: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const OtpOrderByWithAggregationInputSchema: z.ZodType<Prisma.OtpOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  hashedOtp: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
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
  hashedOtp: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
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
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
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
  name: z.lazy(() => SortOrderSchema).optional(),
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
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
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
  name: z.lazy(() => SortOrderSchema).optional(),
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
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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

export const RegionWhereInputSchema: z.ZodType<Prisma.RegionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RegionWhereInputSchema),z.lazy(() => RegionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RegionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RegionWhereInputSchema),z.lazy(() => RegionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  translations: z.lazy(() => JsonNullableFilterSchema).optional(),
  wikiDataId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  subregions: z.lazy(() => SubregionListRelationFilterSchema).optional(),
  countries: z.lazy(() => CountryListRelationFilterSchema).optional()
}).strict();

export const RegionOrderByWithRelationInputSchema: z.ZodType<Prisma.RegionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  translations: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  wikiDataId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  subregions: z.lazy(() => SubregionOrderByRelationAggregateInputSchema).optional(),
  countries: z.lazy(() => CountryOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RegionWhereUniqueInputSchema: z.ZodType<Prisma.RegionWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => RegionWhereInputSchema),z.lazy(() => RegionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RegionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RegionWhereInputSchema),z.lazy(() => RegionWhereInputSchema).array() ]).optional(),
  translations: z.lazy(() => JsonNullableFilterSchema).optional(),
  wikiDataId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  subregions: z.lazy(() => SubregionListRelationFilterSchema).optional(),
  countries: z.lazy(() => CountryListRelationFilterSchema).optional()
}).strict());

export const RegionOrderByWithAggregationInputSchema: z.ZodType<Prisma.RegionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  translations: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  wikiDataId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => RegionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RegionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RegionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RegionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RegionSumOrderByAggregateInputSchema).optional()
}).strict();

export const RegionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RegionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RegionScalarWhereWithAggregatesInputSchema),z.lazy(() => RegionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RegionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RegionScalarWhereWithAggregatesInputSchema),z.lazy(() => RegionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  translations: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  wikiDataId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SubregionWhereInputSchema: z.ZodType<Prisma.SubregionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SubregionWhereInputSchema),z.lazy(() => SubregionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubregionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubregionWhereInputSchema),z.lazy(() => SubregionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  translations: z.lazy(() => JsonNullableFilterSchema).optional(),
  wikiDataId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  regionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  region: z.union([ z.lazy(() => RegionScalarRelationFilterSchema),z.lazy(() => RegionWhereInputSchema) ]).optional(),
  countries: z.lazy(() => CountryListRelationFilterSchema).optional()
}).strict();

export const SubregionOrderByWithRelationInputSchema: z.ZodType<Prisma.SubregionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  translations: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  wikiDataId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional(),
  region: z.lazy(() => RegionOrderByWithRelationInputSchema).optional(),
  countries: z.lazy(() => CountryOrderByRelationAggregateInputSchema).optional()
}).strict();

export const SubregionWhereUniqueInputSchema: z.ZodType<Prisma.SubregionWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => SubregionWhereInputSchema),z.lazy(() => SubregionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubregionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubregionWhereInputSchema),z.lazy(() => SubregionWhereInputSchema).array() ]).optional(),
  translations: z.lazy(() => JsonNullableFilterSchema).optional(),
  wikiDataId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  regionId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  region: z.union([ z.lazy(() => RegionScalarRelationFilterSchema),z.lazy(() => RegionWhereInputSchema) ]).optional(),
  countries: z.lazy(() => CountryListRelationFilterSchema).optional()
}).strict());

export const SubregionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubregionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  translations: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  wikiDataId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SubregionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SubregionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SubregionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SubregionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SubregionSumOrderByAggregateInputSchema).optional()
}).strict();

export const SubregionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubregionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SubregionScalarWhereWithAggregatesInputSchema),z.lazy(() => SubregionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubregionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubregionScalarWhereWithAggregatesInputSchema),z.lazy(() => SubregionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  translations: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  wikiDataId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  regionId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const CurrencyWhereInputSchema: z.ZodType<Prisma.CurrencyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CurrencyWhereInputSchema),z.lazy(() => CurrencyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CurrencyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CurrencyWhereInputSchema),z.lazy(() => CurrencyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  symbol: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  countries: z.lazy(() => CountryListRelationFilterSchema).optional()
}).strict();

export const CurrencyOrderByWithRelationInputSchema: z.ZodType<Prisma.CurrencyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  symbol: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  countries: z.lazy(() => CountryOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CurrencyWhereUniqueInputSchema: z.ZodType<Prisma.CurrencyWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    code: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    code: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  code: z.string().optional(),
  AND: z.union([ z.lazy(() => CurrencyWhereInputSchema),z.lazy(() => CurrencyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CurrencyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CurrencyWhereInputSchema),z.lazy(() => CurrencyWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  symbol: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  countries: z.lazy(() => CountryListRelationFilterSchema).optional()
}).strict());

export const CurrencyOrderByWithAggregationInputSchema: z.ZodType<Prisma.CurrencyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  symbol: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CurrencyCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CurrencyAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CurrencyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CurrencyMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CurrencySumOrderByAggregateInputSchema).optional()
}).strict();

export const CurrencyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CurrencyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema),z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema),z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  symbol: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PhoneCodeWhereInputSchema: z.ZodType<Prisma.PhoneCodeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PhoneCodeWhereInputSchema),z.lazy(() => PhoneCodeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PhoneCodeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PhoneCodeWhereInputSchema),z.lazy(() => PhoneCodeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  countries: z.lazy(() => CountryListRelationFilterSchema).optional()
}).strict();

export const PhoneCodeOrderByWithRelationInputSchema: z.ZodType<Prisma.PhoneCodeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  countries: z.lazy(() => CountryOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PhoneCodeWhereUniqueInputSchema: z.ZodType<Prisma.PhoneCodeWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    code: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    code: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  code: z.string().optional(),
  AND: z.union([ z.lazy(() => PhoneCodeWhereInputSchema),z.lazy(() => PhoneCodeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PhoneCodeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PhoneCodeWhereInputSchema),z.lazy(() => PhoneCodeWhereInputSchema).array() ]).optional(),
  countries: z.lazy(() => CountryListRelationFilterSchema).optional()
}).strict());

export const PhoneCodeOrderByWithAggregationInputSchema: z.ZodType<Prisma.PhoneCodeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PhoneCodeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PhoneCodeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PhoneCodeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PhoneCodeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PhoneCodeSumOrderByAggregateInputSchema).optional()
}).strict();

export const PhoneCodeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PhoneCodeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PhoneCodeScalarWhereWithAggregatesInputSchema),z.lazy(() => PhoneCodeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PhoneCodeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PhoneCodeScalarWhereWithAggregatesInputSchema),z.lazy(() => PhoneCodeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TimeZoneWhereInputSchema: z.ZodType<Prisma.TimeZoneWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TimeZoneWhereInputSchema),z.lazy(() => TimeZoneWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TimeZoneWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TimeZoneWhereInputSchema),z.lazy(() => TimeZoneWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  offset: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  countries: z.lazy(() => CountryListRelationFilterSchema).optional(),
  Country: z.lazy(() => CountryListRelationFilterSchema).optional()
}).strict();

export const TimeZoneOrderByWithRelationInputSchema: z.ZodType<Prisma.TimeZoneOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  offset: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  countries: z.lazy(() => CountryOrderByRelationAggregateInputSchema).optional(),
  Country: z.lazy(() => CountryOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TimeZoneWhereUniqueInputSchema: z.ZodType<Prisma.TimeZoneWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => TimeZoneWhereInputSchema),z.lazy(() => TimeZoneWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TimeZoneWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TimeZoneWhereInputSchema),z.lazy(() => TimeZoneWhereInputSchema).array() ]).optional(),
  offset: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  countries: z.lazy(() => CountryListRelationFilterSchema).optional(),
  Country: z.lazy(() => CountryListRelationFilterSchema).optional()
}).strict());

export const TimeZoneOrderByWithAggregationInputSchema: z.ZodType<Prisma.TimeZoneOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  offset: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TimeZoneCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TimeZoneAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TimeZoneMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TimeZoneMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TimeZoneSumOrderByAggregateInputSchema).optional()
}).strict();

export const TimeZoneScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TimeZoneScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TimeZoneScalarWhereWithAggregatesInputSchema),z.lazy(() => TimeZoneScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TimeZoneScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TimeZoneScalarWhereWithAggregatesInputSchema),z.lazy(() => TimeZoneScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  offset: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const TranslationWhereInputSchema: z.ZodType<Prisma.TranslationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TranslationWhereInputSchema),z.lazy(() => TranslationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranslationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranslationWhereInputSchema),z.lazy(() => TranslationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.lazy(() => JsonFilterSchema).optional(),
  countryId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  country: z.union([ z.lazy(() => CountryNullableScalarRelationFilterSchema),z.lazy(() => CountryWhereInputSchema) ]).optional().nullable(),
}).strict();

export const TranslationOrderByWithRelationInputSchema: z.ZodType<Prisma.TranslationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  country: z.lazy(() => CountryOrderByWithRelationInputSchema).optional()
}).strict();

export const TranslationWhereUniqueInputSchema: z.ZodType<Prisma.TranslationWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => TranslationWhereInputSchema),z.lazy(() => TranslationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranslationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranslationWhereInputSchema),z.lazy(() => TranslationWhereInputSchema).array() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.lazy(() => JsonFilterSchema).optional(),
  countryId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  country: z.union([ z.lazy(() => CountryNullableScalarRelationFilterSchema),z.lazy(() => CountryWhereInputSchema) ]).optional().nullable(),
}).strict());

export const TranslationOrderByWithAggregationInputSchema: z.ZodType<Prisma.TranslationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TranslationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TranslationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TranslationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TranslationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TranslationSumOrderByAggregateInputSchema).optional()
}).strict();

export const TranslationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TranslationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema),z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema),z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  language: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  countryId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const CountryWhereInputSchema: z.ZodType<Prisma.CountryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  iso3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  iso2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  numericCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  capital: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tld: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  native: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emoji: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emojiU: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  wikiDataId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  regionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  subregionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  currencyId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  phoneCodeId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  region: z.union([ z.lazy(() => RegionNullableScalarRelationFilterSchema),z.lazy(() => RegionWhereInputSchema) ]).optional().nullable(),
  subregion: z.union([ z.lazy(() => SubregionNullableScalarRelationFilterSchema),z.lazy(() => SubregionWhereInputSchema) ]).optional().nullable(),
  currency: z.union([ z.lazy(() => CurrencyNullableScalarRelationFilterSchema),z.lazy(() => CurrencyWhereInputSchema) ]).optional().nullable(),
  phoneCode: z.union([ z.lazy(() => PhoneCodeNullableScalarRelationFilterSchema),z.lazy(() => PhoneCodeWhereInputSchema) ]).optional().nullable(),
  timezones: z.lazy(() => TimeZoneListRelationFilterSchema).optional(),
  translations: z.lazy(() => TranslationListRelationFilterSchema).optional(),
  states: z.lazy(() => StateListRelationFilterSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneListRelationFilterSchema).optional(),
  City: z.lazy(() => CityListRelationFilterSchema).optional()
}).strict();

export const CountryOrderByWithRelationInputSchema: z.ZodType<Prisma.CountryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iso3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  iso2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  numericCode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  capital: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tld: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  native: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emoji: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emojiU: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  wikiDataId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  regionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  subregionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  currencyId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneCodeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  region: z.lazy(() => RegionOrderByWithRelationInputSchema).optional(),
  subregion: z.lazy(() => SubregionOrderByWithRelationInputSchema).optional(),
  currency: z.lazy(() => CurrencyOrderByWithRelationInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeOrderByWithRelationInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneOrderByRelationAggregateInputSchema).optional(),
  translations: z.lazy(() => TranslationOrderByRelationAggregateInputSchema).optional(),
  states: z.lazy(() => StateOrderByRelationAggregateInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneOrderByRelationAggregateInputSchema).optional(),
  City: z.lazy(() => CityOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CountryWhereUniqueInputSchema: z.ZodType<Prisma.CountryWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    iso2: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    iso2: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  iso2: z.string().optional(),
  AND: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  iso3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  numericCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  capital: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tld: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  native: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emoji: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emojiU: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  wikiDataId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  regionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  subregionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  currencyId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  phoneCodeId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  region: z.union([ z.lazy(() => RegionNullableScalarRelationFilterSchema),z.lazy(() => RegionWhereInputSchema) ]).optional().nullable(),
  subregion: z.union([ z.lazy(() => SubregionNullableScalarRelationFilterSchema),z.lazy(() => SubregionWhereInputSchema) ]).optional().nullable(),
  currency: z.union([ z.lazy(() => CurrencyNullableScalarRelationFilterSchema),z.lazy(() => CurrencyWhereInputSchema) ]).optional().nullable(),
  phoneCode: z.union([ z.lazy(() => PhoneCodeNullableScalarRelationFilterSchema),z.lazy(() => PhoneCodeWhereInputSchema) ]).optional().nullable(),
  timezones: z.lazy(() => TimeZoneListRelationFilterSchema).optional(),
  translations: z.lazy(() => TranslationListRelationFilterSchema).optional(),
  states: z.lazy(() => StateListRelationFilterSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneListRelationFilterSchema).optional(),
  City: z.lazy(() => CityListRelationFilterSchema).optional()
}).strict());

export const CountryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CountryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iso3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  iso2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  numericCode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  capital: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tld: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  native: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emoji: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emojiU: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  wikiDataId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  regionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  subregionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  currencyId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneCodeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CountryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CountryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CountryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CountryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CountrySumOrderByAggregateInputSchema).optional()
}).strict();

export const CountryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CountryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CountryScalarWhereWithAggregatesInputSchema),z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryScalarWhereWithAggregatesInputSchema),z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  iso3: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  iso2: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  numericCode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  capital: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  tld: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  native: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emoji: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emojiU: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  wikiDataId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  regionId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  subregionId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  currencyId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  phoneCodeId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const StateWhereInputSchema: z.ZodType<Prisma.StateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StateWhereInputSchema),z.lazy(() => StateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StateWhereInputSchema),z.lazy(() => StateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  iso2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fipsCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  wikiDataId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  countryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  country: z.union([ z.lazy(() => CountryScalarRelationFilterSchema),z.lazy(() => CountryWhereInputSchema) ]).optional(),
  cities: z.lazy(() => CityListRelationFilterSchema).optional()
}).strict();

export const StateOrderByWithRelationInputSchema: z.ZodType<Prisma.StateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iso2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fipsCode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  wikiDataId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => CountryOrderByWithRelationInputSchema).optional(),
  cities: z.lazy(() => CityOrderByRelationAggregateInputSchema).optional()
}).strict();

export const StateWhereUniqueInputSchema: z.ZodType<Prisma.StateWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => StateWhereInputSchema),z.lazy(() => StateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StateWhereInputSchema),z.lazy(() => StateWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  iso2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fipsCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  wikiDataId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  countryId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  country: z.union([ z.lazy(() => CountryScalarRelationFilterSchema),z.lazy(() => CountryWhereInputSchema) ]).optional(),
  cities: z.lazy(() => CityListRelationFilterSchema).optional()
}).strict());

export const StateOrderByWithAggregationInputSchema: z.ZodType<Prisma.StateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iso2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fipsCode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  wikiDataId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StateCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StateAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StateMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StateSumOrderByAggregateInputSchema).optional()
}).strict();

export const StateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StateScalarWhereWithAggregatesInputSchema),z.lazy(() => StateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StateScalarWhereWithAggregatesInputSchema),z.lazy(() => StateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  iso2: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  fipsCode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  wikiDataId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  countryId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const CityWhereInputSchema: z.ZodType<Prisma.CityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stateCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  countryCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  wikiDataId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stateId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  countryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  state: z.union([ z.lazy(() => StateScalarRelationFilterSchema),z.lazy(() => StateWhereInputSchema) ]).optional(),
  country: z.union([ z.lazy(() => CountryScalarRelationFilterSchema),z.lazy(() => CountryWhereInputSchema) ]).optional(),
}).strict();

export const CityOrderByWithRelationInputSchema: z.ZodType<Prisma.CityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stateCode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  countryCode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  wikiDataId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => StateOrderByWithRelationInputSchema).optional(),
  country: z.lazy(() => CountryOrderByWithRelationInputSchema).optional()
}).strict();

export const CityWhereUniqueInputSchema: z.ZodType<Prisma.CityWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stateCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  countryCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  wikiDataId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stateId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  countryId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  state: z.union([ z.lazy(() => StateScalarRelationFilterSchema),z.lazy(() => StateWhereInputSchema) ]).optional(),
  country: z.union([ z.lazy(() => CountryScalarRelationFilterSchema),z.lazy(() => CountryWhereInputSchema) ]).optional(),
}).strict());

export const CityOrderByWithAggregationInputSchema: z.ZodType<Prisma.CityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stateCode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  countryCode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  wikiDataId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CityCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CityAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CityMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CitySumOrderByAggregateInputSchema).optional()
}).strict();

export const CityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CityScalarWhereWithAggregatesInputSchema),z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityScalarWhereWithAggregatesInputSchema),z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  stateCode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  countryCode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  wikiDataId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  stateId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  countryId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const OtpCreateInputSchema: z.ZodType<Prisma.OtpCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => OtpTypeSchema),
  hashedOtp: z.string(),
  identifier: z.string(),
  expiresAt: z.coerce.date(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const OtpUncheckedCreateInputSchema: z.ZodType<Prisma.OtpUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => OtpTypeSchema),
  hashedOtp: z.string(),
  identifier: z.string(),
  expiresAt: z.coerce.date(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const OtpUpdateInputSchema: z.ZodType<Prisma.OtpUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => OtpTypeSchema),z.lazy(() => EnumOtpTypeFieldUpdateOperationsInputSchema) ]).optional(),
  hashedOtp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OtpUncheckedUpdateInputSchema: z.ZodType<Prisma.OtpUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => OtpTypeSchema),z.lazy(() => EnumOtpTypeFieldUpdateOperationsInputSchema) ]).optional(),
  hashedOtp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OtpCreateManyInputSchema: z.ZodType<Prisma.OtpCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => OtpTypeSchema),
  hashedOtp: z.string(),
  identifier: z.string(),
  expiresAt: z.coerce.date(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const OtpUpdateManyMutationInputSchema: z.ZodType<Prisma.OtpUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => OtpTypeSchema),z.lazy(() => EnumOtpTypeFieldUpdateOperationsInputSchema) ]).optional(),
  hashedOtp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OtpUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OtpUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => OtpTypeSchema),z.lazy(() => EnumOtpTypeFieldUpdateOperationsInputSchema) ]).optional(),
  hashedOtp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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
  name: z.string(),
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
  name: z.string(),
  avatarUrl: z.string().optional().nullable(),
  contactEmail: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserProfileUpdateInputSchema: z.ZodType<Prisma.UserProfileUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProfileCreateManyInputSchema: z.ZodType<Prisma.UserProfileCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  name: z.string(),
  avatarUrl: z.string().optional().nullable(),
  contactEmail: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.UserProfileUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const RegionCreateInputSchema: z.ZodType<Prisma.RegionCreateInput> = z.object({
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable(),
  subregions: z.lazy(() => SubregionCreateNestedManyWithoutRegionInputSchema).optional(),
  countries: z.lazy(() => CountryCreateNestedManyWithoutRegionInputSchema).optional()
}).strict();

export const RegionUncheckedCreateInputSchema: z.ZodType<Prisma.RegionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable(),
  subregions: z.lazy(() => SubregionUncheckedCreateNestedManyWithoutRegionInputSchema).optional(),
  countries: z.lazy(() => CountryUncheckedCreateNestedManyWithoutRegionInputSchema).optional()
}).strict();

export const RegionUpdateInputSchema: z.ZodType<Prisma.RegionUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregions: z.lazy(() => SubregionUpdateManyWithoutRegionNestedInputSchema).optional(),
  countries: z.lazy(() => CountryUpdateManyWithoutRegionNestedInputSchema).optional()
}).strict();

export const RegionUncheckedUpdateInputSchema: z.ZodType<Prisma.RegionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregions: z.lazy(() => SubregionUncheckedUpdateManyWithoutRegionNestedInputSchema).optional(),
  countries: z.lazy(() => CountryUncheckedUpdateManyWithoutRegionNestedInputSchema).optional()
}).strict();

export const RegionCreateManyInputSchema: z.ZodType<Prisma.RegionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable()
}).strict();

export const RegionUpdateManyMutationInputSchema: z.ZodType<Prisma.RegionUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RegionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RegionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SubregionCreateInputSchema: z.ZodType<Prisma.SubregionCreateInput> = z.object({
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable(),
  region: z.lazy(() => RegionCreateNestedOneWithoutSubregionsInputSchema),
  countries: z.lazy(() => CountryCreateNestedManyWithoutSubregionInputSchema).optional()
}).strict();

export const SubregionUncheckedCreateInputSchema: z.ZodType<Prisma.SubregionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int(),
  countries: z.lazy(() => CountryUncheckedCreateNestedManyWithoutSubregionInputSchema).optional()
}).strict();

export const SubregionUpdateInputSchema: z.ZodType<Prisma.SubregionUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  region: z.lazy(() => RegionUpdateOneRequiredWithoutSubregionsNestedInputSchema).optional(),
  countries: z.lazy(() => CountryUpdateManyWithoutSubregionNestedInputSchema).optional()
}).strict();

export const SubregionUncheckedUpdateInputSchema: z.ZodType<Prisma.SubregionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  countries: z.lazy(() => CountryUncheckedUpdateManyWithoutSubregionNestedInputSchema).optional()
}).strict();

export const SubregionCreateManyInputSchema: z.ZodType<Prisma.SubregionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int()
}).strict();

export const SubregionUpdateManyMutationInputSchema: z.ZodType<Prisma.SubregionUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SubregionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SubregionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CurrencyCreateInputSchema: z.ZodType<Prisma.CurrencyCreateInput> = z.object({
  code: z.string(),
  name: z.string().optional().nullable(),
  symbol: z.string().optional().nullable(),
  countries: z.lazy(() => CountryCreateNestedManyWithoutCurrencyInputSchema).optional()
}).strict();

export const CurrencyUncheckedCreateInputSchema: z.ZodType<Prisma.CurrencyUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string().optional().nullable(),
  symbol: z.string().optional().nullable(),
  countries: z.lazy(() => CountryUncheckedCreateNestedManyWithoutCurrencyInputSchema).optional()
}).strict();

export const CurrencyUpdateInputSchema: z.ZodType<Prisma.CurrencyUpdateInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countries: z.lazy(() => CountryUpdateManyWithoutCurrencyNestedInputSchema).optional()
}).strict();

export const CurrencyUncheckedUpdateInputSchema: z.ZodType<Prisma.CurrencyUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countries: z.lazy(() => CountryUncheckedUpdateManyWithoutCurrencyNestedInputSchema).optional()
}).strict();

export const CurrencyCreateManyInputSchema: z.ZodType<Prisma.CurrencyCreateManyInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string().optional().nullable(),
  symbol: z.string().optional().nullable()
}).strict();

export const CurrencyUpdateManyMutationInputSchema: z.ZodType<Prisma.CurrencyUpdateManyMutationInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CurrencyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CurrencyUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PhoneCodeCreateInputSchema: z.ZodType<Prisma.PhoneCodeCreateInput> = z.object({
  code: z.string(),
  countries: z.lazy(() => CountryCreateNestedManyWithoutPhoneCodeInputSchema).optional()
}).strict();

export const PhoneCodeUncheckedCreateInputSchema: z.ZodType<Prisma.PhoneCodeUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  countries: z.lazy(() => CountryUncheckedCreateNestedManyWithoutPhoneCodeInputSchema).optional()
}).strict();

export const PhoneCodeUpdateInputSchema: z.ZodType<Prisma.PhoneCodeUpdateInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  countries: z.lazy(() => CountryUpdateManyWithoutPhoneCodeNestedInputSchema).optional()
}).strict();

export const PhoneCodeUncheckedUpdateInputSchema: z.ZodType<Prisma.PhoneCodeUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  countries: z.lazy(() => CountryUncheckedUpdateManyWithoutPhoneCodeNestedInputSchema).optional()
}).strict();

export const PhoneCodeCreateManyInputSchema: z.ZodType<Prisma.PhoneCodeCreateManyInput> = z.object({
  id: z.number().int().optional(),
  code: z.string()
}).strict();

export const PhoneCodeUpdateManyMutationInputSchema: z.ZodType<Prisma.PhoneCodeUpdateManyMutationInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PhoneCodeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PhoneCodeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TimeZoneCreateInputSchema: z.ZodType<Prisma.TimeZoneCreateInput> = z.object({
  name: z.string(),
  offset: z.string().optional().nullable(),
  countries: z.lazy(() => CountryCreateNestedManyWithoutTimeZoneInputSchema).optional(),
  Country: z.lazy(() => CountryCreateNestedManyWithoutTimezonesInputSchema).optional()
}).strict();

export const TimeZoneUncheckedCreateInputSchema: z.ZodType<Prisma.TimeZoneUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  offset: z.string().optional().nullable(),
  countries: z.lazy(() => CountryUncheckedCreateNestedManyWithoutTimeZoneInputSchema).optional(),
  Country: z.lazy(() => CountryUncheckedCreateNestedManyWithoutTimezonesInputSchema).optional()
}).strict();

export const TimeZoneUpdateInputSchema: z.ZodType<Prisma.TimeZoneUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offset: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countries: z.lazy(() => CountryUpdateManyWithoutTimeZoneNestedInputSchema).optional(),
  Country: z.lazy(() => CountryUpdateManyWithoutTimezonesNestedInputSchema).optional()
}).strict();

export const TimeZoneUncheckedUpdateInputSchema: z.ZodType<Prisma.TimeZoneUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offset: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countries: z.lazy(() => CountryUncheckedUpdateManyWithoutTimeZoneNestedInputSchema).optional(),
  Country: z.lazy(() => CountryUncheckedUpdateManyWithoutTimezonesNestedInputSchema).optional()
}).strict();

export const TimeZoneCreateManyInputSchema: z.ZodType<Prisma.TimeZoneCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  offset: z.string().optional().nullable()
}).strict();

export const TimeZoneUpdateManyMutationInputSchema: z.ZodType<Prisma.TimeZoneUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offset: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TimeZoneUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TimeZoneUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offset: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TranslationCreateInputSchema: z.ZodType<Prisma.TranslationCreateInput> = z.object({
  language: z.string(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  country: z.lazy(() => CountryCreateNestedOneWithoutTranslationsInputSchema).optional()
}).strict();

export const TranslationUncheckedCreateInputSchema: z.ZodType<Prisma.TranslationUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  language: z.string(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  countryId: z.number().int().optional().nullable()
}).strict();

export const TranslationUpdateInputSchema: z.ZodType<Prisma.TranslationUpdateInput> = z.object({
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  country: z.lazy(() => CountryUpdateOneWithoutTranslationsNestedInputSchema).optional()
}).strict();

export const TranslationUncheckedUpdateInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  countryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TranslationCreateManyInputSchema: z.ZodType<Prisma.TranslationCreateManyInput> = z.object({
  id: z.number().int().optional(),
  language: z.string(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  countryId: z.number().int().optional().nullable()
}).strict();

export const TranslationUpdateManyMutationInputSchema: z.ZodType<Prisma.TranslationUpdateManyMutationInput> = z.object({
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const TranslationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  countryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CountryCreateInputSchema: z.ZodType<Prisma.CountryCreateInput> = z.object({
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  region: z.lazy(() => RegionCreateNestedOneWithoutCountriesInputSchema).optional(),
  subregion: z.lazy(() => SubregionCreateNestedOneWithoutCountriesInputSchema).optional(),
  currency: z.lazy(() => CurrencyCreateNestedOneWithoutCountriesInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeCreateNestedOneWithoutCountriesInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUncheckedCreateInputSchema: z.ZodType<Prisma.CountryUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int().optional().nullable(),
  subregionId: z.number().int().optional().nullable(),
  currencyId: z.number().int().optional().nullable(),
  phoneCodeId: z.number().int().optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityUncheckedCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUpdateInputSchema: z.ZodType<Prisma.CountryUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  region: z.lazy(() => RegionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  subregion: z.lazy(() => SubregionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  currency: z.lazy(() => CurrencyUpdateOneWithoutCountriesNestedInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeUpdateOneWithoutCountriesNestedInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUncheckedUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryCreateManyInputSchema: z.ZodType<Prisma.CountryCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int().optional().nullable(),
  subregionId: z.number().int().optional().nullable(),
  currencyId: z.number().int().optional().nullable(),
  phoneCodeId: z.number().int().optional().nullable()
}).strict();

export const CountryUpdateManyMutationInputSchema: z.ZodType<Prisma.CountryUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CountryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StateCreateInputSchema: z.ZodType<Prisma.StateCreateInput> = z.object({
  name: z.string(),
  iso2: z.string().optional().nullable(),
  fipsCode: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  country: z.lazy(() => CountryCreateNestedOneWithoutStatesInputSchema),
  cities: z.lazy(() => CityCreateNestedManyWithoutStateInputSchema).optional()
}).strict();

export const StateUncheckedCreateInputSchema: z.ZodType<Prisma.StateUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso2: z.string().optional().nullable(),
  fipsCode: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  countryId: z.number().int(),
  cities: z.lazy(() => CityUncheckedCreateNestedManyWithoutStateInputSchema).optional()
}).strict();

export const StateUpdateInputSchema: z.ZodType<Prisma.StateUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fipsCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutStatesNestedInputSchema).optional(),
  cities: z.lazy(() => CityUpdateManyWithoutStateNestedInputSchema).optional()
}).strict();

export const StateUncheckedUpdateInputSchema: z.ZodType<Prisma.StateUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fipsCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cities: z.lazy(() => CityUncheckedUpdateManyWithoutStateNestedInputSchema).optional()
}).strict();

export const StateCreateManyInputSchema: z.ZodType<Prisma.StateCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso2: z.string().optional().nullable(),
  fipsCode: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  countryId: z.number().int()
}).strict();

export const StateUpdateManyMutationInputSchema: z.ZodType<Prisma.StateUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fipsCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fipsCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CityCreateInputSchema: z.ZodType<Prisma.CityCreateInput> = z.object({
  name: z.string(),
  stateCode: z.string().optional().nullable(),
  countryCode: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  state: z.lazy(() => StateCreateNestedOneWithoutCitiesInputSchema),
  country: z.lazy(() => CountryCreateNestedOneWithoutCityInputSchema)
}).strict();

export const CityUncheckedCreateInputSchema: z.ZodType<Prisma.CityUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  stateCode: z.string().optional().nullable(),
  countryCode: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  stateId: z.number().int(),
  countryId: z.number().int()
}).strict();

export const CityUpdateInputSchema: z.ZodType<Prisma.CityUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutCitiesNestedInputSchema).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutCityNestedInputSchema).optional()
}).strict();

export const CityUncheckedUpdateInputSchema: z.ZodType<Prisma.CityUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stateId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CityCreateManyInputSchema: z.ZodType<Prisma.CityCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  stateCode: z.string().optional().nullable(),
  countryCode: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  stateId: z.number().int(),
  countryId: z.number().int()
}).strict();

export const CityUpdateManyMutationInputSchema: z.ZodType<Prisma.CityUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stateId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
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
  hashedOtp: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OtpMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OtpMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  hashedOtp: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OtpMinOrderByAggregateInputSchema: z.ZodType<Prisma.OtpMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  hashedOtp: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
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
  name: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  contactEmail: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  contactEmail: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
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

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const SubregionListRelationFilterSchema: z.ZodType<Prisma.SubregionListRelationFilter> = z.object({
  every: z.lazy(() => SubregionWhereInputSchema).optional(),
  some: z.lazy(() => SubregionWhereInputSchema).optional(),
  none: z.lazy(() => SubregionWhereInputSchema).optional()
}).strict();

export const CountryListRelationFilterSchema: z.ZodType<Prisma.CountryListRelationFilter> = z.object({
  every: z.lazy(() => CountryWhereInputSchema).optional(),
  some: z.lazy(() => CountryWhereInputSchema).optional(),
  none: z.lazy(() => CountryWhereInputSchema).optional()
}).strict();

export const SubregionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SubregionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CountryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegionCountOrderByAggregateInputSchema: z.ZodType<Prisma.RegionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  translations: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RegionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RegionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegionMinOrderByAggregateInputSchema: z.ZodType<Prisma.RegionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegionSumOrderByAggregateInputSchema: z.ZodType<Prisma.RegionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const RegionScalarRelationFilterSchema: z.ZodType<Prisma.RegionScalarRelationFilter> = z.object({
  is: z.lazy(() => RegionWhereInputSchema).optional(),
  isNot: z.lazy(() => RegionWhereInputSchema).optional()
}).strict();

export const SubregionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubregionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  translations: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubregionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SubregionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubregionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubregionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubregionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SubregionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubregionSumOrderByAggregateInputSchema: z.ZodType<Prisma.SubregionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CurrencyCountOrderByAggregateInputSchema: z.ZodType<Prisma.CurrencyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  symbol: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CurrencyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CurrencyAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CurrencyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CurrencyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  symbol: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CurrencyMinOrderByAggregateInputSchema: z.ZodType<Prisma.CurrencyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  symbol: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CurrencySumOrderByAggregateInputSchema: z.ZodType<Prisma.CurrencySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PhoneCodeCountOrderByAggregateInputSchema: z.ZodType<Prisma.PhoneCodeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PhoneCodeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PhoneCodeAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PhoneCodeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PhoneCodeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PhoneCodeMinOrderByAggregateInputSchema: z.ZodType<Prisma.PhoneCodeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PhoneCodeSumOrderByAggregateInputSchema: z.ZodType<Prisma.PhoneCodeSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TimeZoneCountOrderByAggregateInputSchema: z.ZodType<Prisma.TimeZoneCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  offset: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TimeZoneAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TimeZoneAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TimeZoneMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TimeZoneMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  offset: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TimeZoneMinOrderByAggregateInputSchema: z.ZodType<Prisma.TimeZoneMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  offset: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TimeZoneSumOrderByAggregateInputSchema: z.ZodType<Prisma.TimeZoneSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const CountryNullableScalarRelationFilterSchema: z.ZodType<Prisma.CountryNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => CountryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CountryWhereInputSchema).optional().nullable()
}).strict();

export const TranslationCountOrderByAggregateInputSchema: z.ZodType<Prisma.TranslationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TranslationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TranslationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TranslationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TranslationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TranslationMinOrderByAggregateInputSchema: z.ZodType<Prisma.TranslationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TranslationSumOrderByAggregateInputSchema: z.ZodType<Prisma.TranslationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const RegionNullableScalarRelationFilterSchema: z.ZodType<Prisma.RegionNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => RegionWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RegionWhereInputSchema).optional().nullable()
}).strict();

export const SubregionNullableScalarRelationFilterSchema: z.ZodType<Prisma.SubregionNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => SubregionWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SubregionWhereInputSchema).optional().nullable()
}).strict();

export const CurrencyNullableScalarRelationFilterSchema: z.ZodType<Prisma.CurrencyNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => CurrencyWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CurrencyWhereInputSchema).optional().nullable()
}).strict();

export const PhoneCodeNullableScalarRelationFilterSchema: z.ZodType<Prisma.PhoneCodeNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PhoneCodeWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PhoneCodeWhereInputSchema).optional().nullable()
}).strict();

export const TimeZoneListRelationFilterSchema: z.ZodType<Prisma.TimeZoneListRelationFilter> = z.object({
  every: z.lazy(() => TimeZoneWhereInputSchema).optional(),
  some: z.lazy(() => TimeZoneWhereInputSchema).optional(),
  none: z.lazy(() => TimeZoneWhereInputSchema).optional()
}).strict();

export const TranslationListRelationFilterSchema: z.ZodType<Prisma.TranslationListRelationFilter> = z.object({
  every: z.lazy(() => TranslationWhereInputSchema).optional(),
  some: z.lazy(() => TranslationWhereInputSchema).optional(),
  none: z.lazy(() => TranslationWhereInputSchema).optional()
}).strict();

export const StateListRelationFilterSchema: z.ZodType<Prisma.StateListRelationFilter> = z.object({
  every: z.lazy(() => StateWhereInputSchema).optional(),
  some: z.lazy(() => StateWhereInputSchema).optional(),
  none: z.lazy(() => StateWhereInputSchema).optional()
}).strict();

export const CityListRelationFilterSchema: z.ZodType<Prisma.CityListRelationFilter> = z.object({
  every: z.lazy(() => CityWhereInputSchema).optional(),
  some: z.lazy(() => CityWhereInputSchema).optional(),
  none: z.lazy(() => CityWhereInputSchema).optional()
}).strict();

export const TimeZoneOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TimeZoneOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TranslationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TranslationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StateOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StateOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CityOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CityOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CountryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iso3: z.lazy(() => SortOrderSchema).optional(),
  iso2: z.lazy(() => SortOrderSchema).optional(),
  numericCode: z.lazy(() => SortOrderSchema).optional(),
  capital: z.lazy(() => SortOrderSchema).optional(),
  tld: z.lazy(() => SortOrderSchema).optional(),
  native: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  emoji: z.lazy(() => SortOrderSchema).optional(),
  emojiU: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional(),
  subregionId: z.lazy(() => SortOrderSchema).optional(),
  currencyId: z.lazy(() => SortOrderSchema).optional(),
  phoneCodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CountryAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional(),
  subregionId: z.lazy(() => SortOrderSchema).optional(),
  currencyId: z.lazy(() => SortOrderSchema).optional(),
  phoneCodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CountryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iso3: z.lazy(() => SortOrderSchema).optional(),
  iso2: z.lazy(() => SortOrderSchema).optional(),
  numericCode: z.lazy(() => SortOrderSchema).optional(),
  capital: z.lazy(() => SortOrderSchema).optional(),
  tld: z.lazy(() => SortOrderSchema).optional(),
  native: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  emoji: z.lazy(() => SortOrderSchema).optional(),
  emojiU: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional(),
  subregionId: z.lazy(() => SortOrderSchema).optional(),
  currencyId: z.lazy(() => SortOrderSchema).optional(),
  phoneCodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CountryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iso3: z.lazy(() => SortOrderSchema).optional(),
  iso2: z.lazy(() => SortOrderSchema).optional(),
  numericCode: z.lazy(() => SortOrderSchema).optional(),
  capital: z.lazy(() => SortOrderSchema).optional(),
  tld: z.lazy(() => SortOrderSchema).optional(),
  native: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  emoji: z.lazy(() => SortOrderSchema).optional(),
  emojiU: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional(),
  subregionId: z.lazy(() => SortOrderSchema).optional(),
  currencyId: z.lazy(() => SortOrderSchema).optional(),
  phoneCodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountrySumOrderByAggregateInputSchema: z.ZodType<Prisma.CountrySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional(),
  subregionId: z.lazy(() => SortOrderSchema).optional(),
  currencyId: z.lazy(() => SortOrderSchema).optional(),
  phoneCodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryScalarRelationFilterSchema: z.ZodType<Prisma.CountryScalarRelationFilter> = z.object({
  is: z.lazy(() => CountryWhereInputSchema).optional(),
  isNot: z.lazy(() => CountryWhereInputSchema).optional()
}).strict();

export const StateCountOrderByAggregateInputSchema: z.ZodType<Prisma.StateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iso2: z.lazy(() => SortOrderSchema).optional(),
  fipsCode: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StateAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StateAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iso2: z.lazy(() => SortOrderSchema).optional(),
  fipsCode: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StateMinOrderByAggregateInputSchema: z.ZodType<Prisma.StateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iso2: z.lazy(() => SortOrderSchema).optional(),
  fipsCode: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StateSumOrderByAggregateInputSchema: z.ZodType<Prisma.StateSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StateScalarRelationFilterSchema: z.ZodType<Prisma.StateScalarRelationFilter> = z.object({
  is: z.lazy(() => StateWhereInputSchema).optional(),
  isNot: z.lazy(() => StateWhereInputSchema).optional()
}).strict();

export const CityCountOrderByAggregateInputSchema: z.ZodType<Prisma.CityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stateCode: z.lazy(() => SortOrderSchema).optional(),
  countryCode: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CityAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stateCode: z.lazy(() => SortOrderSchema).optional(),
  countryCode: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CityMinOrderByAggregateInputSchema: z.ZodType<Prisma.CityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stateCode: z.lazy(() => SortOrderSchema).optional(),
  countryCode: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  wikiDataId: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CitySumOrderByAggregateInputSchema: z.ZodType<Prisma.CitySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
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

export const SubregionCreateNestedManyWithoutRegionInputSchema: z.ZodType<Prisma.SubregionCreateNestedManyWithoutRegionInput> = z.object({
  create: z.union([ z.lazy(() => SubregionCreateWithoutRegionInputSchema),z.lazy(() => SubregionCreateWithoutRegionInputSchema).array(),z.lazy(() => SubregionUncheckedCreateWithoutRegionInputSchema),z.lazy(() => SubregionUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubregionCreateOrConnectWithoutRegionInputSchema),z.lazy(() => SubregionCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubregionCreateManyRegionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubregionWhereUniqueInputSchema),z.lazy(() => SubregionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryCreateNestedManyWithoutRegionInputSchema: z.ZodType<Prisma.CountryCreateNestedManyWithoutRegionInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutRegionInputSchema),z.lazy(() => CountryCreateWithoutRegionInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutRegionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutRegionInputSchema),z.lazy(() => CountryCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManyRegionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubregionUncheckedCreateNestedManyWithoutRegionInputSchema: z.ZodType<Prisma.SubregionUncheckedCreateNestedManyWithoutRegionInput> = z.object({
  create: z.union([ z.lazy(() => SubregionCreateWithoutRegionInputSchema),z.lazy(() => SubregionCreateWithoutRegionInputSchema).array(),z.lazy(() => SubregionUncheckedCreateWithoutRegionInputSchema),z.lazy(() => SubregionUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubregionCreateOrConnectWithoutRegionInputSchema),z.lazy(() => SubregionCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubregionCreateManyRegionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubregionWhereUniqueInputSchema),z.lazy(() => SubregionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryUncheckedCreateNestedManyWithoutRegionInputSchema: z.ZodType<Prisma.CountryUncheckedCreateNestedManyWithoutRegionInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutRegionInputSchema),z.lazy(() => CountryCreateWithoutRegionInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutRegionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutRegionInputSchema),z.lazy(() => CountryCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManyRegionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubregionUpdateManyWithoutRegionNestedInputSchema: z.ZodType<Prisma.SubregionUpdateManyWithoutRegionNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubregionCreateWithoutRegionInputSchema),z.lazy(() => SubregionCreateWithoutRegionInputSchema).array(),z.lazy(() => SubregionUncheckedCreateWithoutRegionInputSchema),z.lazy(() => SubregionUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubregionCreateOrConnectWithoutRegionInputSchema),z.lazy(() => SubregionCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubregionUpsertWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => SubregionUpsertWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubregionCreateManyRegionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubregionWhereUniqueInputSchema),z.lazy(() => SubregionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubregionWhereUniqueInputSchema),z.lazy(() => SubregionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubregionWhereUniqueInputSchema),z.lazy(() => SubregionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubregionWhereUniqueInputSchema),z.lazy(() => SubregionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubregionUpdateWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => SubregionUpdateWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubregionUpdateManyWithWhereWithoutRegionInputSchema),z.lazy(() => SubregionUpdateManyWithWhereWithoutRegionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubregionScalarWhereInputSchema),z.lazy(() => SubregionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryUpdateManyWithoutRegionNestedInputSchema: z.ZodType<Prisma.CountryUpdateManyWithoutRegionNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutRegionInputSchema),z.lazy(() => CountryCreateWithoutRegionInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutRegionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutRegionInputSchema),z.lazy(() => CountryCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CountryUpsertWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => CountryUpsertWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManyRegionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CountryUpdateWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => CountryUpdateWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CountryUpdateManyWithWhereWithoutRegionInputSchema),z.lazy(() => CountryUpdateManyWithWhereWithoutRegionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const SubregionUncheckedUpdateManyWithoutRegionNestedInputSchema: z.ZodType<Prisma.SubregionUncheckedUpdateManyWithoutRegionNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubregionCreateWithoutRegionInputSchema),z.lazy(() => SubregionCreateWithoutRegionInputSchema).array(),z.lazy(() => SubregionUncheckedCreateWithoutRegionInputSchema),z.lazy(() => SubregionUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubregionCreateOrConnectWithoutRegionInputSchema),z.lazy(() => SubregionCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubregionUpsertWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => SubregionUpsertWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubregionCreateManyRegionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubregionWhereUniqueInputSchema),z.lazy(() => SubregionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubregionWhereUniqueInputSchema),z.lazy(() => SubregionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubregionWhereUniqueInputSchema),z.lazy(() => SubregionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubregionWhereUniqueInputSchema),z.lazy(() => SubregionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubregionUpdateWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => SubregionUpdateWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubregionUpdateManyWithWhereWithoutRegionInputSchema),z.lazy(() => SubregionUpdateManyWithWhereWithoutRegionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubregionScalarWhereInputSchema),z.lazy(() => SubregionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryUncheckedUpdateManyWithoutRegionNestedInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyWithoutRegionNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutRegionInputSchema),z.lazy(() => CountryCreateWithoutRegionInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutRegionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutRegionInputSchema),z.lazy(() => CountryCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CountryUpsertWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => CountryUpsertWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManyRegionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CountryUpdateWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => CountryUpdateWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CountryUpdateManyWithWhereWithoutRegionInputSchema),z.lazy(() => CountryUpdateManyWithWhereWithoutRegionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RegionCreateNestedOneWithoutSubregionsInputSchema: z.ZodType<Prisma.RegionCreateNestedOneWithoutSubregionsInput> = z.object({
  create: z.union([ z.lazy(() => RegionCreateWithoutSubregionsInputSchema),z.lazy(() => RegionUncheckedCreateWithoutSubregionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RegionCreateOrConnectWithoutSubregionsInputSchema).optional(),
  connect: z.lazy(() => RegionWhereUniqueInputSchema).optional()
}).strict();

export const CountryCreateNestedManyWithoutSubregionInputSchema: z.ZodType<Prisma.CountryCreateNestedManyWithoutSubregionInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutSubregionInputSchema),z.lazy(() => CountryCreateWithoutSubregionInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutSubregionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutSubregionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutSubregionInputSchema),z.lazy(() => CountryCreateOrConnectWithoutSubregionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManySubregionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryUncheckedCreateNestedManyWithoutSubregionInputSchema: z.ZodType<Prisma.CountryUncheckedCreateNestedManyWithoutSubregionInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutSubregionInputSchema),z.lazy(() => CountryCreateWithoutSubregionInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutSubregionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutSubregionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutSubregionInputSchema),z.lazy(() => CountryCreateOrConnectWithoutSubregionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManySubregionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RegionUpdateOneRequiredWithoutSubregionsNestedInputSchema: z.ZodType<Prisma.RegionUpdateOneRequiredWithoutSubregionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RegionCreateWithoutSubregionsInputSchema),z.lazy(() => RegionUncheckedCreateWithoutSubregionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RegionCreateOrConnectWithoutSubregionsInputSchema).optional(),
  upsert: z.lazy(() => RegionUpsertWithoutSubregionsInputSchema).optional(),
  connect: z.lazy(() => RegionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RegionUpdateToOneWithWhereWithoutSubregionsInputSchema),z.lazy(() => RegionUpdateWithoutSubregionsInputSchema),z.lazy(() => RegionUncheckedUpdateWithoutSubregionsInputSchema) ]).optional(),
}).strict();

export const CountryUpdateManyWithoutSubregionNestedInputSchema: z.ZodType<Prisma.CountryUpdateManyWithoutSubregionNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutSubregionInputSchema),z.lazy(() => CountryCreateWithoutSubregionInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutSubregionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutSubregionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutSubregionInputSchema),z.lazy(() => CountryCreateOrConnectWithoutSubregionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CountryUpsertWithWhereUniqueWithoutSubregionInputSchema),z.lazy(() => CountryUpsertWithWhereUniqueWithoutSubregionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManySubregionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CountryUpdateWithWhereUniqueWithoutSubregionInputSchema),z.lazy(() => CountryUpdateWithWhereUniqueWithoutSubregionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CountryUpdateManyWithWhereWithoutSubregionInputSchema),z.lazy(() => CountryUpdateManyWithWhereWithoutSubregionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryUncheckedUpdateManyWithoutSubregionNestedInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyWithoutSubregionNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutSubregionInputSchema),z.lazy(() => CountryCreateWithoutSubregionInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutSubregionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutSubregionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutSubregionInputSchema),z.lazy(() => CountryCreateOrConnectWithoutSubregionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CountryUpsertWithWhereUniqueWithoutSubregionInputSchema),z.lazy(() => CountryUpsertWithWhereUniqueWithoutSubregionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManySubregionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CountryUpdateWithWhereUniqueWithoutSubregionInputSchema),z.lazy(() => CountryUpdateWithWhereUniqueWithoutSubregionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CountryUpdateManyWithWhereWithoutSubregionInputSchema),z.lazy(() => CountryUpdateManyWithWhereWithoutSubregionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryCreateNestedManyWithoutCurrencyInputSchema: z.ZodType<Prisma.CountryCreateNestedManyWithoutCurrencyInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutCurrencyInputSchema),z.lazy(() => CountryCreateWithoutCurrencyInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutCurrencyInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCurrencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutCurrencyInputSchema),z.lazy(() => CountryCreateOrConnectWithoutCurrencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManyCurrencyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryUncheckedCreateNestedManyWithoutCurrencyInputSchema: z.ZodType<Prisma.CountryUncheckedCreateNestedManyWithoutCurrencyInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutCurrencyInputSchema),z.lazy(() => CountryCreateWithoutCurrencyInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutCurrencyInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCurrencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutCurrencyInputSchema),z.lazy(() => CountryCreateOrConnectWithoutCurrencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManyCurrencyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryUpdateManyWithoutCurrencyNestedInputSchema: z.ZodType<Prisma.CountryUpdateManyWithoutCurrencyNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutCurrencyInputSchema),z.lazy(() => CountryCreateWithoutCurrencyInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutCurrencyInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCurrencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutCurrencyInputSchema),z.lazy(() => CountryCreateOrConnectWithoutCurrencyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CountryUpsertWithWhereUniqueWithoutCurrencyInputSchema),z.lazy(() => CountryUpsertWithWhereUniqueWithoutCurrencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManyCurrencyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CountryUpdateWithWhereUniqueWithoutCurrencyInputSchema),z.lazy(() => CountryUpdateWithWhereUniqueWithoutCurrencyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CountryUpdateManyWithWhereWithoutCurrencyInputSchema),z.lazy(() => CountryUpdateManyWithWhereWithoutCurrencyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryUncheckedUpdateManyWithoutCurrencyNestedInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyWithoutCurrencyNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutCurrencyInputSchema),z.lazy(() => CountryCreateWithoutCurrencyInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutCurrencyInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCurrencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutCurrencyInputSchema),z.lazy(() => CountryCreateOrConnectWithoutCurrencyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CountryUpsertWithWhereUniqueWithoutCurrencyInputSchema),z.lazy(() => CountryUpsertWithWhereUniqueWithoutCurrencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManyCurrencyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CountryUpdateWithWhereUniqueWithoutCurrencyInputSchema),z.lazy(() => CountryUpdateWithWhereUniqueWithoutCurrencyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CountryUpdateManyWithWhereWithoutCurrencyInputSchema),z.lazy(() => CountryUpdateManyWithWhereWithoutCurrencyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryCreateNestedManyWithoutPhoneCodeInputSchema: z.ZodType<Prisma.CountryCreateNestedManyWithoutPhoneCodeInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutPhoneCodeInputSchema),z.lazy(() => CountryCreateWithoutPhoneCodeInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutPhoneCodeInputSchema),z.lazy(() => CountryUncheckedCreateWithoutPhoneCodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutPhoneCodeInputSchema),z.lazy(() => CountryCreateOrConnectWithoutPhoneCodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManyPhoneCodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryUncheckedCreateNestedManyWithoutPhoneCodeInputSchema: z.ZodType<Prisma.CountryUncheckedCreateNestedManyWithoutPhoneCodeInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutPhoneCodeInputSchema),z.lazy(() => CountryCreateWithoutPhoneCodeInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutPhoneCodeInputSchema),z.lazy(() => CountryUncheckedCreateWithoutPhoneCodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutPhoneCodeInputSchema),z.lazy(() => CountryCreateOrConnectWithoutPhoneCodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManyPhoneCodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryUpdateManyWithoutPhoneCodeNestedInputSchema: z.ZodType<Prisma.CountryUpdateManyWithoutPhoneCodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutPhoneCodeInputSchema),z.lazy(() => CountryCreateWithoutPhoneCodeInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutPhoneCodeInputSchema),z.lazy(() => CountryUncheckedCreateWithoutPhoneCodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutPhoneCodeInputSchema),z.lazy(() => CountryCreateOrConnectWithoutPhoneCodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CountryUpsertWithWhereUniqueWithoutPhoneCodeInputSchema),z.lazy(() => CountryUpsertWithWhereUniqueWithoutPhoneCodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManyPhoneCodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CountryUpdateWithWhereUniqueWithoutPhoneCodeInputSchema),z.lazy(() => CountryUpdateWithWhereUniqueWithoutPhoneCodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CountryUpdateManyWithWhereWithoutPhoneCodeInputSchema),z.lazy(() => CountryUpdateManyWithWhereWithoutPhoneCodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryUncheckedUpdateManyWithoutPhoneCodeNestedInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyWithoutPhoneCodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutPhoneCodeInputSchema),z.lazy(() => CountryCreateWithoutPhoneCodeInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutPhoneCodeInputSchema),z.lazy(() => CountryUncheckedCreateWithoutPhoneCodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutPhoneCodeInputSchema),z.lazy(() => CountryCreateOrConnectWithoutPhoneCodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CountryUpsertWithWhereUniqueWithoutPhoneCodeInputSchema),z.lazy(() => CountryUpsertWithWhereUniqueWithoutPhoneCodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CountryCreateManyPhoneCodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CountryUpdateWithWhereUniqueWithoutPhoneCodeInputSchema),z.lazy(() => CountryUpdateWithWhereUniqueWithoutPhoneCodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CountryUpdateManyWithWhereWithoutPhoneCodeInputSchema),z.lazy(() => CountryUpdateManyWithWhereWithoutPhoneCodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryCreateNestedManyWithoutTimeZoneInputSchema: z.ZodType<Prisma.CountryCreateNestedManyWithoutTimeZoneInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutTimeZoneInputSchema),z.lazy(() => CountryCreateWithoutTimeZoneInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutTimeZoneInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTimeZoneInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutTimeZoneInputSchema),z.lazy(() => CountryCreateOrConnectWithoutTimeZoneInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryCreateNestedManyWithoutTimezonesInputSchema: z.ZodType<Prisma.CountryCreateNestedManyWithoutTimezonesInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutTimezonesInputSchema),z.lazy(() => CountryCreateWithoutTimezonesInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutTimezonesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTimezonesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutTimezonesInputSchema),z.lazy(() => CountryCreateOrConnectWithoutTimezonesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryUncheckedCreateNestedManyWithoutTimeZoneInputSchema: z.ZodType<Prisma.CountryUncheckedCreateNestedManyWithoutTimeZoneInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutTimeZoneInputSchema),z.lazy(() => CountryCreateWithoutTimeZoneInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutTimeZoneInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTimeZoneInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutTimeZoneInputSchema),z.lazy(() => CountryCreateOrConnectWithoutTimeZoneInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryUncheckedCreateNestedManyWithoutTimezonesInputSchema: z.ZodType<Prisma.CountryUncheckedCreateNestedManyWithoutTimezonesInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutTimezonesInputSchema),z.lazy(() => CountryCreateWithoutTimezonesInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutTimezonesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTimezonesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutTimezonesInputSchema),z.lazy(() => CountryCreateOrConnectWithoutTimezonesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryUpdateManyWithoutTimeZoneNestedInputSchema: z.ZodType<Prisma.CountryUpdateManyWithoutTimeZoneNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutTimeZoneInputSchema),z.lazy(() => CountryCreateWithoutTimeZoneInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutTimeZoneInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTimeZoneInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutTimeZoneInputSchema),z.lazy(() => CountryCreateOrConnectWithoutTimeZoneInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CountryUpsertWithWhereUniqueWithoutTimeZoneInputSchema),z.lazy(() => CountryUpsertWithWhereUniqueWithoutTimeZoneInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CountryUpdateWithWhereUniqueWithoutTimeZoneInputSchema),z.lazy(() => CountryUpdateWithWhereUniqueWithoutTimeZoneInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CountryUpdateManyWithWhereWithoutTimeZoneInputSchema),z.lazy(() => CountryUpdateManyWithWhereWithoutTimeZoneInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryUpdateManyWithoutTimezonesNestedInputSchema: z.ZodType<Prisma.CountryUpdateManyWithoutTimezonesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutTimezonesInputSchema),z.lazy(() => CountryCreateWithoutTimezonesInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutTimezonesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTimezonesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutTimezonesInputSchema),z.lazy(() => CountryCreateOrConnectWithoutTimezonesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CountryUpsertWithWhereUniqueWithoutTimezonesInputSchema),z.lazy(() => CountryUpsertWithWhereUniqueWithoutTimezonesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CountryUpdateWithWhereUniqueWithoutTimezonesInputSchema),z.lazy(() => CountryUpdateWithWhereUniqueWithoutTimezonesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CountryUpdateManyWithWhereWithoutTimezonesInputSchema),z.lazy(() => CountryUpdateManyWithWhereWithoutTimezonesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryUncheckedUpdateManyWithoutTimeZoneNestedInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyWithoutTimeZoneNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutTimeZoneInputSchema),z.lazy(() => CountryCreateWithoutTimeZoneInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutTimeZoneInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTimeZoneInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutTimeZoneInputSchema),z.lazy(() => CountryCreateOrConnectWithoutTimeZoneInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CountryUpsertWithWhereUniqueWithoutTimeZoneInputSchema),z.lazy(() => CountryUpsertWithWhereUniqueWithoutTimeZoneInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CountryUpdateWithWhereUniqueWithoutTimeZoneInputSchema),z.lazy(() => CountryUpdateWithWhereUniqueWithoutTimeZoneInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CountryUpdateManyWithWhereWithoutTimeZoneInputSchema),z.lazy(() => CountryUpdateManyWithWhereWithoutTimeZoneInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryUncheckedUpdateManyWithoutTimezonesNestedInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyWithoutTimezonesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutTimezonesInputSchema),z.lazy(() => CountryCreateWithoutTimezonesInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutTimezonesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTimezonesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutTimezonesInputSchema),z.lazy(() => CountryCreateOrConnectWithoutTimezonesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CountryUpsertWithWhereUniqueWithoutTimezonesInputSchema),z.lazy(() => CountryUpsertWithWhereUniqueWithoutTimezonesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CountryUpdateWithWhereUniqueWithoutTimezonesInputSchema),z.lazy(() => CountryUpdateWithWhereUniqueWithoutTimezonesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CountryUpdateManyWithWhereWithoutTimezonesInputSchema),z.lazy(() => CountryUpdateManyWithWhereWithoutTimezonesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryCreateNestedOneWithoutTranslationsInputSchema: z.ZodType<Prisma.CountryCreateNestedOneWithoutTranslationsInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutTranslationsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTranslationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutTranslationsInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional()
}).strict();

export const CountryUpdateOneWithoutTranslationsNestedInputSchema: z.ZodType<Prisma.CountryUpdateOneWithoutTranslationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutTranslationsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTranslationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutTranslationsInputSchema).optional(),
  upsert: z.lazy(() => CountryUpsertWithoutTranslationsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CountryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CountryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CountryUpdateToOneWithWhereWithoutTranslationsInputSchema),z.lazy(() => CountryUpdateWithoutTranslationsInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutTranslationsInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const RegionCreateNestedOneWithoutCountriesInputSchema: z.ZodType<Prisma.RegionCreateNestedOneWithoutCountriesInput> = z.object({
  create: z.union([ z.lazy(() => RegionCreateWithoutCountriesInputSchema),z.lazy(() => RegionUncheckedCreateWithoutCountriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RegionCreateOrConnectWithoutCountriesInputSchema).optional(),
  connect: z.lazy(() => RegionWhereUniqueInputSchema).optional()
}).strict();

export const SubregionCreateNestedOneWithoutCountriesInputSchema: z.ZodType<Prisma.SubregionCreateNestedOneWithoutCountriesInput> = z.object({
  create: z.union([ z.lazy(() => SubregionCreateWithoutCountriesInputSchema),z.lazy(() => SubregionUncheckedCreateWithoutCountriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubregionCreateOrConnectWithoutCountriesInputSchema).optional(),
  connect: z.lazy(() => SubregionWhereUniqueInputSchema).optional()
}).strict();

export const CurrencyCreateNestedOneWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyCreateNestedOneWithoutCountriesInput> = z.object({
  create: z.union([ z.lazy(() => CurrencyCreateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedCreateWithoutCountriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CurrencyCreateOrConnectWithoutCountriesInputSchema).optional(),
  connect: z.lazy(() => CurrencyWhereUniqueInputSchema).optional()
}).strict();

export const PhoneCodeCreateNestedOneWithoutCountriesInputSchema: z.ZodType<Prisma.PhoneCodeCreateNestedOneWithoutCountriesInput> = z.object({
  create: z.union([ z.lazy(() => PhoneCodeCreateWithoutCountriesInputSchema),z.lazy(() => PhoneCodeUncheckedCreateWithoutCountriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhoneCodeCreateOrConnectWithoutCountriesInputSchema).optional(),
  connect: z.lazy(() => PhoneCodeWhereUniqueInputSchema).optional()
}).strict();

export const TimeZoneCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.TimeZoneCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => TimeZoneCreateWithoutCountryInputSchema),z.lazy(() => TimeZoneCreateWithoutCountryInputSchema).array(),z.lazy(() => TimeZoneUncheckedCreateWithoutCountryInputSchema),z.lazy(() => TimeZoneUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TimeZoneCreateOrConnectWithoutCountryInputSchema),z.lazy(() => TimeZoneCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TranslationCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.TranslationCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => TranslationCreateWithoutCountryInputSchema),z.lazy(() => TranslationCreateWithoutCountryInputSchema).array(),z.lazy(() => TranslationUncheckedCreateWithoutCountryInputSchema),z.lazy(() => TranslationUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TranslationCreateOrConnectWithoutCountryInputSchema),z.lazy(() => TranslationCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TranslationCreateManyCountryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StateCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.StateCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => StateCreateWithoutCountryInputSchema),z.lazy(() => StateCreateWithoutCountryInputSchema).array(),z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema),z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema),z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StateCreateManyCountryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StateWhereUniqueInputSchema),z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TimeZoneCreateNestedManyWithoutCountriesInputSchema: z.ZodType<Prisma.TimeZoneCreateNestedManyWithoutCountriesInput> = z.object({
  create: z.union([ z.lazy(() => TimeZoneCreateWithoutCountriesInputSchema),z.lazy(() => TimeZoneCreateWithoutCountriesInputSchema).array(),z.lazy(() => TimeZoneUncheckedCreateWithoutCountriesInputSchema),z.lazy(() => TimeZoneUncheckedCreateWithoutCountriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TimeZoneCreateOrConnectWithoutCountriesInputSchema),z.lazy(() => TimeZoneCreateOrConnectWithoutCountriesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CityCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.CityCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutCountryInputSchema),z.lazy(() => CityCreateWithoutCountryInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutCountryInputSchema),z.lazy(() => CityUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutCountryInputSchema),z.lazy(() => CityCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyCountryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TimeZoneUncheckedCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.TimeZoneUncheckedCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => TimeZoneCreateWithoutCountryInputSchema),z.lazy(() => TimeZoneCreateWithoutCountryInputSchema).array(),z.lazy(() => TimeZoneUncheckedCreateWithoutCountryInputSchema),z.lazy(() => TimeZoneUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TimeZoneCreateOrConnectWithoutCountryInputSchema),z.lazy(() => TimeZoneCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TranslationUncheckedCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.TranslationUncheckedCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => TranslationCreateWithoutCountryInputSchema),z.lazy(() => TranslationCreateWithoutCountryInputSchema).array(),z.lazy(() => TranslationUncheckedCreateWithoutCountryInputSchema),z.lazy(() => TranslationUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TranslationCreateOrConnectWithoutCountryInputSchema),z.lazy(() => TranslationCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TranslationCreateManyCountryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StateUncheckedCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.StateUncheckedCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => StateCreateWithoutCountryInputSchema),z.lazy(() => StateCreateWithoutCountryInputSchema).array(),z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema),z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema),z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StateCreateManyCountryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StateWhereUniqueInputSchema),z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TimeZoneUncheckedCreateNestedManyWithoutCountriesInputSchema: z.ZodType<Prisma.TimeZoneUncheckedCreateNestedManyWithoutCountriesInput> = z.object({
  create: z.union([ z.lazy(() => TimeZoneCreateWithoutCountriesInputSchema),z.lazy(() => TimeZoneCreateWithoutCountriesInputSchema).array(),z.lazy(() => TimeZoneUncheckedCreateWithoutCountriesInputSchema),z.lazy(() => TimeZoneUncheckedCreateWithoutCountriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TimeZoneCreateOrConnectWithoutCountriesInputSchema),z.lazy(() => TimeZoneCreateOrConnectWithoutCountriesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CityUncheckedCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.CityUncheckedCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutCountryInputSchema),z.lazy(() => CityCreateWithoutCountryInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutCountryInputSchema),z.lazy(() => CityUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutCountryInputSchema),z.lazy(() => CityCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyCountryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RegionUpdateOneWithoutCountriesNestedInputSchema: z.ZodType<Prisma.RegionUpdateOneWithoutCountriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RegionCreateWithoutCountriesInputSchema),z.lazy(() => RegionUncheckedCreateWithoutCountriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RegionCreateOrConnectWithoutCountriesInputSchema).optional(),
  upsert: z.lazy(() => RegionUpsertWithoutCountriesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RegionWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RegionWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RegionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RegionUpdateToOneWithWhereWithoutCountriesInputSchema),z.lazy(() => RegionUpdateWithoutCountriesInputSchema),z.lazy(() => RegionUncheckedUpdateWithoutCountriesInputSchema) ]).optional(),
}).strict();

export const SubregionUpdateOneWithoutCountriesNestedInputSchema: z.ZodType<Prisma.SubregionUpdateOneWithoutCountriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubregionCreateWithoutCountriesInputSchema),z.lazy(() => SubregionUncheckedCreateWithoutCountriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubregionCreateOrConnectWithoutCountriesInputSchema).optional(),
  upsert: z.lazy(() => SubregionUpsertWithoutCountriesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SubregionWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SubregionWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SubregionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SubregionUpdateToOneWithWhereWithoutCountriesInputSchema),z.lazy(() => SubregionUpdateWithoutCountriesInputSchema),z.lazy(() => SubregionUncheckedUpdateWithoutCountriesInputSchema) ]).optional(),
}).strict();

export const CurrencyUpdateOneWithoutCountriesNestedInputSchema: z.ZodType<Prisma.CurrencyUpdateOneWithoutCountriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CurrencyCreateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedCreateWithoutCountriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CurrencyCreateOrConnectWithoutCountriesInputSchema).optional(),
  upsert: z.lazy(() => CurrencyUpsertWithoutCountriesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CurrencyWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CurrencyWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CurrencyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CurrencyUpdateToOneWithWhereWithoutCountriesInputSchema),z.lazy(() => CurrencyUpdateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedUpdateWithoutCountriesInputSchema) ]).optional(),
}).strict();

export const PhoneCodeUpdateOneWithoutCountriesNestedInputSchema: z.ZodType<Prisma.PhoneCodeUpdateOneWithoutCountriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PhoneCodeCreateWithoutCountriesInputSchema),z.lazy(() => PhoneCodeUncheckedCreateWithoutCountriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhoneCodeCreateOrConnectWithoutCountriesInputSchema).optional(),
  upsert: z.lazy(() => PhoneCodeUpsertWithoutCountriesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PhoneCodeWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PhoneCodeWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PhoneCodeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PhoneCodeUpdateToOneWithWhereWithoutCountriesInputSchema),z.lazy(() => PhoneCodeUpdateWithoutCountriesInputSchema),z.lazy(() => PhoneCodeUncheckedUpdateWithoutCountriesInputSchema) ]).optional(),
}).strict();

export const TimeZoneUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.TimeZoneUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TimeZoneCreateWithoutCountryInputSchema),z.lazy(() => TimeZoneCreateWithoutCountryInputSchema).array(),z.lazy(() => TimeZoneUncheckedCreateWithoutCountryInputSchema),z.lazy(() => TimeZoneUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TimeZoneCreateOrConnectWithoutCountryInputSchema),z.lazy(() => TimeZoneCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TimeZoneUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => TimeZoneUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TimeZoneUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => TimeZoneUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TimeZoneUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => TimeZoneUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TimeZoneScalarWhereInputSchema),z.lazy(() => TimeZoneScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TranslationUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.TranslationUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TranslationCreateWithoutCountryInputSchema),z.lazy(() => TranslationCreateWithoutCountryInputSchema).array(),z.lazy(() => TranslationUncheckedCreateWithoutCountryInputSchema),z.lazy(() => TranslationUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TranslationCreateOrConnectWithoutCountryInputSchema),z.lazy(() => TranslationCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TranslationUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => TranslationUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TranslationCreateManyCountryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TranslationUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => TranslationUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TranslationUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => TranslationUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TranslationScalarWhereInputSchema),z.lazy(() => TranslationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StateUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.StateUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => StateCreateWithoutCountryInputSchema),z.lazy(() => StateCreateWithoutCountryInputSchema).array(),z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema),z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema),z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StateUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => StateUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StateCreateManyCountryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StateWhereUniqueInputSchema),z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StateWhereUniqueInputSchema),z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StateWhereUniqueInputSchema),z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StateWhereUniqueInputSchema),z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StateUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => StateUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StateUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => StateUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StateScalarWhereInputSchema),z.lazy(() => StateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TimeZoneUpdateManyWithoutCountriesNestedInputSchema: z.ZodType<Prisma.TimeZoneUpdateManyWithoutCountriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TimeZoneCreateWithoutCountriesInputSchema),z.lazy(() => TimeZoneCreateWithoutCountriesInputSchema).array(),z.lazy(() => TimeZoneUncheckedCreateWithoutCountriesInputSchema),z.lazy(() => TimeZoneUncheckedCreateWithoutCountriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TimeZoneCreateOrConnectWithoutCountriesInputSchema),z.lazy(() => TimeZoneCreateOrConnectWithoutCountriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TimeZoneUpsertWithWhereUniqueWithoutCountriesInputSchema),z.lazy(() => TimeZoneUpsertWithWhereUniqueWithoutCountriesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TimeZoneUpdateWithWhereUniqueWithoutCountriesInputSchema),z.lazy(() => TimeZoneUpdateWithWhereUniqueWithoutCountriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TimeZoneUpdateManyWithWhereWithoutCountriesInputSchema),z.lazy(() => TimeZoneUpdateManyWithWhereWithoutCountriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TimeZoneScalarWhereInputSchema),z.lazy(() => TimeZoneScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CityUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.CityUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutCountryInputSchema),z.lazy(() => CityCreateWithoutCountryInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutCountryInputSchema),z.lazy(() => CityUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutCountryInputSchema),z.lazy(() => CityCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CityUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => CityUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyCountryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CityUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => CityUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CityUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => CityUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CityScalarWhereInputSchema),z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TimeZoneUncheckedUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.TimeZoneUncheckedUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TimeZoneCreateWithoutCountryInputSchema),z.lazy(() => TimeZoneCreateWithoutCountryInputSchema).array(),z.lazy(() => TimeZoneUncheckedCreateWithoutCountryInputSchema),z.lazy(() => TimeZoneUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TimeZoneCreateOrConnectWithoutCountryInputSchema),z.lazy(() => TimeZoneCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TimeZoneUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => TimeZoneUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TimeZoneUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => TimeZoneUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TimeZoneUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => TimeZoneUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TimeZoneScalarWhereInputSchema),z.lazy(() => TimeZoneScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TranslationUncheckedUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TranslationCreateWithoutCountryInputSchema),z.lazy(() => TranslationCreateWithoutCountryInputSchema).array(),z.lazy(() => TranslationUncheckedCreateWithoutCountryInputSchema),z.lazy(() => TranslationUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TranslationCreateOrConnectWithoutCountryInputSchema),z.lazy(() => TranslationCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TranslationUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => TranslationUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TranslationCreateManyCountryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TranslationUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => TranslationUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TranslationUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => TranslationUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TranslationScalarWhereInputSchema),z.lazy(() => TranslationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StateUncheckedUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.StateUncheckedUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => StateCreateWithoutCountryInputSchema),z.lazy(() => StateCreateWithoutCountryInputSchema).array(),z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema),z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema),z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StateUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => StateUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StateCreateManyCountryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StateWhereUniqueInputSchema),z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StateWhereUniqueInputSchema),z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StateWhereUniqueInputSchema),z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StateWhereUniqueInputSchema),z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StateUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => StateUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StateUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => StateUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StateScalarWhereInputSchema),z.lazy(() => StateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TimeZoneUncheckedUpdateManyWithoutCountriesNestedInputSchema: z.ZodType<Prisma.TimeZoneUncheckedUpdateManyWithoutCountriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TimeZoneCreateWithoutCountriesInputSchema),z.lazy(() => TimeZoneCreateWithoutCountriesInputSchema).array(),z.lazy(() => TimeZoneUncheckedCreateWithoutCountriesInputSchema),z.lazy(() => TimeZoneUncheckedCreateWithoutCountriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TimeZoneCreateOrConnectWithoutCountriesInputSchema),z.lazy(() => TimeZoneCreateOrConnectWithoutCountriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TimeZoneUpsertWithWhereUniqueWithoutCountriesInputSchema),z.lazy(() => TimeZoneUpsertWithWhereUniqueWithoutCountriesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TimeZoneWhereUniqueInputSchema),z.lazy(() => TimeZoneWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TimeZoneUpdateWithWhereUniqueWithoutCountriesInputSchema),z.lazy(() => TimeZoneUpdateWithWhereUniqueWithoutCountriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TimeZoneUpdateManyWithWhereWithoutCountriesInputSchema),z.lazy(() => TimeZoneUpdateManyWithWhereWithoutCountriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TimeZoneScalarWhereInputSchema),z.lazy(() => TimeZoneScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CityUncheckedUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutCountryInputSchema),z.lazy(() => CityCreateWithoutCountryInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutCountryInputSchema),z.lazy(() => CityUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutCountryInputSchema),z.lazy(() => CityCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CityUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => CityUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyCountryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CityUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => CityUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CityUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => CityUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CityScalarWhereInputSchema),z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryCreateNestedOneWithoutStatesInputSchema: z.ZodType<Prisma.CountryCreateNestedOneWithoutStatesInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutStatesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutStatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutStatesInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional()
}).strict();

export const CityCreateNestedManyWithoutStateInputSchema: z.ZodType<Prisma.CityCreateNestedManyWithoutStateInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutStateInputSchema),z.lazy(() => CityCreateWithoutStateInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutStateInputSchema),z.lazy(() => CityUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutStateInputSchema),z.lazy(() => CityCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyStateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CityUncheckedCreateNestedManyWithoutStateInputSchema: z.ZodType<Prisma.CityUncheckedCreateNestedManyWithoutStateInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutStateInputSchema),z.lazy(() => CityCreateWithoutStateInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutStateInputSchema),z.lazy(() => CityUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutStateInputSchema),z.lazy(() => CityCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyStateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryUpdateOneRequiredWithoutStatesNestedInputSchema: z.ZodType<Prisma.CountryUpdateOneRequiredWithoutStatesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutStatesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutStatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutStatesInputSchema).optional(),
  upsert: z.lazy(() => CountryUpsertWithoutStatesInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CountryUpdateToOneWithWhereWithoutStatesInputSchema),z.lazy(() => CountryUpdateWithoutStatesInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutStatesInputSchema) ]).optional(),
}).strict();

export const CityUpdateManyWithoutStateNestedInputSchema: z.ZodType<Prisma.CityUpdateManyWithoutStateNestedInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutStateInputSchema),z.lazy(() => CityCreateWithoutStateInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutStateInputSchema),z.lazy(() => CityUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutStateInputSchema),z.lazy(() => CityCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CityUpsertWithWhereUniqueWithoutStateInputSchema),z.lazy(() => CityUpsertWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyStateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CityUpdateWithWhereUniqueWithoutStateInputSchema),z.lazy(() => CityUpdateWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CityUpdateManyWithWhereWithoutStateInputSchema),z.lazy(() => CityUpdateManyWithWhereWithoutStateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CityScalarWhereInputSchema),z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CityUncheckedUpdateManyWithoutStateNestedInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyWithoutStateNestedInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutStateInputSchema),z.lazy(() => CityCreateWithoutStateInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutStateInputSchema),z.lazy(() => CityUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutStateInputSchema),z.lazy(() => CityCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CityUpsertWithWhereUniqueWithoutStateInputSchema),z.lazy(() => CityUpsertWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyStateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CityUpdateWithWhereUniqueWithoutStateInputSchema),z.lazy(() => CityUpdateWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CityUpdateManyWithWhereWithoutStateInputSchema),z.lazy(() => CityUpdateManyWithWhereWithoutStateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CityScalarWhereInputSchema),z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StateCreateNestedOneWithoutCitiesInputSchema: z.ZodType<Prisma.StateCreateNestedOneWithoutCitiesInput> = z.object({
  create: z.union([ z.lazy(() => StateCreateWithoutCitiesInputSchema),z.lazy(() => StateUncheckedCreateWithoutCitiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StateCreateOrConnectWithoutCitiesInputSchema).optional(),
  connect: z.lazy(() => StateWhereUniqueInputSchema).optional()
}).strict();

export const CountryCreateNestedOneWithoutCityInputSchema: z.ZodType<Prisma.CountryCreateNestedOneWithoutCityInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutCityInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCityInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutCityInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional()
}).strict();

export const StateUpdateOneRequiredWithoutCitiesNestedInputSchema: z.ZodType<Prisma.StateUpdateOneRequiredWithoutCitiesNestedInput> = z.object({
  create: z.union([ z.lazy(() => StateCreateWithoutCitiesInputSchema),z.lazy(() => StateUncheckedCreateWithoutCitiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StateCreateOrConnectWithoutCitiesInputSchema).optional(),
  upsert: z.lazy(() => StateUpsertWithoutCitiesInputSchema).optional(),
  connect: z.lazy(() => StateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StateUpdateToOneWithWhereWithoutCitiesInputSchema),z.lazy(() => StateUpdateWithoutCitiesInputSchema),z.lazy(() => StateUncheckedUpdateWithoutCitiesInputSchema) ]).optional(),
}).strict();

export const CountryUpdateOneRequiredWithoutCityNestedInputSchema: z.ZodType<Prisma.CountryUpdateOneRequiredWithoutCityNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutCityInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCityInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutCityInputSchema).optional(),
  upsert: z.lazy(() => CountryUpsertWithoutCityInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CountryUpdateToOneWithWhereWithoutCityInputSchema),z.lazy(() => CountryUpdateWithoutCityInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutCityInputSchema) ]).optional(),
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

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
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
  name: z.string(),
  avatarUrl: z.string().optional().nullable(),
  contactEmail: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
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
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const SubregionCreateWithoutRegionInputSchema: z.ZodType<Prisma.SubregionCreateWithoutRegionInput> = z.object({
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable(),
  countries: z.lazy(() => CountryCreateNestedManyWithoutSubregionInputSchema).optional()
}).strict();

export const SubregionUncheckedCreateWithoutRegionInputSchema: z.ZodType<Prisma.SubregionUncheckedCreateWithoutRegionInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable(),
  countries: z.lazy(() => CountryUncheckedCreateNestedManyWithoutSubregionInputSchema).optional()
}).strict();

export const SubregionCreateOrConnectWithoutRegionInputSchema: z.ZodType<Prisma.SubregionCreateOrConnectWithoutRegionInput> = z.object({
  where: z.lazy(() => SubregionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubregionCreateWithoutRegionInputSchema),z.lazy(() => SubregionUncheckedCreateWithoutRegionInputSchema) ]),
}).strict();

export const SubregionCreateManyRegionInputEnvelopeSchema: z.ZodType<Prisma.SubregionCreateManyRegionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SubregionCreateManyRegionInputSchema),z.lazy(() => SubregionCreateManyRegionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CountryCreateWithoutRegionInputSchema: z.ZodType<Prisma.CountryCreateWithoutRegionInput> = z.object({
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  subregion: z.lazy(() => SubregionCreateNestedOneWithoutCountriesInputSchema).optional(),
  currency: z.lazy(() => CurrencyCreateNestedOneWithoutCountriesInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeCreateNestedOneWithoutCountriesInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUncheckedCreateWithoutRegionInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutRegionInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  subregionId: z.number().int().optional().nullable(),
  currencyId: z.number().int().optional().nullable(),
  phoneCodeId: z.number().int().optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityUncheckedCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryCreateOrConnectWithoutRegionInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutRegionInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutRegionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutRegionInputSchema) ]),
}).strict();

export const CountryCreateManyRegionInputEnvelopeSchema: z.ZodType<Prisma.CountryCreateManyRegionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CountryCreateManyRegionInputSchema),z.lazy(() => CountryCreateManyRegionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SubregionUpsertWithWhereUniqueWithoutRegionInputSchema: z.ZodType<Prisma.SubregionUpsertWithWhereUniqueWithoutRegionInput> = z.object({
  where: z.lazy(() => SubregionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SubregionUpdateWithoutRegionInputSchema),z.lazy(() => SubregionUncheckedUpdateWithoutRegionInputSchema) ]),
  create: z.union([ z.lazy(() => SubregionCreateWithoutRegionInputSchema),z.lazy(() => SubregionUncheckedCreateWithoutRegionInputSchema) ]),
}).strict();

export const SubregionUpdateWithWhereUniqueWithoutRegionInputSchema: z.ZodType<Prisma.SubregionUpdateWithWhereUniqueWithoutRegionInput> = z.object({
  where: z.lazy(() => SubregionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SubregionUpdateWithoutRegionInputSchema),z.lazy(() => SubregionUncheckedUpdateWithoutRegionInputSchema) ]),
}).strict();

export const SubregionUpdateManyWithWhereWithoutRegionInputSchema: z.ZodType<Prisma.SubregionUpdateManyWithWhereWithoutRegionInput> = z.object({
  where: z.lazy(() => SubregionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SubregionUpdateManyMutationInputSchema),z.lazy(() => SubregionUncheckedUpdateManyWithoutRegionInputSchema) ]),
}).strict();

export const SubregionScalarWhereInputSchema: z.ZodType<Prisma.SubregionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SubregionScalarWhereInputSchema),z.lazy(() => SubregionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubregionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubregionScalarWhereInputSchema),z.lazy(() => SubregionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  translations: z.lazy(() => JsonNullableFilterSchema).optional(),
  wikiDataId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  regionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const CountryUpsertWithWhereUniqueWithoutRegionInputSchema: z.ZodType<Prisma.CountryUpsertWithWhereUniqueWithoutRegionInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CountryUpdateWithoutRegionInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutRegionInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutRegionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutRegionInputSchema) ]),
}).strict();

export const CountryUpdateWithWhereUniqueWithoutRegionInputSchema: z.ZodType<Prisma.CountryUpdateWithWhereUniqueWithoutRegionInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CountryUpdateWithoutRegionInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutRegionInputSchema) ]),
}).strict();

export const CountryUpdateManyWithWhereWithoutRegionInputSchema: z.ZodType<Prisma.CountryUpdateManyWithWhereWithoutRegionInput> = z.object({
  where: z.lazy(() => CountryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CountryUpdateManyMutationInputSchema),z.lazy(() => CountryUncheckedUpdateManyWithoutRegionInputSchema) ]),
}).strict();

export const CountryScalarWhereInputSchema: z.ZodType<Prisma.CountryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  iso3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  iso2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  numericCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  capital: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tld: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  native: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emoji: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emojiU: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  wikiDataId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  regionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  subregionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  currencyId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  phoneCodeId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const RegionCreateWithoutSubregionsInputSchema: z.ZodType<Prisma.RegionCreateWithoutSubregionsInput> = z.object({
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable(),
  countries: z.lazy(() => CountryCreateNestedManyWithoutRegionInputSchema).optional()
}).strict();

export const RegionUncheckedCreateWithoutSubregionsInputSchema: z.ZodType<Prisma.RegionUncheckedCreateWithoutSubregionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable(),
  countries: z.lazy(() => CountryUncheckedCreateNestedManyWithoutRegionInputSchema).optional()
}).strict();

export const RegionCreateOrConnectWithoutSubregionsInputSchema: z.ZodType<Prisma.RegionCreateOrConnectWithoutSubregionsInput> = z.object({
  where: z.lazy(() => RegionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RegionCreateWithoutSubregionsInputSchema),z.lazy(() => RegionUncheckedCreateWithoutSubregionsInputSchema) ]),
}).strict();

export const CountryCreateWithoutSubregionInputSchema: z.ZodType<Prisma.CountryCreateWithoutSubregionInput> = z.object({
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  region: z.lazy(() => RegionCreateNestedOneWithoutCountriesInputSchema).optional(),
  currency: z.lazy(() => CurrencyCreateNestedOneWithoutCountriesInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeCreateNestedOneWithoutCountriesInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUncheckedCreateWithoutSubregionInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutSubregionInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int().optional().nullable(),
  currencyId: z.number().int().optional().nullable(),
  phoneCodeId: z.number().int().optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityUncheckedCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryCreateOrConnectWithoutSubregionInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutSubregionInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutSubregionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutSubregionInputSchema) ]),
}).strict();

export const CountryCreateManySubregionInputEnvelopeSchema: z.ZodType<Prisma.CountryCreateManySubregionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CountryCreateManySubregionInputSchema),z.lazy(() => CountryCreateManySubregionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RegionUpsertWithoutSubregionsInputSchema: z.ZodType<Prisma.RegionUpsertWithoutSubregionsInput> = z.object({
  update: z.union([ z.lazy(() => RegionUpdateWithoutSubregionsInputSchema),z.lazy(() => RegionUncheckedUpdateWithoutSubregionsInputSchema) ]),
  create: z.union([ z.lazy(() => RegionCreateWithoutSubregionsInputSchema),z.lazy(() => RegionUncheckedCreateWithoutSubregionsInputSchema) ]),
  where: z.lazy(() => RegionWhereInputSchema).optional()
}).strict();

export const RegionUpdateToOneWithWhereWithoutSubregionsInputSchema: z.ZodType<Prisma.RegionUpdateToOneWithWhereWithoutSubregionsInput> = z.object({
  where: z.lazy(() => RegionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RegionUpdateWithoutSubregionsInputSchema),z.lazy(() => RegionUncheckedUpdateWithoutSubregionsInputSchema) ]),
}).strict();

export const RegionUpdateWithoutSubregionsInputSchema: z.ZodType<Prisma.RegionUpdateWithoutSubregionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countries: z.lazy(() => CountryUpdateManyWithoutRegionNestedInputSchema).optional()
}).strict();

export const RegionUncheckedUpdateWithoutSubregionsInputSchema: z.ZodType<Prisma.RegionUncheckedUpdateWithoutSubregionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countries: z.lazy(() => CountryUncheckedUpdateManyWithoutRegionNestedInputSchema).optional()
}).strict();

export const CountryUpsertWithWhereUniqueWithoutSubregionInputSchema: z.ZodType<Prisma.CountryUpsertWithWhereUniqueWithoutSubregionInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CountryUpdateWithoutSubregionInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutSubregionInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutSubregionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutSubregionInputSchema) ]),
}).strict();

export const CountryUpdateWithWhereUniqueWithoutSubregionInputSchema: z.ZodType<Prisma.CountryUpdateWithWhereUniqueWithoutSubregionInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CountryUpdateWithoutSubregionInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutSubregionInputSchema) ]),
}).strict();

export const CountryUpdateManyWithWhereWithoutSubregionInputSchema: z.ZodType<Prisma.CountryUpdateManyWithWhereWithoutSubregionInput> = z.object({
  where: z.lazy(() => CountryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CountryUpdateManyMutationInputSchema),z.lazy(() => CountryUncheckedUpdateManyWithoutSubregionInputSchema) ]),
}).strict();

export const CountryCreateWithoutCurrencyInputSchema: z.ZodType<Prisma.CountryCreateWithoutCurrencyInput> = z.object({
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  region: z.lazy(() => RegionCreateNestedOneWithoutCountriesInputSchema).optional(),
  subregion: z.lazy(() => SubregionCreateNestedOneWithoutCountriesInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeCreateNestedOneWithoutCountriesInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUncheckedCreateWithoutCurrencyInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutCurrencyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int().optional().nullable(),
  subregionId: z.number().int().optional().nullable(),
  phoneCodeId: z.number().int().optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityUncheckedCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryCreateOrConnectWithoutCurrencyInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutCurrencyInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutCurrencyInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCurrencyInputSchema) ]),
}).strict();

export const CountryCreateManyCurrencyInputEnvelopeSchema: z.ZodType<Prisma.CountryCreateManyCurrencyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CountryCreateManyCurrencyInputSchema),z.lazy(() => CountryCreateManyCurrencyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CountryUpsertWithWhereUniqueWithoutCurrencyInputSchema: z.ZodType<Prisma.CountryUpsertWithWhereUniqueWithoutCurrencyInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CountryUpdateWithoutCurrencyInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutCurrencyInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutCurrencyInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCurrencyInputSchema) ]),
}).strict();

export const CountryUpdateWithWhereUniqueWithoutCurrencyInputSchema: z.ZodType<Prisma.CountryUpdateWithWhereUniqueWithoutCurrencyInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CountryUpdateWithoutCurrencyInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutCurrencyInputSchema) ]),
}).strict();

export const CountryUpdateManyWithWhereWithoutCurrencyInputSchema: z.ZodType<Prisma.CountryUpdateManyWithWhereWithoutCurrencyInput> = z.object({
  where: z.lazy(() => CountryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CountryUpdateManyMutationInputSchema),z.lazy(() => CountryUncheckedUpdateManyWithoutCurrencyInputSchema) ]),
}).strict();

export const CountryCreateWithoutPhoneCodeInputSchema: z.ZodType<Prisma.CountryCreateWithoutPhoneCodeInput> = z.object({
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  region: z.lazy(() => RegionCreateNestedOneWithoutCountriesInputSchema).optional(),
  subregion: z.lazy(() => SubregionCreateNestedOneWithoutCountriesInputSchema).optional(),
  currency: z.lazy(() => CurrencyCreateNestedOneWithoutCountriesInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUncheckedCreateWithoutPhoneCodeInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutPhoneCodeInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int().optional().nullable(),
  subregionId: z.number().int().optional().nullable(),
  currencyId: z.number().int().optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityUncheckedCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryCreateOrConnectWithoutPhoneCodeInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutPhoneCodeInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutPhoneCodeInputSchema),z.lazy(() => CountryUncheckedCreateWithoutPhoneCodeInputSchema) ]),
}).strict();

export const CountryCreateManyPhoneCodeInputEnvelopeSchema: z.ZodType<Prisma.CountryCreateManyPhoneCodeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CountryCreateManyPhoneCodeInputSchema),z.lazy(() => CountryCreateManyPhoneCodeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CountryUpsertWithWhereUniqueWithoutPhoneCodeInputSchema: z.ZodType<Prisma.CountryUpsertWithWhereUniqueWithoutPhoneCodeInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CountryUpdateWithoutPhoneCodeInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutPhoneCodeInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutPhoneCodeInputSchema),z.lazy(() => CountryUncheckedCreateWithoutPhoneCodeInputSchema) ]),
}).strict();

export const CountryUpdateWithWhereUniqueWithoutPhoneCodeInputSchema: z.ZodType<Prisma.CountryUpdateWithWhereUniqueWithoutPhoneCodeInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CountryUpdateWithoutPhoneCodeInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutPhoneCodeInputSchema) ]),
}).strict();

export const CountryUpdateManyWithWhereWithoutPhoneCodeInputSchema: z.ZodType<Prisma.CountryUpdateManyWithWhereWithoutPhoneCodeInput> = z.object({
  where: z.lazy(() => CountryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CountryUpdateManyMutationInputSchema),z.lazy(() => CountryUncheckedUpdateManyWithoutPhoneCodeInputSchema) ]),
}).strict();

export const CountryCreateWithoutTimeZoneInputSchema: z.ZodType<Prisma.CountryCreateWithoutTimeZoneInput> = z.object({
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  region: z.lazy(() => RegionCreateNestedOneWithoutCountriesInputSchema).optional(),
  subregion: z.lazy(() => SubregionCreateNestedOneWithoutCountriesInputSchema).optional(),
  currency: z.lazy(() => CurrencyCreateNestedOneWithoutCountriesInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeCreateNestedOneWithoutCountriesInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateCreateNestedManyWithoutCountryInputSchema).optional(),
  City: z.lazy(() => CityCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUncheckedCreateWithoutTimeZoneInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutTimeZoneInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int().optional().nullable(),
  subregionId: z.number().int().optional().nullable(),
  currencyId: z.number().int().optional().nullable(),
  phoneCodeId: z.number().int().optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  City: z.lazy(() => CityUncheckedCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryCreateOrConnectWithoutTimeZoneInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutTimeZoneInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutTimeZoneInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTimeZoneInputSchema) ]),
}).strict();

export const CountryCreateWithoutTimezonesInputSchema: z.ZodType<Prisma.CountryCreateWithoutTimezonesInput> = z.object({
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  region: z.lazy(() => RegionCreateNestedOneWithoutCountriesInputSchema).optional(),
  subregion: z.lazy(() => SubregionCreateNestedOneWithoutCountriesInputSchema).optional(),
  currency: z.lazy(() => CurrencyCreateNestedOneWithoutCountriesInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeCreateNestedOneWithoutCountriesInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUncheckedCreateWithoutTimezonesInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutTimezonesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int().optional().nullable(),
  subregionId: z.number().int().optional().nullable(),
  currencyId: z.number().int().optional().nullable(),
  phoneCodeId: z.number().int().optional().nullable(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityUncheckedCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryCreateOrConnectWithoutTimezonesInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutTimezonesInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutTimezonesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTimezonesInputSchema) ]),
}).strict();

export const CountryUpsertWithWhereUniqueWithoutTimeZoneInputSchema: z.ZodType<Prisma.CountryUpsertWithWhereUniqueWithoutTimeZoneInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CountryUpdateWithoutTimeZoneInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutTimeZoneInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutTimeZoneInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTimeZoneInputSchema) ]),
}).strict();

export const CountryUpdateWithWhereUniqueWithoutTimeZoneInputSchema: z.ZodType<Prisma.CountryUpdateWithWhereUniqueWithoutTimeZoneInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CountryUpdateWithoutTimeZoneInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutTimeZoneInputSchema) ]),
}).strict();

export const CountryUpdateManyWithWhereWithoutTimeZoneInputSchema: z.ZodType<Prisma.CountryUpdateManyWithWhereWithoutTimeZoneInput> = z.object({
  where: z.lazy(() => CountryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CountryUpdateManyMutationInputSchema),z.lazy(() => CountryUncheckedUpdateManyWithoutTimeZoneInputSchema) ]),
}).strict();

export const CountryUpsertWithWhereUniqueWithoutTimezonesInputSchema: z.ZodType<Prisma.CountryUpsertWithWhereUniqueWithoutTimezonesInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CountryUpdateWithoutTimezonesInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutTimezonesInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutTimezonesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTimezonesInputSchema) ]),
}).strict();

export const CountryUpdateWithWhereUniqueWithoutTimezonesInputSchema: z.ZodType<Prisma.CountryUpdateWithWhereUniqueWithoutTimezonesInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CountryUpdateWithoutTimezonesInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutTimezonesInputSchema) ]),
}).strict();

export const CountryUpdateManyWithWhereWithoutTimezonesInputSchema: z.ZodType<Prisma.CountryUpdateManyWithWhereWithoutTimezonesInput> = z.object({
  where: z.lazy(() => CountryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CountryUpdateManyMutationInputSchema),z.lazy(() => CountryUncheckedUpdateManyWithoutTimezonesInputSchema) ]),
}).strict();

export const CountryCreateWithoutTranslationsInputSchema: z.ZodType<Prisma.CountryCreateWithoutTranslationsInput> = z.object({
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  region: z.lazy(() => RegionCreateNestedOneWithoutCountriesInputSchema).optional(),
  subregion: z.lazy(() => SubregionCreateNestedOneWithoutCountriesInputSchema).optional(),
  currency: z.lazy(() => CurrencyCreateNestedOneWithoutCountriesInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeCreateNestedOneWithoutCountriesInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUncheckedCreateWithoutTranslationsInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutTranslationsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int().optional().nullable(),
  subregionId: z.number().int().optional().nullable(),
  currencyId: z.number().int().optional().nullable(),
  phoneCodeId: z.number().int().optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityUncheckedCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryCreateOrConnectWithoutTranslationsInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutTranslationsInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutTranslationsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTranslationsInputSchema) ]),
}).strict();

export const CountryUpsertWithoutTranslationsInputSchema: z.ZodType<Prisma.CountryUpsertWithoutTranslationsInput> = z.object({
  update: z.union([ z.lazy(() => CountryUpdateWithoutTranslationsInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutTranslationsInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutTranslationsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutTranslationsInputSchema) ]),
  where: z.lazy(() => CountryWhereInputSchema).optional()
}).strict();

export const CountryUpdateToOneWithWhereWithoutTranslationsInputSchema: z.ZodType<Prisma.CountryUpdateToOneWithWhereWithoutTranslationsInput> = z.object({
  where: z.lazy(() => CountryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CountryUpdateWithoutTranslationsInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutTranslationsInputSchema) ]),
}).strict();

export const CountryUpdateWithoutTranslationsInputSchema: z.ZodType<Prisma.CountryUpdateWithoutTranslationsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  region: z.lazy(() => RegionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  subregion: z.lazy(() => SubregionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  currency: z.lazy(() => CurrencyUpdateOneWithoutCountriesNestedInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeUpdateOneWithoutCountriesNestedInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateWithoutTranslationsInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutTranslationsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUncheckedUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const RegionCreateWithoutCountriesInputSchema: z.ZodType<Prisma.RegionCreateWithoutCountriesInput> = z.object({
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable(),
  subregions: z.lazy(() => SubregionCreateNestedManyWithoutRegionInputSchema).optional()
}).strict();

export const RegionUncheckedCreateWithoutCountriesInputSchema: z.ZodType<Prisma.RegionUncheckedCreateWithoutCountriesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable(),
  subregions: z.lazy(() => SubregionUncheckedCreateNestedManyWithoutRegionInputSchema).optional()
}).strict();

export const RegionCreateOrConnectWithoutCountriesInputSchema: z.ZodType<Prisma.RegionCreateOrConnectWithoutCountriesInput> = z.object({
  where: z.lazy(() => RegionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RegionCreateWithoutCountriesInputSchema),z.lazy(() => RegionUncheckedCreateWithoutCountriesInputSchema) ]),
}).strict();

export const SubregionCreateWithoutCountriesInputSchema: z.ZodType<Prisma.SubregionCreateWithoutCountriesInput> = z.object({
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable(),
  region: z.lazy(() => RegionCreateNestedOneWithoutSubregionsInputSchema)
}).strict();

export const SubregionUncheckedCreateWithoutCountriesInputSchema: z.ZodType<Prisma.SubregionUncheckedCreateWithoutCountriesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int()
}).strict();

export const SubregionCreateOrConnectWithoutCountriesInputSchema: z.ZodType<Prisma.SubregionCreateOrConnectWithoutCountriesInput> = z.object({
  where: z.lazy(() => SubregionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubregionCreateWithoutCountriesInputSchema),z.lazy(() => SubregionUncheckedCreateWithoutCountriesInputSchema) ]),
}).strict();

export const CurrencyCreateWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyCreateWithoutCountriesInput> = z.object({
  code: z.string(),
  name: z.string().optional().nullable(),
  symbol: z.string().optional().nullable()
}).strict();

export const CurrencyUncheckedCreateWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyUncheckedCreateWithoutCountriesInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string().optional().nullable(),
  symbol: z.string().optional().nullable()
}).strict();

export const CurrencyCreateOrConnectWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyCreateOrConnectWithoutCountriesInput> = z.object({
  where: z.lazy(() => CurrencyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CurrencyCreateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedCreateWithoutCountriesInputSchema) ]),
}).strict();

export const PhoneCodeCreateWithoutCountriesInputSchema: z.ZodType<Prisma.PhoneCodeCreateWithoutCountriesInput> = z.object({
  code: z.string()
}).strict();

export const PhoneCodeUncheckedCreateWithoutCountriesInputSchema: z.ZodType<Prisma.PhoneCodeUncheckedCreateWithoutCountriesInput> = z.object({
  id: z.number().int().optional(),
  code: z.string()
}).strict();

export const PhoneCodeCreateOrConnectWithoutCountriesInputSchema: z.ZodType<Prisma.PhoneCodeCreateOrConnectWithoutCountriesInput> = z.object({
  where: z.lazy(() => PhoneCodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PhoneCodeCreateWithoutCountriesInputSchema),z.lazy(() => PhoneCodeUncheckedCreateWithoutCountriesInputSchema) ]),
}).strict();

export const TimeZoneCreateWithoutCountryInputSchema: z.ZodType<Prisma.TimeZoneCreateWithoutCountryInput> = z.object({
  name: z.string(),
  offset: z.string().optional().nullable(),
  countries: z.lazy(() => CountryCreateNestedManyWithoutTimeZoneInputSchema).optional()
}).strict();

export const TimeZoneUncheckedCreateWithoutCountryInputSchema: z.ZodType<Prisma.TimeZoneUncheckedCreateWithoutCountryInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  offset: z.string().optional().nullable(),
  countries: z.lazy(() => CountryUncheckedCreateNestedManyWithoutTimeZoneInputSchema).optional()
}).strict();

export const TimeZoneCreateOrConnectWithoutCountryInputSchema: z.ZodType<Prisma.TimeZoneCreateOrConnectWithoutCountryInput> = z.object({
  where: z.lazy(() => TimeZoneWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TimeZoneCreateWithoutCountryInputSchema),z.lazy(() => TimeZoneUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const TranslationCreateWithoutCountryInputSchema: z.ZodType<Prisma.TranslationCreateWithoutCountryInput> = z.object({
  language: z.string(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const TranslationUncheckedCreateWithoutCountryInputSchema: z.ZodType<Prisma.TranslationUncheckedCreateWithoutCountryInput> = z.object({
  id: z.number().int().optional(),
  language: z.string(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const TranslationCreateOrConnectWithoutCountryInputSchema: z.ZodType<Prisma.TranslationCreateOrConnectWithoutCountryInput> = z.object({
  where: z.lazy(() => TranslationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TranslationCreateWithoutCountryInputSchema),z.lazy(() => TranslationUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const TranslationCreateManyCountryInputEnvelopeSchema: z.ZodType<Prisma.TranslationCreateManyCountryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TranslationCreateManyCountryInputSchema),z.lazy(() => TranslationCreateManyCountryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StateCreateWithoutCountryInputSchema: z.ZodType<Prisma.StateCreateWithoutCountryInput> = z.object({
  name: z.string(),
  iso2: z.string().optional().nullable(),
  fipsCode: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  cities: z.lazy(() => CityCreateNestedManyWithoutStateInputSchema).optional()
}).strict();

export const StateUncheckedCreateWithoutCountryInputSchema: z.ZodType<Prisma.StateUncheckedCreateWithoutCountryInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso2: z.string().optional().nullable(),
  fipsCode: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  cities: z.lazy(() => CityUncheckedCreateNestedManyWithoutStateInputSchema).optional()
}).strict();

export const StateCreateOrConnectWithoutCountryInputSchema: z.ZodType<Prisma.StateCreateOrConnectWithoutCountryInput> = z.object({
  where: z.lazy(() => StateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StateCreateWithoutCountryInputSchema),z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const StateCreateManyCountryInputEnvelopeSchema: z.ZodType<Prisma.StateCreateManyCountryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StateCreateManyCountryInputSchema),z.lazy(() => StateCreateManyCountryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TimeZoneCreateWithoutCountriesInputSchema: z.ZodType<Prisma.TimeZoneCreateWithoutCountriesInput> = z.object({
  name: z.string(),
  offset: z.string().optional().nullable(),
  Country: z.lazy(() => CountryCreateNestedManyWithoutTimezonesInputSchema).optional()
}).strict();

export const TimeZoneUncheckedCreateWithoutCountriesInputSchema: z.ZodType<Prisma.TimeZoneUncheckedCreateWithoutCountriesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  offset: z.string().optional().nullable(),
  Country: z.lazy(() => CountryUncheckedCreateNestedManyWithoutTimezonesInputSchema).optional()
}).strict();

export const TimeZoneCreateOrConnectWithoutCountriesInputSchema: z.ZodType<Prisma.TimeZoneCreateOrConnectWithoutCountriesInput> = z.object({
  where: z.lazy(() => TimeZoneWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TimeZoneCreateWithoutCountriesInputSchema),z.lazy(() => TimeZoneUncheckedCreateWithoutCountriesInputSchema) ]),
}).strict();

export const CityCreateWithoutCountryInputSchema: z.ZodType<Prisma.CityCreateWithoutCountryInput> = z.object({
  name: z.string(),
  stateCode: z.string().optional().nullable(),
  countryCode: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  state: z.lazy(() => StateCreateNestedOneWithoutCitiesInputSchema)
}).strict();

export const CityUncheckedCreateWithoutCountryInputSchema: z.ZodType<Prisma.CityUncheckedCreateWithoutCountryInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  stateCode: z.string().optional().nullable(),
  countryCode: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  stateId: z.number().int()
}).strict();

export const CityCreateOrConnectWithoutCountryInputSchema: z.ZodType<Prisma.CityCreateOrConnectWithoutCountryInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CityCreateWithoutCountryInputSchema),z.lazy(() => CityUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const CityCreateManyCountryInputEnvelopeSchema: z.ZodType<Prisma.CityCreateManyCountryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CityCreateManyCountryInputSchema),z.lazy(() => CityCreateManyCountryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RegionUpsertWithoutCountriesInputSchema: z.ZodType<Prisma.RegionUpsertWithoutCountriesInput> = z.object({
  update: z.union([ z.lazy(() => RegionUpdateWithoutCountriesInputSchema),z.lazy(() => RegionUncheckedUpdateWithoutCountriesInputSchema) ]),
  create: z.union([ z.lazy(() => RegionCreateWithoutCountriesInputSchema),z.lazy(() => RegionUncheckedCreateWithoutCountriesInputSchema) ]),
  where: z.lazy(() => RegionWhereInputSchema).optional()
}).strict();

export const RegionUpdateToOneWithWhereWithoutCountriesInputSchema: z.ZodType<Prisma.RegionUpdateToOneWithWhereWithoutCountriesInput> = z.object({
  where: z.lazy(() => RegionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RegionUpdateWithoutCountriesInputSchema),z.lazy(() => RegionUncheckedUpdateWithoutCountriesInputSchema) ]),
}).strict();

export const RegionUpdateWithoutCountriesInputSchema: z.ZodType<Prisma.RegionUpdateWithoutCountriesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregions: z.lazy(() => SubregionUpdateManyWithoutRegionNestedInputSchema).optional()
}).strict();

export const RegionUncheckedUpdateWithoutCountriesInputSchema: z.ZodType<Prisma.RegionUncheckedUpdateWithoutCountriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregions: z.lazy(() => SubregionUncheckedUpdateManyWithoutRegionNestedInputSchema).optional()
}).strict();

export const SubregionUpsertWithoutCountriesInputSchema: z.ZodType<Prisma.SubregionUpsertWithoutCountriesInput> = z.object({
  update: z.union([ z.lazy(() => SubregionUpdateWithoutCountriesInputSchema),z.lazy(() => SubregionUncheckedUpdateWithoutCountriesInputSchema) ]),
  create: z.union([ z.lazy(() => SubregionCreateWithoutCountriesInputSchema),z.lazy(() => SubregionUncheckedCreateWithoutCountriesInputSchema) ]),
  where: z.lazy(() => SubregionWhereInputSchema).optional()
}).strict();

export const SubregionUpdateToOneWithWhereWithoutCountriesInputSchema: z.ZodType<Prisma.SubregionUpdateToOneWithWhereWithoutCountriesInput> = z.object({
  where: z.lazy(() => SubregionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SubregionUpdateWithoutCountriesInputSchema),z.lazy(() => SubregionUncheckedUpdateWithoutCountriesInputSchema) ]),
}).strict();

export const SubregionUpdateWithoutCountriesInputSchema: z.ZodType<Prisma.SubregionUpdateWithoutCountriesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  region: z.lazy(() => RegionUpdateOneRequiredWithoutSubregionsNestedInputSchema).optional()
}).strict();

export const SubregionUncheckedUpdateWithoutCountriesInputSchema: z.ZodType<Prisma.SubregionUncheckedUpdateWithoutCountriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CurrencyUpsertWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyUpsertWithoutCountriesInput> = z.object({
  update: z.union([ z.lazy(() => CurrencyUpdateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedUpdateWithoutCountriesInputSchema) ]),
  create: z.union([ z.lazy(() => CurrencyCreateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedCreateWithoutCountriesInputSchema) ]),
  where: z.lazy(() => CurrencyWhereInputSchema).optional()
}).strict();

export const CurrencyUpdateToOneWithWhereWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyUpdateToOneWithWhereWithoutCountriesInput> = z.object({
  where: z.lazy(() => CurrencyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CurrencyUpdateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedUpdateWithoutCountriesInputSchema) ]),
}).strict();

export const CurrencyUpdateWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyUpdateWithoutCountriesInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CurrencyUncheckedUpdateWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyUncheckedUpdateWithoutCountriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PhoneCodeUpsertWithoutCountriesInputSchema: z.ZodType<Prisma.PhoneCodeUpsertWithoutCountriesInput> = z.object({
  update: z.union([ z.lazy(() => PhoneCodeUpdateWithoutCountriesInputSchema),z.lazy(() => PhoneCodeUncheckedUpdateWithoutCountriesInputSchema) ]),
  create: z.union([ z.lazy(() => PhoneCodeCreateWithoutCountriesInputSchema),z.lazy(() => PhoneCodeUncheckedCreateWithoutCountriesInputSchema) ]),
  where: z.lazy(() => PhoneCodeWhereInputSchema).optional()
}).strict();

export const PhoneCodeUpdateToOneWithWhereWithoutCountriesInputSchema: z.ZodType<Prisma.PhoneCodeUpdateToOneWithWhereWithoutCountriesInput> = z.object({
  where: z.lazy(() => PhoneCodeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PhoneCodeUpdateWithoutCountriesInputSchema),z.lazy(() => PhoneCodeUncheckedUpdateWithoutCountriesInputSchema) ]),
}).strict();

export const PhoneCodeUpdateWithoutCountriesInputSchema: z.ZodType<Prisma.PhoneCodeUpdateWithoutCountriesInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PhoneCodeUncheckedUpdateWithoutCountriesInputSchema: z.ZodType<Prisma.PhoneCodeUncheckedUpdateWithoutCountriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TimeZoneUpsertWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.TimeZoneUpsertWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => TimeZoneWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TimeZoneUpdateWithoutCountryInputSchema),z.lazy(() => TimeZoneUncheckedUpdateWithoutCountryInputSchema) ]),
  create: z.union([ z.lazy(() => TimeZoneCreateWithoutCountryInputSchema),z.lazy(() => TimeZoneUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const TimeZoneUpdateWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.TimeZoneUpdateWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => TimeZoneWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TimeZoneUpdateWithoutCountryInputSchema),z.lazy(() => TimeZoneUncheckedUpdateWithoutCountryInputSchema) ]),
}).strict();

export const TimeZoneUpdateManyWithWhereWithoutCountryInputSchema: z.ZodType<Prisma.TimeZoneUpdateManyWithWhereWithoutCountryInput> = z.object({
  where: z.lazy(() => TimeZoneScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TimeZoneUpdateManyMutationInputSchema),z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountryInputSchema) ]),
}).strict();

export const TimeZoneScalarWhereInputSchema: z.ZodType<Prisma.TimeZoneScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TimeZoneScalarWhereInputSchema),z.lazy(() => TimeZoneScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TimeZoneScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TimeZoneScalarWhereInputSchema),z.lazy(() => TimeZoneScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  offset: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const TranslationUpsertWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.TranslationUpsertWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => TranslationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TranslationUpdateWithoutCountryInputSchema),z.lazy(() => TranslationUncheckedUpdateWithoutCountryInputSchema) ]),
  create: z.union([ z.lazy(() => TranslationCreateWithoutCountryInputSchema),z.lazy(() => TranslationUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const TranslationUpdateWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.TranslationUpdateWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => TranslationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TranslationUpdateWithoutCountryInputSchema),z.lazy(() => TranslationUncheckedUpdateWithoutCountryInputSchema) ]),
}).strict();

export const TranslationUpdateManyWithWhereWithoutCountryInputSchema: z.ZodType<Prisma.TranslationUpdateManyWithWhereWithoutCountryInput> = z.object({
  where: z.lazy(() => TranslationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TranslationUpdateManyMutationInputSchema),z.lazy(() => TranslationUncheckedUpdateManyWithoutCountryInputSchema) ]),
}).strict();

export const TranslationScalarWhereInputSchema: z.ZodType<Prisma.TranslationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TranslationScalarWhereInputSchema),z.lazy(() => TranslationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranslationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranslationScalarWhereInputSchema),z.lazy(() => TranslationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.lazy(() => JsonFilterSchema).optional(),
  countryId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const StateUpsertWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.StateUpsertWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => StateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StateUpdateWithoutCountryInputSchema),z.lazy(() => StateUncheckedUpdateWithoutCountryInputSchema) ]),
  create: z.union([ z.lazy(() => StateCreateWithoutCountryInputSchema),z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const StateUpdateWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.StateUpdateWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => StateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StateUpdateWithoutCountryInputSchema),z.lazy(() => StateUncheckedUpdateWithoutCountryInputSchema) ]),
}).strict();

export const StateUpdateManyWithWhereWithoutCountryInputSchema: z.ZodType<Prisma.StateUpdateManyWithWhereWithoutCountryInput> = z.object({
  where: z.lazy(() => StateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StateUpdateManyMutationInputSchema),z.lazy(() => StateUncheckedUpdateManyWithoutCountryInputSchema) ]),
}).strict();

export const StateScalarWhereInputSchema: z.ZodType<Prisma.StateScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StateScalarWhereInputSchema),z.lazy(() => StateScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StateScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StateScalarWhereInputSchema),z.lazy(() => StateScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  iso2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fipsCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  wikiDataId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  countryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const TimeZoneUpsertWithWhereUniqueWithoutCountriesInputSchema: z.ZodType<Prisma.TimeZoneUpsertWithWhereUniqueWithoutCountriesInput> = z.object({
  where: z.lazy(() => TimeZoneWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TimeZoneUpdateWithoutCountriesInputSchema),z.lazy(() => TimeZoneUncheckedUpdateWithoutCountriesInputSchema) ]),
  create: z.union([ z.lazy(() => TimeZoneCreateWithoutCountriesInputSchema),z.lazy(() => TimeZoneUncheckedCreateWithoutCountriesInputSchema) ]),
}).strict();

export const TimeZoneUpdateWithWhereUniqueWithoutCountriesInputSchema: z.ZodType<Prisma.TimeZoneUpdateWithWhereUniqueWithoutCountriesInput> = z.object({
  where: z.lazy(() => TimeZoneWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TimeZoneUpdateWithoutCountriesInputSchema),z.lazy(() => TimeZoneUncheckedUpdateWithoutCountriesInputSchema) ]),
}).strict();

export const TimeZoneUpdateManyWithWhereWithoutCountriesInputSchema: z.ZodType<Prisma.TimeZoneUpdateManyWithWhereWithoutCountriesInput> = z.object({
  where: z.lazy(() => TimeZoneScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TimeZoneUpdateManyMutationInputSchema),z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountriesInputSchema) ]),
}).strict();

export const CityUpsertWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.CityUpsertWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CityUpdateWithoutCountryInputSchema),z.lazy(() => CityUncheckedUpdateWithoutCountryInputSchema) ]),
  create: z.union([ z.lazy(() => CityCreateWithoutCountryInputSchema),z.lazy(() => CityUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const CityUpdateWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.CityUpdateWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CityUpdateWithoutCountryInputSchema),z.lazy(() => CityUncheckedUpdateWithoutCountryInputSchema) ]),
}).strict();

export const CityUpdateManyWithWhereWithoutCountryInputSchema: z.ZodType<Prisma.CityUpdateManyWithWhereWithoutCountryInput> = z.object({
  where: z.lazy(() => CityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CityUpdateManyMutationInputSchema),z.lazy(() => CityUncheckedUpdateManyWithoutCountryInputSchema) ]),
}).strict();

export const CityScalarWhereInputSchema: z.ZodType<Prisma.CityScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CityScalarWhereInputSchema),z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityScalarWhereInputSchema),z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stateCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  countryCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  wikiDataId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stateId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  countryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const CountryCreateWithoutStatesInputSchema: z.ZodType<Prisma.CountryCreateWithoutStatesInput> = z.object({
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  region: z.lazy(() => RegionCreateNestedOneWithoutCountriesInputSchema).optional(),
  subregion: z.lazy(() => SubregionCreateNestedOneWithoutCountriesInputSchema).optional(),
  currency: z.lazy(() => CurrencyCreateNestedOneWithoutCountriesInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeCreateNestedOneWithoutCountriesInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUncheckedCreateWithoutStatesInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutStatesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int().optional().nullable(),
  subregionId: z.number().int().optional().nullable(),
  currencyId: z.number().int().optional().nullable(),
  phoneCodeId: z.number().int().optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountriesInputSchema).optional(),
  City: z.lazy(() => CityUncheckedCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryCreateOrConnectWithoutStatesInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutStatesInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutStatesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutStatesInputSchema) ]),
}).strict();

export const CityCreateWithoutStateInputSchema: z.ZodType<Prisma.CityCreateWithoutStateInput> = z.object({
  name: z.string(),
  stateCode: z.string().optional().nullable(),
  countryCode: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  country: z.lazy(() => CountryCreateNestedOneWithoutCityInputSchema)
}).strict();

export const CityUncheckedCreateWithoutStateInputSchema: z.ZodType<Prisma.CityUncheckedCreateWithoutStateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  stateCode: z.string().optional().nullable(),
  countryCode: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  countryId: z.number().int()
}).strict();

export const CityCreateOrConnectWithoutStateInputSchema: z.ZodType<Prisma.CityCreateOrConnectWithoutStateInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CityCreateWithoutStateInputSchema),z.lazy(() => CityUncheckedCreateWithoutStateInputSchema) ]),
}).strict();

export const CityCreateManyStateInputEnvelopeSchema: z.ZodType<Prisma.CityCreateManyStateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CityCreateManyStateInputSchema),z.lazy(() => CityCreateManyStateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CountryUpsertWithoutStatesInputSchema: z.ZodType<Prisma.CountryUpsertWithoutStatesInput> = z.object({
  update: z.union([ z.lazy(() => CountryUpdateWithoutStatesInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutStatesInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutStatesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutStatesInputSchema) ]),
  where: z.lazy(() => CountryWhereInputSchema).optional()
}).strict();

export const CountryUpdateToOneWithWhereWithoutStatesInputSchema: z.ZodType<Prisma.CountryUpdateToOneWithWhereWithoutStatesInput> = z.object({
  where: z.lazy(() => CountryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CountryUpdateWithoutStatesInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutStatesInputSchema) ]),
}).strict();

export const CountryUpdateWithoutStatesInputSchema: z.ZodType<Prisma.CountryUpdateWithoutStatesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  region: z.lazy(() => RegionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  subregion: z.lazy(() => SubregionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  currency: z.lazy(() => CurrencyUpdateOneWithoutCountriesNestedInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeUpdateOneWithoutCountriesNestedInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateWithoutStatesInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutStatesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUncheckedUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CityUpsertWithWhereUniqueWithoutStateInputSchema: z.ZodType<Prisma.CityUpsertWithWhereUniqueWithoutStateInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CityUpdateWithoutStateInputSchema),z.lazy(() => CityUncheckedUpdateWithoutStateInputSchema) ]),
  create: z.union([ z.lazy(() => CityCreateWithoutStateInputSchema),z.lazy(() => CityUncheckedCreateWithoutStateInputSchema) ]),
}).strict();

export const CityUpdateWithWhereUniqueWithoutStateInputSchema: z.ZodType<Prisma.CityUpdateWithWhereUniqueWithoutStateInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CityUpdateWithoutStateInputSchema),z.lazy(() => CityUncheckedUpdateWithoutStateInputSchema) ]),
}).strict();

export const CityUpdateManyWithWhereWithoutStateInputSchema: z.ZodType<Prisma.CityUpdateManyWithWhereWithoutStateInput> = z.object({
  where: z.lazy(() => CityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CityUpdateManyMutationInputSchema),z.lazy(() => CityUncheckedUpdateManyWithoutStateInputSchema) ]),
}).strict();

export const StateCreateWithoutCitiesInputSchema: z.ZodType<Prisma.StateCreateWithoutCitiesInput> = z.object({
  name: z.string(),
  iso2: z.string().optional().nullable(),
  fipsCode: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  country: z.lazy(() => CountryCreateNestedOneWithoutStatesInputSchema)
}).strict();

export const StateUncheckedCreateWithoutCitiesInputSchema: z.ZodType<Prisma.StateUncheckedCreateWithoutCitiesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso2: z.string().optional().nullable(),
  fipsCode: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  countryId: z.number().int()
}).strict();

export const StateCreateOrConnectWithoutCitiesInputSchema: z.ZodType<Prisma.StateCreateOrConnectWithoutCitiesInput> = z.object({
  where: z.lazy(() => StateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StateCreateWithoutCitiesInputSchema),z.lazy(() => StateUncheckedCreateWithoutCitiesInputSchema) ]),
}).strict();

export const CountryCreateWithoutCityInputSchema: z.ZodType<Prisma.CountryCreateWithoutCityInput> = z.object({
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  region: z.lazy(() => RegionCreateNestedOneWithoutCountriesInputSchema).optional(),
  subregion: z.lazy(() => SubregionCreateNestedOneWithoutCountriesInputSchema).optional(),
  currency: z.lazy(() => CurrencyCreateNestedOneWithoutCountriesInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeCreateNestedOneWithoutCountriesInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneCreateNestedManyWithoutCountriesInputSchema).optional()
}).strict();

export const CountryUncheckedCreateWithoutCityInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutCityInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int().optional().nullable(),
  subregionId: z.number().int().optional().nullable(),
  currencyId: z.number().int().optional().nullable(),
  phoneCodeId: z.number().int().optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  states: z.lazy(() => StateUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedCreateNestedManyWithoutCountriesInputSchema).optional()
}).strict();

export const CountryCreateOrConnectWithoutCityInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutCityInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutCityInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCityInputSchema) ]),
}).strict();

export const StateUpsertWithoutCitiesInputSchema: z.ZodType<Prisma.StateUpsertWithoutCitiesInput> = z.object({
  update: z.union([ z.lazy(() => StateUpdateWithoutCitiesInputSchema),z.lazy(() => StateUncheckedUpdateWithoutCitiesInputSchema) ]),
  create: z.union([ z.lazy(() => StateCreateWithoutCitiesInputSchema),z.lazy(() => StateUncheckedCreateWithoutCitiesInputSchema) ]),
  where: z.lazy(() => StateWhereInputSchema).optional()
}).strict();

export const StateUpdateToOneWithWhereWithoutCitiesInputSchema: z.ZodType<Prisma.StateUpdateToOneWithWhereWithoutCitiesInput> = z.object({
  where: z.lazy(() => StateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StateUpdateWithoutCitiesInputSchema),z.lazy(() => StateUncheckedUpdateWithoutCitiesInputSchema) ]),
}).strict();

export const StateUpdateWithoutCitiesInputSchema: z.ZodType<Prisma.StateUpdateWithoutCitiesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fipsCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutStatesNestedInputSchema).optional()
}).strict();

export const StateUncheckedUpdateWithoutCitiesInputSchema: z.ZodType<Prisma.StateUncheckedUpdateWithoutCitiesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fipsCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CountryUpsertWithoutCityInputSchema: z.ZodType<Prisma.CountryUpsertWithoutCityInput> = z.object({
  update: z.union([ z.lazy(() => CountryUpdateWithoutCityInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutCityInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutCityInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCityInputSchema) ]),
  where: z.lazy(() => CountryWhereInputSchema).optional()
}).strict();

export const CountryUpdateToOneWithWhereWithoutCityInputSchema: z.ZodType<Prisma.CountryUpdateToOneWithWhereWithoutCityInput> = z.object({
  where: z.lazy(() => CountryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CountryUpdateWithoutCityInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutCityInputSchema) ]),
}).strict();

export const CountryUpdateWithoutCityInputSchema: z.ZodType<Prisma.CountryUpdateWithoutCityInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  region: z.lazy(() => RegionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  subregion: z.lazy(() => SubregionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  currency: z.lazy(() => CurrencyUpdateOneWithoutCountriesNestedInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeUpdateOneWithoutCountriesNestedInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUpdateManyWithoutCountriesNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateWithoutCityInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutCityInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountriesNestedInputSchema).optional()
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

export const SubregionCreateManyRegionInputSchema: z.ZodType<Prisma.SubregionCreateManyRegionInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.string().optional().nullable()
}).strict();

export const CountryCreateManyRegionInputSchema: z.ZodType<Prisma.CountryCreateManyRegionInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  subregionId: z.number().int().optional().nullable(),
  currencyId: z.number().int().optional().nullable(),
  phoneCodeId: z.number().int().optional().nullable()
}).strict();

export const SubregionUpdateWithoutRegionInputSchema: z.ZodType<Prisma.SubregionUpdateWithoutRegionInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countries: z.lazy(() => CountryUpdateManyWithoutSubregionNestedInputSchema).optional()
}).strict();

export const SubregionUncheckedUpdateWithoutRegionInputSchema: z.ZodType<Prisma.SubregionUncheckedUpdateWithoutRegionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countries: z.lazy(() => CountryUncheckedUpdateManyWithoutSubregionNestedInputSchema).optional()
}).strict();

export const SubregionUncheckedUpdateManyWithoutRegionInputSchema: z.ZodType<Prisma.SubregionUncheckedUpdateManyWithoutRegionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CountryUpdateWithoutRegionInputSchema: z.ZodType<Prisma.CountryUpdateWithoutRegionInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregion: z.lazy(() => SubregionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  currency: z.lazy(() => CurrencyUpdateOneWithoutCountriesNestedInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeUpdateOneWithoutCountriesNestedInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateWithoutRegionInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutRegionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUncheckedUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateManyWithoutRegionInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyWithoutRegionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CountryCreateManySubregionInputSchema: z.ZodType<Prisma.CountryCreateManySubregionInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int().optional().nullable(),
  currencyId: z.number().int().optional().nullable(),
  phoneCodeId: z.number().int().optional().nullable()
}).strict();

export const CountryUpdateWithoutSubregionInputSchema: z.ZodType<Prisma.CountryUpdateWithoutSubregionInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  region: z.lazy(() => RegionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  currency: z.lazy(() => CurrencyUpdateOneWithoutCountriesNestedInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeUpdateOneWithoutCountriesNestedInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateWithoutSubregionInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutSubregionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUncheckedUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateManyWithoutSubregionInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyWithoutSubregionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CountryCreateManyCurrencyInputSchema: z.ZodType<Prisma.CountryCreateManyCurrencyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int().optional().nullable(),
  subregionId: z.number().int().optional().nullable(),
  phoneCodeId: z.number().int().optional().nullable()
}).strict();

export const CountryUpdateWithoutCurrencyInputSchema: z.ZodType<Prisma.CountryUpdateWithoutCurrencyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  region: z.lazy(() => RegionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  subregion: z.lazy(() => SubregionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeUpdateOneWithoutCountriesNestedInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateWithoutCurrencyInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutCurrencyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUncheckedUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateManyWithoutCurrencyInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyWithoutCurrencyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CountryCreateManyPhoneCodeInputSchema: z.ZodType<Prisma.CountryCreateManyPhoneCodeInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso3: z.string().optional().nullable(),
  iso2: z.string().optional().nullable(),
  numericCode: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  tld: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  emoji: z.string().optional().nullable(),
  emojiU: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  regionId: z.number().int().optional().nullable(),
  subregionId: z.number().int().optional().nullable(),
  currencyId: z.number().int().optional().nullable()
}).strict();

export const CountryUpdateWithoutPhoneCodeInputSchema: z.ZodType<Prisma.CountryUpdateWithoutPhoneCodeInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  region: z.lazy(() => RegionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  subregion: z.lazy(() => SubregionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  currency: z.lazy(() => CurrencyUpdateOneWithoutCountriesNestedInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateWithoutPhoneCodeInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutPhoneCodeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUncheckedUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateManyWithoutPhoneCodeInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyWithoutPhoneCodeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CountryUpdateWithoutTimeZoneInputSchema: z.ZodType<Prisma.CountryUpdateWithoutTimeZoneInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  region: z.lazy(() => RegionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  subregion: z.lazy(() => SubregionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  currency: z.lazy(() => CurrencyUpdateOneWithoutCountriesNestedInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeUpdateOneWithoutCountriesNestedInputSchema).optional(),
  timezones: z.lazy(() => TimeZoneUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUpdateManyWithoutCountryNestedInputSchema).optional(),
  City: z.lazy(() => CityUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateWithoutTimeZoneInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutTimeZoneInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezones: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  City: z.lazy(() => CityUncheckedUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateManyWithoutTimeZoneInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyWithoutTimeZoneInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CountryUpdateWithoutTimezonesInputSchema: z.ZodType<Prisma.CountryUpdateWithoutTimezonesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  region: z.lazy(() => RegionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  subregion: z.lazy(() => SubregionUpdateOneWithoutCountriesNestedInputSchema).optional(),
  currency: z.lazy(() => CurrencyUpdateOneWithoutCountriesNestedInputSchema).optional(),
  phoneCode: z.lazy(() => PhoneCodeUpdateOneWithoutCountriesNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateWithoutTimezonesInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutTimezonesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  states: z.lazy(() => StateUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  TimeZone: z.lazy(() => TimeZoneUncheckedUpdateManyWithoutCountriesNestedInputSchema).optional(),
  City: z.lazy(() => CityUncheckedUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateManyWithoutTimezonesInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyWithoutTimezonesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso3: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numericCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capital: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tld: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  native: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emoji: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emojiU: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subregionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneCodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TranslationCreateManyCountryInputSchema: z.ZodType<Prisma.TranslationCreateManyCountryInput> = z.object({
  id: z.number().int().optional(),
  language: z.string(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const StateCreateManyCountryInputSchema: z.ZodType<Prisma.StateCreateManyCountryInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  iso2: z.string().optional().nullable(),
  fipsCode: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable()
}).strict();

export const CityCreateManyCountryInputSchema: z.ZodType<Prisma.CityCreateManyCountryInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  stateCode: z.string().optional().nullable(),
  countryCode: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  stateId: z.number().int()
}).strict();

export const TimeZoneUpdateWithoutCountryInputSchema: z.ZodType<Prisma.TimeZoneUpdateWithoutCountryInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offset: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countries: z.lazy(() => CountryUpdateManyWithoutTimeZoneNestedInputSchema).optional()
}).strict();

export const TimeZoneUncheckedUpdateWithoutCountryInputSchema: z.ZodType<Prisma.TimeZoneUncheckedUpdateWithoutCountryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offset: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countries: z.lazy(() => CountryUncheckedUpdateManyWithoutTimeZoneNestedInputSchema).optional()
}).strict();

export const TimeZoneUncheckedUpdateManyWithoutCountryInputSchema: z.ZodType<Prisma.TimeZoneUncheckedUpdateManyWithoutCountryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offset: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TranslationUpdateWithoutCountryInputSchema: z.ZodType<Prisma.TranslationUpdateWithoutCountryInput> = z.object({
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const TranslationUncheckedUpdateWithoutCountryInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateWithoutCountryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const TranslationUncheckedUpdateManyWithoutCountryInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateManyWithoutCountryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const StateUpdateWithoutCountryInputSchema: z.ZodType<Prisma.StateUpdateWithoutCountryInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fipsCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cities: z.lazy(() => CityUpdateManyWithoutStateNestedInputSchema).optional()
}).strict();

export const StateUncheckedUpdateWithoutCountryInputSchema: z.ZodType<Prisma.StateUncheckedUpdateWithoutCountryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fipsCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cities: z.lazy(() => CityUncheckedUpdateManyWithoutStateNestedInputSchema).optional()
}).strict();

export const StateUncheckedUpdateManyWithoutCountryInputSchema: z.ZodType<Prisma.StateUncheckedUpdateManyWithoutCountryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iso2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fipsCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TimeZoneUpdateWithoutCountriesInputSchema: z.ZodType<Prisma.TimeZoneUpdateWithoutCountriesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offset: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Country: z.lazy(() => CountryUpdateManyWithoutTimezonesNestedInputSchema).optional()
}).strict();

export const TimeZoneUncheckedUpdateWithoutCountriesInputSchema: z.ZodType<Prisma.TimeZoneUncheckedUpdateWithoutCountriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offset: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Country: z.lazy(() => CountryUncheckedUpdateManyWithoutTimezonesNestedInputSchema).optional()
}).strict();

export const TimeZoneUncheckedUpdateManyWithoutCountriesInputSchema: z.ZodType<Prisma.TimeZoneUncheckedUpdateManyWithoutCountriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offset: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CityUpdateWithoutCountryInputSchema: z.ZodType<Prisma.CityUpdateWithoutCountryInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutCitiesNestedInputSchema).optional()
}).strict();

export const CityUncheckedUpdateWithoutCountryInputSchema: z.ZodType<Prisma.CityUncheckedUpdateWithoutCountryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stateId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CityUncheckedUpdateManyWithoutCountryInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyWithoutCountryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stateId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CityCreateManyStateInputSchema: z.ZodType<Prisma.CityCreateManyStateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  stateCode: z.string().optional().nullable(),
  countryCode: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  wikiDataId: z.string().optional().nullable(),
  countryId: z.number().int()
}).strict();

export const CityUpdateWithoutStateInputSchema: z.ZodType<Prisma.CityUpdateWithoutStateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutCityNestedInputSchema).optional()
}).strict();

export const CityUncheckedUpdateWithoutStateInputSchema: z.ZodType<Prisma.CityUncheckedUpdateWithoutStateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CityUncheckedUpdateManyWithoutStateInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyWithoutStateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wikiDataId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
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

export const RegionFindFirstArgsSchema: z.ZodType<Prisma.RegionFindFirstArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  where: RegionWhereInputSchema.optional(),
  orderBy: z.union([ RegionOrderByWithRelationInputSchema.array(),RegionOrderByWithRelationInputSchema ]).optional(),
  cursor: RegionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegionScalarFieldEnumSchema,RegionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RegionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RegionFindFirstOrThrowArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  where: RegionWhereInputSchema.optional(),
  orderBy: z.union([ RegionOrderByWithRelationInputSchema.array(),RegionOrderByWithRelationInputSchema ]).optional(),
  cursor: RegionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegionScalarFieldEnumSchema,RegionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RegionFindManyArgsSchema: z.ZodType<Prisma.RegionFindManyArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  where: RegionWhereInputSchema.optional(),
  orderBy: z.union([ RegionOrderByWithRelationInputSchema.array(),RegionOrderByWithRelationInputSchema ]).optional(),
  cursor: RegionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegionScalarFieldEnumSchema,RegionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RegionAggregateArgsSchema: z.ZodType<Prisma.RegionAggregateArgs> = z.object({
  where: RegionWhereInputSchema.optional(),
  orderBy: z.union([ RegionOrderByWithRelationInputSchema.array(),RegionOrderByWithRelationInputSchema ]).optional(),
  cursor: RegionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RegionGroupByArgsSchema: z.ZodType<Prisma.RegionGroupByArgs> = z.object({
  where: RegionWhereInputSchema.optional(),
  orderBy: z.union([ RegionOrderByWithAggregationInputSchema.array(),RegionOrderByWithAggregationInputSchema ]).optional(),
  by: RegionScalarFieldEnumSchema.array(),
  having: RegionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RegionFindUniqueArgsSchema: z.ZodType<Prisma.RegionFindUniqueArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  where: RegionWhereUniqueInputSchema,
}).strict() ;

export const RegionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RegionFindUniqueOrThrowArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  where: RegionWhereUniqueInputSchema,
}).strict() ;

export const SubregionFindFirstArgsSchema: z.ZodType<Prisma.SubregionFindFirstArgs> = z.object({
  select: SubregionSelectSchema.optional(),
  include: SubregionIncludeSchema.optional(),
  where: SubregionWhereInputSchema.optional(),
  orderBy: z.union([ SubregionOrderByWithRelationInputSchema.array(),SubregionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubregionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubregionScalarFieldEnumSchema,SubregionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SubregionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SubregionFindFirstOrThrowArgs> = z.object({
  select: SubregionSelectSchema.optional(),
  include: SubregionIncludeSchema.optional(),
  where: SubregionWhereInputSchema.optional(),
  orderBy: z.union([ SubregionOrderByWithRelationInputSchema.array(),SubregionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubregionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubregionScalarFieldEnumSchema,SubregionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SubregionFindManyArgsSchema: z.ZodType<Prisma.SubregionFindManyArgs> = z.object({
  select: SubregionSelectSchema.optional(),
  include: SubregionIncludeSchema.optional(),
  where: SubregionWhereInputSchema.optional(),
  orderBy: z.union([ SubregionOrderByWithRelationInputSchema.array(),SubregionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubregionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubregionScalarFieldEnumSchema,SubregionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SubregionAggregateArgsSchema: z.ZodType<Prisma.SubregionAggregateArgs> = z.object({
  where: SubregionWhereInputSchema.optional(),
  orderBy: z.union([ SubregionOrderByWithRelationInputSchema.array(),SubregionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubregionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SubregionGroupByArgsSchema: z.ZodType<Prisma.SubregionGroupByArgs> = z.object({
  where: SubregionWhereInputSchema.optional(),
  orderBy: z.union([ SubregionOrderByWithAggregationInputSchema.array(),SubregionOrderByWithAggregationInputSchema ]).optional(),
  by: SubregionScalarFieldEnumSchema.array(),
  having: SubregionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SubregionFindUniqueArgsSchema: z.ZodType<Prisma.SubregionFindUniqueArgs> = z.object({
  select: SubregionSelectSchema.optional(),
  include: SubregionIncludeSchema.optional(),
  where: SubregionWhereUniqueInputSchema,
}).strict() ;

export const SubregionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SubregionFindUniqueOrThrowArgs> = z.object({
  select: SubregionSelectSchema.optional(),
  include: SubregionIncludeSchema.optional(),
  where: SubregionWhereUniqueInputSchema,
}).strict() ;

export const CurrencyFindFirstArgsSchema: z.ZodType<Prisma.CurrencyFindFirstArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereInputSchema.optional(),
  orderBy: z.union([ CurrencyOrderByWithRelationInputSchema.array(),CurrencyOrderByWithRelationInputSchema ]).optional(),
  cursor: CurrencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CurrencyScalarFieldEnumSchema,CurrencyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CurrencyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CurrencyFindFirstOrThrowArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereInputSchema.optional(),
  orderBy: z.union([ CurrencyOrderByWithRelationInputSchema.array(),CurrencyOrderByWithRelationInputSchema ]).optional(),
  cursor: CurrencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CurrencyScalarFieldEnumSchema,CurrencyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CurrencyFindManyArgsSchema: z.ZodType<Prisma.CurrencyFindManyArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereInputSchema.optional(),
  orderBy: z.union([ CurrencyOrderByWithRelationInputSchema.array(),CurrencyOrderByWithRelationInputSchema ]).optional(),
  cursor: CurrencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CurrencyScalarFieldEnumSchema,CurrencyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CurrencyAggregateArgsSchema: z.ZodType<Prisma.CurrencyAggregateArgs> = z.object({
  where: CurrencyWhereInputSchema.optional(),
  orderBy: z.union([ CurrencyOrderByWithRelationInputSchema.array(),CurrencyOrderByWithRelationInputSchema ]).optional(),
  cursor: CurrencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CurrencyGroupByArgsSchema: z.ZodType<Prisma.CurrencyGroupByArgs> = z.object({
  where: CurrencyWhereInputSchema.optional(),
  orderBy: z.union([ CurrencyOrderByWithAggregationInputSchema.array(),CurrencyOrderByWithAggregationInputSchema ]).optional(),
  by: CurrencyScalarFieldEnumSchema.array(),
  having: CurrencyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CurrencyFindUniqueArgsSchema: z.ZodType<Prisma.CurrencyFindUniqueArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereUniqueInputSchema,
}).strict() ;

export const CurrencyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CurrencyFindUniqueOrThrowArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereUniqueInputSchema,
}).strict() ;

export const PhoneCodeFindFirstArgsSchema: z.ZodType<Prisma.PhoneCodeFindFirstArgs> = z.object({
  select: PhoneCodeSelectSchema.optional(),
  include: PhoneCodeIncludeSchema.optional(),
  where: PhoneCodeWhereInputSchema.optional(),
  orderBy: z.union([ PhoneCodeOrderByWithRelationInputSchema.array(),PhoneCodeOrderByWithRelationInputSchema ]).optional(),
  cursor: PhoneCodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PhoneCodeScalarFieldEnumSchema,PhoneCodeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PhoneCodeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PhoneCodeFindFirstOrThrowArgs> = z.object({
  select: PhoneCodeSelectSchema.optional(),
  include: PhoneCodeIncludeSchema.optional(),
  where: PhoneCodeWhereInputSchema.optional(),
  orderBy: z.union([ PhoneCodeOrderByWithRelationInputSchema.array(),PhoneCodeOrderByWithRelationInputSchema ]).optional(),
  cursor: PhoneCodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PhoneCodeScalarFieldEnumSchema,PhoneCodeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PhoneCodeFindManyArgsSchema: z.ZodType<Prisma.PhoneCodeFindManyArgs> = z.object({
  select: PhoneCodeSelectSchema.optional(),
  include: PhoneCodeIncludeSchema.optional(),
  where: PhoneCodeWhereInputSchema.optional(),
  orderBy: z.union([ PhoneCodeOrderByWithRelationInputSchema.array(),PhoneCodeOrderByWithRelationInputSchema ]).optional(),
  cursor: PhoneCodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PhoneCodeScalarFieldEnumSchema,PhoneCodeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PhoneCodeAggregateArgsSchema: z.ZodType<Prisma.PhoneCodeAggregateArgs> = z.object({
  where: PhoneCodeWhereInputSchema.optional(),
  orderBy: z.union([ PhoneCodeOrderByWithRelationInputSchema.array(),PhoneCodeOrderByWithRelationInputSchema ]).optional(),
  cursor: PhoneCodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PhoneCodeGroupByArgsSchema: z.ZodType<Prisma.PhoneCodeGroupByArgs> = z.object({
  where: PhoneCodeWhereInputSchema.optional(),
  orderBy: z.union([ PhoneCodeOrderByWithAggregationInputSchema.array(),PhoneCodeOrderByWithAggregationInputSchema ]).optional(),
  by: PhoneCodeScalarFieldEnumSchema.array(),
  having: PhoneCodeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PhoneCodeFindUniqueArgsSchema: z.ZodType<Prisma.PhoneCodeFindUniqueArgs> = z.object({
  select: PhoneCodeSelectSchema.optional(),
  include: PhoneCodeIncludeSchema.optional(),
  where: PhoneCodeWhereUniqueInputSchema,
}).strict() ;

export const PhoneCodeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PhoneCodeFindUniqueOrThrowArgs> = z.object({
  select: PhoneCodeSelectSchema.optional(),
  include: PhoneCodeIncludeSchema.optional(),
  where: PhoneCodeWhereUniqueInputSchema,
}).strict() ;

export const TimeZoneFindFirstArgsSchema: z.ZodType<Prisma.TimeZoneFindFirstArgs> = z.object({
  select: TimeZoneSelectSchema.optional(),
  include: TimeZoneIncludeSchema.optional(),
  where: TimeZoneWhereInputSchema.optional(),
  orderBy: z.union([ TimeZoneOrderByWithRelationInputSchema.array(),TimeZoneOrderByWithRelationInputSchema ]).optional(),
  cursor: TimeZoneWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TimeZoneScalarFieldEnumSchema,TimeZoneScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TimeZoneFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TimeZoneFindFirstOrThrowArgs> = z.object({
  select: TimeZoneSelectSchema.optional(),
  include: TimeZoneIncludeSchema.optional(),
  where: TimeZoneWhereInputSchema.optional(),
  orderBy: z.union([ TimeZoneOrderByWithRelationInputSchema.array(),TimeZoneOrderByWithRelationInputSchema ]).optional(),
  cursor: TimeZoneWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TimeZoneScalarFieldEnumSchema,TimeZoneScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TimeZoneFindManyArgsSchema: z.ZodType<Prisma.TimeZoneFindManyArgs> = z.object({
  select: TimeZoneSelectSchema.optional(),
  include: TimeZoneIncludeSchema.optional(),
  where: TimeZoneWhereInputSchema.optional(),
  orderBy: z.union([ TimeZoneOrderByWithRelationInputSchema.array(),TimeZoneOrderByWithRelationInputSchema ]).optional(),
  cursor: TimeZoneWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TimeZoneScalarFieldEnumSchema,TimeZoneScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TimeZoneAggregateArgsSchema: z.ZodType<Prisma.TimeZoneAggregateArgs> = z.object({
  where: TimeZoneWhereInputSchema.optional(),
  orderBy: z.union([ TimeZoneOrderByWithRelationInputSchema.array(),TimeZoneOrderByWithRelationInputSchema ]).optional(),
  cursor: TimeZoneWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TimeZoneGroupByArgsSchema: z.ZodType<Prisma.TimeZoneGroupByArgs> = z.object({
  where: TimeZoneWhereInputSchema.optional(),
  orderBy: z.union([ TimeZoneOrderByWithAggregationInputSchema.array(),TimeZoneOrderByWithAggregationInputSchema ]).optional(),
  by: TimeZoneScalarFieldEnumSchema.array(),
  having: TimeZoneScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TimeZoneFindUniqueArgsSchema: z.ZodType<Prisma.TimeZoneFindUniqueArgs> = z.object({
  select: TimeZoneSelectSchema.optional(),
  include: TimeZoneIncludeSchema.optional(),
  where: TimeZoneWhereUniqueInputSchema,
}).strict() ;

export const TimeZoneFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TimeZoneFindUniqueOrThrowArgs> = z.object({
  select: TimeZoneSelectSchema.optional(),
  include: TimeZoneIncludeSchema.optional(),
  where: TimeZoneWhereUniqueInputSchema,
}).strict() ;

export const TranslationFindFirstArgsSchema: z.ZodType<Prisma.TranslationFindFirstArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithRelationInputSchema.array(),TranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TranslationScalarFieldEnumSchema,TranslationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TranslationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TranslationFindFirstOrThrowArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithRelationInputSchema.array(),TranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TranslationScalarFieldEnumSchema,TranslationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TranslationFindManyArgsSchema: z.ZodType<Prisma.TranslationFindManyArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithRelationInputSchema.array(),TranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TranslationScalarFieldEnumSchema,TranslationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TranslationAggregateArgsSchema: z.ZodType<Prisma.TranslationAggregateArgs> = z.object({
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithRelationInputSchema.array(),TranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TranslationGroupByArgsSchema: z.ZodType<Prisma.TranslationGroupByArgs> = z.object({
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithAggregationInputSchema.array(),TranslationOrderByWithAggregationInputSchema ]).optional(),
  by: TranslationScalarFieldEnumSchema.array(),
  having: TranslationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TranslationFindUniqueArgsSchema: z.ZodType<Prisma.TranslationFindUniqueArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  where: TranslationWhereUniqueInputSchema,
}).strict() ;

export const TranslationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TranslationFindUniqueOrThrowArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  where: TranslationWhereUniqueInputSchema,
}).strict() ;

export const CountryFindFirstArgsSchema: z.ZodType<Prisma.CountryFindFirstArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema,CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CountryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CountryFindFirstOrThrowArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema,CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CountryFindManyArgsSchema: z.ZodType<Prisma.CountryFindManyArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema,CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CountryAggregateArgsSchema: z.ZodType<Prisma.CountryAggregateArgs> = z.object({
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CountryGroupByArgsSchema: z.ZodType<Prisma.CountryGroupByArgs> = z.object({
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithAggregationInputSchema.array(),CountryOrderByWithAggregationInputSchema ]).optional(),
  by: CountryScalarFieldEnumSchema.array(),
  having: CountryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CountryFindUniqueArgsSchema: z.ZodType<Prisma.CountryFindUniqueArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
}).strict() ;

export const CountryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CountryFindUniqueOrThrowArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
}).strict() ;

export const StateFindFirstArgsSchema: z.ZodType<Prisma.StateFindFirstArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereInputSchema.optional(),
  orderBy: z.union([ StateOrderByWithRelationInputSchema.array(),StateOrderByWithRelationInputSchema ]).optional(),
  cursor: StateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StateScalarFieldEnumSchema,StateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StateFindFirstOrThrowArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereInputSchema.optional(),
  orderBy: z.union([ StateOrderByWithRelationInputSchema.array(),StateOrderByWithRelationInputSchema ]).optional(),
  cursor: StateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StateScalarFieldEnumSchema,StateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StateFindManyArgsSchema: z.ZodType<Prisma.StateFindManyArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereInputSchema.optional(),
  orderBy: z.union([ StateOrderByWithRelationInputSchema.array(),StateOrderByWithRelationInputSchema ]).optional(),
  cursor: StateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StateScalarFieldEnumSchema,StateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StateAggregateArgsSchema: z.ZodType<Prisma.StateAggregateArgs> = z.object({
  where: StateWhereInputSchema.optional(),
  orderBy: z.union([ StateOrderByWithRelationInputSchema.array(),StateOrderByWithRelationInputSchema ]).optional(),
  cursor: StateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StateGroupByArgsSchema: z.ZodType<Prisma.StateGroupByArgs> = z.object({
  where: StateWhereInputSchema.optional(),
  orderBy: z.union([ StateOrderByWithAggregationInputSchema.array(),StateOrderByWithAggregationInputSchema ]).optional(),
  by: StateScalarFieldEnumSchema.array(),
  having: StateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StateFindUniqueArgsSchema: z.ZodType<Prisma.StateFindUniqueArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereUniqueInputSchema,
}).strict() ;

export const StateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StateFindUniqueOrThrowArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereUniqueInputSchema,
}).strict() ;

export const CityFindFirstArgsSchema: z.ZodType<Prisma.CityFindFirstArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CityFindFirstOrThrowArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CityFindManyArgsSchema: z.ZodType<Prisma.CityFindManyArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CityAggregateArgsSchema: z.ZodType<Prisma.CityAggregateArgs> = z.object({
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CityGroupByArgsSchema: z.ZodType<Prisma.CityGroupByArgs> = z.object({
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithAggregationInputSchema.array(),CityOrderByWithAggregationInputSchema ]).optional(),
  by: CityScalarFieldEnumSchema.array(),
  having: CityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CityFindUniqueArgsSchema: z.ZodType<Prisma.CityFindUniqueArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
}).strict() ;

export const CityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CityFindUniqueOrThrowArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
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

export const RegionCreateArgsSchema: z.ZodType<Prisma.RegionCreateArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  data: z.union([ RegionCreateInputSchema,RegionUncheckedCreateInputSchema ]),
}).strict() ;

export const RegionUpsertArgsSchema: z.ZodType<Prisma.RegionUpsertArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  where: RegionWhereUniqueInputSchema,
  create: z.union([ RegionCreateInputSchema,RegionUncheckedCreateInputSchema ]),
  update: z.union([ RegionUpdateInputSchema,RegionUncheckedUpdateInputSchema ]),
}).strict() ;

export const RegionCreateManyArgsSchema: z.ZodType<Prisma.RegionCreateManyArgs> = z.object({
  data: z.union([ RegionCreateManyInputSchema,RegionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RegionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RegionCreateManyAndReturnArgs> = z.object({
  data: z.union([ RegionCreateManyInputSchema,RegionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RegionDeleteArgsSchema: z.ZodType<Prisma.RegionDeleteArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  where: RegionWhereUniqueInputSchema,
}).strict() ;

export const RegionUpdateArgsSchema: z.ZodType<Prisma.RegionUpdateArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  data: z.union([ RegionUpdateInputSchema,RegionUncheckedUpdateInputSchema ]),
  where: RegionWhereUniqueInputSchema,
}).strict() ;

export const RegionUpdateManyArgsSchema: z.ZodType<Prisma.RegionUpdateManyArgs> = z.object({
  data: z.union([ RegionUpdateManyMutationInputSchema,RegionUncheckedUpdateManyInputSchema ]),
  where: RegionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RegionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RegionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RegionUpdateManyMutationInputSchema,RegionUncheckedUpdateManyInputSchema ]),
  where: RegionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RegionDeleteManyArgsSchema: z.ZodType<Prisma.RegionDeleteManyArgs> = z.object({
  where: RegionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SubregionCreateArgsSchema: z.ZodType<Prisma.SubregionCreateArgs> = z.object({
  select: SubregionSelectSchema.optional(),
  include: SubregionIncludeSchema.optional(),
  data: z.union([ SubregionCreateInputSchema,SubregionUncheckedCreateInputSchema ]),
}).strict() ;

export const SubregionUpsertArgsSchema: z.ZodType<Prisma.SubregionUpsertArgs> = z.object({
  select: SubregionSelectSchema.optional(),
  include: SubregionIncludeSchema.optional(),
  where: SubregionWhereUniqueInputSchema,
  create: z.union([ SubregionCreateInputSchema,SubregionUncheckedCreateInputSchema ]),
  update: z.union([ SubregionUpdateInputSchema,SubregionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SubregionCreateManyArgsSchema: z.ZodType<Prisma.SubregionCreateManyArgs> = z.object({
  data: z.union([ SubregionCreateManyInputSchema,SubregionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SubregionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SubregionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SubregionCreateManyInputSchema,SubregionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SubregionDeleteArgsSchema: z.ZodType<Prisma.SubregionDeleteArgs> = z.object({
  select: SubregionSelectSchema.optional(),
  include: SubregionIncludeSchema.optional(),
  where: SubregionWhereUniqueInputSchema,
}).strict() ;

export const SubregionUpdateArgsSchema: z.ZodType<Prisma.SubregionUpdateArgs> = z.object({
  select: SubregionSelectSchema.optional(),
  include: SubregionIncludeSchema.optional(),
  data: z.union([ SubregionUpdateInputSchema,SubregionUncheckedUpdateInputSchema ]),
  where: SubregionWhereUniqueInputSchema,
}).strict() ;

export const SubregionUpdateManyArgsSchema: z.ZodType<Prisma.SubregionUpdateManyArgs> = z.object({
  data: z.union([ SubregionUpdateManyMutationInputSchema,SubregionUncheckedUpdateManyInputSchema ]),
  where: SubregionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SubregionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SubregionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SubregionUpdateManyMutationInputSchema,SubregionUncheckedUpdateManyInputSchema ]),
  where: SubregionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SubregionDeleteManyArgsSchema: z.ZodType<Prisma.SubregionDeleteManyArgs> = z.object({
  where: SubregionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CurrencyCreateArgsSchema: z.ZodType<Prisma.CurrencyCreateArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  data: z.union([ CurrencyCreateInputSchema,CurrencyUncheckedCreateInputSchema ]),
}).strict() ;

export const CurrencyUpsertArgsSchema: z.ZodType<Prisma.CurrencyUpsertArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereUniqueInputSchema,
  create: z.union([ CurrencyCreateInputSchema,CurrencyUncheckedCreateInputSchema ]),
  update: z.union([ CurrencyUpdateInputSchema,CurrencyUncheckedUpdateInputSchema ]),
}).strict() ;

export const CurrencyCreateManyArgsSchema: z.ZodType<Prisma.CurrencyCreateManyArgs> = z.object({
  data: z.union([ CurrencyCreateManyInputSchema,CurrencyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CurrencyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CurrencyCreateManyAndReturnArgs> = z.object({
  data: z.union([ CurrencyCreateManyInputSchema,CurrencyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CurrencyDeleteArgsSchema: z.ZodType<Prisma.CurrencyDeleteArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereUniqueInputSchema,
}).strict() ;

export const CurrencyUpdateArgsSchema: z.ZodType<Prisma.CurrencyUpdateArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  data: z.union([ CurrencyUpdateInputSchema,CurrencyUncheckedUpdateInputSchema ]),
  where: CurrencyWhereUniqueInputSchema,
}).strict() ;

export const CurrencyUpdateManyArgsSchema: z.ZodType<Prisma.CurrencyUpdateManyArgs> = z.object({
  data: z.union([ CurrencyUpdateManyMutationInputSchema,CurrencyUncheckedUpdateManyInputSchema ]),
  where: CurrencyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CurrencyUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CurrencyUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CurrencyUpdateManyMutationInputSchema,CurrencyUncheckedUpdateManyInputSchema ]),
  where: CurrencyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CurrencyDeleteManyArgsSchema: z.ZodType<Prisma.CurrencyDeleteManyArgs> = z.object({
  where: CurrencyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PhoneCodeCreateArgsSchema: z.ZodType<Prisma.PhoneCodeCreateArgs> = z.object({
  select: PhoneCodeSelectSchema.optional(),
  include: PhoneCodeIncludeSchema.optional(),
  data: z.union([ PhoneCodeCreateInputSchema,PhoneCodeUncheckedCreateInputSchema ]),
}).strict() ;

export const PhoneCodeUpsertArgsSchema: z.ZodType<Prisma.PhoneCodeUpsertArgs> = z.object({
  select: PhoneCodeSelectSchema.optional(),
  include: PhoneCodeIncludeSchema.optional(),
  where: PhoneCodeWhereUniqueInputSchema,
  create: z.union([ PhoneCodeCreateInputSchema,PhoneCodeUncheckedCreateInputSchema ]),
  update: z.union([ PhoneCodeUpdateInputSchema,PhoneCodeUncheckedUpdateInputSchema ]),
}).strict() ;

export const PhoneCodeCreateManyArgsSchema: z.ZodType<Prisma.PhoneCodeCreateManyArgs> = z.object({
  data: z.union([ PhoneCodeCreateManyInputSchema,PhoneCodeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PhoneCodeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PhoneCodeCreateManyAndReturnArgs> = z.object({
  data: z.union([ PhoneCodeCreateManyInputSchema,PhoneCodeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PhoneCodeDeleteArgsSchema: z.ZodType<Prisma.PhoneCodeDeleteArgs> = z.object({
  select: PhoneCodeSelectSchema.optional(),
  include: PhoneCodeIncludeSchema.optional(),
  where: PhoneCodeWhereUniqueInputSchema,
}).strict() ;

export const PhoneCodeUpdateArgsSchema: z.ZodType<Prisma.PhoneCodeUpdateArgs> = z.object({
  select: PhoneCodeSelectSchema.optional(),
  include: PhoneCodeIncludeSchema.optional(),
  data: z.union([ PhoneCodeUpdateInputSchema,PhoneCodeUncheckedUpdateInputSchema ]),
  where: PhoneCodeWhereUniqueInputSchema,
}).strict() ;

export const PhoneCodeUpdateManyArgsSchema: z.ZodType<Prisma.PhoneCodeUpdateManyArgs> = z.object({
  data: z.union([ PhoneCodeUpdateManyMutationInputSchema,PhoneCodeUncheckedUpdateManyInputSchema ]),
  where: PhoneCodeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PhoneCodeUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PhoneCodeUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PhoneCodeUpdateManyMutationInputSchema,PhoneCodeUncheckedUpdateManyInputSchema ]),
  where: PhoneCodeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PhoneCodeDeleteManyArgsSchema: z.ZodType<Prisma.PhoneCodeDeleteManyArgs> = z.object({
  where: PhoneCodeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TimeZoneCreateArgsSchema: z.ZodType<Prisma.TimeZoneCreateArgs> = z.object({
  select: TimeZoneSelectSchema.optional(),
  include: TimeZoneIncludeSchema.optional(),
  data: z.union([ TimeZoneCreateInputSchema,TimeZoneUncheckedCreateInputSchema ]),
}).strict() ;

export const TimeZoneUpsertArgsSchema: z.ZodType<Prisma.TimeZoneUpsertArgs> = z.object({
  select: TimeZoneSelectSchema.optional(),
  include: TimeZoneIncludeSchema.optional(),
  where: TimeZoneWhereUniqueInputSchema,
  create: z.union([ TimeZoneCreateInputSchema,TimeZoneUncheckedCreateInputSchema ]),
  update: z.union([ TimeZoneUpdateInputSchema,TimeZoneUncheckedUpdateInputSchema ]),
}).strict() ;

export const TimeZoneCreateManyArgsSchema: z.ZodType<Prisma.TimeZoneCreateManyArgs> = z.object({
  data: z.union([ TimeZoneCreateManyInputSchema,TimeZoneCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TimeZoneCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TimeZoneCreateManyAndReturnArgs> = z.object({
  data: z.union([ TimeZoneCreateManyInputSchema,TimeZoneCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TimeZoneDeleteArgsSchema: z.ZodType<Prisma.TimeZoneDeleteArgs> = z.object({
  select: TimeZoneSelectSchema.optional(),
  include: TimeZoneIncludeSchema.optional(),
  where: TimeZoneWhereUniqueInputSchema,
}).strict() ;

export const TimeZoneUpdateArgsSchema: z.ZodType<Prisma.TimeZoneUpdateArgs> = z.object({
  select: TimeZoneSelectSchema.optional(),
  include: TimeZoneIncludeSchema.optional(),
  data: z.union([ TimeZoneUpdateInputSchema,TimeZoneUncheckedUpdateInputSchema ]),
  where: TimeZoneWhereUniqueInputSchema,
}).strict() ;

export const TimeZoneUpdateManyArgsSchema: z.ZodType<Prisma.TimeZoneUpdateManyArgs> = z.object({
  data: z.union([ TimeZoneUpdateManyMutationInputSchema,TimeZoneUncheckedUpdateManyInputSchema ]),
  where: TimeZoneWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TimeZoneUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TimeZoneUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TimeZoneUpdateManyMutationInputSchema,TimeZoneUncheckedUpdateManyInputSchema ]),
  where: TimeZoneWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TimeZoneDeleteManyArgsSchema: z.ZodType<Prisma.TimeZoneDeleteManyArgs> = z.object({
  where: TimeZoneWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TranslationCreateArgsSchema: z.ZodType<Prisma.TranslationCreateArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  data: z.union([ TranslationCreateInputSchema,TranslationUncheckedCreateInputSchema ]),
}).strict() ;

export const TranslationUpsertArgsSchema: z.ZodType<Prisma.TranslationUpsertArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  where: TranslationWhereUniqueInputSchema,
  create: z.union([ TranslationCreateInputSchema,TranslationUncheckedCreateInputSchema ]),
  update: z.union([ TranslationUpdateInputSchema,TranslationUncheckedUpdateInputSchema ]),
}).strict() ;

export const TranslationCreateManyArgsSchema: z.ZodType<Prisma.TranslationCreateManyArgs> = z.object({
  data: z.union([ TranslationCreateManyInputSchema,TranslationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TranslationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TranslationCreateManyAndReturnArgs> = z.object({
  data: z.union([ TranslationCreateManyInputSchema,TranslationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TranslationDeleteArgsSchema: z.ZodType<Prisma.TranslationDeleteArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  where: TranslationWhereUniqueInputSchema,
}).strict() ;

export const TranslationUpdateArgsSchema: z.ZodType<Prisma.TranslationUpdateArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  data: z.union([ TranslationUpdateInputSchema,TranslationUncheckedUpdateInputSchema ]),
  where: TranslationWhereUniqueInputSchema,
}).strict() ;

export const TranslationUpdateManyArgsSchema: z.ZodType<Prisma.TranslationUpdateManyArgs> = z.object({
  data: z.union([ TranslationUpdateManyMutationInputSchema,TranslationUncheckedUpdateManyInputSchema ]),
  where: TranslationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TranslationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TranslationUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TranslationUpdateManyMutationInputSchema,TranslationUncheckedUpdateManyInputSchema ]),
  where: TranslationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TranslationDeleteManyArgsSchema: z.ZodType<Prisma.TranslationDeleteManyArgs> = z.object({
  where: TranslationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CountryCreateArgsSchema: z.ZodType<Prisma.CountryCreateArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  data: z.union([ CountryCreateInputSchema,CountryUncheckedCreateInputSchema ]),
}).strict() ;

export const CountryUpsertArgsSchema: z.ZodType<Prisma.CountryUpsertArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
  create: z.union([ CountryCreateInputSchema,CountryUncheckedCreateInputSchema ]),
  update: z.union([ CountryUpdateInputSchema,CountryUncheckedUpdateInputSchema ]),
}).strict() ;

export const CountryCreateManyArgsSchema: z.ZodType<Prisma.CountryCreateManyArgs> = z.object({
  data: z.union([ CountryCreateManyInputSchema,CountryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CountryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CountryCreateManyAndReturnArgs> = z.object({
  data: z.union([ CountryCreateManyInputSchema,CountryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CountryDeleteArgsSchema: z.ZodType<Prisma.CountryDeleteArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
}).strict() ;

export const CountryUpdateArgsSchema: z.ZodType<Prisma.CountryUpdateArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  data: z.union([ CountryUpdateInputSchema,CountryUncheckedUpdateInputSchema ]),
  where: CountryWhereUniqueInputSchema,
}).strict() ;

export const CountryUpdateManyArgsSchema: z.ZodType<Prisma.CountryUpdateManyArgs> = z.object({
  data: z.union([ CountryUpdateManyMutationInputSchema,CountryUncheckedUpdateManyInputSchema ]),
  where: CountryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CountryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CountryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CountryUpdateManyMutationInputSchema,CountryUncheckedUpdateManyInputSchema ]),
  where: CountryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CountryDeleteManyArgsSchema: z.ZodType<Prisma.CountryDeleteManyArgs> = z.object({
  where: CountryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StateCreateArgsSchema: z.ZodType<Prisma.StateCreateArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  data: z.union([ StateCreateInputSchema,StateUncheckedCreateInputSchema ]),
}).strict() ;

export const StateUpsertArgsSchema: z.ZodType<Prisma.StateUpsertArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereUniqueInputSchema,
  create: z.union([ StateCreateInputSchema,StateUncheckedCreateInputSchema ]),
  update: z.union([ StateUpdateInputSchema,StateUncheckedUpdateInputSchema ]),
}).strict() ;

export const StateCreateManyArgsSchema: z.ZodType<Prisma.StateCreateManyArgs> = z.object({
  data: z.union([ StateCreateManyInputSchema,StateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StateCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StateCreateManyAndReturnArgs> = z.object({
  data: z.union([ StateCreateManyInputSchema,StateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StateDeleteArgsSchema: z.ZodType<Prisma.StateDeleteArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereUniqueInputSchema,
}).strict() ;

export const StateUpdateArgsSchema: z.ZodType<Prisma.StateUpdateArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  data: z.union([ StateUpdateInputSchema,StateUncheckedUpdateInputSchema ]),
  where: StateWhereUniqueInputSchema,
}).strict() ;

export const StateUpdateManyArgsSchema: z.ZodType<Prisma.StateUpdateManyArgs> = z.object({
  data: z.union([ StateUpdateManyMutationInputSchema,StateUncheckedUpdateManyInputSchema ]),
  where: StateWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StateUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.StateUpdateManyAndReturnArgs> = z.object({
  data: z.union([ StateUpdateManyMutationInputSchema,StateUncheckedUpdateManyInputSchema ]),
  where: StateWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StateDeleteManyArgsSchema: z.ZodType<Prisma.StateDeleteManyArgs> = z.object({
  where: StateWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CityCreateArgsSchema: z.ZodType<Prisma.CityCreateArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  data: z.union([ CityCreateInputSchema,CityUncheckedCreateInputSchema ]),
}).strict() ;

export const CityUpsertArgsSchema: z.ZodType<Prisma.CityUpsertArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
  create: z.union([ CityCreateInputSchema,CityUncheckedCreateInputSchema ]),
  update: z.union([ CityUpdateInputSchema,CityUncheckedUpdateInputSchema ]),
}).strict() ;

export const CityCreateManyArgsSchema: z.ZodType<Prisma.CityCreateManyArgs> = z.object({
  data: z.union([ CityCreateManyInputSchema,CityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CityCreateManyAndReturnArgs> = z.object({
  data: z.union([ CityCreateManyInputSchema,CityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CityDeleteArgsSchema: z.ZodType<Prisma.CityDeleteArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
}).strict() ;

export const CityUpdateArgsSchema: z.ZodType<Prisma.CityUpdateArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  data: z.union([ CityUpdateInputSchema,CityUncheckedUpdateInputSchema ]),
  where: CityWhereUniqueInputSchema,
}).strict() ;

export const CityUpdateManyArgsSchema: z.ZodType<Prisma.CityUpdateManyArgs> = z.object({
  data: z.union([ CityUpdateManyMutationInputSchema,CityUncheckedUpdateManyInputSchema ]),
  where: CityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CityUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CityUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CityUpdateManyMutationInputSchema,CityUncheckedUpdateManyInputSchema ]),
  where: CityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CityDeleteManyArgsSchema: z.ZodType<Prisma.CityDeleteManyArgs> = z.object({
  where: CityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;