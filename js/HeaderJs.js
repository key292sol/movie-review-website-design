const documentRoot = document.querySelector(":root");
const darkModeSwitch = document.getElementById("dark_mode_switch");

const sideMenuButton = document.getElementsByClassName("menu-button")[0];
const sideMenu = document.getElementsByClassName("side-menu-section")[0];

function toggleDarkMode() {
	if (darkModeSwitch.checked) {
		documentRoot.classList.add("dark");
		localStorage.setItem("pref-theme", "dark");
	} else {
		documentRoot.classList.remove("dark");
		localStorage.setItem("pref-theme", "light");
	}
}

function toggleSideMenu() {
	let isOpen = sideMenuButton.classList.contains("open");

	if (isOpen) {
		sideMenuButton.classList.remove("open");
		sideMenu.classList.remove("open");
	} else {
		sideMenuButton.classList.add("open");
		sideMenu.classList.add("open");
	}
}

function toggleSideMenuOption() {
	this.parentNode.classList.toggle("open");
}

{
	let checkForDarkMode = () => {
		let hasDarkMode = (localStorage.getItem("pref-theme") == "dark");
		if (hasDarkMode) {
			documentRoot.classList.add("dark");
			darkModeSwitch.checked = true;
		}
	}

	(function setHeaderStuff() {
		darkModeSwitch.addEventListener("change", toggleDarkMode);
		checkForDarkMode();

		let sideOptionOpeners = sideMenu.getElementsByClassName("more-less");
		for (const open of sideOptionOpeners) {
			open.addEventListener("click", toggleSideMenuOption);
		}

		let sideMenuOptions = sideMenu.getElementsByClassName("menu-option-list");
		for (const el of sideMenuOptions) {
			el.style.setProperty("--my-max-height", el.scrollHeight + "px");
		}
	})();
}


function getURLData(url) {
    let queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, k, v, kv;

    if (query === url || query === "") return {};

    for (i = 0; i < pairs.length; i++) {
        kv = pairs[i].split("=", 2);
        k = decodeURIComponent(kv[0]);
        v = decodeURIComponent(kv[1]);

        if (!parms.hasOwnProperty(k)) parms[k] = [];
        parms[k].push(kv.length === 2 ? v : null);
    }
    return parms;
}