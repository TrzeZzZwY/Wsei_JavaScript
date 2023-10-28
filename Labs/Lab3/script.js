const sounds = Array.from(document.querySelectorAll("audio"));
const buttons = Array.from(document.querySelectorAll("button"));

buttons.forEach((button) =>{
    button.addEventListener("click",(event) => recordSounds(event,button.dataset.index));
});

document.addEventListener("keypress",onKeyDown);

let tracks = [];

function onKeyDown(event){
    let key = Number.parseInt(event.key);
    if(isNaN(key) || key > 8 || key == 0) return;

    let sound = sounds[key - 1];;
    sound.currentTime = 0;
    console.dir(sound);
    sound.play();
}

function recordSounds(event, index){
    let track = [];
    // dodawaj przez 10 sec do track {przycisk, czas}
    tracks.push({      
        key: index,
        value: track
    })
}

function removeTrack(key){
    tracks = tracks.filter(e => e.key != key);
}