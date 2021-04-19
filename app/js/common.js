import gsap from "gsap/all";

document.addEventListener("DOMContentLoaded", function () {
	// Variables
	const body = document.querySelector("body"),
		percent = document.querySelector(".loader-percent"),
		cookies = document.querySelector(".cookies"),
		cookiesBtn = document.querySelector(".cookies__btn");

	// gsapSet
	gsap.set(cookies, { x: "-50%", y: "-100%", boxShadow: "none" });
	// Loader
	loadbar();
	function loadbar() {
		var img = document.images,
			c = 0,
			tot = img.length;
		if (tot == 0) return doneLoading();

		function imgLoaded() {
			c += 1;
			var perc = (((100 / tot) * c) << 0) + " %";
			percent.innerHTML = perc;
			if (c === tot) return doneLoading();
		}
		function doneLoading() {
			body.classList.remove("loading");
			// setTimeout(() => {
			// 	gsap.to(cookies, {
			// 		x: "-50%",
			// 		y: "0%",
			// 		boxShadow: "0 0 226px 0 rgba(246, 207, 0, 0.3)",
			// 		ease: "expo.out",
			// 		duration: 1.5,
			// 	});
			// }, 1000);
		}
		for (var i = 0; i < tot; i++) {
			var tImg = new Image();
			tImg.onload = imgLoaded;
			tImg.onerror = imgLoaded;
			tImg.src = img[i].src;
		}
	}

	// Resize event
	var optimizedResize = (function () {
		var callbacks = [],
			running = false;

		// fired on resize event
		function resize() {
			if (!running) {
				running = true;

				if (window.requestAnimationFrame) {
					window.requestAnimationFrame(runCallbacks);
				} else {
					setTimeout(runCallbacks, 66);
				}
			}
		}

		// run the actual callbacks
		function runCallbacks() {
			callbacks.forEach(function (callback) {
				callback();
			});

			running = false;
		}

		// adds callback to loop
		function addCallback(callback) {
			if (callback) {
				callbacks.push(callback);
			}
		}
		return {
			// public method to add additional callback
			add: function (callback) {
				if (!callbacks.length) {
					window.addEventListener("resize", resize);
				}
				addCallback(callback);
			},
		};
	})();

	// start process
	optimizedResize.add(function () {
		// do on resize
	});
	// END Resize event

	// Cookies
	cookiesBtn.addEventListener("click", (e) => {
		e.preventDefault();
		gsap.to(cookies, {
			x: "-50%",
			y: "-100%",
			boxShadow: "none",
			ease: "expo.out",
		});
	});
});
