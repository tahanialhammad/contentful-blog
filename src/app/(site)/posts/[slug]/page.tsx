import client from "@/lib/contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Post } from '@/lib/types/post';
import { Entry } from "contentful"; // ✅ belangrijk

export default async function PostPage({ params }) {
  const { slug } = params;

  const res = await client.getEntries<Entry<Post>>({ // ✅ gebruik Entry<Post>
    content_type: "blogPost",
    "fields.slug": slug,
  });

  const post = res.items[0];

  if (!post) {
    notFound(); // 404 pagina
  }

  const { title, publishDate, content, image } = post.fields;

  return (
    <article>
      <h1>Show post page</h1>
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
