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
    try { document.getElementById("inputField").size = 80; } catch (i) {}
  } else {
    print("Phone detected!");
    try { document.getElementById("inputField").size = 10; } catch (i) {}
  }
}
startup();

function setOutput(s) {
  document.getElementById("outputField").value = s;
}

function getInput() {
  return document.getElementById("inputField").value;
}

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
