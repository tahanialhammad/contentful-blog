// app/(site)/layout.tsx
import Link from "next/link";
import "../globals.css";

//SEO
export const metadata = {
  title: "Mijn Blog",
  description: "Welkom op mijn blog",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        <nav className="bg-gray-200 p-4">
          <ul className="flex gap-4 list-none">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/posts">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
