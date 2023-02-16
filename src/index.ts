import './style.scss'
import { weather } from './data'
import pauseIcon from './assets/icons/pause.svg'

const audio = document.getElementById('audio') as HTMLAudioElement
const rangeInputs = document.getElementById('range') as HTMLInputElement
const body = document.querySelector('body') as HTMLBodyElement
const btn = document.querySelectorAll('.bnt') as NodeListOf<HTMLElement>

function handleInputChange(event: Event): void {
  const min: number = Number(rangeInputs.min)
  const max: number = Number(rangeInputs.max)
  const val: number = Number(rangeInputs.value)
  rangeInputs.style.backgroundSize =
    ((val - min) * 100) / (max - min) + '% 100%'

  audio.volume = Number(rangeInputs.value) / 100
}

rangeInputs.addEventListener('input', handleInputChange)

let currentWeather: string = null
let pause = false

const handleBtnClick = (e: HTMLElement): void => {
  //При нажатии на кнопку отображается иконка паузы
  pause = !pause
  audio.pause()
  e.firstElementChild.setAttribute('src', pauseIcon)
  //если нажали на другую кнопку, пауза снимается и меняется иконка другой кнопки
  if (currentWeather !== e.id) {
    pause = false
    currentWeather = e.id
    //смена аудио
    audio.src = `${weather[currentWeather].sound}`
    //смена фона
    body.style.backgroundImage = `url(${weather[currentWeather].weatherBg})`
  }
  //перерисовка иконок на кнопках
  btn.forEach((b) => {
    if (b.id !== currentWeather) {
      b.firstElementChild.setAttribute('src', `${weather[b.id].icon}`)
    }
  })

  if (!pause) {
    audio.play()
  } else {
    audio.pause()
    e.firstElementChild.setAttribute('src', `${weather[currentWeather].icon}`)
  }
}

btn.forEach((b: HTMLElement) => {
  b.addEventListener('click', () => handleBtnClick(b))
  const itemIcon = document.createElement('img')
  itemIcon.setAttribute('height', '50')
  itemIcon.setAttribute('width', '50')
  itemIcon.src = weather[b.id].icon
  b.append(itemIcon)
})
