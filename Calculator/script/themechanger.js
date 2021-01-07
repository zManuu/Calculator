var currentTheme = 0;

function theme(bg, text, util, name) {
  this.bg = bg;
  this.text = text;
  this.util = util;
  this.name = name;
}

var themes = [
  new theme("#F5F5F5", "#303030", "#303030", "Light"),
  new theme("#303030", "#F5F5F5", "#F5F5F5", "Dark")
];

function nextTheme() {
  currentTheme++;
  if (currentTheme >= themes.length) {
    currentTheme = 0;
  }
  applyTheme(themes[currentTheme]);
}

function applyTheme(theme) {
  document.body.style.background = theme.bg;

  var changebleElements = document.getElementsByClassName("themeChanger");
  for (var i = 0; i < changebleElements.length; i++) {
    var current = changebleElements[i];
    current.style.background = theme.bg;
    current.style.color = theme.text;
    current.style.borderColor = theme.util;

    switch (current.tagName) {
      case "HR":
        current.style.background = theme.util;
        break;
      default:
        break;
    }

  }

  console.log("Successfully applied the \"" + theme.name + "\" theme!");
}

// Apply light theme at start
applyTheme(themes[0]);
