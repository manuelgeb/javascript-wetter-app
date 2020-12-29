window.addEventListener("load", () => {
    console.log("load event gefeuert")
    holeWetterDaten()
})


function holeWetterDaten() {
    if (navigator.geolocation) {
        console.log("geo daten gefunden")
        navigator.geolocation.getCurrentPosition(position => {
            let long, lat;
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log("long", long)
            console.log("lat", lat)
            let key = "9102c58a918f4eae94b7fc861a99a0ce"
            let url = `https://api.weatherbit.io/v2.0/current?lon=${long}&lat=${lat}&key=${key}&lang=de`
            console.log("url", url)
            fetch(url, { "method": "GET" })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log("data", data)

                    let stadt = document.querySelector('.stadt h1')
                    stadt.innerHTML = data.data[0].city_name;
                    let zeitzone = document.querySelector('.zeitzone h1')
                    zeitzone.innerHTML = data.data[0].timezone;
                    let temperatur = document.querySelector('.wetter .temperatur h2')
                    temperatur.innerHTML = data.data[0].temp;
                    let wetter = document.querySelector('.wetter .wettertext')
                    wetter.innerHTML = data.data[0].weather.description;

                    let bild = document.querySelector('.wetterbild')
                    let iconcode = data.data[0].weather.icon
                    bild.setAttribute("src", `https://www.weatherbit.io/static/img/icons/${iconcode}.png`)

                })
        })
    } else { console.log("geo daten nicht gefunden") }
}