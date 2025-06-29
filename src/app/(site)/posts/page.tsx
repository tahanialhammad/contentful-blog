import client from '@/lib/contentful';
import { Post } from '@/lib/types/post';

export default async function BlogPage() {
  const res = await client.getEntries<Post>({
    content_type: 'blogPost',
    order: '-fields.publishDate',
  });

  const posts = res.items;

  return (
    <div>
      <h1>All post page</h1>
      <ul className="flex flex-col gap-10 list-none">
        {posts.map(({ sys, fields }) => (
          <li key={sys.id} className="border-b pb-6">
            <h2 className="text-2xl font-bold">{fields.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
