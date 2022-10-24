import Head from "next/head";
import moment from "moment";
import Image from "next/image";
import picOfMe from "../../public/static/me.jpg";
import { getAllPosts, getPostBySlug } from "../lib/api";
import TopNav from "../components/Nav";
import { unified } from 'unified';
import rehype2react from 'rehype-react';
import Link from "../components/Link";
import React from 'react';
import { useEffect } from 'react'

const DummyLink = ({ href, ...props }) => {
  return (
    // return dummy component
    <>
      {href}
    </>
  );
};

const processor = unified()
  .use(rehype2react, {
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: {
      a: DummyLink,
    }
  });

const Index = ({ posts }) => {
  return (
    <main className="flex flex-col ">
      <Head>
        <title>{"Neverending spiral"}</title>
      </Head>
      <div className="flex flex-row content-between">
        <TopNav />
        <div className="flex-1">
          {/* TODO add theme switch */}
          {/* https://heroicons.com/ */}
        </div>
      </div>
      <div className="mt-8 mx-3">
        <div className="flex flex-row justify-between">
          <div className="w-3/5">
            <p className="text-3xl mb-2">Welcome!</p>
            <p className="text-2xl">My name is</p>
            <p className="text-3xl font-bold">Przemysław Grenda</p>
            <p className="text-1xl my-2 italic">
              and this is the place where my ideas grow
            </p>
          </div>
          <div className="w-2/5">
            <Image
              className="rounded-full "
              src={picOfMe}
              alt="Picture of the author"
            />

          </div>
        </div>
      </div>

      <div className="ml-4">
        <h1 className="text-2xl my-4">Recently updated notes:</h1>
        <ul className="list-disc">
          {posts.map((post) => (
            <Link href={post.path}>
              <div className="mb-1 w-full p-4 lg:max border border-gray-300 rounded hover:bg-slate-100">
                <div className="space-y-2">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl font-semibold">
                      {post.title}
                    </h3>
                    <div className="flex flex-row">
                      {post.tags?.map((tag) => (
                        <span
                          className="px-4 py-2 ml-3 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max" >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex text-gray-600 max-h-40">
                    <div className="overflow-hidden">
                      {processor.stringify(post.hast)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex flex-row justify-between">
                    <p >{moment(post.mtime, 'YYYYMMDDHHmmss').format('Do MMMM YYYY')}</p> <p>{post.readingTime} minute read ({post.numWords} words)</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </main >
  );
};


export default Index;

function getWords(content) {
  return content.split(/\s/g).length;
}
function getReadingTime(content) {
  const wordsPerMinute = 200;
  return Math.ceil(getWords(content) / wordsPerMinute);
}

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();
  // TODO: refactor there is alredy post value here and we are droping it to obtain it again later
  let posts = allPosts
    .map((p) => ({ title: p.data.title || p.basename, path: p.path, mtime: p.data.mtime, tags: p.data.filetags?.slice(1, -1).split(":") || [] }))
    .slice(0, 5)
    .sort((a, b) => new moment(a.mtime).format('YYYYMMDDHHmmss') - new moment(b.mtime).format('YYYYMMDDHHmmss'))

  posts = await Promise.all(posts.map(async (p) => {
    const post = await getPostBySlug(p.path);
    const stringPost = post.value.toString()
    const postText = stringPost.substring(stringPost.indexOf('#+type: public') + 14)
    const numWords = getWords(postText)
    const readingTime = getReadingTime(postText)


    return { ...p, hast: post.result, numWords: numWords, readingTime: readingTime }
  }))
  return { props: { posts } };
};
