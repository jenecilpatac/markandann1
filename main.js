// ===== Invitation Envelope =====
const envelopeOverlay = document.getElementById('envelope-overlay')
const envelope = document.getElementById('envelope')
const envelopeHint = document.getElementById('envelope-hint')

let envelopeOpened = false

function openEnvelope() {
  if (envelopeOpened) return
  envelopeOpened = true

  envelope.classList.add('opening')
  envelopeHint.style.opacity = '0'

  if (!isPlaying) {
    startMusic()
  }

  setTimeout(() => {
    envelopeOverlay.classList.add('hidden')
    document.body.style.overflow = ''
    setTimeout(() => {
      envelopeOverlay.style.display = 'none'
    }, 1100)
  }, 1400)
}

envelope.addEventListener('click', openEnvelope)
document.addEventListener('keydown', (e) => {
  if (!envelopeOpened && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault()
    openEnvelope()
  }
})

document.body.style.overflow = 'hidden'

// ===== Falling Petals =====
const canvas = document.getElementById('petals')
const ctx = canvas.getContext('2d')

let petals = []
const petalColors = [
  'rgba(244, 222, 222, 0.8)',
  'rgba(232, 197, 197, 0.7)',
  'rgba(201, 137, 159, 0.6)',
  'rgba(253, 248, 243, 0.8)',
  'rgba(248, 215, 220, 0.7)',
]

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resizeCanvas()
window.addEventListener('resize', resizeCanvas)

class Petal {
  constructor() {
    this.reset()
    this.y = Math.random() * canvas.height
  }

  reset() {
    this.x = Math.random() * canvas.width
    this.y = -20
    this.size = Math.random() * 8 + 4
    this.speedY = Math.random() * 0.8 + 0.3
    this.speedX = Math.random() * 0.6 - 0.3
    this.angle = Math.random() * Math.PI * 2
    this.angleSpeed = (Math.random() * 0.02 - 0.01)
    this.swayAmplitude = Math.random() * 1.5 + 0.5
    this.swayOffset = Math.random() * Math.PI * 2
    this.color = petalColors[Math.floor(Math.random() * petalColors.length)]
    this.opacity = Math.random() * 0.4 + 0.4
  }

  update(time) {
    this.y += this.speedY
    this.x += this.speedX + Math.sin(time * 0.001 + this.swayOffset) * this.swayAmplitude * 0.3
    this.angle += this.angleSpeed

    if (this.y > canvas.height + 20) {
      this.reset()
    }
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color

    ctx.beginPath()
    ctx.ellipse(0, 0, this.size * 0.5, this.size, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }
}

function initPetals() {
  const count = Math.min(40, Math.floor(window.innerWidth / 30))
  petals = []
  for (let i = 0; i < count; i++) {
    petals.push(new Petal())
  }
}
initPetals()
window.addEventListener('resize', initPetals)

// ===== Groom (Mechanical Engineer) & Bride (Hotelier) glimpse icons =====
// A quiet nod to what Mark & Ann do — a handful of gears, wrenches and bolts
// (engineering) drifting alongside a bellhop bell, room key and luggage
// (hospitality), mixed in with the petals at a very low opacity.
const iconPalette = {
  engineer: ['rgba(168, 137, 80, 0.35)', 'rgba(201, 169, 110, 1)'],
  hotel: ['rgba(168, 103, 126, 0.3)', 'rgba(201, 137, 159, 1)'],
}
const iconKinds = [
  { kind: 'gear', group: 'engineer' },
  { kind: 'wrench', group: 'engineer' },
  { kind: 'bolt', group: 'engineer' },
  { kind: 'bell', group: 'hotel' },
  { kind: 'key', group: 'hotel' },
  { kind: 'luggage', group: 'hotel' },
]

function drawGear(c, s) {
  const teeth = 8
  const outerR = s
  const innerR = s * 0.62
  const holeR = s * 0.28
  c.beginPath()
  for (let i = 0; i < teeth * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR
    const a = (Math.PI / teeth) * i
    const x = Math.cos(a) * r
    const y = Math.sin(a) * r
    if (i === 0) c.moveTo(x, y)
    else c.lineTo(x, y)
  }
  c.closePath()
  c.stroke()
  c.beginPath()
  c.arc(0, 0, holeR, 0, Math.PI * 2)
  c.stroke()
}

function drawWrench(c, s) {
  c.beginPath()
  c.moveTo(-s * 0.9, s * 0.9)
  c.lineTo(s * 0.35, -s * 0.35)
  c.stroke()
  c.beginPath()
  c.arc(-s * 0.9, s * 0.9, s * 0.32, Math.PI * 0.15, Math.PI * 1.15)
  c.stroke()
  c.beginPath()
  c.arc(s * 0.55, -s * 0.55, s * 0.4, Math.PI * 0.75, Math.PI * 1.85)
  c.stroke()
}

function drawBolt(c, s) {
  c.beginPath()
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6
    const x = Math.cos(a) * s
    const y = Math.sin(a) * s
    if (i === 0) c.moveTo(x, y)
    else c.lineTo(x, y)
  }
  c.closePath()
  c.stroke()
  c.beginPath()
  c.arc(0, 0, s * 0.42, 0, Math.PI * 2)
  c.stroke()
}

function drawBell(c, s) {
  c.beginPath()
  c.arc(0, s * 0.1, s * 0.85, Math.PI, 0, false)
  c.lineTo(s * 0.85, s * 0.45)
  c.lineTo(-s * 0.85, s * 0.45)
  c.closePath()
  c.stroke()
  c.beginPath()
  c.moveTo(-s * 1.05, s * 0.45)
  c.lineTo(s * 1.05, s * 0.45)
  c.stroke()
  c.beginPath()
  c.arc(0, -s * 0.95, s * 0.14, 0, Math.PI * 2)
  c.stroke()
}

function drawKey(c, s) {
  c.beginPath()
  c.arc(-s * 0.55, 0, s * 0.45, 0, Math.PI * 2)
  c.stroke()
  c.beginPath()
  c.moveTo(-s * 0.1, 0)
  c.lineTo(s * 0.95, 0)
  c.stroke()
  c.beginPath()
  c.moveTo(s * 0.6, 0)
  c.lineTo(s * 0.6, s * 0.32)
  c.moveTo(s * 0.9, 0)
  c.lineTo(s * 0.9, s * 0.32)
  c.stroke()
}

function drawLuggage(c, s) {
  c.strokeRect(-s * 0.85, -s * 0.55, s * 1.7, s * 1.1)
  c.beginPath()
  c.moveTo(-s * 0.35, -s * 0.55)
  c.lineTo(-s * 0.35, -s * 0.85)
  c.lineTo(s * 0.35, -s * 0.85)
  c.lineTo(s * 0.35, -s * 0.55)
  c.stroke()
  c.beginPath()
  c.moveTo(0, -s * 0.55)
  c.lineTo(0, s * 0.55)
  c.stroke()
}

const iconDrawers = {
  gear: drawGear,
  wrench: drawWrench,
  bolt: drawBolt,
  bell: drawBell,
  key: drawKey,
  luggage: drawLuggage,
}

class GlimpseIcon {
  constructor() {
    this.reset()
    this.y = Math.random() * canvas.height
  }

  reset() {
    const def = iconKinds[Math.floor(Math.random() * iconKinds.length)]
    this.kind = def.kind
    this.group = def.group
    this.color = iconPalette[def.group][Math.floor(Math.random() * iconPalette[def.group].length)]
    this.x = Math.random() * canvas.width
    this.y = -30
    this.size = Math.random() * 14 + 20
    this.speedY = Math.random() * 0.35 + 0.15
    this.speedX = Math.random() * 0.3 - 0.15
    this.angle = Math.random() * Math.PI * 2
    this.angleSpeed = (Math.random() * 0.006 - 0.003)
    this.swayAmplitude = Math.random() * 1.2 + 0.4
    this.swayOffset = Math.random() * Math.PI * 2
  }

  update(time) {
    this.y += this.speedY
    this.x += this.speedX + Math.sin(time * 0.0006 + this.swayOffset) * this.swayAmplitude * 0.25
    this.angle += this.angleSpeed

    if (this.y > canvas.height + 30) {
      this.reset()
    }
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.strokeStyle = this.color
    ctx.lineWidth = 1.4
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    iconDrawers[this.kind](ctx, this.size)
    ctx.restore()
  }
}

let glimpseIcons = []
function initGlimpseIcons() {
  // Kept deliberately sparse — a quiet glimpse, not a pattern.
  const count = Math.min(9, Math.max(4, Math.floor(window.innerWidth / 190)))
  glimpseIcons = []
  for (let i = 0; i < count; i++) {
    glimpseIcons.push(new GlimpseIcon())
  }
}
initGlimpseIcons()
window.addEventListener('resize', initGlimpseIcons)

function animatePetals(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  glimpseIcons.forEach((icon) => {
    icon.update(time)
    icon.draw()
  })
  petals.forEach((p) => {
    p.update(time)
    p.draw()
  })
  requestAnimationFrame(animatePetals)
}
requestAnimationFrame(animatePetals)

// ===== Scroll Reveal =====
const revealEls = document.querySelectorAll('.reveal')
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
)
revealEls.forEach((el) => observer.observe(el))

// ===== Nav scroll state =====
const nav = document.getElementById('nav')
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled')
  } else {
    nav.classList.remove('scrolled')
  }
})

// ===== Countdown Timer =====
const weddingDate = new Date('2026-12-01T14:00:00').getTime()

function updateCountdown() {
  const now = Date.now()
  const diff = weddingDate - now

  if (diff <= 0) {
    document.getElementById('days').textContent = '0'
    document.getElementById('hours').textContent = '0'
    document.getElementById('minutes').textContent = '0'
    document.getElementById('seconds').textContent = '0'
    return
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  document.getElementById('days').textContent = days
  document.getElementById('hours').textContent = hours
  document.getElementById('minutes').textContent = minutes
  document.getElementById('seconds').textContent = seconds
}
updateCountdown()
setInterval(updateCountdown, 1000)

// ===== Gallery Tilt =====
document.querySelectorAll('[data-tilt]').forEach((item) => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = (y / rect.height) * -8
    const rotateY = (x / rect.width) * 8
    item.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`
  })

  item.addEventListener('mouseleave', () => {
    item.style.transform = ''
  })
})

// ===== Music (Web Audio API — gentle ambient melody) =====
let audioCtx = null
let musicNodes = []
let isPlaying = false
let musicTimer = null

const musicToggle = document.getElementById('music-toggle')

// Pentatonic scale notes (C major pentatonic) for a gentle, pleasant sound
const scale = [
  261.63, 293.66, 329.63, 392.00, 440.00,
  523.25, 587.33, 659.25, 783.99, 880.00,
]

function playNote(freq, startTime, duration, volume) {
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  const filter = audioCtx.createBiquadFilter()

  osc.type = 'sine'
  osc.frequency.value = freq

  filter.type = 'lowpass'
  filter.frequency.value = 2000
  filter.Q.value = 0.5

  gain.gain.setValueAtTime(0, startTime)
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.08)
  gain.gain.linearRampToValueAtTime(volume * 0.7, startTime + duration * 0.5)
  gain.gain.linearRampToValueAtTime(0, startTime + duration)

  osc.connect(filter)
  filter.connect(gain)
  gain.connect(audioCtx.destination)

  osc.start(startTime)
  osc.stop(startTime + duration + 0.1)

  musicNodes.push(osc)
}

function startMusic() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }

  isPlaying = true
  musicToggle.classList.add('playing')

  let beatIndex = 0
  const beatInterval = 600 // ms between notes

  function scheduleNext() {
    if (!isPlaying) return

    const now = audioCtx.currentTime

    // Main melody note
    const noteIdx = Math.floor(Math.random() * scale.length)
    const freq = scale[noteIdx]
    const duration = 1.5 + Math.random() * 1.5
    playNote(freq, now, duration, 0.12)

    // Occasional harmony note
    if (Math.random() > 0.6) {
      const harmFreq = scale[(noteIdx + 2) % scale.length]
      playNote(harmFreq, now + 0.1, duration * 0.8, 0.07)
    }

    // Bass note every 4 beats
    if (beatIndex % 4 === 0) {
      playNote(scale[0] / 2, now, 2.5, 0.08)
    }

    beatIndex++
    musicTimer = setTimeout(scheduleNext, beatInterval + Math.random() * 200)
  }

  scheduleNext()
}

function stopMusic() {
  isPlaying = false
  musicToggle.classList.remove('playing')
  if (musicTimer) {
    clearTimeout(musicTimer)
    musicTimer = null
  }
  musicNodes.forEach((node) => {
    try {
      node.stop()
    } catch (e) {
      // already stopped
    }
  })
  musicNodes = []
}

musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    stopMusic()
  } else {
    startMusic()
  }
})

// ===== Gift Modals =====
document.querySelectorAll('[data-modal]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal')
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.add('active')
      document.body.style.overflow = 'hidden'
    }
  })
})

document.querySelectorAll('.modal-overlay').forEach((overlay) => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('modal-close')) {
      overlay.classList.remove('active')
      document.body.style.overflow = ''
    }
  })
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach((overlay) => {
      overlay.classList.remove('active')
      document.body.style.overflow = ''
    })
  }
})

// ===== Copy to clipboard =====
document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const text = btn.getAttribute('data-copy')
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btn.textContent
      btn.textContent = 'Copied!'
      btn.classList.add('copied')
      setTimeout(() => {
        btn.textContent = originalText
        btn.classList.remove('copied')
      }, 2000)
    })
  })
})

// ===== Animate fund progress bar on scroll =====
const fundBar = document.querySelector('.gift-fund-bar')
if (fundBar) {
  const fundObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fundBar.style.width = '42%'
          fundObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 }
  )
  fundObserver.observe(fundBar)
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href')
    if (href === '#') return
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  })
})