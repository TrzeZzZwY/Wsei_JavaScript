console.log("Hello");

const btnSubmit = document.querySelector("#BtnSubmit");

btnSubmit.addEventListener("click",solve);

const inputs = document.querySelectorAll("input");
inputs.forEach(element => {
    element.addEventListener('change', solve);
});


function add(a, b) {
    return a + b;
  }

function solve(){
    const inputs = document.querySelectorAll("input");
    const result = Array.from(inputs, ({ value }) => parseFloat(value));
    
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


