const input = document.querySelector('.search-input');
const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');

let limit = 5;
let page = 1;

async function getPosts() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
  const data = await response.json();
  // console.log(data);
  return data;
};

async function showPosts() {
  const posts = await getPosts();
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post-container');
    postEl.innerHTML = `
    <p class="post-number">${post.id}</p>
    <h3 class="post-title">${post.title}</h3>
    <p class="post-text">${post.body}</p>
    `;
    postsContainer.appendChild(postEl);
  });
  // console.log(posts);
}

function showLoading() {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show');
    setTimeout(() => {
      page++;
      showPosts();
    }, 400);
  }, 1000);
}

showPosts();

window.addEventListener("scroll", function () {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    showLoading()
  }
});
