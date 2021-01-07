function print(s) { console.log(s); }
function replace(s, c, w) {
  var a = Array.from(s);
  let r = "";
  for (let i=0; i<a.length; i++) {
    if (a[i] == c) {
      r += w;
    } else {
      r += a[i];
    }
  }
  return r;
}

function startup() {
  if (window.screen.width > 500) {
    print("PC detected!");

    // Set size of 'inputField'
    try {
      document.getElementById("inputField").size = 60;
      document.getElementById("outputField").size = 20;
    } catch (i) {}

    // Linebreaks
    for (var i = 0; i < document.getElementsByTagName("br").length; i++) {
      var m = document.getElementsByTagName("br")[i];
      if (m.className != "brPC") {
        m.hidden = true;
      } else {
        m.hidden = false;
      }
    }

    // sort
    sortPC();

  } else {
    print("Phone detected!");

    // Set size of 'inputField'
    try {
      document.getElementById("inputField").size = 10;
      document.getElementById("outputField").size = 10;
    } catch (i) {}

    // Linebreaks
    let pcLineBreaks = document.getElementsByClassName("brPC");
    for (var i = 0; i < pcLineBreaks.length; i++) {
      pcLineBreaks[i].hidden = true;
    }

  }
}
startup();

function calculate() {
  try {
    var inputField = document.getElementById("inputField");
    var result = eval(replace(inputField.value, ",", "."));
    var resultString = result.toString().replace(".", ",");

    // Formatting
    var resultInt = resultString.split(",")[0];
    if (resultInt.length > 3) {
      var s = "";
      var c = 0;
      var arr = Array.from(resultInt);
      for(var i=arr.length-1; i>=0; i--) {
        var m = arr[i];
        s += m;
        c++;
        if (c==3 && i!=0) {
          c = 0;
          s += ".";
        }
      }
      s = s.split("").reverse().join("");
      if (resultString.includes(",")) {
        s += ",";
        s += resultString.split(",")[1];
      }

      document.getElementById("outputField").value = s;

    } else {
      document.getElementById("outputField").value = resultString;
    }

    inputField.value = resultString;

  } catch(e) {
    print(e);
    if (e instanceof SyntaxError) {
      alert("Wrong syntax!");
    } else {
      alert("An unknown error has occurred while trying to calculate.\nYou " +
      "can try checking your syntax.");
    }
  }
}

function keyEvent(e) {
  print(e.key);
  if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Escape') {
    nextTheme();
  }
}

function setOutput(s) {
  document.getElementById("outputField").value = s;
}
function getInput() {
  return document.getElementById("inputField").value;
}
function addChar(button) {
  var inputField = document.getElementById("inputField");
  if (inputField.value == "Input") {
    clearInput();
  }

  inputField.value += button.innerHTML.
    replace("×", "*").replace("÷", "/");
}
function removeChar() {
  var current = document.getElementById("inputField").value;
  document.getElementById("inputField").value = current.slice(0, -1);
}
function clearInput() {
  var i = document.getElementById("inputField");
  while (i.value.length > 0){
    removeChar();
  }
}

function sortPC() {
  try {
    let order = ['=', '⇐', '←', '9', '8', '7', "nl",
                '6', '5', '4', '3', '2', '1', '0', "nl",
                ',', '÷', '×', '-', '+', ')', '('];
    let parent = document.getElementsByClassName("button")[0].parentNode;
    var p = 0;
    for(let i=0; i<order.length; i++) {
      if (order[i] == "nl") {
        parent.insertBefore(document.getElementsByClassName("brPC")[p], parent.firstChild);
        p++;
        continue;
      }

      let current = getElement(order[i]);
      parent.insertBefore(current, parent.firstChild);
    }
    const outputField = document.getElementById("outputField");
    parent = outputField.parentNode;
    parent.insertBefore(outputField, parent.firstChild);
    const inputField = document.getElementById("inputField");
    parent = inputField.parentNode;
    parent.insertBefore(inputField, parent.firstChild);
  } catch (ignored) {}
}

function getElement(c) {
  let buttons = document.getElementsByClassName("button");
  for (let x=0; x<buttons.length; x++) {
    let current = buttons[x];
    if (current.innerHTML == c) {
      return current;
    }
  }
}
