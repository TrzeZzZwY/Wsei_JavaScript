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

    //Color picker
    const colorFieldset = document.createElement("fieldset");
    const colorLegend = document.createElement("legend");

    colorLegend.innerText = "Select a note color:";
    
    const orangeColor = CreateRadioElement("orangeColor","orange","colorPicker", true);
    const greenColor = CreateRadioElement("greenColor","green","colorPicker", false);
    const blueColor = CreateRadioElement("blueColor","blue","colorPicker", false);
    const redColor = CreateRadioElement("redColor","red","colorPicker", false);

    colorFieldset.appendChild(colorLegend);
    colorFieldset.appendChild(orangeColor);
    colorFieldset.appendChild(greenColor);
    colorFieldset.appendChild(blueColor);
    colorFieldset.appendChild(redColor);

    formContainder.appendChild(colorFieldset);

    //title input
    const titleDiv = document.createElement("div");
    titleDiv.setAttribute("id","noteTitleContainer");
    titleDiv.classList.add("container");

    const titleLabel = document.createElement("label");
    titleLabel.innerText = "Title: ";

    const titleInput = document.createElement("input");
    titleInput.setAttribute("id","noteTitle");
    
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);
    
    formContainder.appendChild(titleDiv);

    //type picker
    const typeFieldset = document.createElement("fieldset");
    const typeLegend = document.createElement("legend");
    typeLegend.innerText = "Select type";
    const textOption = CreateRadioElement("textOpton", "text", "typePicker", true);
    //const listOption = CreateRadioElement("listOption", "list", "typePicker", false); TODO
    
    typeFieldset.appendChild(typeLegend);
    typeFieldset.appendChild(textOption);
    //typeFieldset.appendChild(listOption);
    
    formContainder.appendChild(typeFieldset);

    const typeContainer = document.createElement("div");
    typeContainer.setAttribute("id","typeContainer");

    typeContainer.appendChild(CreateTextTypeFormElement());

    formContainder.appendChild(typeContainer);

    formContainder.addEventListener("submit", formSubmited);
    const form = document.querySelector("#form");

    form.appendChild(formContainder);
}

function CreateRadioElement(id,label,name,checked){
    const radioDiv = document.createElement("div");
    radioDiv.classList.add("container");
    const input = document.createElement("input");
    input.setAttribute("type","radio");
    input.setAttribute("id",id);
    input.setAttribute("name",name);
    input.setAttribute("value",id);
    input.checked = checked;
    const radioLabel = document.createElement("label");
    radioLabel.innerText = label;

    radioDiv.appendChild(input);
    radioDiv.appendChild(radioLabel);

    return radioDiv
}

function CreateTextTypeFormElement(){
    const textTypeContainer = document.createElement("div");
    //label
    const label = document.createElement("label");
    label.setAttribute("for","noteText");

    label.innerText = "Note: ";

    textTypeContainer.appendChild(label);

    //textarea
    const textarea = document.createElement("textarea");
    textarea.setAttribute("id","noteText");
    textarea.setAttribute("name","noteText");
    textarea.setAttribute("rows","6");
    textarea.setAttribute("cols","60");

    textarea.classList.add("textarea")

    textTypeContainer.appendChild(textarea);

    //submit
    const submit = document.createElement("button");
    submit.innerText = "Add note"
    //submit.setAttribute("type","submit");
    //submit.addEventListener("click",sendTextTypeForm);
    textTypeContainer.appendChild(submit);

    return textTypeContainer;
}


function formSubmited(e){
    e.preventDefault();
    const id = Date.now();
    const color = document.querySelector('input[name="colorPicker"]:checked').value;
    const title = document.querySelector("#noteTitle").value;
    const text = document.querySelector("#noteText").value;
    const dateRaw = new Date()
    const date = `${dateRaw.getFullYear()} ${dateRaw.getMonth() + 1} ${dateRaw.getDate()}`

    console.log(id);
    console.log(color);
    console.log(title);
    console.log(text);
    console.log(date);

    createTextNote(id,color,title,text,date);
}

function createTextNote(id, color, title, text, date){
    saveNote(id,color,title,text,date,"text",false);
}

function saveNote(id, color, title, text, date, type, isPinned){
    var notes = JSON.parse(localStorage.getItem("notes"));
    notes.push({
        id: id,
        color: color,
        title: title,
        text: text,
        date: date,
        type: type,
        isPinned: isPinned
    });
    localStorage.setItem("notes",JSON.stringify(notes));
    refreshPage();
}

function createHtmlTextNote(id,color, title, text, date, isPinned){
    const container = document.createElement("div");
    container.classList.add(color, "noteContainer");

    const notetitle = document.createElement("span");
    notetitle.innerText ="Title: " + title;
    if(isPinned){
        notetitle.innerText += " (pinned)";  
    }
    notetitle.classList.add("noteTitle")

    const noteText = document.createElement("span");
    noteText.innerText = text;
    noteText.classList.add("noteText")

    const noteDate = document.createElement("span");
    noteDate.innerText = "Date: " + date;
    noteDate.classList.add("noteDate")

    const pinBtn = document.createElement("button");
    pinBtn.innerText = "Pin";
    pinBtn.addEventListener("click", e => PinUnPin(id));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "delete";
    deleteBtn.addEventListener("click", e => deleteNote(id));

    container.appendChild(noteDate);
    container.appendChild(notetitle);
    container.appendChild(noteText);
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
                createHtmlTextNote(e.id,e.color,e.title,e.text,e.date, e.isPinned)
                );
        }
    })
    notes.forEach(e =>{
        if(e.isPinned == false){
            notesDivContainer.appendChild(
                createHtmlTextNote(e.id, e.color,e.title,e.text,e.date, e.isPinned)
                );
        }
    })
}