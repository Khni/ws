export interface MailerConfig {
  service: string;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  templateDir: string;
}

interface BaseMailOptions {
  from: string;
  to: string;
  subject: string;

  text?: string;
}
export type MailOptions =
  | (BaseMailOptions & { templateName: string; templateData: any; dir: string })
  | (BaseMailOptions & {
      html: string;
    });

export function hasTemplate(
  opts: MailOptions
): opts is BaseMailOptions & {
  templateName: string;
  templateData: any;
  dir: string;
} {
  return "templateName" in opts;
}

export interface IMailer {
  sendMail(options: MailOptions): Promise<void>;
}
