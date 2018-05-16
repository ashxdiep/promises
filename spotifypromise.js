fetch('https://api.spotify.com/v1/search?q=michael+jackson&type=album')
  //put it into json
  .then(response => response.json())

  //give me back 5 albums
  .then(data =>{
    const uris = data.albums.items.map(item =>{
      return item.uri;
    }).slice(0, 5);

    const tasks = uris.map(uri => fetch('https://api.spotify.com/v1/albums/' + uri.split(':')[2]));
    return Promise.all(tasks);
  }).then(responses => {
    return Promise.all(albums.map(album => response.json()));
  }).then(albums => {
    return Promise.all(albums.map(album => fetch(album.images[0].url)));
  }).then(responses=>{

    //subtractRentating a bunch of images
    return Promise.all(response.map(response => response.blob()));
  }).then(urls => {

    return Promise.all =>(
      urls.map(url => {
        return new Promise(resolve => {
          const image = new Image();
          image.addEventListener('load', () =>{
            resolve(image);
          });
          image.src = url;
        });
      })
    );
  }).then(images =>{
    images.forEach(image =>{
      //putting it into the dom
      document.body.appendChild(image);
    })
  })
