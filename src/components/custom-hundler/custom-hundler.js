var customHundler = document.getElementById("customHundler");
var customHundlerValue = document.getElementById("customHundlerValue");
customHundlerValue.innerHTML = customHundler.value;

customHundler.onchange = function() {
  customHundlerValue.innerHTML = this.value;
}
