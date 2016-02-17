/**
 * Creates a div that contains a textfiled, a plus and a minus button
 * @param UID unique identifier to be added to the default id of the
 * @param {String | undefined} textContent string to be addod to the given new textField as value
 * @returns new div
 */
function createTextDiv( UID, textContent ) {
   var newTextDiv = document.createElement("DIV");
   newTextDiv.className = "inputTextDiv form-group";
   newTextDiv.id = "uriArray"+UID;
   //newTextDiv.innerHTML = "hasznaltauto.hu url:";
   
   //textfield that asks for a car uri and its align-responsible container
   var textFieldAlignerDiv = document.createElement("DIV");
   textFieldAlignerDiv.className = "col-sm-10";
   var textField = document.createElement("INPUT");
   textField.id = uriInputFieldIdPrefix + UID;
   textField.type = "url";
   textField.name = "carUri"+UID;
   textField.className = "form-control";
   textField.placeholder = "hasznaltauto.hu url";
   textField.value = (textContent === undefined) ? "" : textContent;
   textFieldAlignerDiv.appendChild(textField);
   textFieldAlignerDiv.style.paddingTop = "2px";
   
   //add a new input field, or remove current
   var inputButtonPlusDiv = document.createElement("DIV");
   var inputButtonPlus = document.createElement("BUTTON");
   //avoid scrolling back to top like with href='#' http://stackoverflow.com/questions/10836428/how-to-maintain-page-scroll-position-after-a-jquery-event-is-carried-out
   //inputButtonPlus.setAttribute("href", 'javascript:void(0)');
   inputButtonPlus.className = "btn btn-default btn-sm col-sm-1 form-control-static";
   inputButtonPlus.type = "button"; //avoid submit, which is default for buttons on forms
   
   var inputButtonMinus = inputButtonPlus.cloneNode();
   
   inputButtonPlus.innerHTML = "+";
   inputButtonPlus.id = "inputButtonPlus" + UID;
   inputButtonMinus.innerHTML = "-";
   inputButtonMinus.id = "inputButtonMinus" + UID;
   
   newTextDiv.appendChild(textFieldAlignerDiv);
   newTextDiv.appendChild(inputButtonPlus);
   newTextDiv.appendChild(inputButtonMinus);
   
   //sessionStorage.inputUriCount++;
   currentInputUriCount++;
   
   return newTextDiv
}