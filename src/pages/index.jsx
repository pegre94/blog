import Head from 'next/head';
import Image from 'next/image'
import picOfMe from '../../public/static/me.jpg'
import { getAllPosts } from '../lib/api';
import Link from '../components/Link';
import TopNav from '../components/Nav';

const Index = ({ posts }) => {
  return (
    <main class="flex flex-col ">
      <Head>
        <title>{'Neverending spiral'}</title>
      </Head>
      <div class="flex flex-row content-between">
        <TopNav/>
        <div class="flex-1">
          {/* TODO add theme switch */}
          {/* https://heroicons.com/ */}
        </div>

         </div>
      <div class="mt-8 mx-3">
        <div class="flex flex-row justify-between">
          <div>
            <p class="text-3xl mb-2">Welcome!</p>
            <p class="text-2xl">My name is</p>
            <p class="text-3xl font-bold">Przemysław Grenda</p>
            <p class="text-1xl my-2 italic">and this is the place where my ideas grow</p>
          </div>
          <Image class="rounded-full"
            src={picOfMe}
          alt="Picture of the author"
          width={150}
          height={150}
        />
        </div>
        </div>


      <div class="">
      <h1 class="text-3xl my-4 mx-3">My notes:</h1>
        <ul class="list-disc ml-8 ">
        {posts.map((p) => (
          <li key={p.path}>
            <Link href={p.path} class="hover:underline">{p.title}</Link>
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
