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

  const toyCollection = document.getElementById('toy-collection');

  function getToys(){
    fetch("http://localhost:3000/toys")
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        console.log(json);
        for (const element of json){
          console.log(element);
          addToyCard(element);
        };
      });
  };
  
  function addToyCard(obj){
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const title = document.createElement('h2');
    title.innerText = obj.name;
    card.appendChild(title);

    const img = document.createElement('img');
    img.setAttribute('src', obj.image);
    img.setAttribute('class', 'toy-avatar');
    card.appendChild(img);

    const likes = document.createElement('p');
    likes.innerText = `${obj.likes} Likes`;
    card.appendChild(likes);

    const likeBtn = document.createElement('button');
    likeBtn.setAttribute('class', 'like-btn');
    likeBtn.innerText = 'Like <3';
    card.appendChild(likeBtn);
    likeBtn.addEventListener('click', function(event){
      event.preventDefault;
      addLike(obj);
      likes.innerText = `${obj.likes + 1} Likes`;
    })

    toyCollection.appendChild(card);
  };

  function addLike(obj){
  
    const configObj = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        'name': obj.name,
        'image': obj.image,
        'likes': obj.likes + 1
      })
    }

    return fetch(`http://localhost:3000/toys/${obj.id}`, configObj)
      .then(function(response){
        return response.json()
      })
      .then(function(json){
        console.log(json)
      })
      .catch(function(error){
        console.log(error.message);
      });
  };

  getToys();

  function postToy(){
    const newToyObj = {
      name: document.querySelector('input[name="name"]').value,
      image: document.querySelector('input[name="image"]').value,
      likes: 0
    };
    const configObj = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newToyObj)
    };
    fetch("http://localhost:3000/toys", configObj)
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        console.log(json);
      })
      .catch(function(error){
        console.log(error.message);
      });
  };

  const submitButton = document.querySelector('input[name="submit"]');
  submitButton.addEventListener('click', function(event){
    event.preventDefault;
    postToy();
  });



});
