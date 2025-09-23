import { describe, it, expect, vi, beforeEach } from "vitest";
import nodemailer from "nodemailer";
import pug from "pug";
import path from "path";
import {
  IMailer,
  Mailer,
  MailerConfig,
  MailOptions,
  mockMailHelper,
} from "../src/index.js";

// --- Mock nodemailer and pug ---
vi.mock("nodemailer", () => {
  return {
    default: {
      createTransport: vi.fn(),
    },
  };
});

vi.mock("pug", () => {
  return {
    default: {
      renderFile: vi.fn(),
    },
  };
});

let mailer: IMailer;
describe("Mailer", () => {
  const sendMailMock = vi.fn();
  const createTransportMock =
    nodemailer.createTransport as unknown as ReturnType<typeof vi.fn>;

  const config: MailerConfig = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "test@example.com",
      pass: "password",
    },
    templateDir: "emails",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    createTransportMock.mockReturnValue({ sendMail: sendMailMock });
    mailer = new Mailer(config, mockMailHelper);
  });

  it("should create a nodemailer transporter with given config", () => {
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: config.service,
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
    });
  });

  it("should  send email with HTML when templateName is provided", async () => {
    const fakeHtml = "<p>Hello</p>";
    mockMailHelper.renderTemplate.mockReturnValue(fakeHtml);

    const options: MailOptions = {
      from: "sender@example.com",
      to: "receiver@example.com",
      subject: "Test Email",
      text: "Fallback text",
      templateName: "welcome",
      templateData: { name: "John" },
      dir: __dirname,
    };

    await mailer.sendMail(options);

    expect(sendMailMock).toHaveBeenCalledWith({
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: fakeHtml,
    });
  });

  it("should send email with provided HTML when no templateName is provided", async () => {
    const options: MailOptions = {
      from: "sender@example.com",
      to: "receiver@example.com",
      subject: "Raw HTML Email",
      text: "Fallback text",
      html: "<p>Direct HTML</p>",
      dir: "",
    };

    await mailer.sendMail(options);

    expect(mockMailHelper.renderTemplate).not.toHaveBeenCalled();

    expect(sendMailMock).toHaveBeenCalledWith({
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: "<p>Direct HTML</p>",
    });
  });

  it("should propagate errors from sendMail", async () => {
    sendMailMock.mockRejectedValueOnce(new Error("SMTP error"));

    const options: MailOptions = {
      from: "sender@example.com",
      to: "receiver@example.com",
      subject: "Failing Email",
      text: "Some text",
      html: "<p>Direct HTML</p>",
      dir: "",
    };

    await expect(mailer.sendMail(options)).rejects.toThrow("SMTP error");
  });
});
