import {
  IOtpSenderStrategy,
  OtpSendParams,
  OtpStrategySendParams,
} from "@khaled/auth";
import { Mailer, IMailer } from "@khaled/mailer";
import { config } from "../../config/envSchema.js";

export class OtpMailSender implements IOtpSenderStrategy {
  name = "email" as const;

  constructor(
    private mailer: Mailer = new Mailer({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS,
      },
      templateDir: "templates",
    })
  ) {}

  async send(params: OtpStrategySendParams): Promise<void> {
    const { recipient, generatedOtp, otpType } = params;
    const subject = `Your One-Time Password (OTP) for ${otpType.replace("_", "")}`;
    const body = `
            Hello,

            Your OTP code is: ${generatedOtp}
            This code is valid for 10 minutes.

            If you did not request this, please ignore this email.

            Regards,
            The Team
        `;

    await this.mailer.sendMail({
      from: config.MAIL_USER,
      to: recipient,
      subject,
      text: body,
      html: body,
    });
  }
}
