import client from '@/lib/contentful';
import Link from 'next/link';
import { Post } from '@/lib/types/post';

export const metadata = {
  title: 'Blog overzicht - Mijn Blog',
  description: 'Lees de nieuwste blogposts over interessante onderwerpen.',
};

async function getPosts() {
  const response = await client.getEntries<Post>({
    content_type: 'blogPost',
    order: '-fields.publishDate',
  });
  return response.items;
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8">Mijn Blog</h1>
      <ul className="flex flex-col gap-10 list-none">
        {posts.map((post) => (
          <li key={post.sys.id}>
            <h2 className="text-2xl font-bold">
              <Link href={`/posts/${post.fields.slug}`}>
                {post.fields.title}
              </Link>
            </h2>
            <p className="text-gray-600">
              Gepubliceerd op: {new Date(post.fields.publishDate).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
