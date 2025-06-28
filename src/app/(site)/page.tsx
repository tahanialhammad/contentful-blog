import client from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Link from "next/link";
import { Post } from '@/lib/types/post';

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
        {posts.map((post) => {
          const { title, publishDate, image, content } = post.fields;

          return (
            <li key={post.sys.id} style={{ marginBottom: 40 }}>
              <h2>
                <Link href={`/posts/${post.fields.slug}`}>
                  {title}
                </Link>
              </h2>
              <p>
                Gepubliceerd op: {new Date(publishDate).toLocaleDateString()}
              </p>

              {image?.fields.file.url && (
                <img
                  src={"https:" + image.fields.file.url}
                  alt={title}
                  style={{ maxWidth: "600px", height: "auto" }}
                />
              )}

              <div>{documentToReactComponents(content)}</div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
