import path from "path";
import fs from "fs";
import blogsArray from "./blogs.js";

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now you can use __dirname
const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const blogListForHome = blogsArray.map(blog => ({
  title: blog.title,
  contentSnippet: blog.content.split(' ').slice(0, 30).join(' ') + '...',
  date: formatDate(blog.date),
  filename: blog.filename
}));

const outputPathint = path.join(path.dirname(import.meta.url.replace('file://', '')), 'bloglist-for-home.ts');
const outputPath = outputPathint.slice(1)
console.log(outputPath)
const outputContent = `export const blogListForHome = ${JSON.stringify(blogListForHome, null, 2)};`;
// console.log(outputContent)
fs.writeFileSync(outputPath, outputContent, 'utf-8');

console.log('Successfully created bloglist-for-home.ts');

blogsArray.forEach(blog => {
  const content = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${blog.title}</title>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body class="font-lora dark:bg-slate-900 dark:text-white font-medium">
    <header class="flex justify-between items-center max-w-3xl w-full  mx-auto px-4">
      <nav>
        <a href="/">Go Back</a>
      </nav>
      <div class="w-24 h-24 cursor-pointer flex justify-center items-center" id="dark-mode-switch">
      <i class="fa-solid fa-lightbulb text-2xl " id="dark-mode-on"></i>
      <i class="fa-regular fa-lightbulb text-2xl hidden" id="dark-mode-off"></i>
    </div>
    </header>
    <main class="max-w-3xl w-full  mx-auto px-4">
      <h1 class="text-xl py-4">${blog.title}</h1>
      <p>${blog.content}</p>
      <p>${formatDate(blog.date)}</p>
    </main>
  </body>
  <script>
  const gid = (id) => document.getElementById(id);
  gid("dark-mode-switch")?.addEventListener("click", () => {
    document.getElementsByTagName("html")[0].classList.toggle("dark");
    gid("dark-mode-off")?.classList.toggle("hidden");
    gid("dark-mode-on")?.classList.toggle("hidden");
  });
  </script>
  </html>
  `;

  const outputPath = path.join(__dirname, '..', 'public', `${blog.filename}.html`);

  fs.writeFile(outputPath, content, (err) => {
    if (err) {
      console.error('Error creating file:', err);
      return;
    }
    console.log('File created successfully!');
  });
});
