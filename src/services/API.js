let BASE_URL= "http://127.0.0.1:3000"
export default {
  
  get: endpoint => {
    fetch(BASE_URL + endpoint)
  .then(response => response.json() )
      .then(pkg => {
        console.log('packages response api' + pkg);
        
        return pkg})
      .catch(function(err) {
        // Error :(
        console.log(err);
      });
  },
  post: function (endpoint, body) {

    const myRequest = new Request(this.BASE_URL + endpoint, {
      method: "POST",
      headers: new Headers({'Content-Type': 'application/json'}),
      body: body,
      mode: 'no-cors'
    });
    fetch(myRequest)
      .then(function(response) {
        return response;
      })
      .catch(function(err) {
        // Error :(
        console.log(err);
      });
  }
};
