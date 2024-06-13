import './style.css';
import { blogListForHome } from './bloglist-for-home';
// Ensure this function is defined
const gid = (id: string) => document.getElementById(id);

// Assuming blogListForHome is already defined and imported/available
const blogList = gid('blog-list');

// Create an unordered list once and append list items to it
const unorderedList = document.createElement('ul');
unorderedList.classList.add('list-none', 'flex', 'flex-col', 'gap-4', 'py-3');

blogListForHome.forEach((blog) => {
  const listItem = document.createElement('li');
  listItem.classList.add('font-medium', 'list-none');

  const snippet = document.createElement('p');
  snippet.classList.add('line-clamp-2')
  snippet.textContent = blog.contentSnippet;

  const readMore = document.createElement('a');
  readMore.href = blog.filename + '.html';
  readMore.textContent = 'Read more';
  readMore.classList.add('text-blue-700', 'hover:underline', 'italic', 'dark:text-blue-400');
  
  const anchor = document.createElement('a');
  anchor.href = blog.filename + '.html';
  anchor.textContent = blog.title;
  anchor.classList.add('text-blue-700', 'hover:underline', 'italic', 'dark:text-blue-400');
  
  const date = document.createElement('span');
  date.textContent = `${blog.date} - `;
  date.classList.add('text-gray-700', 'font-medium', 'dark:text-gray-400');
  
  listItem.appendChild(date);
  listItem.appendChild(anchor);
  listItem.appendChild(snippet);
  listItem.appendChild(readMore);
  unorderedList.appendChild(listItem);
});

// Append the unordered list to the blog list container
blogList!.appendChild(unorderedList);

gid("dark-mode-switch")?.addEventListener("click", () => {
  document.getElementsByTagName("html")[0].classList.toggle("dark");
  gid("dark-mode-off")?.classList.toggle("hidden");
  gid("dark-mode-on")?.classList.toggle("hidden");
});