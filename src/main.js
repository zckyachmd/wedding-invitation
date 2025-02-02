import { home } from "./js/home.js";
import { bride } from "./js/bride.js";
import { time } from "./js/time.js";
import { galeri } from "./js/galeri.js";
import { wishas } from "./js/wishas.js";
import { navbar } from "./js/navbar.js";
import { welcome } from "./js/welcome.js";
import { data } from "./assets/data/data.js";

const {
  L: { nickname: brideLName },
  P: { nickname: bridePName },
} = data.bride;

document.title = `Wedding Invitation / ${brideLName} & ${bridePName}`;

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true,
    easing: "ease-out",
    duration: 1000,
  });

  welcome();
  navbar();
  home();
  bride();
  time();
  galeri();
  wishas();
});
