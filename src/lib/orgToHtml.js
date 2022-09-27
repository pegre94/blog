import { unified } from "unified";

import orgParse from "uniorg-parse";
import org2rehype from "uniorg-rehype";
import extractKeywords from "uniorg-extract-keywords";
import { uniorgSlug } from "uniorg-slug";
import rehypeHighlight from "rehype-highlight";
import { visitIds } from "orgast-util-visit-ids";
import langLisp from "highlight.js/lib/languages/lisp";

const extra_languages = {
  lisp: langLisp,
};

const processor = unified()
  .use(orgParse)
  .use(extractKeywords)
  .use(uniorgSlug)
  .use(extractIds)
  .use(org2rehype)
  .use(extractMtime)
  .use(rehypeHighlight, { languages: extra_languages, ignoreMissing: true })
  .use(toJson);

export default async function orgToHtml(file) {
  try {
    return await processor.process(file);
  } catch (e) {
    console.error("failed to process file", file.path, e);
    throw e;
  }
}

function extractIds() {
  return transformer;

  function transformer(tree, file) {
    const data = file.data || (file.data = {});
    // ids is a map: id => #anchor
    const ids = data.ids || (data.ids = {});

    visitIds(tree, (id, node) => {
      if (node.type === "org-data") {
        ids[id] = "";
        // iterate over node children if children is property-drawer type console.log
        node.children.forEach((child) => {
          if (child.type === "property-drawer") {
            child.children.forEach((grandchild) => {
              if (grandchild.key === "mtime") {
                data.mtime = grandchild.value;
              }
              if (grandchild.key === "ctime") {
                data.ctime = grandchild.value;
              }
            });
          }
        });
      } else if (node.type === "headline") {
        if (!node.data?.hProperties?.id) {
          // The headline doesn't have an html id assigned. (Did you
          // remove uniorg-slug?)
          //
          // Assign an html id property based on org id property.
          node.data = node.data || {};

          node.data.hProperties = node.data.hProperties || {};
          node.data.hProperties.id = id;
        }
        ids[id] = "#" + node.data.hProperties.id;
      }
    });
  }
}
// extract mtime

function extractMtime() {
  return transformer;

  function transformer(tree, file) {
    const data = file.data || (file.data = {});
    // ids is a map: id => #anchor
    const ids = data.ids || (data.ids = {});

    visitIds(tree, (id, node) => {
      if (node.type === "org-data") {
        ids[id] = "";
      } else if (node.type === "headline") {
        if (!node.data?.hProperties?.mtime) {
          console.log("test");
          console.log(node.mtime.hProperties?.mtime);
          // The headline doesn't have an html id assigned. (Did you
          // remove uniorg-slug?)
          //
          // Assign an html id property based on org id property.
          node.data = node.data || {};

          node.data.hProperties = node.data.hProperties || {};
          node.data.hProperties.mtime = id;
        }
        ids[id] = "#" + node.data.hProperties.mtime;
        console.log("test");
        console.log(node.mtime.hProperties?.mtime);
      }
    });
  }
}

/** A primitive compiler to return node as is without stringifying. */
function toJson() {
  this.Compiler = (node) => {
    return node;
  };
}
