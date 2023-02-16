import "./style.scss"
import { weather } from "./data"
import pauseIcon from "./assets/icons/pause.svg"

const audio = document.getElementById("audio")
const rangeInputs = document.querySelector('input[type="range"]')
const body = document.querySelector("body")
const btn = document.querySelectorAll(".bnt")

function handleInputChange(e) {
	let target = e.target
	if (e.target.type !== "range") {
		target = document.getElementById("range")
	}
	const min = target.min
	const max = target.max
	const val = target.value

	target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%"

	audio.volume = target.value / 100
}

rangeInputs.addEventListener("input", handleInputChange)

let currentWeather = null
let pause = false

const handleBtnClick = (e) => {
	//При нажатии на кнопку отображается иконка паузы
	pause = !pause
	audio.pause()
	e.firstElementChild.setAttribute("src", pauseIcon)
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
			b.firstElementChild.setAttribute("src", `${weather[b.id].icon}`)
		}
	})

	if (!pause) {
		audio.play()
	} else {
		audio.pause()
		e.firstElementChild.setAttribute("src", `${weather[currentWeather].icon}`)
	}
}

btn.forEach((b) => {
	b.addEventListener("click", () => handleBtnClick(b))
	const itemIcon = document.createElement("img")
	itemIcon.setAttribute("height", "50")
	itemIcon.setAttribute("width", "50")
	itemIcon.src = weather[b.id].icon
	b.append(itemIcon)
})
