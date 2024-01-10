const sounds = Array.from(document.querySelectorAll("audio"));
const addTrackBtn = document.querySelector("#addBtn");
const playAllBtn = document.querySelector("#playAllBtn");
const playSelectedBtn = document.querySelector("#playSelectedBtn");
const playAllLoopBtn = document.querySelector("#playAllLoopBtn");
const playSelectedLoopBtn = document.querySelector("#playSelectedLoopBtn");

let nextIndex = 0;
let tracks = [];
let metronomeTimer = null;
let loopTimer = null;
let isLooped = false;

addTrackBtn.addEventListener("click", addTrack);
playAllBtn.addEventListener("click", playAllSounds);
playSelectedBtn.addEventListener("click", playSelectedSounds);

playAllLoopBtn.addEventListener("click", playAllSoundsLoop);
playSelectedLoopBtn.addEventListener("click", playSelectedSoundsLoop);

function onKeyDown(event, index) {
    let key = Number.parseInt(event.key);
    if (isNaN(key) || key > 8 || key == 0) return;

    let sound = sounds[key - 1];
    sound.currentTime = 0;
    sound.play();

    tracks[index].record.push(
        {
            sound: sound,
            time: event.timeStamp
        });
}

function recordSounds(index) {
    tracks[index].record = [];
    function handleRecording(event) {
        onKeyDown(event, index);
    }
    document.addEventListener("keypress", handleRecording);

    const clock = document.querySelector(`#c${index}`);
    let i = 0;
    let countTime = setInterval(() => {
        clock.innerText = `Time: ${i++}`;
    }, 1000)

    setTimeout(() => {
        document.removeEventListener("keypress", handleRecording);
        clearInterval(countTime);
        clock.innerText = `Time:`;
    }, 5000);

}

async function playSound(index) {
    let track = tracks[index].record;

    console.dir(track);
    let startTime;
    for (let i = 0; i < track.length; i++) {
        if (i == 0) {
            track[i].sound.play();
            startTime = track[i].time;
        }
        else {
            let delay = track[i].time - startTime;
            setTimeout(() => {
                track[i].sound.play()
            }, delay);
        }
    }
}

function playAllSoundsLoop() {
    isLooped = !isLooped;
    console.log(isLooped + " is looped")
    clearInterval(metronomeTimer);
    if(isLooped){
        metronomeTimer = setInterval(function() {
            playAllSounds();
            console.log("test");
            }, 5000);
        }
}

function playSelectedSoundsLoop() {
    isLooped = !isLooped;
    clearInterval(metronomeTimer);
    if(isLooped){
        metronomeTimer = setInterval(function() {
            playSelectedSounds();
            }, 5000);
        }
}


function playAllSounds() {
    tracks.forEach((t, i) => playSound(i))
}
function playSelectedSounds() {
    tracks.forEach((t, i) =>{
        console.log(t.isSelected);
         if(t.isSelected){
            playSound(i)
         }
        })
}

function addTrack() {
    let track = {
        index: nextIndex++,
        record: [],
        isSelected: false
    }
    addTrackHtml(track);

    tracks.push(track);
}

function addTrackHtml(track) {
    const recorderDiv = document.createElement("div");
    const clockDiv = document.createElement("div");
    const recordBtn = document.createElement("button");
    const playBtn = document.createElement("button");
    const checkBox = document.createElement("input"); 
    const deletedBtn = document.createElement("button");

    const recorderContainer = document.querySelector("#container");

    recorderDiv.setAttribute("id", `r${track.index}`);
    recorderDiv.classList.add("recorder");

    clockDiv.setAttribute("id", `c${track.index}`);
    clockDiv.innerText = "Time:";
    clockDiv.classList.add("clock");

    recordBtn.setAttribute("data-id", track.index);
    recordBtn.innerText = "Record";
    recordBtn.classList.add("btn");
    recordBtn.addEventListener("click", e => recordSounds(e.target.dataset.id));

    playBtn.setAttribute("data-id", track.index);
    playBtn.innerText = "Play";
    playBtn.classList.add("btn", "btn-play");
    playBtn.addEventListener("click", e => playSound(e.target.dataset.id));

    deletedBtn.setAttribute("data-id", track.index);
    deletedBtn.innerText = "Delete";
    deletedBtn.classList.add("btn", "btn-delete");
    deletedBtn.addEventListener("click", e => removeTrack(e.target.dataset.id));

    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", `check${track.index}`);
    checkBox.setAttribute("data-id", track.index);
    checkBox.classList.add("track-checkbox");
    checkBox.addEventListener("change", e=> toggleSelect(e.target.dataset.id));

    recorderDiv.appendChild(clockDiv);
    recorderDiv.appendChild(recordBtn);
    recorderDiv.appendChild(playBtn);
    recorderDiv.appendChild(deletedBtn);
    recorderDiv.appendChild(checkBox);

    recorderContainer.appendChild(recorderDiv);
}

function removeTrack(key) {
    tracks = tracks.filter(e => e.key != key);
    removeTrackHtml(key);
}

function removeTrackHtml(key) {
    const recorder = document.querySelector(`#r${Number(key)}`);
    recorder.remove()
}

function toggleSelect(id){
    tracks[id].isSelected = !tracks[id].isSelected;
}


function setMetronome(interval) {
    clearInterval(metronomeTimer);
    if (interval > 0) {
        metronomeTimer = setInterval(function() {
            console.log("Tick");
            sounds[3].play();
        }, interval);
    }
}