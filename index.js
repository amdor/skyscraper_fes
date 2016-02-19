//Static vars (used by other js too)
var uriInputFieldIdPrefix = "uriInputField";
var currentInputUriCount = 0;
var formElement = null;

/**
 * addEvent function for crossplatform add event capability
 * STATIC USE
 * http://stackoverflow.com/questions/6927637/addeventlistener-in-internet-explorer
 */
function addEvent(elem, type, handler) {
   if (elem.addEventListener) { // W3C DOM
      elem.addEventListener(type,handler,false);
   } else if (elem.attachEvent) { // IE DOM
      elem.attachEvent("on"+type, handler);
   } else { // No much to do
      elem["on" + type] = handler;
   }
}

//STATIC USE
//http://stackoverflow.com/questions/12949590/how-to-detach-event-in-ie-6-7-8-9-using-javascript
function removeEvent(elem, type, handler) {
   if (elem.removeEventListener) {
       elem.removeEventListener(type, handler, false);
   } else if (elem.detachEvent) {
       elem.detachEvent("on" + type, handler);
   } else {
       elem["on" + type] = null;
   }
}


var sendButtonDiv = null;

/**
 * Saves important user data to sessionStorage before leaving the page
 */
function beforeWindowUnload(event) {
   sessionStorage.inputUriCount = currentInputUriCount;
   var uriArray = new Array();
   for(var i = 0; i < currentInputUriCount; i++) {
      var textFieldHolder = document.getElementById(uriInputFieldIdPrefix + i);
      uriArray.push( (textFieldHolder && textFieldHolder.value) ? textFieldHolder.value : "" );
   }
   sessionStorage.inputUriTextContent = JSON.stringify(uriArray);
}
/**
 * Initialize page's dynamic contents
 */
function windowLoaded(event) {
   //Make navbar
   document.body.insertBefore( createNavbar(), document.body.firstChild );
   sendButtonDiv = document.getElementById("sendButtonDiv");
   formElement = document.getElementById("postForm");
   
   //creating the divs which will contain all input fields
   if( !sessionStorage.inputUriCount || sessionStorage.inputUriCount > 9 || sessionStorage.inputUriCount < 1 ) {
     sessionStorage.removeItem
     var textDiv = createTextDiv();
     formElement.insertBefore(textDiv, sendButtonDiv);
   } else {
      var savedUris = JSON.parse(sessionStorage.inputUriTextContent);
      for(var i = 0; i < Number(sessionStorage.inputUriCount); i++) { 
         var textDiv = createTextDiv(savedUris[i]);
         formElement.insertBefore(textDiv, sendButtonDiv);
      }
   }
   
   //don't add input handler for each button and textfield, propagation check will do just fine
   addEvent(formElement, "click", deleteTextDiv);
 
   //for the first  row hide minus button
   document.getElementById("inputButtonMinus0").style.visibility = "hidden";
    
   sendButtonDiv.style.paddingTop = "2px";
}

/**
 *Eventlistener listens only to roundbuttons that are containing -
 *their parent div is the event listener target.
 *Removes inputfields next to the clicked minus button.
 */
function deleteTextDiv(event) {
    if ( event.target.id && event.target.id.includes("inputButtonMinus") ) {
      formElement.removeChild(event.target.parentNode);
      currentInputUriCount--;
      event.stopPropagation();
    }
}