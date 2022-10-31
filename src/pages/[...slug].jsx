import { join } from "path";
import Head from "next/head";

import { getAllPaths, getPostBySlug } from "../lib/api";
import moment from "moment";

import Link from "../components/Link";
import Rehype from "../components/Rehype";
import TopNav from "../components/Nav";

const Note = ({ title, hast, mtime, ctime, backlinks }) => {
  return (
    <main>
      <div className="mt-8 mx-3">
        <title>{title}</title>

        <TopNav />

        <div class="font-bold text-5xl tracking-tight text-black md:text-5xl mb-2">
          {title}
        </div>
        <div className="text-gray-600 mb-2">
          Created: {moment(ctime, 'YYYYMMDDHHmmss').format('Do MMMM YYYY')}&nbsp;
          Last Modified: {moment(mtime, 'YYYYMMDDHHmmss').format('Do MMMM YYYY')}</div>
        <Rehype hast={hast} />
        {
          !!backlinks.length && (
            <section>
              <h2>{"Backlinks"}</h2>
              <ul>
                {backlinks.map((b) => (
                  <li key={b.path}>
                    <Link href={b.path}>{b.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        }
      </div>
    </main >
  );
};
export default Note;

export const getStaticPaths = async () => {
  const paths = await getAllPaths();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const path = "/" + join(...(params.slug || ["index"]));
  const post = await getPostBySlug(path);
  const data = post.data;
  const backlinks = await Promise.all([...data.backlinks].map(getPostBySlug));
  return {
    props: {
      title: data.title || post.basename,
      hast: post.result,
      mtime: data.mtime,
      ctime: data.ctime,
      backlinks: backlinks.map((b) => ({
        path: b.path,
        title: b.data.title || b.basename,
      })),
    },
  };
};
