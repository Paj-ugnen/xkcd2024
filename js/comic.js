let maxComic = 0;
let currentComic = 0;

window.onload = function(){
    //hämta senaste comic
    getComic('latest');
    //sätter funktionalitet för nav knappar
    document.getElementById('first').addEventListener('click', function() {
        if (currentComic != 1) {
            getComic(1);
        }
    });
    document.getElementById('prev').addEventListener('click', function() {
        if (currentComic > 1) {
            getComic(currentComic - 1);
        }
    });
    document.getElementById('random').addEventListener('click', function() {
        let randomComic = Math.floor(Math.random() * maxComic) + 1;
        getComic(randomComic);
    });    
    document.getElementById('next').addEventListener('click', function() {
        if (currentComic < maxComic) {
            getComic(currentComic + 1);
        }
    });
    document.getElementById('last').addEventListener('click', function() {
        getComic('latest');
    });

}

function getComic(which) {
    // Hämta (fetch) data från xkcd api
    fetch("https://xkcd.vercel.app/?comic=" + which)
        .then(function (response) {
            // Kolla om svaret är ok (200)
            if (response.status === 200) {
                return response.json();
            } else {
                // Kasta ett felmeddelande om status inte är ok
                throw new Error("Failed to load comic");
            }
        })
        .then(function (data) {
            // Uppdatera maxComic värde om det är den senaste serietidningen
            if (which === 'latest') {
                maxComic = data.num;
            }
            currentComic = data.num;
            // Skicka json data för behandling till DOM
            appendComic(data);
        })
        .catch(function (error) {
            // Logga eventuella errors
            console.log('Error: ', error);
        });
}

function appendComic(data) {
    const comicContainer = document.getElementById('comic');
    comicContainer.innerHTML = "";
    
    let title = document.createElement('h2');
    title.innerHTML = data.title;
    comicContainer.append(title);

    let date = document.createElement('p');
    date.innerHTML = new Date(data.year, data.month - 1, data.day).toDateString();
    comicContainer.append(date);


       //Skapar och lägger till bilden samt en caption
    // till dokumentet inom ett figure element
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    img.src=data.img;
    let cap = document.createElement('figcaption');
    cap.innerHTML = "Nummer: "+data.num;
    figure.appendChild(img);
    figure.appendChild(cap);
    comicContainer.appendChild(figure);

    //Uppdaterar nuvarande comic nummer
    currentComic=data.num;
}
