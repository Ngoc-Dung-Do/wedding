// Carousel initialization
// =======================
const carouselItem = (imageLink, i) => {
    const img = document.createElement("img")
    img.src = imageLink
    img.className = "d-block w-100 carousel-img"
    img.alt = `image-${i}`

    const div = document.createElement("div")
    if (i > 0) {
        div.className = "carousel-item"
    } else {
        div.className = "carousel-item active"
    }
    div.appendChild(img)

    return div
}

const initCarousel = () => {
    const cInner = document.querySelector(".carousel-inner")
    carouselImages.forEach((imageLink, i) => {
        const item = carouselItem(imageLink, i);
        cInner.appendChild(item);
    })

    const carousel = new bootstrap.Carousel('#mycarousel')
    carousel.cycle()
}

/* Setup music button */
/* ================== */
const initMusic = () => {
    const audio = new Audio('/musics/em-ve-tinh-khoi.mp3');
    const audioButton = document.querySelector('#music-button')
    const audioIcon = document.querySelector('#music-button-icon')

    let playing = true
    let update = () => {
        if (playing) {
            audio.pause();
            audioIcon.innerText = "music_off"
        }
        else {
            audio.play();
            audioIcon.innerText = "music_note"
        }
        playing = !playing;
    }
    update()

    audioButton.addEventListener("click", update);
}

// Falling sprites
// ===============
const initHeartEffect = () => {
    const numHeartsPerGroup = 1; // Số lượng trái tim trong mỗi nhóm
    const totalGroups = 100; // Tổng số nhóm bạn muốn tạo
    const fallInterval = 200; // Khoảng thời gian giữa các nhóm trái tim (2 giây)
    const animationDuration = 15; // Thay đổi thời gian hoạt hình tại đây
    const choices = [
        'chem-1.png',
        'chem-2.png',
        'chem-3.png',
        'chem-4.png',
        'chem-5.png',
        'chem-6.svg',
        'math-1.png',
        'math-2.png',
        'math-3.png',
        'math-4.png',
        'math-5.png',
        'math-6.png',
    ]

    const hearts = [
        "heart-1.svg",
        "heart-2.svg",
        "heart-3.png",
        "heart-4.png",
        "heart-5.svg",
    ]

    const randChoice = (lst) => {
        let n = lst.length;
        let i = Math.floor(Math.random() * n);
        return lst[i]
    }

    function createHearts() {
        const viewportHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        for (let i = 0; i < numHeartsPerGroup; i++) {
            const heart = document.createElement('img');
            if (Math.random() < 0.6667) {
                heart.src = `/images/icons/${randChoice(hearts)}`;
            } else {
                heart.src = `/images/icons/${randChoice(choices)}`;
            }
            heart.className = 'snowfall-flakes';
            heart.style.position = `fixed`; // Đặt kích thước ngẫu nhiên
            heart.style.width = `${Math.random() * 40 + 20}px`; // Đặt kích thước ngẫu nhiên
            heart.style.left = `${Math.random() * 100}vw`; // Đặt vị trí ngẫu nhiên trên trục ngang
            heart.style.top = `-${Math.random() * viewportHeight}px`; // Bắt đầu từ vị trí trên cùng

            document.body.appendChild(heart);

            // Cập nhật hoạt hình với thời gian mới
            heart.style.animation = `fall ${animationDuration}s linear infinite`;
        }
    }

    function startFallingHearts() {
        let groupCount = 0;

        const intervalId = setInterval(() => {
            createHearts();
            groupCount++;

            // Dừng lại khi đã tạo đủ nhóm
            if (groupCount >= totalGroups) {
                clearInterval(intervalId);
            }
        }, fallInterval);
    }

    startFallingHearts();
};

// Countdown
// =========
const initTimer = () => {
    let tgDate = new Date(2024, 8, 24, 0, 0);
    let timer = Timer.new(tgDate)
    let eDays = document.querySelector('#timer-days')
    let eHours = document.querySelector('#timer-hours')
    let eMinutes = document.querySelector('#timer-minutes')
    let eSeconds = document.querySelector('#timer-seconds')

    let updateTimer = () => {
        eDays.innerText = timer.days.toString().padStart(2, "0");
        eHours.innerText = timer.hours.toString().padStart(2, "0");
        eMinutes.innerText = timer.minutes.toString().padStart(2, "0");
        eSeconds.innerText = timer.seconds.toString().padStart(2, "0");
    }
    updateTimer()
    setInterval(() => {
        timer.countDown()
        updateTimer()
    }, 1000)
    /* Initialize carousel */
    // let eCarousel = document.querySelector('#carousel')
    // let carousel = new bootstrap.Carousel(eCarousel)
    // console.log(carousel)
    // var splide = new Splide( '.splide' );
    // splide.mount();
}

// Gallery
const initGallery = () => {
    let gallery = lightGallery(document.getElementById('lightgallery'), {
        plugins: [lgZoom, lgThumbnail, lgAutoplay],
        speed: 500,
    });
    let btnViewGallery = document.getElementById("gallery-view-more")
    btnViewGallery.addEventListener("click", () => {
        gallery.openGallery(8)
    })
}

document.addEventListener( 'DOMContentLoaded', () => {
    // playMusic();
    initMusic();
    initHeartEffect();
    initTimer();
    initGallery();
});

