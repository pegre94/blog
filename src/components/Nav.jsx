import React from 'react';

const TopNav= () => {
  return (
      <nav class="flex flex-row my-1">
        {[['Home', '/' ],
         ['Notes', '/notes' ],
         ['Tags', '/tags' ],
         ['Blog', '/blog' ],
         ['About', '/about']].map(([title, url]) => (
          <a href={url} className="rounded-lg px-1 py-2 mr-6 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a>
         ))}
      </nav>
  );
};

export default TopNav;
