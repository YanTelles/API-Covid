const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const token="b29d76b4f8e10e8e4dac241113cbb1caf20fc8c4";

const filters = {state: "TO", is_last: "False"}; 

const url=`https://api.brasil.io/v1/dataset/covid19/caso/data?state=${filters.state}&is_last=${filters.is_last}`

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

fetch(
  url,
  {
    method: 'get',
    headers: {
      Authorization: `Token ${token}`,
    },  
  }

).then(res => res.json())
.then(function(resposta){
    console.log(resposta.results[0])


    let taxa = resposta.results[0].death_rate;
    document.querySelector('#taxa').innerHTML = (taxa.toFixed(2)*100)+'%';  

    let confirmados = resposta.results[0].confirmed;
    document.querySelector('#confirmados').innerHTML = confirmados;

    let population = resposta.results[0].estimated_population;
    document.querySelector('#populacao').innerHTML = population;

    let fatalidades = resposta.results[0].deaths;
    document.querySelector('#fatalidades').innerHTML = fatalidades;

    let data = resposta.results[0].date;
    document.querySelector('#data').innerHTML = data;
});


