import slugifyNpm from "slugify";

export const slugify = (string: string) =>
  slugifyNpm(string, { lower: true, strict: true });
