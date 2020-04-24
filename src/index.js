let addToy = false;

function addNewToys(data){
  for(const element of data){
    const toyInfo = {
      name: element.name,
      image: element.image,
      likes: element.likes,
      id: element.id
    }
    appendToy(toyInfo);
  }
}

function appendToy(info){
  const collection = document.getElementById("toy-collection");
  const toyCardHolder = document.createElement('div');
  const name = document.createElement("h2");
  name.innerText = info.name;
  const image = document.createElement("img");
  image.src = info.image;
  image.classList.add("toy-avatar");
  const likes = document.createElement("p");
  likes.innerText = info.likes;
  const likeButton = document.createElement('button');
  likeButton.classList.add("like-btn");
  likeButton.innerText = "Like";
  toyCardHolder.classList.add('card');
  toyCardHolder.appendChild(name);
  toyCardHolder.appendChild(image);
  toyCardHolder.appendChild(likes);
  toyCardHolder.appendChild(likeButton);
  collection.appendChild(toyCardHolder);
  addListener(likeButton, likes, info.id); 
}

function addListener(likeButton, likes, id){
  likeButton.addEventListener('click', function(){
    let number = parseInt(likes.innerText, 10);
    number ++;
    likes.innerText = number; 
    patchToy(id, {likes: number});
  });
}

function submitToy(data = {})
{
  const configObj = {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify(data)
  };
 
  fetch('http://localhost:3000/toys', configObj)
  .then((response) => response.json())
  .then((data) => appendToy(data))
  .catch((error) => console.log(error.message));
}
function patchToy(id, data = {})
{
  const configObj = {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify(data)
  };
 
  fetch(`http://localhost:3000/toys/${id}`, configObj)
  .then((response) => response.json())
  .then((data) => appendToy(data))
  .catch((error) => console.log(error.message));
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const likeButton = document.querySelector(".like-btn");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  toyForm.addEventListener("submit", function(){ 
    const toyInput = document.getElementsByClassName("input-text");
    console.log("HI");
    debugger
    submitToy({name: toyInput.name.value ,image: toyInput.image.value, likes: 0})
    
    });
    
  res = fetch('http://localhost:3000/toys').then((response) => response.json())
  res.then((data) => addNewToys(data)).catch((error) => console.log(error));

  
});
