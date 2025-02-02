import { data } from "../assets/data/data.js";
import {
  addClassElement,
  getQueryParameter,
  removeClassElement,
} from "../utils/helper.js";

export const welcome = () => {
  const welcomeElement = document.querySelector(".welcome");
  const homeElement = document.querySelector(".home");
  const navbarElement = document.querySelector("header nav");

  const [_, figureElement, weddingToElement, openWeddingButton] =
    welcomeElement.children;
  const [audioMusic, audioButton] = document.querySelector(".audio").children;
  const [iconButton] = audioButton.children;

  let isPlaying = false;
  let wasPlaying = false;
  let isTabActive = true;
  let pauseTimeout;

  const generateFigureContent = (bride) => {
    const {
      L: { nickname: brideLName },
      P: { nickname: bridePName },
      couple: coupleImage,
    } = bride;
    return `<img src="${coupleImage}" alt="couple animation">
    <figcaption>${brideLName} & ${bridePName}</figcaption>`;
  };

  const generateParameterContent = () => {
    const name = document.querySelector("#name");
    const params = getQueryParameter("to");

    if (params) {
      weddingToElement.innerHTML = `Kepada Yth Bapak/Ibu/Saudara/i<br><span>${params}</span>`;
      name.value = params;
    } else {
      weddingToElement.innerHTML = `Kepada Yth Bapak/Ibu/Saudara/i<br><span>Teman-teman semua</span>`;
    }
  };

  const playAudio = () => {
    addClassElement(audioButton, "active");
    removeClassElement(iconButton, "bx-play-circle");
    addClassElement(iconButton, "bx-pause-circle");
    audioMusic.play();
    wasPlaying = isPlaying = true;
  };

  const pauseAudio = () => {
    removeClassElement(audioButton, "active");
    removeClassElement(iconButton, "bx-pause-circle");
    addClassElement(iconButton, "bx-play-circle");
    audioMusic.pause();
    isPlaying = false;
  };

  const initialAudio = () => {
    audioMusic.innerHTML = `<source src=${data.audio.source} type="audio/mp3"/>`;

    audioButton.addEventListener("click", () => {
      isPlaying ? pauseAudio() : playAudio();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        wasPlaying = isPlaying;
        if (data.audio.pauseTimeout > 0) {
          pauseTimeout = setTimeout(() => {
            if (!document.hidden && wasPlaying) return;
            pauseAudio();
          }, data.audio.pauseTimeout);
        }
      } else {
        clearTimeout(pauseTimeout);
        if (wasPlaying) playAudio();
      }
    });

    window.addEventListener("blur", () => {
      if (isPlaying && data.audio.pauseTimeout > 0) {
        wasPlaying = true;
        setTimeout(() => {
          pauseAudio();
        }, data.audio.pauseTimeout);
      }
      isTabActive = false;
    });

    window.addEventListener("focus", () => {
      isTabActive = true;
      if (wasPlaying && isTabActive) {
        setTimeout(() => {
          if (document.hasFocus() && wasPlaying) {
            playAudio();
          }
        }, 100);
      }
    });
  };

  openWeddingButton.addEventListener("click", () => {
    addClassElement(document.body, "active");
    addClassElement(welcomeElement, "hide");

    window.scrollTo(0, 0);

    setTimeout(() => {
      addClassElement(homeElement, "active");
      addClassElement(navbarElement, "active");
      addClassElement(audioButton, "show");

      if (data.audio.autoPlay) {
        playAudio();
      }
    }, 1500);

    setTimeout(() => {
      addClassElement(audioButton, "active");
    }, 3000);
  });

  const initializeWelcome = () => {
    figureElement.innerHTML = generateFigureContent(data.bride);
    generateParameterContent();
    addClassElement(welcomeElement, "active");
  };

  initializeWelcome();
  initialAudio();
};
