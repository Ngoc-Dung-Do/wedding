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
const initMusic = async () => {
    const audio = new Audio(`/wedding/musics/em-ve-tinh-khoi.ogg`);
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
    const numHeartsPerGroup = 5; // Số lượng trái tim trong mỗi nhóm
    const totalGroups = 10; // Tổng số nhóm bạn muốn tạo
    const fallInterval = 2000; // Khoảng thời gian giữa các nhóm trái tim (2 giây)
    const animationDuration = 15; // Thay đổi thời gian hoạt hình tại đây

    const sprites = Array.from(
        document.querySelectorAll("meta[name='sprite']")
    ).map(meta => meta.getAttribute("content"))
    const funSprites = sprites.filter(x => x.search('heart') === -1)
    const heartSprites = sprites.filter(x => x.search('heart') > 0)
    console.log(heartSprites)
    console.log(funSprites)

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
                heart.src = randChoice(heartSprites);
            } else {
                heart.src = randChoice(funSprites);
            }
            heart.className = 'snowfall-flakes';
            heart.style.position = `fixed`; // Đặt kích thước ngẫu nhiên
            heart.style.width = `${Math.random() * 10 + 20}px`; // Đặt kích thước ngẫu nhiên
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
// =======
const initGallery = () => {
    // init Light Gallery
    let gallery = lightGallery(document.getElementById('lightgallery'), {
        plugins: [lgZoom, lgThumbnail, lgAutoplay],
    });
    let btnViewGallery = document.getElementById("gallery-view-more")
    btnViewGallery.addEventListener("click", () => {
        gallery.openGallery()
    })
}

// meta variables
// ==============
const getMetaVar = (name) => {
    let elem = document.querySelector(`meta[name="${name}"]`)
    return elem.content
}

// init modal
// ==========
const initModal = () => {
    const modal = document.querySelector(".donate-modal")
    const btnOpen = document.querySelector(".donate-open")
    const fabOpen = document.querySelector("#fab-donate")
    const btnClose = document.querySelector(".donate-close")

    const openModal = () => {
        modal.style.display = "flex";
    }
    const closeModal = () => {
        modal.style.display = "none";
    }

    btnOpen.addEventListener("click", openModal)
    fabOpen.addEventListener("click", openModal)
    btnClose.addEventListener("click", closeModal)
    console.log(modal)
}

// github API for comments
// this is dangerous, this is a special case though
const GH_TOKEN = atob("Z2l0aHViX3BhdF8xMUJLMjRWNlkwV0FQRnZMeEFrZUNHX3Zyc0xENU5WOXF3NTVIMkdEVDNjcFlUeE42S1pkMjBVZE55cE9GMVI1WU1TQTJKN0U3S0djc1cxOTNnIA==")
const COMMENTS_URL = "https://api.github.com/repos/Ngoc-Dung-Do/wedding/issues/1/comments"

const getGhHeaders = () => {
    const headers = {}
    headers["Accept"] = "application/vnd.github+json"
    headers["Authorization"] = `Bearer ${GH_TOKEN}`
    headers["X-GitHub-Api-Version"] = "2022-11-28"
    return headers
}

const addWish = async (name, comment) => {
    const body = {name: name, comment: comment}
    try {
        const res = await fetch(COMMENTS_URL, {
            method: "POST",
            headers: getGhHeaders(),
            body: JSON.stringify({body: JSON.stringify(body)})
        })
        return res.ok
    }
    catch (err) {
        return err.toString()
    }
}

const getWishes = async () => {
    try {
        const res = await fetch(COMMENTS_URL, {
            method: 'GET',
            headers: getGhHeaders(),
            redirect: 'follow'
        })
        const data = await res.json();
        const comments = data.map(comment => {
            try {
                const parsed = JSON.parse(comment["body"])
                return {
                    comment: parsed.comment,
                    name: parsed.name,
                    blacklist: (comment["reactions"]["-1"] > 0) 
                        || (comment["user"]["login"] != "Ngoc-Dung-Do"),
                }
            } catch (err) {
                return false
            }
        })
        return comments.filter(x => x)
    }
    catch (error) {
        return error.toString()
    }
}

const initWishBox = () => {
    const eWishBox = document.getElementById("wish-box")
    const eWishName = document.querySelector("input[name='wish-name']")
    const eWishContent = document.querySelector("textarea[name='wish-content']")
    const eWishSubmit = document.querySelector("button[name='wish-submit']")

    const makeWishElement = (name, content) => {
        let ewish = document.createElement("li")
        let ename = document.createElement("span")
        let econtent = document.createElement("span")
        ename.innerText = name
        econtent.innerText = content
        ewish.appendChild(ename)
        ewish.appendChild(econtent)
        eWishBox.prepend(ewish)
    }

    /* On first load, get all wishes */
    getWishes().then(wishes => {
        eWishBox.innerHTML = ""
        wishes.filter(wish => !wish.blacklist)
            .map(wish => makeWishElement(wish.name, wish.comment))
    }).catch(err => {
        eWishBox.innerHTML = (
            `<p>Có lỗi xảy ra khi tải lời chúc:</p>${err.toString()}`
        )
    })

    /* On submit, just append the wish */
    eWishSubmit.addEventListener("click", () => {
        const wishName = eWishName.value.trim()
        const wishContent = eWishContent.value.trim()

        if (wishName.length == 0) {
            alert("Vui lòng nhập tên");
            return;
        }

        if (wishContent.length == 0) {
            alert("Vui lòng nhập lời chúc");
            return;
        }

        addWish(wishName, wishContent).then(_ => {
            makeWishElement(wishName, wishContent)
            eWishName.value = ""
            eWishContent.value = ""
        }).catch(err => {
            alert("Lỗi hệ thống xảy ra khi gửi lời chúc")
            console.log(err)
        })
    })
}

document.addEventListener( 'DOMContentLoaded', () => {
    initWishBox()
    initHeartEffect();
    initTimer();
    initGallery();
    initModal();
    initMusic().then(console.log); // heavy, loaded last
});

