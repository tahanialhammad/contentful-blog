import client from "@/lib/contentful";
import Link from "next/link";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

export default async function BlogPage() {
  const res = await client.getEntries({
    content_type: "blogPost", // content type ID
    order: "-fields.publishDate",
  });

  const posts = res.items;

  return (
    <div>
      <h1>Blogpagina</h1>
      <ul className="space-y-8">
        {posts.map(({ sys, fields }) => {
          const plainText = documentToPlainTextString(fields.content);
          const shortText = plainText.slice(0, 200) + "...";

          return (
            <li key={sys.id} className="border-b pb-6">
              <h2 className="text-2xl font-semibold">
                <Link href={`/posts/${fields.slug}`}>{fields.title}</Link>
              </h2>
              <p className="text-gray-500 mb-2">{fields.publishDate}</p>

              {fields.image && (
                <img
                  src={`https:${fields.image.fields.file.url}`}
                  alt={fields.title}
                  className="w-full max-w-md mb-4 rounded"
                />
              )}

              <p className="text-gray-700">{shortText}</p>
              <Link
                href={`/posts/${fields.slug}`}
                className="text-blue-600 underline mt-2 inline-block"
              >
                Lees meer →
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
