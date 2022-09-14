const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const nuvem = document.querySelector('.clouds')
const nuvem2 = document.querySelector('.clouds2')
const contador = document.querySelector('.count')
const contador2 = document.querySelector('.count2')
const gameover = document.querySelector('.game-over')
const reset = document.querySelector('.reset')
const inicio = document.querySelector('.game-on')
const time = document.querySelector('.tempo')
const time2 = document.querySelector('.tempo2')

var count = 0
var ss = 0
var mm = 0

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump')

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
}

function TwoNumbers(number) {
    if (number < 10) {
        return ('0' + number)
    } else {
        return number
    }
}

function watch() {
    ss++
    if (ss == 60) {
        mm++
        ss = 0;
    }
}

function play() {
    
    
    const cronometro = setInterval(watch, 1000);
    
    
    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const nuvemPosition = nuvem.offsetLeft;
        const nuvemPosition2 = nuvem2.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        
        time.innerHTML = `${TwoNumbers(mm)}:${TwoNumbers(ss)}`
        time2.innerHTML = `${TwoNumbers(mm)}:${TwoNumbers(ss)}`

        console.log(pipePosition)
        if (pipePosition <= 120 && marioPosition < 105 && pipePosition > 0) {

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.bottom = `${marioPosition}px`

            mario.src = './src/images/game-over.png'
            mario.style.width = '82px'
            mario.style.marginLeft = '50px'

            nuvem.style.animation = ''
            nuvem.style.left = `${nuvemPosition}px`;

            nuvem2.style.animation = ''
            nuvem2.style.left = `${nuvemPosition2}px`;

            gameover.style.display = 'block'

            contador.style.display = 'none'
            contador2.style.display = 'block'
            time.style.display = 'none'
            time2.style.display = 'block'

            inicio.classList.add('start')

            clearInterval(loop);
            clearInterval(cronometro);

            ss = 00
            mm = 00
            count = 0
            time.innerHTML = `${TwoNumbers(00)}:${TwoNumbers(00)}`


            reset.addEventListener('click', () => {
                nuvem.style.animation = 'clouds-animation 18s infinite linear';
                nuvem2.style.animation = 'clouds-animation2 24s infinite linear';
                resetarB();
                reset.removeEventListener('click', resetarB)
            })
        } else if (pipePosition <= 120) {
            count++;
            contador.textContent = `${count}`;
            contador2.textContent = `${count}`;
        }
    }, 40)
}

const start = () => {
    inicio.classList.add('start')
    if (inicio.classList.contains('start')) {
        pipe.style.left = '-80px';
        pipe.style.animation = 'none';
        contador.style.display = 'none';
    }
}

const restart = () => {
    inicio.style.display = 'none'
    pipe.style.left = `` 
    pipe.style.animation = 'pipe-animation 0.9s infinite linear';
    nuvem.style.animation = 'clouds-animation 18s infinite linear';
    nuvem.style.left = '';
    nuvem2.style.left = '';
    nuvem2.style.animation = 'clouds-animation2 24s infinite linear';
    nuvem2.style.bottom = '170px';
    contador.style.display = 'block';
    contador.textContent = 0;
    contador2.textContent = 0;
    time.style.display = 'block';
    gameover.style.display = 'none';
    mario.src = './src/images/mario.gif'
    mario.style.marginLeft = '0';
    mario.style.width = '150px';
    mario.style.bottom = '0';
}


function resetarB() {
    reset.addEventListener('click', () => {
        if (inicio.classList.contains('start')) {
            inicio.style.display = 'none'
            inicio.classList.remove('start')
            restart();
            play();
        }
    })
}

function resetar() {
    window.addEventListener('keyup', (e) => {
        if (e.key === " " && inicio.classList.contains('start')) {
            inicio.style.display = 'none'
            inicio.classList.remove('start')
            restart();
            play();
        }
    });
}


document.addEventListener('keydown', (e) => {
    if (e.key === " ") {
        jump();
    }
});

start();
resetar();



