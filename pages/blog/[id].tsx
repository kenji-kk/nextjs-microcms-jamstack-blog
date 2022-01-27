// pages/blog/[id].js
import { client } from '../../libs/client';
import styles from '../../styles/Home.module.scss';

export default function BlogId({ blog }: {blog: { id: string, title: string, content: string, publishedAt: Date, body: any, category: any } }) {
  return (
    <main className={styles.main}>
    <h1 className={styles.title}>{blog.title}</h1>
    <p className={styles.publishedAt}>{blog.publishedAt}</p>
    <p className="category">{blog.category && `${blog.category.name}`}</p>
    <div
      dangerouslySetInnerHTML={{
        __html: `${blog.body}`,
      }}
      className={styles.post}
    />
  </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog", queries: {limit: 1000} });

  const paths = data.contents.map((content: { id: number; }) => `/blog/${content.id}`);
  return { paths, fallback: true };
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
