import { Post } from "@/lib/types/post";
import client from "@/lib/contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";



type Props = {
  params: {
    slug: string;
  };
};
// export async function generateStaticParams() {
//   const res = await client.getEntries<Post>({
//     content_type: "blogPost",
//   });

//   return res.items.map((post) => ({
//     // params: {
//       slug: post.fields.slug,
//     // },
//   }));
// }


export default async function Page({ params }: Props) {
  const { slug } = params;

  const res = await client.getEntries<Post>({
    content_type: "blogPost",
    "fields.slug": slug,
  });

  const post = res.items[0];

  if (!post) return notFound();

  const { title, publishDate, content, image } = post.fields;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-500 mb-4">{publishDate}</p>
      {image && (
        <img
          src={`https:${image.fields.file.url}`}
          alt={title}
          className="w-full mb-6 rounded"
        />
      )}
      <div className="prose">{documentToReactComponents(content)}</div>
    </main>
  );
}
