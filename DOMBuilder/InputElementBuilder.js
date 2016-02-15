/**
 * Creates a div that contains a textfiled, a plus and a minus button
 * @param UID unique identifier to be added to the default id of the
 * @param {String | undefined} textContent string to be addod to the given new textField as value
 * @returns new div
 */
function createTextDiv( UID, textContent ) {
   var newTextDiv = document.createElement("DIV");
   newTextDiv.className = "inputTextDiv";
   newTextDiv.id = "uriArray"+UID;
   newTextDiv.innerHTML = "hasznaltauto.hu url:";
   
   //textfield that asks for a car uri
   var textField = document.createElement("INPUT");
   textField.id = uriInputFieldPrefix + UID;
   textField.type = "text";
   textField.name = "carUri"+UID;
   textField.value = (textContent === undefined) ? "" : textContent;
   
   //add a new input field, or remove current
   var anchorButtonPlus = document.createElement("A");
   //avoid scrolling back to top like with href='#' http://stackoverflow.com/questions/10836428/how-to-maintain-page-scroll-position-after-a-jquery-event-is-carried-out
   anchorButtonPlus.setAttribute("href", 'javascript:void(0)');
   anchorButtonPlus.className = "roundButton";
   
   var anchorButtonMinus = anchorButtonPlus.cloneNode();
   
   anchorButtonPlus.innerHTML = "+";
   anchorButtonPlus.id = "anchorButtonPlus" + UID;
   anchorButtonMinus.innerHTML = "-";
   anchorButtonMinus.id = "anchorButtonMinus" + UID;
   
   newTextDiv.appendChild(textField);
   newTextDiv.appendChild(anchorButtonPlus);
   newTextDiv.appendChild(anchorButtonMinus)
   
   //sessionStorage.inputUriCount++;
   currentInputUriCount++;
   
   return newTextDiv
}