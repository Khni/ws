export type Provider = "google" | "facebook";
export interface SocialUserResult {
  id: string;
  email?: string;
  verified_email: boolean;
  name: string;
  pictureUrl: string;
  locale?: string;
}
export interface SocialTokensResult {
  access_token: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  id_token?: string;
}

// Strategy Interface
export interface SocialAuthProvider {
  provider: Provider;
  getTokens(code: string): Promise<SocialTokensResult>;
  getUser(tokens: SocialTokensResult): Promise<SocialUserResult>;
}
