import { describe, it, expect, vi, beforeEach } from "vitest";
import path from "path";
import pug from "pug";
import { MailerHelper } from "../src/PugMailerHelper.js";

// --- Mock pug.renderFile so we don't actually read any files ---

let helper: MailerHelper;
vi.mock("pug", () => ({
  default: {
    renderFile: vi.fn(),
  },
}));

describe("MailerHelper", () => {
  const renderFileMock = pug.renderFile as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    helper = new MailerHelper();
  });
  describe("resolveTemplatePath", () => {
    it("should return a proper path based on the caller directory", () => {
      const dir = __dirname;
      const templateDir = "./email";
      const templateName = "otp-template";

      const templatePath = helper.resolveTemplatePath({
        templateDir,
        templateName,
        dir,
      });

      const expectedPath = path.resolve(
        dir,
        templateDir,
        `${templateName}.pug`
      );

      expect(templatePath).toBe(expectedPath);
    });
  });

  it("should resolve template path correctly and call pug.renderFile", () => {
    const fakeHtml = "<h1>Hello</h1>";
    renderFileMock.mockReturnValue(fakeHtml);

    const input = {
      templateName: "welcome",
      dir: __dirname,
      templateDir: "emails",
      data: { name: "John" },
    };

    const result = helper.renderTemplate(input);

    const expectedPath = path.resolve(
      input.dir,
      input.templateDir,
      `${input.templateName}.pug`
    );

    expect(renderFileMock).toHaveBeenCalledTimes(1);
    expect(renderFileMock).toHaveBeenCalledWith(expectedPath, input.data);
    expect(result).toBe(fakeHtml);
  });

  it("should propagate errors from pug.renderFile", () => {
    renderFileMock.mockImplementation(() => {
      throw new Error("Template not found");
    });

    expect(() =>
      helper.renderTemplate({
        templateName: "missing-template",
        dir: __dirname,
        templateDir: "./emails",
        data: {},
      })
    ).toThrow("Template not found");
  });
});
