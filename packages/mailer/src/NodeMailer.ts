import nodemailer, { Transporter } from "nodemailer";

import { hasTemplate, IMailer, MailerConfig, MailOptions } from "./IMailer.js";
import { IMailerHelper } from "./IMailerHelper.js";
import { MailerHelper } from "./PugMailerHelper.js";

export class Mailer implements IMailer {
  private transporter: Transporter;
  private templateDir: string;

  constructor(
    mailerConfig: MailerConfig,
    private mailerHelper: IMailerHelper = new MailerHelper()
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailerConfig.service,
      host: mailerConfig.host,
      port: mailerConfig.port,
      secure: mailerConfig.secure,
      auth: mailerConfig.auth,
    });
    this.templateDir = mailerConfig.templateDir;
  }

  async sendMail(options: MailOptions): Promise<void> {
    const html = hasTemplate(options)
      ? this.mailerHelper.renderTemplate({
          dir: options.dir,
          templateDir: this.templateDir,
          data: options.templateData,
          templateName: options.templateName,
        })
      : options.html;

    await this.transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html,
    });
  }
}

export default Mailer;
