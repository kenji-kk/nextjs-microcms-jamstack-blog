import Link from 'next/link';
import { Pagination } from '../../../components/Pagination';

const PER_PAGE = 2; 

interface Props {
  blog: { id: number, title: string, content: string }[];
  totalCount: number;
}

// pages/blog/[id].js
export default function BlogPageId({ blog, totalCount }: Props) {
  return (
    <div>
      <ul>
        {blog.map(blog => (
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

// 動的なページを作成
export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_API_KEY }
  };

  const res = await fetch('https://kenji-blog.microcms.io/api/v1/blog', key)

  const repos = await res.json();

  const pageNumbers = [];

  const range = (pagesNumber :number) =>
        [...Array(pagesNumber)].map((_, i) => 1 + i)

  const paths = range(Math.ceil(repos.totalCount / PER_PAGE)).map((repo) =>  `/blog/page/${repo}`)

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context: { params: { id: number }; }) => {
  const id = context.params.id;

  const key = {
    headers: { 'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_API_KEY }
  };

  const data = await fetch(
    `https://kenji-blog.microcms.io/api/v1/blog?offset=${(id - 1) * 2}&limit=2`,
    key
  ).then(res => res.json()).catch(() => null)

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount
    }
  };
};
