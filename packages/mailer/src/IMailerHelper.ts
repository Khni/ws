export type ResolveTemplatePath = {
  templateName: string;
  templateDir: string;
  dir: string;
};

export interface IMailerHelper {
  resolveTemplatePath: (params: ResolveTemplatePath) => string;
  renderTemplate(params: ResolveTemplatePath & { data: {} }): string;
}
