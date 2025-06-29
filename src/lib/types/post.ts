import { Document } from "@contentful/rich-text-types";

export type Post = {
  sys: { id: string };
  fields: {
    title: string;
    publishDate: string;
    // slug: string;
    content: Document;
    image?: { fields: { file: { url: string } } };
  };
};
