import axios from "axios";
import qs from "qs";
import {
  GoogleAuthConfig,
  Provider,
  SocialAuthProvider,
  SocialTokensResult,
  SocialUserResult,
} from "../interfaces/ISocialAuthProvider.js";

export class GoogleSocialAuthStrategy implements SocialAuthProvider {
  constructor(private googleAuthConfig: GoogleAuthConfig) {}
  provider: Provider = "google";

  async getTokens(code: string): Promise<SocialTokensResult> {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
      code,
      client_id: this.googleAuthConfig.clientId,
      client_secret: this.googleAuthConfig.clientSecret,
      redirect_uri: this.googleAuthConfig.redirectUri,
      grant_type: "authorization_code",
    };

    const res = await axios.post<SocialTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return res.data;
  }

  async getUser(tokens: SocialTokensResult): Promise<SocialUserResult> {
    const res = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
        params: { alt: "json" },
      }
    );

    const user = res.data;

    return {
      id: user.sub,
      email: user.email,
      name: user.name,
      pictureUrl: user.picture,
      locale: user.locale,
      verified_email: user.verified_email, // from Google directly
    };
  }
}
