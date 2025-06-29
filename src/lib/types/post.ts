// import { Document } from "@contentful/rich-text-types";

// export type Post = {
//   sys: { id: string };
//   fields: {
//     title: string;
//     publishDate: string;
//     slug: string;
//     content: Document;
//     image?: { fields: { file: { url: string } } };
//   };
// };

// types/post.ts
export interface Post {
  title: string;
  slug: string;
  content: any;
  publishDate: string;
  image?: {
    fields: {
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          };
        };
      };
    };
  };
}
