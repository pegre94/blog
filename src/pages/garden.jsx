import Head from 'next/head';

import { getAllPosts } from '../lib/api';
import Link from '../components/Link';

const Garden = ({ posts }) => {
  return (
    <main>
      <Head>
        <title>{'Digital garden'}</title>
      </Head>
      <h1>{'Digital garden notes:'}</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.path}>
            <Link href={p.path}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
export default Garden ;

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();
  const posts = allPosts
    .map((p) => ({ title: p.data.title || p.basename, path: p.path }))
    .sort((a, b) => {
      return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
    });
  return { props: { posts } };
};
