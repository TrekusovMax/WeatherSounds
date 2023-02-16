import sunIcon from './assets/icons/sun.svg'
import rainIcon from './assets/icons/cloud-rain.svg'
import winterIcon from './assets/icons/cloud-snow.svg'
import summerBg from './assets/summer-bg.jpg'
import rainyBg from './assets/rain-bg.jpg'
import winterBg from './assets/winter-bg.jpg'
import summerSound from './assets/sounds/summer.mp3'
import rainSound from './assets/sounds/rain.mp3'
import winterSound from './assets/sounds/winter.mp3'

export const weather = {
  summer: {
    sound: summerSound,
    icon: sunIcon,
    weatherBg: summerBg,
  },
  rain: {
    sound: rainSound,
    icon: rainIcon,
    weatherBg: rainyBg,
  },
  winter: {
    sound: winterSound,
    icon: winterIcon,
    weatherBg: winterBg,
  },
}
