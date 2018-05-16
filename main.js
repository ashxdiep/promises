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

function getDisposableIncome() {
    getSalary(salary1 =>{
      subtractTax(salary1, salary2 =>{
        subtraactRent(salary2, salary3 =>{
          callback(salary3);
        });
      });
    });
}

getDisposableIncome(disposableincome =>{
  console.log(disposableincome);
})
