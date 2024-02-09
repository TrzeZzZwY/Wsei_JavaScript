const addNoteBtn = document.querySelector("#addNoteBtn");
const notesDivContainer = document.querySelector("#notes");

addNoteBtn.addEventListener("click",AddNewNoteForm);

if(localStorage.getItem("notes") == null){
    localStorage.setItem("notes", JSON.stringify(new Array()));
}

function AddNewNoteForm(){
    // on/off
    if(document.querySelector("#formContainer")) {
        document.querySelector("#formContainer").remove();
        return;
    };

    const formContainder = document.createElement("form");
    formContainder.classList.add("container");
    formContainder.setAttribute("id","formContainer");

    //City input
    const cityDiv = document.createElement("div");
    cityDiv.setAttribute("id","noteCityContainer");
    cityDiv.classList.add("container");

    const cityLabel = document.createElement("label");
    cityLabel.innerText = "City: ";

    const cityInput = document.createElement("input");
    cityInput.setAttribute("id","cityInput");
    
    cityDiv.appendChild(cityLabel);
    cityDiv.appendChild(cityInput);
    
    formContainder.appendChild(cityDiv);

    //submit
    const submit = document.createElement("button");
    submit.innerText = "Add note";
    formContainder.appendChild(submit);

    formContainder.addEventListener("submit", formSubmited);
    const form = document.querySelector("#form");

    form.appendChild(formContainder);
}

function formSubmited(e){
    e.preventDefault();
    const id = Date.now();

    //Get City from form
    const city = e.target.querySelector('input[id="cityInput"]').value;
    //Check if request is in cache 

    // if not request data for city
    getWeatherFor(city).then(
        (weather) =>{
            trySaveNote(id,city,weather,false);
        } 
    );
}

function trySaveNote(id, city, weather, isPinned){
    var notes = JSON.parse(localStorage.getItem("notes"));

    if(notes.length >= 10 || notes.some(e => e.city == city)) return; 

    notes.push({
        id: id,
        city: city,
        weather: weather,
        isPinned: isPinned
    });
    localStorage.setItem("notes",JSON.stringify(notes));
    console.log(JSON.stringify(notes));
    refreshPage();
}


function saveNote(id, city, weather, isPinned){
    var notes = JSON.parse(localStorage.getItem("notes"));
    notes.push({
        id: id,
        city: city,
        weather: weather,
        isPinned: isPinned
    });
    localStorage.setItem("notes",JSON.stringify(notes));
    console.log(JSON.stringify(notes));
    refreshPage();
}

function createHtmlTextNote(id,city, weather, isPinned){
    console.dir(weather);
    const container = document.createElement("div");
    const notetitle = document.createElement("span");
    notetitle.innerText ="City: " + city;
    if(isPinned){
        notetitle.innerText += " (pinned)";  
    }
    notetitle.classList.add("noteTitle")

    const weatherContainer = document.createElement("div");

    const temp = document.createElement("div");
    temp.innerText = `Temp: ${weather.main.temp} C`;
    temp.classList.add("noteTitle")

    const humidity = document.createElement("div");
    humidity.innerText = `Humidity: ${weather.main.humidity}`;
    humidity.classList.add("noteTitle")

    const image = document.createElement("img");
    getWeatherImage(weather.weather[0].icon).then(
        (imageBlob) =>{
            const imageObjectURL = URL.createObjectURL(imageBlob);
            image.src = imageObjectURL;
        }
    )
    
    image.classList.add("noteTitle")

    weatherContainer.appendChild(temp);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(image);

    const pinBtn = document.createElement("button");
    pinBtn.innerText = "Pin";
    pinBtn.addEventListener("click", e => PinUnPin(id));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "delete";
    deleteBtn.addEventListener("click", e => deleteNote(id));

    container.appendChild(notetitle);
    container.appendChild(weatherContainer);
    container.appendChild(pinBtn);
    container.appendChild(deleteBtn);
    return container;
}

function deleteNote(id){
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes = notes.filter(e => e.id != id);
    localStorage.setItem("notes",JSON.stringify(notes));
    refreshPage();
}

function PinUnPin(id){
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes = notes.map(e => {
        if(e.id == id){
            e.isPinned = !e.isPinned;
        }
        return e;
    });
    localStorage.setItem("notes",JSON.stringify(notes));
    refreshPage();
}

function refreshPage(){
    notesDivContainer.innerHTML = ''; // clear all notes;
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.forEach(e =>{
        if(e.isPinned == true){
            notesDivContainer.appendChild(
                createHtmlTextNote(e.id,e.city,e.weather, e.isPinned)
                );
        }
    })
    notes.forEach(e =>{
        if(e.isPinned == false){
            notesDivContainer.appendChild(
                createHtmlTextNote(e.id,e.city,e.weather, e.isPinned)
                );
        }
    })
}

const getWeatherFor = async (city) =>{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3de4ae2a7e7e0bbb5218dc4ae38cfce&units=metric`);
    if (response.ok) {
        return response.json();
      }
      throw new Error('API request failed');
    };

const getWeatherImage = async (code) =>{
    console.log(code);
    const response = await fetch(`https://openweathermap.org/img/wn/${code}@2x.png`);
    if (response.ok) {
        return response.blob();
      }
      throw new Error('API request failed');
    };

refreshPage();