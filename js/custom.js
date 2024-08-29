const initHeartEffect = () => {
    const numHeartsPerGroup = 5; // Số lượng trái tim trong mỗi nhóm
    const totalGroups = 10; // Tổng số nhóm bạn muốn tạo
    const fallInterval = 5000; // Khoảng thời gian giữa các nhóm trái tim (2 giây)
    const animationDuration = 15; // Thay đổi thời gian hoạt hình tại đây

    function createHearts() {
        const viewportHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        for (let i = 0; i < numHeartsPerGroup; i++) {
            const heart = document.createElement('img');
            heart.src = '/images/icons/heart.png';
            heart.className = 'snowfall-flakes';
            heart.style.position = `fixed`; // Đặt kích thước ngẫu nhiên
            heart.style.width = `${Math.random() * 30 + 10}px`; // Đặt kích thước ngẫu nhiên
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

const initTimer = () => {
    let tgDate = new Date(2024, 8, 24, 0, 0);
    let timer = Timer.new(tgDate)
    let eDays = document.querySelector('#timer-days')
    let eHours = document.querySelector('#timer-hours')
    let eMinutes = document.querySelector('#timer-minutes')
    let eSeconds = document.querySelector('#timer-seconds')
    console.log(eDays)

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


document.addEventListener( 'DOMContentLoaded', () => {
    initHeartEffect()
    initTimer()
});
  
