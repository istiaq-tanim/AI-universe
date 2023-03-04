// ;oad Api of AI Universe

let fetchData = [];
const loadApi = () => {
    fetch("https://openapi.programming-hero.com/api/ai/tools")
        .then(response => response.json())
        .then(data => {
            showApi(data.data.tools)
            fetchData = data.data.tools;
        });
    toggle(true);
}
//show data
const showApi = (data) => {


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
            let li = document.createElement("li");
            li.innerHTML =
                `
          ${value}
        `
            document.getElementById(item.id).appendChild(li);
        })

    });
    toggle(false)
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
    const { pricing, description, features, integrations, image_link, input_output_examples, accuracy } = data
    console.log(features, integrations)
    document.getElementById("card-1-title").innerText = description;
    if (pricing) {
        document.getElementById("price-1").innerHTML = `<p class="px-3 pt-3 fw-semibold">${pricing[0].price} <br> <span>${pricing[0].plan}</span></p>`
        document.getElementById("price-2").innerHTML = `<p class="px-3 pt-3 fw-semibold">${pricing[1].price} <br> <span>${pricing[1].plan}</span></p>`
        document.getElementById("price-3").innerHTML = `<p class="px-3 pt-3 fw-semibold">${pricing[2].price.split(" ").slice(0, 2).join(" ")} <br> <span>${pricing[2].plan}</span></p>`
    }

    else {
        document.getElementById("price-1").innerHTML = `<p class="px-3 pt-3 fw-semibold">"Free of Cost/Basic" </p>`
        document.getElementById("price-2").innerHTML = `<p class="px-3 pt-3 fw-semibold">"Free of Cost/Pro" </p>`
        document.getElementById("price-3").innerHTML = `<p class="px-3 pt-3 fw-semibold">"Free of Cost/Enterprise" </p>`
    }

    const featuresList = document.getElementById("features-list")
    featuresList.innerText = "";
    if (features) {
        for (let item in features) {
            const li = document.createElement("li");
            li.innerHTML = `
            ${features[item].feature_name}
            `
            featuresList.appendChild(li);
        }
    }
    else {
        featuresList.innerText = "No Data Found";
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

    document.getElementById("card-2").innerHTML = `
   <p class="h3"><span class="badge rounded-pill text-bg-danger badges">${accuracy.score ? accuracy.score * 100 + "%" + " accuracy" : ""}</span></p>
   <img src="${image_link[0]}" class="card-img-top rounded-5 p-2">
   <h5 class="text-center fw-bold">${input_output_examples ? input_output_examples[0].input : "Can you give any example?"}</h5>
   <p class="text-center p-1">${input_output_examples ? input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
   `
}


const toggle = (progress) => {
    if (progress) {
        document.getElementById("spinner").classList.remove("d-none");
    }
    else {
        document.getElementById("spinner").classList.add("d-none")
    }
}

const shortByDate = () => {
    // console.log(fetchData[0].published_in)
    let result = fetchData.sort((a, b) => new Date(a.published_in) - new Date(b.published_in))
    result.forEach((item) => console.log(item.published_in))
}