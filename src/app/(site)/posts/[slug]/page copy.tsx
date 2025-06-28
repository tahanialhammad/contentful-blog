import client from "@/lib/contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Post } from "@/lib/types/post"; // import je type

async function getPostBySlug(slug: string) {
  const res = await client.getEntries<Post>({
    content_type: "blogPost",
    "fields.slug": slug,
  });

  if (!res.items.length) return null;
  return res.items[0];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) notFound();

  const { title, publishDate, image, content } = post.fields;

  return (
    <main>
      <h1>{title}</h1>
      <p>Gepubliceerd op: {new Date(publishDate).toLocaleDateString()}</p>

      {image?.fields.file.url && (
        <img
          src={"https:" + image.fields.file.url}
          alt={title}
          style={{ maxWidth: "600px", height: "auto" }}
        />
      )}

      <div>{documentToReactComponents(content)}</div>
    </main>
  );
}
