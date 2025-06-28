import client from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Link from "next/link";

type Post = {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    publishDate: string;
    content: Document;
    image?: { fields: { file: { url: string } } };
  };
};

async function getPosts() {
  const response = await client.getEntries<Post>({
    content_type: "blogPost",
    order: "-fields.publishDate",
  });
  return response.items;
}

export default async function Page() {
  const posts = await getPosts();

  return (
    <main>
      <h1>Mijn Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.sys.id} style={{ marginBottom: 40 }}>
            <h2>
              {" "}
              <Link href={`/posts/${post.fields.slug}`}>
                {post.fields.title}
              </Link>
            </h2>
            <p>
              Gepubliceerd op:{" "}
              {new Date(post.fields.publishDate).toLocaleDateString()}
            </p>

            {post.fields.image && (
              <img
                src={"https:" + post.fields.image.fields.file.url}
                alt={post.fields.title}
                style={{ maxWidth: "400px", height: "auto" }}
              />
            )}

            {post.fields.content && (
              <div>{documentToReactComponents(post.fields.content)}</div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
