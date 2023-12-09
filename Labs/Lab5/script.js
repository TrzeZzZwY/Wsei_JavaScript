let funcs = new Array();

Attach(Foo);
Attach(discoverPowerBallNumber);


interval(funcs);

function Attach(func){
    funcs.push(func);
}

function Detach(func){
    funcs.pop(func);
}



function interval(funcs) {
  let timer = 1
  setInterval(
    () => {
        funcs.forEach(func => {
            func(timer);
        });
      timer++
    }
    , 1000)
}

class Logger {
    static log(data) {
        console.log(data)
    }
}

function Foo(data){
    saveCToSessionStorage(data);
    Logger.log(`[log from C] ${data}`)
}

function saveCToSessionStorage(data) {
  console.log('[reader C]', data)
  const storageData = { data }
  sessionStorage.setItem('C', JSON.stringify(storageData))
}

function discoverPowerBallNumber(data) {
  const number = Math.floor(Math.random() * data * 100)
  console.log('[powerball number]', number)
}
