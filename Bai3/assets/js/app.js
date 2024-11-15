const appWrapper = document.querySelector('.app');
const appBackground = document.querySelector('.app__bg');
const slideWrapper = document.querySelector('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slideItem = document.querySelectorAll('.slide-item');

const appBgImage = document.querySelectorAll('.app__bg--image');

let prevSlide = document.querySelector('.prev-slide');
let currentSlide = document.querySelector('.current-slide');
let nextSlide = document.querySelector('.next-slide');


const dogApi = 'https://dog.ceo/api/breeds/image/random/3';

let imgDog;

console.log("Check imgDog: ", imgDog);


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
    generateBackgroundImage: function (imageUrl) {
        htmls = ``;

        htmls += `
            <div class="app__bg--image bg__current--image">
                <img src="${imageUrl.message[1]}" alt="" />
            </div>
            <div class="app__bg--image bg__next--image">
                <img src="${imageUrl.message[0]}" alt="" />
            </div>
            <div class="app__bg--image bg__prev--image">
                <img src="${imageUrl.message[2]}" alt="" />
            </div>
        `
        appBackground.innerHTML = htmls;

    },
    renderImages: function (images) {
        slideItem.forEach((item, index) => {
            item.style.backgroundImage = `url('${images.message[index]}')`
        })
        this.generateBackgroundImage(images);
    },
    displayImg: function () {
        this.renderImages(imgDog);
    },
    handleEvent: function () {

    },
    start: async function () {
        await this.getImageDog();

        this.displayImg();

        this.handleEvent();

    }
}

app.start();