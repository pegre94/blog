import React from 'react';
import { useRouter } from 'next/router';

// check if current route is active return true
const isActive = (href) => {
  const router = useRouter();
  if (router.pathname === href) {
    return true;
  }
};
const searchVisible = () => {
  const router = useRouter();
  if (router.pathname === '/') {
    return true;
  }
};


const TopNav = ({ onFocus, onBlur }) => {
  return (
    <div className="flex flex-row my-2 items-center justify-between">
      <nav class="flex-row ">
        {[['Home', '/'],
        ['About', '/about']].map(([title, url]) => (
          <a key={title} href={url} className={"rounded-lg px-4 py-2 mr-5 text-slate-700 font-semibold hover:bg-slate-300  hover:text-slate-900" +
            (isActive(url) === true ? " bg-slate-200" : "")} > {title}</a>
        ))}
      </nav >
      {(searchVisible() === true ?
        <div className="flex">
          <form class="flex items-center">
            <div class="relative w-fit">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
              </div>
              <input type="text" onFocus={onFocus} onBlur={onBlur} id="search" class="bg-gray-50 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:slate-300 focus:border-slate-300  pl-10 p-2.5" placeholder="Search notes" required />
            </div>
          </form>
        </div >
        : null)}
    </div >

  );
};

export default TopNav;
