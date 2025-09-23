import pug from "pug";
import path from "path";
import { IMailerHelper, ResolveTemplatePath } from "./IMailerHelper.js";
export class MailerHelper implements IMailerHelper {
  constructor() {}

  resolveTemplatePath = ({
    templateName,
    templateDir,
    dir,
  }: ResolveTemplatePath) => {
    return path.resolve(dir, templateDir, `${templateName}.pug`);
  };
  renderTemplate({
    templateName,
    templateDir,
    dir,
    data,
  }: ResolveTemplatePath & {
    data: {};
  }): string {
    const templatePath = this.resolveTemplatePath({
      dir,
      templateDir,
      templateName,
    });

    return pug.renderFile(templatePath, data);
  }
}
