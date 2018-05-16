// fetch('https://api.spotify.com/v1/search?q=michael+jackson&type=album')
//     .then(response => response.json())
//     .then(data => {
//         return Promise.all(data.albums.items
//             .map(item => item.id).slice(0, 5)
//             .map(id => fetch('https://api.spotify.com/v1/albums/' + id)));
//     })
//     .then(responses => Promise.all(responses.map(r => r.json())))
//     .then(albums => Promise.all(albums.map(album => fetch(album.images[0].url))))
//     .then(responses => Promise.all(responses.map(r => r.blob())))
//     .then(blobs => blobs.map(blob => URL.createObjectURL(blob)))
//     .then(urls => {
//         return Promise.all(urls.map(url => {
//             return new Promise(resolve => {
//                 const image = new Image();
//                 image.addEventListener('load', () => {
//                     resolve(image);
//                 });
//                 image.src = url;
//             })}));
//     })
//     .then(images => {
//         images.forEach(image => {
//             document.body.appendChild(image);
//         });
//     });


function sync(callback){
  //what set timeout does, is say don't do the function now, do it later
  //but not earlier than this time

  //no such thing as setTimeout(return deferred() , 0); because cannot get immediately
  //sync needs to now take a callback function
  setTimeout(function(){
    const res = deferred();
    callback(res);
  }, 1000);
}

function deferred() {
  return 'deferred';
}

//call sync first and send in anon callback function
//call setTimeout with function that wraps the deferred call
//call back is called with result which comes out in the function of sync we called first
//.and it logs out
sync(function(result){
  console.log(result);
});


/////ANOTHER EXAMPLE/////
/////////////////////////
//program that calculates disposable income


//an example of asynchronous with steps by using timeout functions
/** First we give it a function of callback but when it get salary you also
give it a callback which calls subtract tax which calls subtract rent using the
value it just found which finally gives back to getdisposable and prints **/


//This promise is kinda confusing because of the layer deep it goes into
function getSalary(callback) {
    setTimeout(() => {
      callback(33000);
    }, 1000);
}

function subtractTax(salary, callback) {
    setTimeout(() => {
      callback(salary * 0.75);
    }, 1000);
}

function subtractRent(salary, callback) {
  setTimeout(() => {
    callback(salary - 5000);
  }, 1000);
}

function getDisposableIncome(callback) {
    getSalary(salary1 => {
      subtractTax(salary1, salary2 =>{
        subtractRent(salary2, salary3 =>{
          callback(salary3);
        });
      });
    });
}

getDisposableIncome(disposableincome =>{
  console.log(disposableincome);
})


//////REFACTORING GET DISPOSABLE INCOME BY USING PROMISES////
/////////////////////////////////////////////////////////////

function getSalary() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(33000);
      }, 1000);
    });
}

const promise = getSalary();
promise.then(salary => {
  console.log(salary);
});
////// that is also the same as below /////
//after returning the promise and then using then to do the rest with the value

getSalary().then(salary =>{
  console.log(salary);
})

function subtractTax(salary) {
    return new Promise (resolve =>{
      setTimeout(() =>{
        resolve(salary * 0.75);
      }, 1000);
    });
}

function subtractRent(salary) {
  return new Promise(resolve =>{
    setTimeout(() =>{
      resolve(salary - 5000);
    }, 1000);
  });
}

//all of these just chain up events to handle in promises
//asynchronous turned into synchronous events
function getDisposableIncome(callback) {
    const salaryPromise = getSalary();
    const taxPromise = salaryPromise.then(salary1 =>{
      return subtractTax(salary1);
    });
    const rentPromise = taxPromise.then(salary2 =>{
      return subtractRent(salary2);
    });
    return rentPromise;
}

getDisposableIncome().then(disposable =>{
  console.log(disposable);
});

///you can write this all nicer/////
function getDisposableIncome(callback) {
    return getSalary().then(subtractTax).then(subtractRent);
}


/////////USING PROMISE ALL//////////
///////////////////////////////////

function getSalary1() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(33000);
      }, 1000);
    });
}

function getSalary2() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(450000);
      }, 1000);
    });
}

function getSalarySum(){
  return Promise.all([
    getSalary1(),
    getSalary2(),
  ]).then(salaries =>{
    return salaries.reduce((prev,cur) => prev + cur, 0);
  })
}
