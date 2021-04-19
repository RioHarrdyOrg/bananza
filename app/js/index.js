import { gsap, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
	// Variables
	const decorLine = document.querySelector(".menu-decor"),
		offsetDecorLine = decorLine.offsetWidth / 2;

	// Pagepiling
	$("#pagepiling").pagepiling({
		menu: "#myMenu",
		direction: "horizontal",
		verticalCentered: true,
		anchors: [
			"main",
			"aboutUs",
			"whyUs",
			"services",
			"callBack",
			"portfolio",
			"contacts",
		],
		scrollingSpeed: 2200,
		easing: "swing",
		loopBottom: true,
		loopTop: true,
		css3: false,
		navigation: {
			textColor: "#FFF",
			bulletsColor: "#000",
			position: "right",
			tooltips: [
				"section1",
				"section2",
				"section3",
				"section4",
				"section5",
				"section6",
				"section7",
			],
		},
		normalScrollElements: null,
		normalScrollElementTouchThreshold: 5,
		touchSensitivity: 5,
		keyboardScrolling: true,
		sectionSelector: ".section",
		animateAnchor: false,

		//events
		onLeave: function (index, nextIndex, direction) {
			console.log("leave");
			console.log(index, nextIndex, direction);
			changeLine(".menu li:nth-child(" + nextIndex + ")");
			// 1 => 7
			if (nextIndex === 7 && direction == "down") {
				tlMain.restart();
			}
			// 1 => 2
			if (nextIndex === 2 && direction == "down") {
				tlMain.restart();
			}
			// 2 => 1
			if (nextIndex === 1 && direction == "up") {
				tlMain.pause(0);
			}
			// 2 => 3
			if (nextIndex === 3 && direction == "down") {
				tlWhyUs.pause(0);
			}
			// 3 => 2
			if (nextIndex === 2 && direction == "up") {
				tlWhyUs.restart();
			}
			// 3 => 4
			if (nextIndex === 4 && direction == "down") {
				tlWhyUs.restart();
			}
			// 4 => 3
			if (nextIndex === 3 && direction == "up") {
				tlWhyUs.pause(0);
			}
			// 4 => 5
			if (nextIndex === 5 && direction == "down") {
			}
			// 5 => 4
			if (nextIndex === 4 && direction == "up") {
			}
			// 5 => 6
			if (nextIndex === 6 && direction == "down") {
			}
			// 6 => 5
			if (nextIndex === 5 && direction == "up") {
			}
			// 6 => 7
			if (nextIndex === 7 && direction == "down") {
			}
			// 7 => 6
			if (nextIndex === 6 && direction == "up") {
			}
			// 7 => 1
			if (index === 7 && nextIndex === 1 && direction == "up") {
				tlMain.pause(0);
			}
		},
		afterLoad: function (anchorLink, index) {
			// console.log("load");
		},
		afterRender: function () {
			console.log("render");
			changeLine(".menu li.active");
		},
	});

	// GSAP ANIMATION

	// Main section
	const mainObj = {
		defaults: {
			duration: 0.3,
		},
	};
	const tlMain = gsap.timeline({ paused: true });
	tlMain
		.add(tlMain1(mainObj), "main")
		.add(tlMain2(mainObj), "main")
		.add(tlMain3(mainObj), "main")
		.add(tlMain4(mainObj), "main")
		.add(tlMain5(mainObj), "main")
		.add(tlMainFinish(mainObj));

	function tlMain1(obj) {
		let tl = gsap.timeline(obj);
		tl.to(".ill_main .ill-el_1", {
			x: "random(-30, 30)",
			y: 25,
		}).to(".ill_main .ill-el_1", { x: "random(-30, 30)", y: 50 });
		return tl;
	}
	function tlMain2(obj) {
		let tl = gsap.timeline(obj);
		tl.to(".ill_main .ill-el_2", {
			x: "random(-30, 30)",
			y: 20,
		}).to(".ill_main .ill-el_2", { x: "random(-30, 30)", y: 40 });
		return tl;
	}
	function tlMain3(obj) {
		let tl = gsap.timeline(obj);
		tl.to(".ill_main .ill-el_3", {
			x: "random(-30, 30)",
			y: 15,
		}).to(".ill_main .ill-el_3", { x: "random(-30, 30)", y: 30 });
		return tl;
	}
	function tlMain4(obj) {
		let tl = gsap.timeline(obj);
		tl.to(".ill_main .ill-el_4", {
			x: "random(-30, 30)",
			y: 10,
		}).to(".ill_main .ill-el_4", { x: "random(-30, 30)", y: 20 });
		return tl;
	}
	function tlMain5(obj) {
		let tl = gsap.timeline(obj);
		tl.to(".ill_main .ill-el_5", {
			x: "random(-30, 30)",
			y: 5,
		}).to(".ill_main .ill-el_5", { x: "random(-30, 30)", y: 10 });
		return tl;
	}
	function tlMainFinish(obj) {
		let tl = gsap.timeline(obj);
		tl.to(".ill_main .ill-el", {
			top: "55%",
			left: "45%",
			scale: 0,
			opacity: 0,
			ease: "sine.in",
		})
			.to(".ill_main .ill-el_mouth-1", { opacity: 0, ease: "sine.out" })
			.to(
				".ill_main .ill-el_mouth-2",
				{ opacity: 1, ease: "sine.in" },
				"-=0.35"
			);
		return tl;
	}

	// About US section
	const tlAboutUs = gsap.timeline({
		scrollTrigger: {
			scroller: ".section_about",
			trigger: ".about-right",
			start: "top 25%",
			end: "bottom 75%",
			scrub: 1.3,
		},
	});
	tlAboutUs
		.to(".ill_about .ill-el_2", { y: "70%", ease: "power1.out" }, "about")
		.to(".ill_about .ill-el_3", { y: "215%", ease: "power1.out" }, "about")
		.to(".ill_about .ill-el_4", { y: "240%", ease: "power1.out" }, "about")
		.to(".ill_about .ill-el_5", { y: "190%", ease: "power1.out" }, "about");

	// Why Us section
	function tlWhyUs1(obj) {
		let tl = gsap.timeline(obj);
		tl.to(".ill_why .ill-el_2", { x: "-4%", y: "20%", maxWidth: "50%" })
			.to(".ill_why .ill-el_2", { x: "25%", y: "100%" })
			.to(".ill_why .ill-el_2", { x: "-10%", y: "200%" })
			.to(".ill_why .ill-el_2", { x: "10%", y: "250%" });
		return tl;
	}
	function tlWhyUs2(obj) {
		let tl = gsap.timeline(obj);
		tl.to(".ill_why .ill-el_3", { x: "25%", y: "4%", maxWidth: "50%" })
			.to(".ill_why .ill-el_3", { x: "40%", y: "50%" })
			.to(".ill_why .ill-el_3", { x: "-40%", y: "127%" })
			.to(".ill_why .ill-el_3", { x: "68%", y: "254%" });
		return tl;
	}
	const whyUsObj = {
		defaults: {
			duration: 0.3,
			ease: "none",
		},
	};
	const tlWhyUs = gsap.timeline({ paused: true });
	tlWhyUs.add(tlWhyUs1(whyUsObj), "why").add(tlWhyUs2(whyUsObj), "why");

	// Services section
	gsap.set(".serv-pic", { backgroundPosition: "50% 0%" });
	const servicesTargets = gsap.utils.toArray(".serv-pic");
	servicesTargets.forEach((el, i) => {
		gsap.to(el, {
			scrollTrigger: {
				trigger: el,
				scroller: ".section_services",
				start: "top 75%",
				end: "bottom top",
				scrub: i * 0.2,
			},
			backgroundPosition: "50% 100%",
			ease: "none",
		});
	});

	// decor menu hover
	function changeLine(elem) {
		let el = document.querySelector(elem),
			widthElem = el.offsetWidth,
			offsetElem = el.offsetLeft,
			left = offsetElem + widthElem / 2 - offsetDecorLine;
		gsap.to(decorLine, { left: left, ease: "power.out" });
	}

	// mobile
	if (window.innerWidth < 768) {
	}

	// Test
	document.querySelector(".recall").addEventListener("click", (e) => {
		e.preventDefault();
	});
});
