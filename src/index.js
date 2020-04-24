let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  function createToyCard(toy) {
    const card = document.createElement("DIV")
    card.classList.add("card")
    toyCollection.appendChild(card)
    const name = document.createElement("H2")
    name.innerText = toy.name 
    card.appendChild(name)
    const toyAvatar = document.createElement("IMG")
    toyAvatar.classList.add("toy-avatar")
    toyAvatar.src = toy.image
    card.appendChild(toyAvatar)
    const likes = document.createElement("P")
    likes.innerText = `Likes: ${toy.likes}`
    card.appendChild(likes)
    const button = document.createElement("BUTTON")
    button.classList.add("like-btn")
    button.innerText = "Like"
    card.appendChild(button)
    button.addEventListener("click", function() {
     
     
      let configObject = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }, 
        body: JSON.stringify({
          "likes": toy.likes+1
        })
      }
      fetch(`http://localhost:3000/toys/${toy.id}`, configObject)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          console.log(json)
          likes.innerText = `Likes: ${json.likes}`
        })
      event.preventDefault()
    })
  }
  const toyCollection = document.querySelector("#toy-collection")
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      
      for (const toy of json) {
        createToyCard(toy)
      }
    })
    const submit = document.querySelector(".submit")
    
    submit.addEventListener("click", function() {
      const formName = document.querySelector(".input-text")
      const formAvatar = document.querySelector(".input-avatar")
      const formData = {
        name: formName.value,
        image: formAvatar.value,
        likes: 0

      };
      const confObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      }
      fetch("http://localhost:3000/toys", confObject)
        .then(function(response) {
          return response.json()
        })
        .then(function(toy) {
          console.log(toy)
          createToyCard(toy)
        })
      event.preventDefault()
    })
});
