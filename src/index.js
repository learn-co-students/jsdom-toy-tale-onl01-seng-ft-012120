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

  function fetchToys() {
    return fetch("http://127.0.0.1:3000/toys")
    .then(resp => resp.json())
    .then(json => addCards(json));
  }

  function addCards(json) {
    const div = document.getElementById("toy-collection");
    let toy = {};
    for (toy of json) {
      const card = document.createElement("div");
      card.setAttribute('class', 'card');
      
      const name = document.createElement("h2");
      name.innerText = toy.name;
      
      const pic = document.createElement("img");
      pic.setAttribute('src', toy.image);
      pic.setAttribute('class', 'toy-avatar');
      
      const like = document.createElement("p");
      like.innerText = `${toy.likes}`;


      const button = document.createElement("button");
      button.innerText = "Like";
      button.setAttribute('class', 'like-btn');
      
      button.addEventListener("click", (event) => {
        
          let likesCounter = parseInt(event.target.previousSibling.innerText)+1;
          const url = `http://127.0.0.1:3000/toys/${event.target.id}`;
          
          fetch(url, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
            "likes": likesCounter
            })
          }).then(response=>{
            response.json()
          }).then(likeObj => {
            event.target.previousElementSibling.innerText = `${likesCounter}`
          })});


      card.appendChild(name);
      card.appendChild(pic);
      card.appendChild(like);
      card.appendChild(button);
      div.appendChild(card);
    }
  }

  fetchToys();

  // Adding new toy

const newToy = document.getElementsByClassName("submit")[0];
  newToy.addEventListener("click", function() {
    const name = document.getElementsByClassName("input-text")[0].value;
    const image = document.getElementsByClassName("input-text")[1].value;
    submitToy(name, image);
  });


function submitToy(name, image, likes = "0") {
  let formData = {
      name: name,
      image: image,
      likes: likes
  }; 

  let configObj = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(formData)
  };

  fetch("http://127.0.0.1:3000/toys", configObj)
  .then(function(response) {
      return response.json();
  })
  .then(function(object) {
    const div = document.getElementById("toy-collection");
    const card = document.createElement("div");
    card.setAttribute('class', 'card');
    
    const name = document.createElement("h2");
    name.innerText = object.name;
    
    const pic = document.createElement("img");
    pic.setAttribute('src', object.image);
    pic.setAttribute('class', 'toy-avatar');
    
    const like = document.createElement("p");
    like.innerText = `${object.likes}`;


    const button = document.createElement("button");
    button.innerText = "Like";
    button.setAttribute('class', 'like-btn');

    card.appendChild(name);
    card.appendChild(pic);
    card.appendChild(like);
    card.appendChild(button);
    div.appendChild(card);
  
  })
  
}

// Like Buttons

// let buttons = {};
// buttons = document.getElementsByClassName("like-btn");
// console.log(buttons[0]);

 
  //   button.addEventListener("click", event => {
  //     let likesCounter = parseInt(event.target.previousSibling.innerText)+1;
  //     console.log(event.target.id)
  //     const url = `http://127.0.0.1:3000/toys/${event.target.id}`;
  //   fetch(url,{
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //   body: JSON.stringify({
  //     "likes": likesCounter
  //   })
  //   }).then(response=>{
  //     response.json()
  //   }).then(likeObj => {
  //     e.target.previousElementSibling.innerText = `${likesCounter} likes`
  //   })});
  // 
  
});