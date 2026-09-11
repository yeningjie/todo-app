const form = document.querySelector('#add‑form');
const titleInput = document.querySelector('#title‑input');
const authorInput = document.querySelector('#author‑input');
const ratingInput = document.querySelector('#rating‑input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#book‑list');
const searchAuthorInput = document.querySelector('#search‑author');

// 从本地存储恢复
let books = JSON.parse(localStorage.getItem('books') || '[]');

// 保存函数
const save = ()=>{
  localStorage.setItem('books', JSON.stringify(books));
};

// 当前筛选作者关键词
let filterAuthor = '';

const render = ()=>{
  list.innerHTML = '';
  // 过滤
  let showList = books;
  if(filterAuthor.trim()!==''){
    showList = books.filter(b=>b.author.includes(filterAuthor));
  }

  if(showList.length===0){
    const li = document.createElement('li');
    li.textContent = '暂无图书记录';
    list.appendChild(li);
    return;
  }

  showList.forEach(book=>{
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `
      <div>书名：${book.title}</div>
      <div>作者：${book.author}</div>
      <div>评分：${book.rating}</div>
      <button class="del‑btn" data‑id="${book.id}">删除</button>
    `;
    list.appendChild(li);
  });
};

// 添加图书
form.addEventListener('submit',e=>{
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const rating = Number(ratingInput.value.trim());

  // 输入校验
  if(title === ''){
    tip.textContent = '书名不能为空！';
    return;
  }
  tip.textContent = '';

  const newBook = {
    id: Date.now(), // 使用时间戳充当唯一id
    title,
    author,
    rating
  };
  books.push(newBook);
  save();
  render();

  //清空表单
  titleInput.value = '';
  authorInput.value = '';
  ratingInput.value = '';
});

// 搜索筛选
searchAuthorInput.addEventListener('input',()=>{
  filterAuthor = searchAuthorInput.value.trim();
  render();
});

render();