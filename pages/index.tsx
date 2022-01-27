import Link from "next/link";
import { Key, ReactChild, ReactFragment, ReactPortal } from "react";
import { Pagination } from '../components/Pagination';

interface Props {
  blog: { id: number, title: string, content: string }[];
  totalCount: number;
}

export default function Home({ blog, totalCount }: Props) {
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
      <Pagination totalCount={totalCount} />
    </div>
  );
}

export const getStaticProps = async () => {
  const key = {
    headers: {'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_API_KEY},
  };
  const data = await fetch('https://kenji-blog.microcms.io/api/v1/blog?offset=0&limit=5', key)
    .then(res => res.json())
    .catch(() => null);

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount
    },
  };
};
