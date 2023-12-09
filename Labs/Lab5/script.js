/*let funcs = new Array();

Attach(Foo);
Attach(discoverPowerBallNumber);


function Attach(func){
    funcs.push(func);
}

function Detach(func){
    funcs.pop(func);
}
*/
class Observer{
    constructor(subscribers){
        this.subscriers = subscribers ?? new Array();
    }

    Attach(subscriber){
        this.subscriers.push(subscriber);
    }

    Detach(subscriber){
        this.subscriers.pop(subscriber);
    }

    Update(data){
        this.subscriers.forEach(sub =>
            sub(data));
    }
}

let myObserver = new Observer([Foo, discoverPowerBallNumber]);

interval(myObserver);

function interval(observer) {
  let timer = 1
  setInterval(
    () => {
        observer.Update(timer);
        timer++;
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
