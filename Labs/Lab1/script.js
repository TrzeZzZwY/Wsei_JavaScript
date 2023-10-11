setEventListeners();

const btnAddItem = document.querySelector("#Add");
btnAddItem.addEventListener("click",function(){
    const item = document.createElement("div");
    const input = document.createElement("input");
    const button = document.createElement("button");
    
    item.classList.add("item");
    input.setAttribute("type","number");
    button.innerText = "-";

    item.appendChild(input);
    item.appendChild(button);

    btnAddItem.parentNode.insertBefore(item,btnAddItem);

    setEventListeners();
});

function add(a, b) {
    return a + b;
  }

function solve(){
    const inputs = Array.from(document.querySelectorAll("input"));
    const validInputs = inputs.map(e => e.value).filter(e => e);
    const result = Array.from(validInputs, (e) => parseFloat(e));
    console.table(result);
    if(result.length == 0){
        clearOutput();
        return;
    }

    const min = Math.min.apply(null, result);// apply accepts an array and it applies the array as parameters to the actual function. So, Math.max.apply(Math, list); 
    const max = Math.max.apply(null, result);// can be understood as, Math.max("12", "23", "100", "34", "56", "9", "233");
    const sum = result.reduce(add,0); //reduce wywołuje funkcje na każdym elementem tablicy
    const avg = sum / (result.length);

    createOutput(min, max, sum, avg);
}

function createOutput(min, max, sum, avg){
    const divMin = document.createElement("div");
    const divMax = document.createElement("div");
    const divSum = document.createElement("div");
    const divAvg = document.createElement("div");

    divMin.innerText = "min: " + min;
    divMax.innerText = "max: " + max;
    divSum.innerText = "sum: " + sum;
    divAvg.innerText = "avg: " + avg;

    const resultDiv = document.querySelector("#results");

    resultDiv.innerHTML = "";

    resultDiv.appendChild(divMin);
    resultDiv.appendChild(divMax);
    resultDiv.appendChild(divSum);
    resultDiv.appendChild(divAvg);
}

function clearOutput(){
    const resultDiv = document.querySelector("#results");
    resultDiv.innerHTML = "";
}

function setEventListeners(){
    let items = document.querySelectorAll(".item");
    items.forEach(item =>{
        let deleteButton = item.querySelector("button")
        deleteButton.addEventListener("click",function() {
            item.remove();
            solve();
        });

        let input = item.querySelector("input");
        input.addEventListener('change', solve);
    });
}
