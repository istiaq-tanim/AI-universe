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
    if (data.length > 6) {
        processData(data.slice(0, 6))
        document.getElementById("showAll").classList.remove("d-none");
    }
}
const processData = (data) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""
    data.forEach(item => {
        const card = document.createElement("div");
        const { name, published_in, id, image } = item
        card.classList.add("col");
        card.innerHTML = `
    <div class="card h-100">
    <img src="${image}" class="card-img-top h-100 rounded-5 py-2 px-3" alt="...">
    <div class="card-body">
    <h5 class="card-title fw-bold">Features</h5>
    <div class="text-secondary">
     <ol id="${id}"></ol> 
    </div>
    <hr>
    <div>
      <h5 class="fw-bold">${name}</h5>
    </div>

    <div class="d-flex justify-content-between">
       <div class="d-flex gap-2">
       <i class="fa-solid fa-calendar-days pt-1"></i>
       <p>${published_in}</p>
       </div>
       <i onclick="showDetails('${id}')" class="fa-solid fa-arrow-right text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal""></i>
      </button>
    </div>
    </div>
    </div>
   `
        cardContainer.appendChild(card);
        item.features.map((value) => {
            console.log(value)
            let li = document.createElement("li");
            li.innerHTML =
                `
          ${value}
        `
            document.getElementById(item.id).appendChild(li);
        })



    });

}
document.getElementById("show-btn").addEventListener("click", function () {
    fetch("https://openapi.programming-hero.com/api/ai/tools")
        .then(response => response.json())
        .then(data => processData(data.data.tools));
    document.getElementById("showAll").classList.add("d-none");
})

const showDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showSingleDetails(data.data))
}

const showSingleDetails = (data) => {
    console.log(data)
    const { pricing, description, features, integrations,image_link} = data
    console.log(pricing)
    document.getElementById("card-1-title").innerText = description;
    if (pricing) {
        document.getElementById("price-1").innerHTML = `<p class="px-3 pt-3 fw-semibold">${pricing[0].price == "No cost" || pricing[0].price == "0" ? "Free of Cost/Basic" : pricing[0].price} <span>${pricing[0].plan}</span></p>`
        document.getElementById("price-2").innerHTML = `<p class="px-3 pt-3 fw-semibold">${pricing[1].price == "No cost" || pricing[1].price == "0" ? "Free of Cost/Basic" : pricing[1].price} <span>${pricing[1].plan}</span></p>`
        document.getElementById("price-3").innerHTML = `<p class="px-3 pt-3 fw-semibold">${pricing[2].price == "No cost" ? "Free of Cost/Basic" : pricing[2].price.split(" ").slice(0, 2).join(" ")} <span>${pricing[2].plan}</span></p>`
    }

    else
    {
        document.getElementById("price-1").innerHTML = `<p class="px-3 pt-3 fw-semibold">"Free of Cost/Basic" </p>`
        document.getElementById("price-2").innerHTML = `<p class="px-3 pt-3 fw-semibold">"Free of Cost/Basic" </p>`
        document.getElementById("price-3").innerHTML = `<p class="px-3 pt-3 fw-semibold">"Free of Cost/Basic" </p>`
    }

    const integrationList = document.getElementById("integrations-list");
    integrationList.innerText = "";
    if (integrations) {
        for (const integration of integrations) {
            const li = document.createElement("li");
            li.innerHTML = `
            ${integration}
            `
            integrationList.appendChild(li)
        }
    }
    else {
        integrationList.innerText = "No Data Found";
    }

   document.getElementById("card-2").innerHTML=`
   <img src="${image_link[0]}" class="card-img-top rounded-5 p-5" alt="...">
   `

}


