//fill in select

async function getCountries() {

  try {
    const response = await fetch('https://restcountries.com/v2/all');
    const result = await response.json();

    //формирует select
    createCountriesList(result);
  }
  catch (err) {
    alert("Sorry! Service is not available at the moment");
  }

}
getCountries();

let capital;
//формирует select
function createCountriesList(allCountries) {
  let select = document.getElementById("countries");
  allCountries.forEach(country => {
    select.appendChild(createOption(country));
  });
  select.addEventListener("change", (e) => {
    let capital = e.target.value;
    loadWheather(capital);

  })
}

//формирует options для select 

function createOption(country) {
  let option = new Option();

  let keys = Object.keys(country);
  for (let key of keys) {
    if (key == "name") {
      option.text = country[key];
    }
    if (key == "capital") {
      option.value = country[key];
    }

  }
  return option;
}


//загружает данные о погоде по API

async function loadWheather(capital) {

  if (typeof (capital) == "undefined") return;
  const headers = new Headers();
  headers.append("X-Api-Key", "PN1PYHjxhIMh/GrWS17oOg==MCVCJxRfhexqXeMY");
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

  if (capital != 0) {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/weather?city=${capital}`, requestOptions);

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      createWeatherCard(result, capital);
    }
    catch (err) {
      return;
    }
  }
}

//отображение данных о погоде для выбранного города
function createWeatherCard(weather, capital) {

  clear();
  let capitalCity = capital;
  document.getElementById("cityName").innerText = "Capital city: " + capitalCity;


  let divTemp = document.getElementById("currentWeather");
  node = document.createTextNode(weather["temp"] + "°C")
  divTemp.appendChild(node);

  let clouds = weather["cloud_pct"];
  let image = document.createElement("img");

  if (clouds > 80) {
    image.setAttribute(
      'src',
      'assets/sunny.png',
    );
    image.setAttribute(
      'alt',
      'sunny weather',
    );
  }
  else if (clouds >= 40 && clouds <= 80) {
    image.setAttribute(
      'src',
      'assets/partly-cloudy.png',
    );
    image.setAttribute(
      'alt',
      'partly cloudy',
    );
  }
  else if (clouds < 40) {
    image.setAttribute(
      'src',
      'assets/cloudy-day.png',
    );
    image.setAttribute(
      'alt',
      'partly cloudy',
    );
  }
  divTemp.appendChild(image);

  let divFeelsLike = document.getElementById("feelsLike");
  node = document.createTextNode("Feels like: " + weather["feels_like"] + "°C");
  divFeelsLike.appendChild(node);

  let divHumidity = document.getElementById("humidity");

  node = document.createTextNode("Humidity: " + weather["humidity"] + "%");
  divHumidity.appendChild(node);

}

function clear() {
  document.getElementById("cityName").innerText = " ";
  document.getElementById("currentWeather").innerText = " ";
  document.getElementById("feelsLike").innerText = " ";
  document.getElementById("humidity").innerText = " ";
}




