import Link from "next/link";
import { Key, ReactChild, ReactFragment, ReactPortal } from "react";
import { Pagination } from '../components/molecules/Pagination';
import { Layout } from '../components/templates/Layout';

interface Props {
  blog: { id: number, title: string, content: string }[];
  totalCount: number;
}

interface Blog {
  id: Key | null | undefined; 
  title: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined
}

export default function Home({ blog, totalCount }: Props) {
  return (
    <Layout>
      <div>
        <ul>
          {blog.map((blog: Blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>
                <a>{blog.title}</a>
              </Link>
            </li>
          ))}
        </ul>
        <Pagination totalCount={totalCount} pageNum={1} />
      </div>
    </Layout>
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
