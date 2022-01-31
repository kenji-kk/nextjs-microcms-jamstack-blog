import { VFC } from 'react'
import Link from 'next/link';
import { Pagination } from '../../../components/molecules/Pagination';
import { Layout } from '../../../components/templates/Layout';
const PER_PAGE = 5; 

type Props ={
  blog: { id: number, title: string, content: string, body: any }[];
  totalCount: number;
  pageNum: number;
}

// pages/blog/[id].js
const BlogPageId:VFC<Props> = ({ blog, totalCount, pageNum }) =>{
  return (
    <Layout>
      <div className='mt-10'>
        <ul className=' grid grid-cols-2 gap-4 w-9/12 mx-auto mb-10'>
          {blog.map(blog => (
            <Link key={blog.id} href={`/blog/${blog.id}`}>
              <a className='block'>
              <li  className='pt-5 pb-5 border-2 border-purple-400 hover:bg-teal-100'>
                <p className='text-center pb-5 border-b border-purple-300 text-2xl'>{blog.title}</p>
                  <div
                    dangerouslySetInnerHTML={{
                    __html: `${blog.body}`,}}
                    className='mx-10 mt-5'>
                </div>
                </li>
              </a>
            </Link>
          ))}
        </ul>
        <Pagination totalCount={totalCount} pageNum={pageNum}/>
      </div>
    </Layout>
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
    `https://kenji-blog.microcms.io/api/v1/blog?offset=${(id - 1) * 5}&limit=5`,
    key
  ).then(res => res.json()).catch(() => null)

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
      pageNum: id
    }
  };
};

export  default BlogPageId;
