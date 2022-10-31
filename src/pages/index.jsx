import Head from "next/head";
import moment from "moment";
import Image from "next/image";
import picOfMe from "../../public/static/me.jpg";
import updateIcon from "../../public/static/update.svg";
import { getAllPosts, getPostBySlug } from "../lib/api";
import TopNav from "../components/Nav";
import { unified } from 'unified';
import rehype2react from 'rehype-react';
import Link from "../components/Link";
import React from 'react';

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
function About({ focus }) {
  if (focus === false) {
    return (
      <div>
        <div className="mt-8 mx-3">
          <div className="flex flex-row justify-between">
            <div className="w-3/5">
              <div className="inline-block">
                <p className="text-3xl mb-2">Welcome!</p>
                <p className="text-2xl">My name is</p>
                <p className="text-3xl font-bold">Przemysław Grenda</p>
                <p className="text-1xl my-2 italic">
                  and this is the place where my ideas grow
                </p>
                <div class="flex justify-center pt-2">
                  <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                    <a href="mailto:przemekgrenda@gmail.com" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                      <span class="sr-only">Mail page</span>
                    </a>
                    <a href="https://github.com/pegre94/" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                      <span class="sr-only">GitHub account</span>
                    </a>
                    <a href="https://www.linkedin.com/in/przemyslaw-grenda/" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-gray-400 dark:hover:text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                      <span class="sr-only">Linkedin account</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/5">
              <Image
                className="rounded-full "
                src={picOfMe}
                alt="Picture of the author"
              />
            </div>
          </div>
        </div >
        <h1 className="text-xl mb-4">Recently updated notes:</h1>
      </div>
    )
  } else {
    return null
  }
}
const Index = ({ posts }) => {

  const [focus, setFocus] = React.useState(false);
  const onFocus = () => {
    setFocus(true)

  }
  const onBlur = () => {
    setFocus(false)
  }
  return (
    <main className="flex flex-col ">
      <Head>
        <title>{"Neverending spiral"}</title>
      </Head>
      <TopNav onFocus={onFocus} onBlur={onBlur} />
      <About focus={focus} />

      <div className="">
        <ul className="list-disc">
          {posts.map((post) => (
            <Link href={post.path}>
              <div className="mb-1 w-full lg:max border border-gray-300 rounded hover:bg-slate-100">
                <div className="space-y-2">
                  <div className="flex flex-row justify-between p-4">
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
                  <div className="flex text-gray-600 max-h-20 px-4">
                    <div className="overflow-hidden">
                      {processor.stringify(post.hast)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex flex-row justify-between border-t border-gray-200 px-4 py-2">
                    <div className="flex flex-row">
                      {/* <svg> */}
                      {/*   <path fill="currentColor" d="M21,10.12H14.22L16.96,7.3C14.23,4.6 9.81,4.5 7.08,7.2C4.35,9.91 4.35,14.28 7.08,17C9.81,19.7 14.23,19.7 16.96,17C18.32,15.65 19,14.08 19,12.1H21C21,14.08 20.12,16.65 18.36,18.39C14.85,21.87 9.15,21.87 5.64,18.39C2.14,14.92 2.11,9.28 5.62,5.81C9.13,2.34 14.76,2.34 18.27,5.81L21,3V10.12M12.5,8V12.25L16,14.33L15.28,15.54L11,13V8H12.5Z" /> */}
                      {/* </svg> */}
                      <p> {moment(post.mtime, 'YYYYMMDDHHmmss').format('Do MMMM YYYY')}</p>
                    </div>
                    <p>{post.readingTime} minute read ({post.numWords} words)</p>
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
