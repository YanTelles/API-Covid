const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const button = document.getElementById('btn');

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

document.getElementById('btn').addEventListener('click', function(event) {
  event.preventDefault();
  let city = document.getElementById('city').value;
  let cityConverted = PrimeiraMaiuscula(city);
  let state = document.getElementById('estados').value;
  let is_last = 'True'; 
  const url=`https://api.brasil.io/v1/dataset/covid19/caso/data?state=${state}&city=${cityConverted}&is_last=${is_last}`;
  const token='b29d76b4f8e10e8e4dac241113cbb1caf20fc8c4';

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
    
    console.log(resposta);

    let taxa = resposta.results[0].death_rate;
    document.querySelector('#taxa').innerHTML = (taxa.toFixed(2)*100)+'%';  

    let confirmados = resposta.results[0].confirmed;
    document.querySelector('#confirmados').innerHTML = confirmados.toLocaleString('pt-BR');

    let population = resposta.results[0].estimated_population;
    document.querySelector('#populacao').innerHTML = population.toLocaleString('pt-BR');

    let fatalidades = resposta.results[0].deaths;
    document.querySelector('#fatalidades').innerHTML = fatalidades.toLocaleString('pt-BR');

    let data = resposta.results[0].date;
    document.querySelector('#data').innerHTML = data;

    let city = resposta.results[0].city;
    document.querySelector('#resumo').innerHTML = `Resumo ${city}`;

  }); 
});

function PrimeiraMaiuscula(texto) {
  var substituto = texto.toLowerCase().replace(/(?:^|\s)\S/g, function(PrimeiraLetra) { return PrimeiraLetra.toUpperCase(); });
  return substituto;
}

