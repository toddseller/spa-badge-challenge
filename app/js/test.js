// var p = new Promise(function(resolve, reject) {
//   if (Math.random() < 0.5) {
//     resolve('todd');
//   } else {
//     reject('james');
//   }
// }).then(function(resolvedArg) { console.log(resolvedArg); console.log(other); }).catch(function(rejectedArg) { console.error(rejectedArg) });

var aUrl = "http://httpbin.org/get";
var get = function(url) {
  var aPromise = new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
      if(request.readyState === 4) {
        if(request.status === 200) {
          resolve(request.response);
          // console.log(request.response);
        } else {
          reject();
        }
      }
    };

    request.open('GET', url, true);
    request.send(null);
  });

  return aPromise;
};

get(aUrl).then(function(data) {
  console.log(data);
})
