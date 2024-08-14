function carregar() {
  let data = new Date()
  let hora = data.getHours;

  if (hora >= 0 && hora < 12 ) { // manhã
    document.body.style.backgroundColor = '#569fff';
  } else if (hora >= 12 && hora <= 18) { //tarde
    document.body.style.backgroundColor = '#b69e51';
  } else { // noite
    document.body.style.backgroundColor = '#5f5f5f';
  }
}

carregar()

document.addEventListener("DOMContentLoaded", carregar)

document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault(); // previnir o comportamento padrão, não perde mais os dados digitados


  let input = document.querySelector("#searchInput").value;

  if (input !== "") {
    clearInfo();
    showWarning("Carregando...");

    let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=b1c38eaa114eb3ffc01b406de22a2527`);
    let json = await results.json();


   

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      clearInfo();
      showWarning("Não encontramos essa localização.");
    }
  } else {
    clearInfo();
  }
});

function showInfo(json) {
  showWarning("");

  document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
  document.querySelector(".tempInfo").innerHTML = `${json.temp}, <sup>ºC</sup> `;
  document.querySelector(".ventoInfo").innerHTML = `${json.windSpeed} <span>km/h</span>`;




  // seleionando img
  document
    .querySelector(".temp img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );

  // rotacionar vento
  document.querySelector(".ventoPonto").style.transform = `rotate(${
    json.windAngle - 90
  }deg)`;

  document.querySelector(".resultado").style.display = "block";
}

function clearInfo() {
  showWarning("");
  document.querySelector(".resultado").style.display = "none";
}

function showWarning(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}

