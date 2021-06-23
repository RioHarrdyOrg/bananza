import { gsap, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
	// Variables
	const decorLine = document.querySelector(".menu-decor"),
		body = document.querySelector("body"),
		percent = document.querySelector(".loader-percent"),
		cookies = document.querySelector(".cookies"),
		cookiesBtn = document.querySelector(".cookies__btn"),
		popups = document.querySelectorAll(".popup");
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
			setTimeout(() => {
				if (cookies && !localStorage.getItem("cookies")) {
					gsap.to(cookies, {
						x: "-50%",
						y: "0%",
						boxShadow: "0 0 226px 0 rgba(246, 207, 0, 0.3)",
						ease: "expo.out",
						duration: 1.5,
					});
				}
			}, 1000);
		}
		for (var i = 0; i < tot; i++) {
			var tImg = new Image();
			tImg.onload = imgLoaded;
			tImg.onerror = imgLoaded;
			tImg.src = img[i].src;
		}
	}

	if (popups) {
		gsap.set(popups, { x: "100%" });
	}
	// Cookies
	if (cookiesBtn) {
		cookiesBtn.addEventListener("click", (e) => {
			e.preventDefault();

			if (window.innerWidth > 767 && window.innerHeight > 599) {
				gsap.to(cookies, {
					x: "-50%",
					y: "-100%",
					boxShadow: "none",
					ease: "expo.out",
					onComplete: cookiesSet,
				});
			} else {
				gsap.to(cookies, {
					x: "-50%",
					y: "100%",
					boxShadow: "none",
					ease: "expo.out",
					onComplete: cookiesSet,
				});
			}
		});
	}
	function cookiesSet() {
		localStorage.setItem("cookies", true);
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
		if (window.innerWidth <= 767) {
			if ($(".slick").length && !$(".slick").hasClass("slick-initialized")) {
				$(".slick").slick("refresh");
			}
		}
	});
	// END Resize event

	// Textareas
	const tx = document.getElementsByTagName("textarea");
	for (let i = 0; i < tx.length; i++) {
		tx[i].setAttribute(
			"style",
			"height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
		);
		tx[i].addEventListener("input", OnInput, false);
	}

	function OnInput() {
		this.style.height = "auto";
		this.style.height = this.scrollHeight + "px";
	}

	// decor menu hover
	function changeLine(elem) {
		let el = document.querySelector(elem),
			widthElem = el.offsetWidth,
			offsetElem = el.offsetLeft,
			offsetDecorLine = decorLine.offsetWidth / 2,
			left = offsetElem + widthElem / 2 - offsetDecorLine;
		if (decorLine) {
			gsap.to(decorLine, { left: left, ease: "power.out" });
		}
	}

	changeLine(".menu li.active");

	// PAGEPILING AND GSAP
	ScrollTrigger.matchMedia({
		// desktop

		"(min-width: 768px) and (min-height: 600px)": function () {
			// GSAP ANIMATION
			gsap.set(cookies, { x: "-50%", y: "-100%", boxShadow: "none" });

			if ($("#pagepiling").length) {
				gsap.set(".ill_special .ill-el_1", { x: 0, y: 0, rotate: 0 });
				gsap.set(".ill_special .ill-el_2", { x: 0, y: 0, rotate: 0 });
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
						"special",
						"callBack",
						"portfolio",
						"contacts",
					],
					navigation: false,
					css3: false,
					easing: "swing",
					scrollingSpeed: 1500,
					loopBottom: true,
					loopTop: true,

					//events
					onLeave: function (index, nextIndex, direction) {
						console.log(index, nextIndex, direction);
						changeLine(".menu li:nth-child(" + nextIndex + ")");
						// all => 1
						if (nextIndex === 1) {
							tlMain.pause(0);
						}
						// 1 => all
						if (index === 1) {
							tlMain.restart();
						}
						// all => 2
						if (nextIndex === 2) {
							document.querySelector(".section_about").scrollTop = 0;
						}
						// all => 3
						if (nextIndex === 3) {
							tlWhyUs.pause(0);
						}
						// 3 => all
						if (index === 3) {
							tlWhyUs.restart();
						}
						// all => 4
						if (nextIndex === 4) {
							document.querySelector(".section_services").scrollTop = 0;
						}
						// all => 5
						if (nextIndex === 5) {
							tlSp.pause(0);
						}
						// 5 => all
						if (index === 5) {
							tlSp.restart();
						}
						// all => 8
						if (nextIndex === 8) {
							tlContacts.pause(0);
						}
						// 8 => all
						if (index === 8) {
							tlContacts.restart();
						}
					},
					afterLoad: function (anchorLink, index) {},
					afterRender: function () {
						changeLine(".menu li.active");
					},
				});
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
						top: "65%",
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
					.to(
						".ill_about .ill-el_3",
						{ y: "215%", ease: "power1.out" },
						"about"
					)
					.to(
						".ill_about .ill-el_4",
						{ y: "240%", ease: "power1.out" },
						"about"
					)
					.to(
						".ill_about .ill-el_5",
						{ y: "190%", ease: "power1.out" },
						"about"
					);

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

				// Special puck section
				const tlSp = gsap.timeline({
					paused: true,
					defaults: {
						duration: 2,
						ease: "sine",
					},
				});
				tlSp
					.to(".ill_special .ill-el_1", { y: "-100%" }, "special")
					.to(".ill_special .ill-el_2", { y: "100%" }, "special");

				// Contacts section

				function tlContacts1(obj) {
					let tl = gsap.timeline(obj);
					tl.to(".ill_contacts .ill-el_1", { x: "60%", y: "70%" })
						.to(".ill_contacts .ill-el_1", { x: "20%", y: "130%" })
						.to(".ill_contacts .ill-el_1", { x: "130%", y: "180%" });
					return tl;
				}
				function tlContacts2(obj) {
					let tl = gsap.timeline(obj);
					tl.to(".ill_contacts .ill-el_2", { x: "10%", y: "-30%" })
						.to(".ill_contacts .ill-el_2", { x: "-30%", y: "10%" })
						.to(".ill_contacts .ill-el_2", { x: "-155%", y: "-80%" });
					return tl;
				}
				function tlContacts3(obj) {
					let tl = gsap.timeline(obj);
					tl.to(".ill_contacts .ill-el_3", { x: "10%", y: "-30%" })
						.to(".ill_contacts .ill-el_3", { x: "80%", y: "-10%" })
						.to(".ill_contacts .ill-el_3", { x: "210%", y: "-200%" });
					return tl;
				}
				const contactsObj = {
					defaults: {
						duration: 0.3,
						ease: "none",
					},
				};
				const tlContacts = gsap.timeline({ paused: true });
				tlContacts
					.add(tlContacts1(contactsObj), "contacts")
					.add(tlContacts2(contactsObj), "contacts")
					.add(tlContacts3(contactsObj), "contacts");
			}
		},
		// mobile
		"(max-width: 767px), (max-height: 599px)": function () {
			gsap.set(cookies, { x: "-50%", y: "100%", boxShadow: "none" });
			if ($("#pagepiling").length) {
				gsap.set(".ill_special .ill-el_1", { x: 0, y: 0, rotate: 90 });
				gsap.set(".ill_special .ill-el_2", { x: 0, y: 0, rotate: 75 });
				if (document.querySelector(".pp-section")) {
					$.fn.pagepiling.destroy("all");
				}
				gsap.to(".ill-mobile_start", {
					scrollTrigger: {
						trigger: ".ill-mobile_start",
						start: "top 30%",
						scrub: false,
					},
					onComplete: function () {
						let target = document
							.querySelector(".ill-mobile_start")
							.querySelector(".contacts-btn");
						target.classList.add("hover");
						setTimeout(() => {
							target.classList.remove("hover");
						}, 1000);
					},
				});
				gsap.to(".special-decor", {
					scrollTrigger: {
						trigger: ".special-right",
						start: "top 50%",
						scrub: false,
					},
					onComplete: function () {
						let target = document.querySelector(".special-decor");
						target.classList.add("hover");
						setTimeout(() => {
							target.classList.remove("hover");
						}, 1000);
					},
				});
			}
		},
		all: function () {},
	});
	const logoGo = document.querySelector(".js-logo");
	logoGo.addEventListener("click", (e) => {
		e.preventDefault();
		$.fn.pagepiling.moveTo("main");
	});

	// Portfolio item click
	const portfolioLinks = document.querySelectorAll(".portfolio__link"),
		portfolioPhotos = document.querySelectorAll(".portfolio__photo"),
		portfolioWrap = document.querySelector(".section_portfolio"),
		portfolioItems = document.querySelectorAll(
			".portfolio__projects .portfolio__item"
		);
	portfolioLinks.forEach((el) => {
		el.addEventListener("click", portfolioClick);
	});
	function portfolioClick(e) {
		e.preventDefault();
		const parentList = this.closest(".portfolio__projects"),
			parentItem = this.closest(".portfolio__item"),
			parentItems = parentList.querySelectorAll(".portfolio__item");
		doScroll(parentItem, parentList);
	}
	function showCont(id) {
		portfolioPhotos.forEach((el) => {
			const contId = el.dataset.cont;
			if (contId === id) {
				el.classList.add("active");
			} else {
				el.classList.remove("active");
			}
		});
	}
	function doScroll(item, list) {
		const index = [...list.children].indexOf(item);
		if (index === list.children.length - 1) {
			portfolioItems.forEach((item) => {
				item.classList.remove("active");
			});
			showCont(item.querySelector(".portfolio__link").dataset.id);
			item.classList.add("active");
		} else if (index === 0) {
			portfolioItems.forEach((item) => {
				item.classList.remove("active");
			});
			showCont(item.querySelector(".portfolio__link").dataset.id);
			item.classList.add("active");
		} else {
			item.scrollIntoView({ block: "center", behavior: "smooth" });
		}
	}
	if (portfolioWrap) {
		portfolioWrap.addEventListener("scroll", portfolioScroll);
	}

	function portfolioScroll() {
		let scrollCenter = Math.round(window.innerHeight / 2);
		portfolioItems.forEach((item) => {
			let itemTop = item.getBoundingClientRect().top,
				itemBottom = item.getBoundingClientRect().bottom,
				id = item.querySelector(".portfolio__link").dataset.id;
			if (scrollCenter > itemTop && scrollCenter < itemBottom) {
				item.classList.add("active");
				showCont(id);
			} else {
				item.classList.remove("active");
			}
		});
	}

	if ($(".slick").length) {
		$(".slick").slick({
			dots: false,
			infinite: false,
			arrows: true,
			appendArrows: $(".why-arrows"),
			prevArrow:
				'<button id="prev" type="button" class="btn btn-prev"><span class="icon-arrow-more" aria-hidden="true"></span></button>',
			nextArrow:
				'<button id="next" type="button" class="btn btn-next"><span class="icon-arrow-more" aria-hidden="true"></span></button>',
			speed: 500,
			slidesToShow: 1,
			infinite: true,
			slidesToScroll: 1,
			mobileFirst: true,
			focusOnSelect: true,
			responsive: [
				{
					breakpoint: 767,
					settings: "unslick",
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
					},
				},
			],
		});
	}
	if (window.innerWidth <= 767) {
		if ($(".slick").length && !$(".slick").hasClass("slick-initialized")) {
			$(".slick").slick("refresh");
		}
	}

	// popups
	const startPopupBtns = document.querySelectorAll(".js-popup-start");
	if (startPopupBtns) {
		startPopupBtns.forEach((el) => {
			el.addEventListener("click", showPopup);
		});
	}
	const closePopupBtns = document.querySelectorAll(".js-popup-close");
	if (closePopupBtns) {
		closePopupBtns.forEach((el) => {
			el.addEventListener("click", closePopup);
		});
	}
	const nextPopupBtns = document.querySelectorAll(".js-popup-next");
	if (nextPopupBtns) {
		nextPopupBtns.forEach((el) => {
			el.addEventListener("click", nextPopup);
		});
	}
	function showPopup(e) {
		e.preventDefault();
		const target = this.dataset.target;
		body.classList.add("show");
		gsap.to(document.querySelector("[data-cont=" + target + "]"), {
			x: 0,
			ease: "power2.out",
		});
	}
	function nextPopup(e) {
		e.preventDefault();
		let form = this.closest("form"),
			inputs = form.querySelectorAll(".form-control"),
			error = validation(form);
		if (!error.length) {
			inputs.forEach((input) => {
				input.closest(".box-field__input").classList.remove("error");
				input.value = "";
			});
			const target = this.dataset.target;
			body.classList.add("show");
			gsap.to(document.querySelector("[data-cont=" + target + "]"), {
				x: 0,
				ease: "power2.out",
			});
		} else {
			inputs.forEach((input) => {
				input.closest(".box-field__input").classList.remove("error");
			});
			error.forEach((obj) => {
				obj.el.classList.add("error");
			});
		}
	}

	function closePopup(e) {
		e.preventDefault();
		body.classList.remove("show");
		gsap.to(popups, {
			x: "100%",
			ease: "power2.out",
		});
	}
	function validation(form) {
		let result = [];
		let inputs = form.querySelectorAll(".form-control");
		inputs.forEach((input) => {
			let val = input.value;
			if (!val.trim().length > 0) {
				let resObj = {
					el: input.closest(".box-field__input"),
				};
				result.push(resObj);
			}
		});
		return result;
	}

	// Check policy
	const checkBox = document.querySelectorAll(".js-check");
	if (checkBox) {
		for (const el of checkBox) {
			el.checked ? enableButton(el) : disabledButton(el);
			el.addEventListener("change", changeCheck);
		}
	}
	function enableButton(el) {
		const button = el.closest(".form").querySelector("button[type=submit]");
		button.disabled = false;
	}
	function disabledButton(el) {
		const button = el.closest(".form").querySelector("button[type=submit]");
		button.disabled = true;
	}
	function changeCheck() {
		this.checked ? enableButton(this) : disabledButton(this);
	}

	// Services show more
	const showMoreBtns = document.querySelectorAll(".js-show");
	if (showMoreBtns) {
		showMoreBtns.forEach((el) => {
			el.addEventListener("click", function (e) {
				e.preventDefault();
				this.closest(".section").classList.add("active");
				this.closest(".section").scrollIntoView({
					block: "start",
					behavior: "smooth",
				});
			});
		});
	}
	// Section call input absolute
	const callControls = document.querySelectorAll(".form_call .form-control");
	if (window.innerWidth <= 767 || window.innerHeight <= 599) {
		callControls.forEach((el) => {
			el.addEventListener("input", hideLabel);
			el.addEventListener("blur", hideLabel);
		});
	} else {
		callControls.forEach((el) => {
			el.removeEventListener("input", hideLabel);
			el.removeEventListener("blur", hideLabel);
		});
	}
	function hideLabel() {
		const label = this.closest(".box-field").querySelector(".box-field__label");
		if (this.value) {
			gsap.to(label, { opacity: 0, ease: "power4.out" });
		} else {
			gsap.to(label, { opacity: 1, ease: "power4.in" });
		}
	}
	// Test
	document.querySelector(".recall").addEventListener("click", (e) => {
		e.preventDefault();
	});
});
