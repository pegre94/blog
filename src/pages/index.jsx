import Head from 'next/head';

import { getAllPosts } from '../lib/api';
import Link from '../components/Link';

const Index = ({ posts }) => {
  return (
    <main>
      <Head>
        <title>{'Neverending spiral'}</title>
      </Head>
      <h1>{'Neverending spiral:'}</h1>
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
export default Index;

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();
  const posts = allPosts
    .map((p) => ({ title: p.data.title || p.basename, path: p.path }))
    .sort((a, b) => {
      return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
    });
  return { props: { posts } };
};
