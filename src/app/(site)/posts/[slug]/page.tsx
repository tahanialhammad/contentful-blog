import { notFound } from "next/navigation";
import client from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { PostSkeleton } from "@/lib/types/post";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const res = await client.getEntries<PostSkeleton>({
    content_type: "blogPost",
    "fields.slug": slug,
  });

  const post = res.items[0];

  if (!post) {
    notFound();
  }

  const { title, publishDate, content, image } = post.fields;

  return (
    <article>
      <h1>{title}</h1>
      <p className="text-gray-500 mb-4">{publishDate}</p>

      {image && (
        <img
          src={`https:${image.fields.file.url}`}
          alt={title}
          className="w-full mb-6 rounded"
        />
      )}
      <div className="prose">{documentToReactComponents(content)}</div>
    </article>
  );
}
