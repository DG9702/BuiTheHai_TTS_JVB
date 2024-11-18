const appWrapper = document.querySelector('.app');
const appBackground = document.querySelector('.app__bg');
const slideWrapper = document.querySelector('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slideItem = document.querySelectorAll('.slide-item');

const appBgImage = document.querySelectorAll('.app__bg--image');

//element slide
let prevSlide = document.querySelector('.prev-slide');
let currentSlide = document.querySelector('.current-slide');
let nextSlide = document.querySelector('.next-slide');
//background slide
let prevBgImage = document.querySelector('.bg__prev--image');
let currentBgImage = document.querySelector('.bg__current--image');
let nextBgImage = document.querySelector('.bg__next--image');


const dogApi = 'https://dog.ceo/api/breeds/image/random/3';

let imgDog;

const app = {
    getImageDog: async function () {
        try {
            const response = await fetch(dogApi);

            const data = await response.json();

            imgDog = data;
            console.log("Check imgDOg: ", imgDog);

        } catch (error) {
            console.error('Error fetching dog images:', error);
            return [];
        }
    },
    renderImages: function (images) {
        slideItem.forEach((item, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = `${images.message[index]}`
            item.appendChild(imgElement);
        })
        appBgImage.forEach((item, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = `${images.message[index]}`
            item.appendChild(imgElement);
        });
    },
    displayImg: function () {
        this.renderImages(imgDog);
    },
    handleEvent: function () {
        function swapImage() {
            slideItem.forEach(item => {
                item.classList.remove('prev-slide', 'current-slide', 'next-slide');
            });

            prevSlide.classList.add('prev-slide');
            currentSlide.classList.add('current-slide');
            nextSlide.classList.add('next-slide');
        }

        prevBtn.addEventListener("click", function () {

        })
        nextBtn.addEventListener("click", function () {

        })
    },
    start: async function () {
        await this.getImageDog();

        this.displayImg();

        this.handleEvent();

    }
}

app.start();