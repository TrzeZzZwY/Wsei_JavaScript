const addNoteBtn = document.querySelector("#addNoteBtn");
const notesDivContainer = document.querySelector("#notes");

addNoteBtn.addEventListener("click",AddNewNoteForm);

if(localStorage.getItem("notes") == null){
    localStorage.setItem("notes", JSON.stringify(new Array()));
}

refreshPage();

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
    const weather = getWeatherFor(city);

    console.log(weather);
    createTextNote(id,city,weather);
}

function createTextNote(id, city, weather){
    saveNote(id,city,weather,false);
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
    refreshPage();
}

function createHtmlTextNote(id,city, weather, isPinned){
    const container = document.createElement("div");

    const notetitle = document.createElement("span");
    notetitle.innerText ="City: " + city;
    if(isPinned){
        notetitle.innerText += " (pinned)";  
    }
    notetitle.classList.add("noteTitle")

    const pinBtn = document.createElement("button");
    pinBtn.innerText = "Pin";
    pinBtn.addEventListener("click", e => PinUnPin(id));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "delete";
    deleteBtn.addEventListener("click", e => deleteNote(id));

    container.appendChild(notetitle);
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

function getWeatherFor(city){
    fetch(`https://samples.openweathermap.org/data/2.5/weather?q=London&appid=a3de4ae2a7e7e0bbb5218dc4ae38cfce`)
  .then(response => {
    if (response.ok) {
      return response.json(); // Parse the response data as JSON
    } else {
      throw new Error('API request failed');
    }
  })
  .then(data => {
    // Process the response data here
    console.log(data); // Example: Logging the data to the console
  })
  .catch(error => {
    // Handle any errors here
    console.error(error); // Example: Logging the error to the console
  });
}