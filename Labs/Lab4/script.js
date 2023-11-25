const addNoteBtn = document.querySelector("#addNoteBtn");

let notes = new Array();
let pinNotes = new Array();
//lokal storage vs session storage 
addNoteBtn.addEventListener("click",AddNewNoteForm);

notes.addEventListener("onChange", AddNewNoteForm);

/*
<div>
    <fieldset>
        <legend>Select a note color:</legend>

        <div>
            <input type="radio" id="orangeColor" name="colorPicker" value="orangeColor" checked />
            <label for="orangeColor">Orange</label>
        </div>

        <div>
            <input type="radio" id="blueColor" name="colorPicker" value="blueColor" />
            <label for="blueColor">Blue</label>
        </div>

        <div>
            <input type="radio" id="greenColor" name="colorPicker" value="greenColor" />
            <label for="greenColor">Green</label>
        </div>

        <div>
            <input type="radio" id="redColor" name="colorPicker" value="redColor" />
            <label for="redColor">Red</label>
        </div>
    </fieldset>

    <div>
        <label for="noteTitle">Title</label>
        <input type="text" id="noteTitle" />
    </div>
    <fieldset>
        <legend>Select a note type:</legend>

        <div>
            <input type="radio" id="textNoteOption" name="typePicker" value="textNoteOption" checked />
            <label for="textNoteOption">Text</label>
        </div>

        <div>
            <input type="radio" id="listNoteoption" name="typePicker" value="listNoteoption" />
            <label for="listNoteoption">CheckList</label>
        </div>
    </fieldset>

    if(text)
    <div>
        <label for="noteText">Red</label>
        <textarea id="noteText" name="noteText" rows="6" cols="60">
        </textarea>

        <button> submit </button>
    </div>
    else
    <div>
        <button> AddNote </button>

        <div>
            <label for="checkOptionName">Red</label>
            <input type="text" id="checkOptionName" />
        </div>

        <button> submit </button>
    </div>
</div>
*/
function AddNewNoteForm(){
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
    const listOption = CreateRadioElement("listOption", "list", "typePicker", false);
    
    typeFieldset.appendChild(typeLegend);
    typeFieldset.appendChild(textOption);
    typeFieldset.appendChild(listOption);
    
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
    const color = document.querySelector('input[name="colorPicker"]:checked').value;
    const title = document.querySelector("#noteTitle").value;
    const text = document.querySelector("#noteText").value;
    const dateRaw = new Date()
    const date = `${dateRaw.getFullYear()} ${dateRaw.getMonth() + 1} ${dateRaw.getDay()}`
    console.log(color);
    console.log(title);
    console.log(text);
    console.log(date);

    createTextNote(color,title,text,date);
}

function createTextNote(color, title, text, date){
    saveNote(color,title,text,date,"text");
    const htmlNote = createHtmlTextNote(color,title,text,date);
    notes.push(htmlNote);
}

function saveNote(color, title, text, date, type){
    
}

function createHtmlTextNote(color, title, text, date){
    const container = document.createElement("div");
    container.classList.add(color)

    const notetitle = document.createElement("span");
    notetitle.innerText = title;

    const noteText = document.createElement("span");
    noteText.innerText = text;

    const noteDate = document.createElement("span");
    noteDate.innerText = date;

    return container;
}