"use strict";

document.addEventListener('DOMContentLoaded', function () {
	var customHundlerContainer = document.querySelectorAll(".js-custom-hundler");
	// блок с хандлером

	customHundlerContainer.forEach(function (el) {
		var customHundler = el.querySelector(".js-custom-hundler__input");
		var customHundlerValue = el.querySelector('.js-custom-hundler__value span');

		customHundlerValue.innerHTML = customHundler.value;

		customHundler.onchange = function() {
			customHundlerValue.innerHTML = this.value;
		}

		customHundler.oninput = function() {
			customHundlerValue.innerHTML = this.value;
		}
	})
});
