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
});
PATCH http://localhost:3000/toys/:id
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
}
 
body: JSON.stringify({
  "likes": <new number>
})