// pages/blog/[id].js
import { Layout } from '../../components/templates/Layout';
import { client } from '../../libs/client';
import styles from '../../styles/Home.module.scss';

interface Blog {
  blog: 
  { id: string,
    title: string, 
    content: string, 
    publishedAt: Date, 
    body: any, 
    category: any }
}

export default function BlogId({ blog }: Blog) {
  return (
    <Layout>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <p className="category">{blog.category && `${blog.category.name}`}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className={styles.post}
      />
    </Layout>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog",  queries: {limit: 100} });

  const paths = data.contents.map((content: { id: number; }) => `/blog/${content.id}`);
  return { paths, fallback: 'blocking' };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: { params: { id: string; }; }) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
