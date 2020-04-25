let addToy = false;
let toyCollection = document.querySelector('#toy-collection');

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      let toyForm = document.querySelector('.add-toy-form');

      toyForm.addEventListener("submit", function(e){
        let formData = {
          name: toyForm[0].value,
          image: toyForm[1].value,
          likes: 0
        };
        console.log(formData);
        e.preventDefault;
        postToy(formData);
      });
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//fetch the toys and use create div function to show the toys.
function fetchToys() {
  return fetch("http://localhost:3000/toys")
  .then (resp => resp.json())
  .then (res => {
    // toy.forEach(toy => createDiv(toy))
    // console.log(res);
    for (let i=0; i<res.length; i++) {
       console.log(res[i]);
      createDiv(res[i])
      
    };
  })
};
//creates div card and all elements in div for toy object.
function createDiv(object) {
  let toyCollection = document.querySelector('#toy-collection');
  let div = document.createElement('div');
  div.class = "card"; 
  div.id = `${object.id}`;

  let h2 = document.createElement('h2');
  h2.innerHTML = object["name"];
  div.appendChild(h2);

  let img = document.createElement('img');
  img.src = object["image"];
  img.class = "toy-avatar";
  div.appendChild(img);

  let p = document.createElement('p');
  p.innerText = `${object["likes"]} Likes`;

  let button = document.createElement('button');
  button.innerHTML = "Like <3";
  button.class  = "like-btn";
  
  p.appendChild(button);
  likeToy(button);
  div.appendChild(p);


  toyCollection.appendChild(div);

};


function postToy(formData) {
  return fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify (
      {
      "name": formData.name,
      "image": formData.image,
      "likes": formData.likes
    })
  })
  .then (function(response) {
    return response.json();
  })
  .then (function(object) {
    createDiv(object);
  })
  .catch (function(error) {
    // alert("error");
    console.log(error.message);
  })
};

function likeToy(element) {
  element.addEventListener("click", function(e) {
    let p = e.target.parentNode;
    let likes = p.innerHTML.split(" "); 
    let likeCount = parseInt(likes[0]);
    // console.log(likeCount);
    // first conditionally increase the likes on the page.... 
    //the button disappears when you click like... is that ok? what is doing that
    likeCount++;
    p.innerHTML = `${likeCount} Likes`;
    let divId = p.parentNode.id;
    // console.log(`divId is ${divId}`);
    //next, make a fetch patch request:
    fetch(`http://localhost:3000/toys/${divId}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": likeCount
      })
    })
      .then (response => {
        response.json()
      }).then(res =>{
        console.log(res)
      }).catch(error => {
        console.log(error.message)
      })
  


  });
};

