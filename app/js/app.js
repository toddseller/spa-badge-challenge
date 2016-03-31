$('html').ready(function(){
  teachers();
  // badges();
})

var teachers = function(){
  var response = AjaxWrapper.request({
    url: 'http://spa-badge-api.herokuapp.com/teachers',
    type: 'GET',
  }).then(function(response) {
    var templateScript = SweetSelector.select('#header').innerHTML
    var theTemplate = Handlebars.compile(templateScript)
    var context = {
     teacher: JSON.parse(response)
    }
    var compiledHTML = theTemplate(context)
    SweetSelector.select('#teacher-name').innerHTML = compiledHTML
  }).catch(function(error) {
    //here's where we handle the error
    console.log('at least you got this far')
  });
}

var badges = function(){
  $.on('.container', 'click', function(event){
    event.preventDefault();
    var response = AjaxWrapper.request({
      url:"http://spa-badge-api.herokuapp.com/teachers" + teacherId
    })
  })
}
