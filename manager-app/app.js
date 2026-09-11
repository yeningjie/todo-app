const form = document.querySelector('#add-form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const ratingInput = document.querySelector('#rating-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#book-list');
const searchAuthorInput = document.querySelector('#search-author');

let books = JSON.parse(localStorage.getItem('books') || '[]');

const save = ()=>{
  localStorage.setItem('books', JSON.stringify(books));
};

let filterAuthor = '';

const render = ()=>{
  list.innerHTML = '';
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
      <button class="del-btn" data-id="${book.id}">删除</button>
    `;
    list.appendChild(li);
  });
};

form.addEventListener('submit',e=>{
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  let rating = Number(ratingInput.value.trim());

  if(isNaN(rating) || rating<1 || rating>5){
    rating = 3;
  }

  if(title === ''){
    tip.textContent = '书名不能为空！';
    return;
  }
  tip.textContent = '';

  const newBook = {
    id: Date.now(),
    title,
    author,
    rating
  };
  books.push(newBook);
  save();
  render();

  titleInput.value = '';
  authorInput.value = '';
  ratingInput.value = '';
});

searchAuthorInput.addEventListener('input',()=>{
  filterAuthor = searchAuthorInput.value.trim();
  render();
});

// 事件委托删除，已经写在代码里面，不用再额外粘贴
list.addEventListener('click',e=>{
  const delBtn = e.target.closest('.del-btn');
  if(delBtn){
    const delId = Number(delBtn.dataset.id);
    books = books.filter(b=>b.id !== delId);
    save();
    render();
  }
});

render();