import * as Promise from 'bluebird'
export const audioContext = new AudioContext();

export const manSamples = {
  a: '/SWAR1505_TalkingJpnM/00.mp3',
  b: '/SWAR1505_TalkingJpnM/01.mp3',
  c: '/SWAR1505_TalkingJpnM/02.mp3',
  d: '/SWAR1505_TalkingJpnM/03.mp3',
  e: '/SWAR1505_TalkingJpnM/04.mp3',
  f: '/SWAR1505_TalkingJpnM/05.mp3',
  g: '/SWAR1505_TalkingJpnM/06.mp3',
  h: '/SWAR1505_TalkingJpnM/07.mp3',
  i: '/SWAR1505_TalkingJpnM/57.mp3',
  j: '/SWAR1505_TalkingJpnM/58.mp3',
  k: '/SWAR1505_TalkingJpnM/41.mp3',
  l: '/SWAR1505_TalkingJpnM/42.mp3',
  m: '/SWAR1505_TalkingJpnM/43.mp3',
  n: '/SWAR1505_TalkingJpnM/44.mp3',
  o: '/SWAR1505_TalkingJpnM/45.mp3',
  p: '/SWAR1505_TalkingJpnM/46.mp3',
  q: '/SWAR1505_TalkingJpnM/47.mp3',
  r: '/SWAR1505_TalkingJpnM/48.mp3',
  s: '/SWAR1505_TalkingJpnM/49.mp3',
  t: '/SWAR1505_TalkingJpnM/31.mp3',
  u: '/SWAR1505_TalkingJpnM/32.mp3',
  v: '/SWAR1505_TalkingJpnM/33.mp3',
  w: '/SWAR1505_TalkingJpnM/34.mp3',
  x: '/SWAR1505_TalkingJpnM/35.mp3',
  y: '/SWAR1505_TalkingJpnM/36.mp3',
  z: '/SWAR1505_TalkingJpnM/37.mp3',
}

export const womanSamples = {
  a: '/SWAR1506_TalkingJpnF/11.mp3',
  b: '/SWAR1506_TalkingJpnF/12.mp3',
  c: '/SWAR1506_TalkingJpnF/13.mp3',
  d: '/SWAR1506_TalkingJpnF/14.mp3',
  e: '/SWAR1506_TalkingJpnF/15.mp3',
  f: '/SWAR1506_TalkingJpnF/16.mp3',
  g: '/SWAR1506_TalkingJpnF/17.mp3',
  h: '/SWAR1506_TalkingJpnF/18.mp3',
  i: '/SWAR1506_TalkingJpnF/19.mp3',
  j: '/SWAR1506_TalkingJpnF/20.mp3',
  k: '/SWAR1506_TalkingJpnF/21.mp3',
  l: '/SWAR1506_TalkingJpnF/62.mp3',
  m: '/SWAR1505_TalkingJpnF/23.mp3',
  n: '/SWAR1505_TalkingJpnF/24.mp3',
  o: '/SWAR1505_TalkingJpnM/00.mp3',
  p: '/SWAR1505_TalkingJpnF/26.mp3',
  q: '/SWAR1505_TalkingJpnF/27.mp3',
  r: '/SWAR1505_TalkingJpnF/28.mp3',
  s: '/SWAR1505_TalkingJpnF/29.mp3',
  t: '/SWAR1505_TalkingJpnF/30.mp3',
  u: '/SWAR1505_TalkingJpnF/31.mp3',
  v: '/SWAR1505_TalkingJpnF/32.mp3',
  w: '/SWAR1505_TalkingJpnF/33.mp3',
  x: '/SWAR1505_TalkingJpnF/34.mp3',
  y: '/SWAR1505_TalkingJpnF/35.mp3',
  z: '/SWAR1505_TalkingJpnF/36.mp3',
}

function sampleName(sample) {
  const separated = sample.split('/')
  return separated[separated.length - 1].replace('.', '_')
}

const pathToAudio = sample => {
  const sound = new Audio(sample)
  sound.type = "audio/wav"
  const id = sampleName(sample)
  sound.id = id
  
  document.body.appendChild(sound)

  const track = audioContext.createMediaElementSource(sound)
  track.connect(audioContext.destination)
  return sound
}

let state = {
  playing: false,
  speechSpeed: 30,
};

// Source (mediaElement)
export const manSampleMap = Object.keys(manSamples).reduce((map, symbol) => {
  const path = manSamples[symbol]
  const audio = pathToAudio(path)
  map[symbol] = audio
  return map;
}, {})

export function playSound(audio) {
  return new Promise((resolve, reject) => {
    if (!audio) reject('No audio')
    audio.play()
    const cb = () => {
      resolve(audio)
      audio.removeEventListener('ended', cb);
    }
    audio.addEventListener('ended', cb)
  })
}

export function playWord(word, sampleMap) {
  word = word.toLowerCase()
  const chars = word.split('').filter((_, i) => (i + 1) % 2)
  const sounds = chars.map(char => sampleMap[char])
  return Promise.mapSeries(sounds, playSound)
}

export function playSentence(sentence, sampleMap) {
  const sentences = sentence.match(/[A-Za-z]+/g)
  if (sentences) {
    return Promise.mapSeries(sentences, word => {
      return playWord(word, sampleMap)
    })
  }
  return Promise.resolve()
}