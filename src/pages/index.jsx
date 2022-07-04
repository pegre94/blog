import Head from 'next/head';
import Image from 'next/image'
import picOfMe from '../../public/static/me.jpg'
import { getAllPosts } from '../lib/api';
import Link from '../components/Link';

const Index = ({ posts }) => {
  return (
    <main class="flex flex-col">
      <Head>
        <title>{'Neverending spiral'}</title>
      </Head>
      <div class="flex flex-row bg-indigo-500 content-between">
          <div class="flex flex-row my-2">
            <div>
              <a href="">
                <span class="text-2xl mx-8">Home</span>
              </a>
            </div>
            <div>
              <a href="">
                <span class="text-2xl mx-8">Notes</span>
              </a>
            </div>
            <div>
              <a href="">
                <span class="text-2xl mx-8">Blog</span>
              </a>
            </div>
          </div>
        <div class="flex-1  bg-yellow-500">
          {/* TODO add theme switch */}
          {/* https://heroicons.com/ */}
        </div>

</div>
      <div class="mx-4 mt-8">
        <div class="flex flex-row">
          <div>
            <p class="text-4xl my-2">Welcome!</p>
            <p class="text-3xl">My name is</p>
            <p class="text-3xl font-bold">Przemysław Grenda</p>
            <p class="text-1xl my-2 italic">This is the place where my ideas grow</p>
          </div>
          <div>
          <Image class="rounded-full"
            src={picOfMe}
      alt="Picture of the author"
      width={200}
      height={200}
    />
          </div>

        </div>




      <h1 class="text-lg">Test</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.path}>
            <Link href={p.path}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
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
