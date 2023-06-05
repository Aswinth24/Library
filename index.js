const library=[];
let addButton=document.querySelector(".add");
let addBookForm=document.querySelector('#form');
let container=document.querySelector('#form-container');
let overlay=document.querySelector('#overlay');

let cancel=document.querySelector('#cancel');

addButton.addEventListener('click',addBookFormCard);
cancel.addEventListener('click',cancelBookFormCard);

document.querySelector('#toggle').addEventListener('click',()=>{
    document.querySelector('.indicator').classList.toggle('active');
});


function cancelBookFormCard()
{
    container.classList.remove('active');
    overlay.classList.remove('active');
}
function addBookFormCard()
{
    container.classList.add('active');
    overlay.classList.add('active');
}

addBookForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(createBook())
    {
        addBook();
        cancelBookFormCard();
    }
});

function mybook(title,author,page,read)
{
    this.title=title;
    this.author=author;
    this.page=page;
    this.read=read;
}

function createBook()
{
    const titleName=document.querySelector('#title').value;
    const authorName=document.querySelector('#author').value;
    const pageNo=document.querySelector('#page_no').value;
    const read=document.querySelector('#read').checked;
    if(checkBook(titleName))
    {

        const newBook= new mybook(titleName,authorName,pageNo,read);
        library.push(newBook);
        return true;
    }
    return false;

}

function addBook()
{
    const card=document.querySelector("#book-card");
    card.innerHTML=''
    for(let i=0;i<library.length;i++)
     {
        let divCard=document.createElement('div');
        divCard.setAttribute('class','card');
        divCard.innerHTML=`
        <div class="topic">
            <h3>Title</h3>
            <p>${library[i].title}</p>
        </div>
        <div class="topic">
            <h3>Author</h3>
            <p>${library[i].author}</p>
        </div>
        <div class="topic">
            <h3>Pages</h3>
            <p>${library[i].page}</p>
        </div>
        <div class="status">
            <button onclick=changeStatus(${i},${library[i].read}) id='status-read' style="color:${changecolor(library[i].read)}">${library[i].read==true?'Readed':'Not Read'}</button>
            <button onclick=removebtn(${i})>Delete</button>
        </div>
        `;
        card.appendChild(divCard);
     }
}
function changeStatus(index,flag)
{
    library[index].read=flag==true?false:true;
    addBook();

}
function changecolor(flag){
       return flag==true?'Green':'red';
}
function removebtn(index){
   
    library.splice(index,1);
    addBook();
}
function checkBook(title)
{
    let errmessage=document.querySelector('#error-message');
      
    for(let i=0;i<library.length;i++)
    {
          if(title===library[i].title)
          {
            errmessage.classList.add('active');
            errmessage.innerHTML="This book already exit in your libary";
            return false;
          }
    }
    for(let lib in library)
    {
        console.log(lib);
    }
    errmessage.classList.remove('active');
    return true;
}