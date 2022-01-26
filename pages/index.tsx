import Link from "next/link";
import { Key, ReactChild, ReactFragment, ReactPortal } from "react";
import { client } from "../libs/client";

export default function Home({ blog }: { blog: { id: number, title: string, content: string }[] }) {
  return (
    <div>
      <ul>
        {blog.map((blog: { id: Key | null | undefined; title: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};
