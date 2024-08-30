const Timer = {}

Timer.countDown = function() {
    if (this.seconds > 0) {
        this.seconds = this.seconds - 1
    }
    else if (this.minutes > 0) {
        this.seconds = 59
        this.minutes = this.minutes - 1
    }
    else if (this.hours > 0) {
        this.seconds = 59
        this.minutes = 59
        this.hours = this.hours - 1
    }
    else if (this.days > 0) {
        this.seconds = 59
        this.minutes = 59
        this.hours = 23
        this.days = this.days - 1
    }
    else {
        this.days = 0
    }
}

Timer.new = (targetDate) => {
    let now = new Date();
    let diffMs = targetDate - now;

    // Day extraction
    let mult = 1000 * 60 * 60 * 24
    let days = Math.floor(diffMs / mult)
    diffMs = diffMs - days * mult

    // Hour extraction
    mult = 1000 * 60 * 60
    let hours = Math.floor(diffMs / mult)
    diffMs = diffMs - hours * mult

    mult = 1000 * 60
    let minutes = Math.floor(diffMs / mult)
    diffMs = diffMs - minutes * mult

    mult = 1000
    let seconds = Math.floor(diffMs / mult)
    diffMs = diffMs - seconds * mult

    let timer = {
        "seconds": seconds,
        "minutes": minutes,
        "hours": hours,
        "days": days,
    }
    timer.countDown = Timer.countDown.bind(timer)
    return timer
}
