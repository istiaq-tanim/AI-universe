// ;oad Api of AI Universe
const loadApi = () => {
    fetch("https://openapi.programming-hero.com/api/ai/tools")
        .then(response => response.json())
        .then(data => showApi(data.data.tools));
}

loadApi();
//show data
const showApi = (data) => {
    console.log(data);
    if(data.length>6)
    {
        processData(data.slice(0,6))
        document.getElementById("showAll").classList.remove("d-none");
    }
}
const processData = (data) =>
{
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML=""
    data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("col");
        card.innerHTML = `
    <div class="card h-100">
    <img src="${item.image}" class="card-img-top h-100 rounded-5 py-2 px-3" alt="...">
    <div class="card-body">
    <h5 class="card-title fw-bold">Features</h5>
    <div class="text-secondary">

     <ol>
     <li>${item.features[0]}</li>
     <li>${item.features[1]}</li>
     <li>${item.features[2]}</li> 
     </ol>
    </div>
    <hr>
   
    <div>
      <h5 class="fw-bold">${item.name}</h5>
    </div>

    <div class="d-flex justify-content-between">
       <div class="d-flex gap-2">
       <i class="fa-solid fa-calendar-days pt-1"></i>
       <p>${item.published_in}</p>
       </div>
       <i class="fa-solid fa-arrow-right text-danger"></i>
    </div>
    </div>
    </div>
   `
    cardContainer.appendChild(card);
    });
}
document.getElementById("show-btn").addEventListener("click",function(){
    fetch("https://openapi.programming-hero.com/api/ai/tools")
        .then(response => response.json())
        .then(data => processData(data.data.tools));
    document.getElementById("showAll").classList.add("d-none");
})

