// ;oad Api of AI Universe

const loadApi = () =>
{
   fetch("https://openapi.programming-hero.com/api/ai/tools")
   .then(response => response.json())
   .then(data => showApi(data.data.tools));
}


//show data
const showApi = (data) =>
{
   console.log(data)
}

loadApi();