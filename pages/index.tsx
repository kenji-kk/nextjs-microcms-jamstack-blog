import { VFC } from 'react'
import Link from "next/link";
import { Key, ReactChild, ReactFragment, ReactPortal } from "react";
import { Pagination } from '../components/molecules/Pagination';
import { Layout } from '../components/templates/Layout';

type Props = {
  blog: { id: number, title: string, content: string, body: any, description: string }[];
  totalCount: number;
}

type Blog = {
  id: Key | null | undefined; 
  title: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
}

const Home:VFC<Props> = ({ blog, totalCount }) => {
  return (
    <Layout>
      <div className='mt-10 bg-purple-200'>
        <ul className=' grid lg:grid-cols-2 gap-10 w-80 md:w-96 lg:w-9/12 mx-auto mb-10 '>
          {blog.map(blog => (
            <Link key={blog.id} href={`/blog/${blog.id}`}>
              <a className='block w-80 md:w-96 lg:w-full'>
              <li  className='pt-5 pb-5 border-2 border-purple-400 hover:bg-teal-100  h-36 w-full overflow-hidden'>
                <p className=' mx-10 text-center pb-5 overflow-scroll border-b border-purple-300 text-2xl'>{blog.title}</p>
                <p className='mx-10 mt-5 overflow-scroll' >{blog.description}</p>
              </li>
              </a>
            </Link>
          ))}
        </ul>
        <Pagination totalCount={totalCount} pageNum={1}/>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const key = {
    headers: {'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_API_KEY},
  };
  const data = await fetch('https://kenji-blog.microcms.io/api/v1/blog?offset=0&limit=6', key)
    .then(res => res.json())
    .catch(() => null);

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount
    },
  };
};

export  default Home;
