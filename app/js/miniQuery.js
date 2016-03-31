/*!
 * minQuery
 */
var SweetSelector = {
  select: function(element) {
    var value = element.slice(0, 1);
    switch (value) {
      case '#':
        return [document.getElementById(element.slice(1))];
      case '.':
        return document.getElementsByClassName(element.slice(1));
      default:
        return document.getElementsByTagName(element);
    }
  }
};

var DOM = {
  hide: function(element) {
    var elements = SweetSelector.select(element);
    for(var i = 0; i < elements.length; i++){
      elements[i].style.visibility = 'hidden';
    };
  },
  show: function(element) {
    var elements = SweetSelector.select(element);
    for(var i = 0; i < elements.length; i++){
      elements[i].style.visibility = 'visible';
    };
  },
  addClass: function(element, newClass) {
    var elements = SweetSelector.select(element);
    for(var i = 0; i < elements.length; i++){
      if(elements[i].className.length > 0) {
        elements[i].className += " " + newClass;
      } else {
        elements[i].className = newClass;
      }
    };
  },
  removeClass: function(element, oldClass) {
    var elements = SweetSelector.select(element);
    for(var i = 0; i < elements.length; i++){
      var classes = elements[i].className.split(' ');

      for(var j = 0; j < classes.length; j++){
        if(classes[j] === oldClass) {
          classes.splice(j, 1);
        }
      };
      elements[i].className = classes.join(' ');
    };
  },
};

var EventDispatcher = {
  on: function(element, event, whatToDo){
    var target = SweetSelector.select(element)[0];
    target.addEventListener(event, whatToDo, false);
  },
  trigger: function(element, happening){
    var target = SweetSelector.select(element)[0];
    var happening = new CustomEvent(happening);
    target.dispatchEvent(happening);
  }
};

var AjaxWrapper = {
  request: function(internetObject) {
    var aPromise = new Promise(function(resolve, reject){
      var theRequest = new XMLHttpRequest();

      theRequest.addEventListener('load', function(){
        if(theRequest.status >= 200 && theRequest.status < 400) { //make this condition more robust
          resolve(theRequest.response);
        } else {
          reject(theRequest.response);
        }
      });

      theRequest.open(internetObject.type, internetObject.url +
        internetObject.data);
      theRequest.send();
    });

    return aPromise;
  },
};

var miniQuery = function(selector) {
  var selected = SweetSelector.select(selector);

  selected.hide = function() {
    DOM.hide(selector)
  }

  selected.show = function() {
    DOM.show(selector)
  }

  selected.addClass = function(newClass) {
    DOM.addClass(selector, newClass)
  }

  selected.removeClass = function(deleteClass) {
    DOM.removeClass(selector, deleteClass)
  }

  selected.on = function(event, action) {
    EventDispatcher.on(selector, event, action)
  }

  selected.trigger = function(event) {
    EventDispatcher.trigger(selector, event)
  }

  selected.ready = function(block){
    switch(document.readyState){
      case "loading":
        document.addEventListener("DOMContentLoaded", function(event){
          return block();
        });
        break;
      case "complete":
        return block();
        break;
    }
  }
  return selected; //is this necessary?
}

var $ = miniQuery
