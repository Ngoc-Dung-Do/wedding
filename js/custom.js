const onload = () => {
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


document.addEventListener( 'DOMContentLoaded', onload);
