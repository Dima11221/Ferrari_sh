import '../styles/style.scss';
import './filterCard.js';
import './footer.js';
import logoSrc from '../images/logo/logoPNG.png';
import videoSrc from '../videos/video1.webm';


//Блок констант
const logo = document.querySelector('.logo');
const banner = document.querySelector('.banner');
const burger = document.querySelector('.burger-btn');
const nav = document.querySelector('.header-nav');

// Функция отображения логотипа
const showLogo = (source) => {
    const logoPicture = document.createElement('img');
    if (source) {
        logoPicture.src = source;
        logoPicture.classList.add('logo_img');
        logo.appendChild(logoPicture);
    } else {
        logoPicture.alt = 'LuxCars';
    }
    return logoPicture;
}


//Функция отображения видео в баннере
const videoBanner = (videoFile) => {
    if (!videoFile) {
    } else {
        const videoElement = document.createElement('video');
        videoElement.src = videoFile;
        videoElement.controls = false
        videoElement.autoplay = true;
        videoElement.playsInline = true;
        videoElement.loop = true;
        videoElement.style.width = '100%';

        videoElement.muted = true;

        banner.prepend(videoElement);
        videoElement.play();
    }
    let videoElement;
    return videoElement;
}

//Бургер-меню
const burgerShowHide = (e) => {
    e.preventDefault();
    if (nav.classList.contains('header-nav-active')) {
        nav.classList.remove('header-nav-active')
    } else {
        nav.classList.add('header-nav-active');
    }
}

/* ********** */
showLogo(logoSrc);
videoBanner(videoSrc);
burger.addEventListener('click', burgerShowHide)