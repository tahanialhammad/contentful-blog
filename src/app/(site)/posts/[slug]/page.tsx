import client from "@/lib/contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: Props) {
  const { slug } = params;

  const res = await client.getEntries({
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
          // <img
          //   src={`https:${image.fields.file.url}`}
          //   alt={title}
          //   className="w-full mb-6 rounded"
          // />
          <Image
    src={`https:${image.fields.file.url}`}
    alt={title}
     width={image.fields.file.details.image.width}
    height={image.fields.file.details.image.height}
    className="w-full max-w-md mb-4 rounded"
  />

        )}
      <div className="prose">{documentToReactComponents(content)}</div>
      </article>
  );
}
