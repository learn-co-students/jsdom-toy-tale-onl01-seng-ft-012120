let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
 
console.log(addToys)
getToys()
formListener()
});



function getToys() {
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => addToys(json));
}

function addToys(json) {
  const mainDiv =  document.getElementById("toy-collection")
  json.forEach(toy => {
    let div = document.createElement('div')
    div.setAttribute("class", "card")
    let nameTag = document.createElement('h2')
    let img = document.createElement('img')
    img.setAttribute("class", "toy-avatar")
    img.style.height = '250px';
   img.style.width = '250px';
    let likes = document.createElement('p')
    let btn = document.createElement('button')
    btn.setAttribute("class", "like-btn")
    btn.addEventListener('click', event => {
      event.preventDefault() 
      likes.innerText = ++ toy.likes 
      updateLikes(toy)
    })
  
    nameTag.innerHTML = toy.name
    img.src = toy.image
    likes.innerText = toy.likes
    btn.innerText = "like"
    div.appendChild(nameTag)
    div.appendChild(img)
    div.appendChild(likes)
    div.appendChild(btn)
    console.log(div)
    mainDiv.appendChild(div)
  })
}


function formListener() {
  const submit = document.getElementById("submit")
submit.addEventListener("click", event => {
  event.preventDefault()
  const toy = {
    name: document.getElementsByName("name")[0].value,
    image: document.getElementsByName("image")[0].value
  }
  console.log(toy)
  sendToy(toy)
  document.querySelector('.add-toy-form').reset()
  window.location.reload(true);
})

}

function sendToy(toy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toy.name,
      "image": toy.image,   
      "likes": 0
    })   
  }).then(resp => resp.json()).then(json => console.log(json))
};

function updateLikes(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    },
    body: JSON.stringify({ 
      "likes": toy.likes
    })   
  }).then(resp => resp.json()).then(json => console.log(json))

}