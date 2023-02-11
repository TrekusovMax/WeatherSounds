import './style.scss'

const audio = document.getElementById('audio')
const rangeInputs = document.querySelector('input[type="range"]')
const body = document.querySelector('body')
const btn = document.querySelectorAll('.bnt')

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  }
  const min = target.min
  const max = target.max
  const val = target.value

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%'

  audio.volume = target.value / 100
}

rangeInputs.addEventListener('input', handleInputChange)

const weather = {
  summer: 'summer.mp3',
  rain: 'rain.mp3',
  winter: 'winter.mp3',
}
const icons = {
  summer: 'sun.svg',
  rain: 'cloud-rain.svg',
  winter: 'cloud-snow.svg',
}
let currentWeather = null
let pause = false

const handleBtnClick = (e) => {
  //При нажатии на кнопку отображается иконка паузы
  pause = !pause
  audio.pause()
  e.firstElementChild.firstElementChild.setAttribute('href', 'pause.svg')
  //если нажали на другую кнопку, пауза снимается и меняется иконка другой кнопки
  if (currentWeather !== e.id) {
    pause = false
    currentWeather = weather[e.id].slice(0, -4)
    //смена аудио
    audio.src = `./sounds/${weather[currentWeather]}`
    //смена фона
    body.style.backgroundImage = `url('./image/${currentWeather}-bg.jpg')`
  }
  //перерисовка иконок на кнопках
  btn.forEach((b) => {
    if (b.id !== currentWeather) {
      b.firstElementChild.firstElementChild.setAttribute(
        'href',
        `${icons[b.id]}`,
      )
    }
  })

  if (!pause) {
    audio.play()
  } else {
    e.firstElementChild.firstElementChild.setAttribute(
      'href',
      `${icons[currentWeather]}`,
    )
  }
}

btn.forEach((b) => {
  b.addEventListener('click', () => handleBtnClick(b))
})
