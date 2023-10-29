import users from './db.js'

window.addEventListener("load", function () {
    const elSpin = document.getElementById("spin");
    const elSpinImage = document.getElementById("spin-image");
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext("2d")
    canvas.width = 1000
    canvas.height = 1000

    const PI = Math.PI
    const TAU = 2 * PI
    const diameter = ctx.canvas.width
    const radius = diameter / 2

    let points = users.reduce((acc, curr) => acc + curr.points, 0) // All users points
    let winner = 0 // Custom win position 
    let winnerPos = 0 // Custom win position + number of revolutions
    let animFrame = null;
    let angVelMin = 0.0002 // Min speed
    let winnerDelay = 0 // Delay after stop
    let isSpinning = false
    let ang = 0 // Wheel top position

    const fixed = (n) => Number(n.toFixed(12))
    const rand = (m, M) => Math.random() * (M - m) + m;
    const getWinner = () => Math.round(Math.random() * TAU)


    function getActiveUser () {
        let position = (fixed(ang) - fixed(TAU)) * -1
        return users.find(x => fixed(x.position[0]) <= position && fixed(x.position[1]) >= position)
    }

    function drawSector(user) {
        let arc = TAU * (user.points / points)
        user.position = [ang,  ang + arc]
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = user.color
        ctx.moveTo(radius, radius)
        ctx.arc(radius,radius, radius, ang, ang + arc)
        ctx.lineTo(radius, radius)
        ctx.fill();
        ctx.restore();

        ang += arc;;
    }

    function rotate() {
        let user = getActiveUser()
        ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
        elSpin.style.background = user.color;

        if (isSpinning) {
            elSpinImage.classList.remove("spin-button")
            elSpinImage.style.backgroundImage = `url(${user.img})`;
            elSpinImage.style.backgroundPosition = 'center'
            elSpinImage.innerHTML = ''
        } else {
            elSpinImage.classList.add("spin-button")
            elSpinImage.style.background = 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)'
            elSpinImage.style.backgroundSize = '100%'
            elSpinImage.style.boxShadow = '0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset'
            elSpinImage.innerHTML = 'Start'
        }
    }  

    function spin () {
        winner = getWinner()
        if (isSpinning) return
        isSpinning = true
        winnerPos = Math.round(rand(2, 3)) * TAU - winner
        engine();
    }

    function engine() {
        frame();
        animFrame = requestAnimationFrame(engine)
    };

    function drowCircle () {
        ctx.beginPath();
        ctx.strokeStyle = 'RGB(255, 255, 255)'
        ctx.lineWidth = 5;
        ctx.arc(radius, radius, radius - 5 / 2, 0, TAU, true);
        ctx.stroke();
    }

    function frame () {
        if (!isSpinning) return

        if (winnerPos === 0) {
            isSpinning = false;
            winnerDelay = 1000
            cancelAnimationFrame(animFrame);
        }

        let speed = winnerPos / 100 + 0.00005 
        winnerPos -= speed

        if (winnerPos < angVelMin) {
            winnerPos = 0
        }
        
        ang +=  speed 
        ang %= TAU; 
    
        setTimeout(() => {
            rotate();
            winnerDelay = 0
        }, winnerDelay)
    }

    elSpin.addEventListener("click", spin)
    users.forEach(drawSector) // Get random collors 
    drowCircle()
    rotate()

    setTimeout(() => spin(), 1000)
})