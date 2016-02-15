var uriInputFieldIdPrefix = "uriInputField";

/**
 * addEvent function for crossplatform add event capability
 * http://stackoverflow.com/questions/6927637/addeventlistener-in-internet-explorer
 */
function addEvent(elem, evnt, func) {
   if (elem.addEventListener) { // W3C DOM
      elem.addEventListener(evnt,func,false);
   } else if (elem.attachEvent) { // IE DOM
      elem.attachEvent("on"+evnt, func);
   } else { // No much to do
      elem[evnt] = func;
   }
}

var sendButton = null;
var inputContainerDiv = null;
var currentInputUriCount = 0;

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
   sendButton = document.getElementById("sendButton");
   inputContainerDiv = document.getElementById("inputContainerID");
   
   //creating the divs which will contain all input fields
   if( !sessionStorage.inputUriCount || sessionStorage.inputUriCount > 9 || sessionStorage.inputUriCount < 1 ) {
     sessionStorage.removeItem
     var textDiv = createTextDiv(0);
     inputContainerDiv.insertBefore(textDiv, sendButton);
   } else {
      var savedUris = JSON.parse(sessionStorage.inputUriTextContent);
      for(var i = 0; i < Number(sessionStorage.inputUriCount); i++) { 
         var textDiv = createTextDiv(i, savedUris[i]);
         inputContainerDiv.insertBefore(textDiv, sendButton);
      }
   }
   
   //don't add input handler for each button and textfield, propagation check will do just fine
   addEvent(inputContainerDiv, "click", addTextDiv);
   addEvent(inputContainerDiv, "click", deleteTextDiv);
   addEvent(inputContainerDiv, "change", inputUriChanged);
   
   //for the first  row hide minus button
   document.getElementById("anchorButtonMinus0").style.display = "none";
    
}

/**
 *Eventlistener listens only to roundbuttons that are containing +
 *their parent's parent div is the event listener target.
 *We add a new div with the input fields from the template
*/
function addTextDiv(event) {
   //TODO give proper error message if user tries to make more than 10 textdiv
   if ( event.target.id && event.target.id.includes("anchorButtonPlus") && currentInputUriCount < 10 ) {
      var addedTextDiv = createTextDiv(currentInputUriCount);
      inputContainerDiv.insertBefore(addedTextDiv, sendButton);
      event.stopPropagation();
   }
}

/**
 *Eventlistener listens only to roundbuttons that are containing -
 *their parent div is the event listener target.
 *Removes inputfields next to the clicked minus button.
 */
function deleteTextDiv(event) {
    if ( event.target.id && event.target.id.includes("anchorButtonMinus") ) {
      inputContainerDiv.removeChild(event.target.parentNode);
      currentInputUriCount--;
      event.stopPropagation();
    }
}

function inputUriChanged( event ) {
    
}