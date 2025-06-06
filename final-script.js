document.addEventListener("DOMContentLoaded", () => {
  // Animate the final message on load
  const finalMessage = document.querySelector(".final-message")
  if (finalMessage) {
    finalMessage.style.opacity = "0"
    finalMessage.style.transform = "translateY(50px)"

    setTimeout(() => {
      finalMessage.style.transition = "all 1s ease"
      finalMessage.style.opacity = "1"
      finalMessage.style.transform = "translateY(0)"
    }, 500)
  }

  // Create floating hearts periodically (less frequent on mobile)
  const heartInterval = window.innerWidth < 768 ? 5000 : 3000
  setInterval(createFloatingHeart, heartInterval)

  // Add touch feedback to restart button
  const restartBtn = document.querySelector(".restart-btn")
  if (restartBtn) {
    restartBtn.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.95)"
    })

    restartBtn.addEventListener("touchend", function () {
      this.style.transform = "scale(1)"
    })
  }
})

function createFloatingHeart() {
  const heart = document.createElement("div")
  heart.innerHTML = "💖"
  heart.style.position = "fixed"
  heart.style.left = Math.random() * window.innerWidth + "px"
  heart.style.bottom = "-50px"
  heart.style.fontSize = window.innerWidth < 768 ? "1.5rem" : "2rem"
  heart.style.pointerEvents = "none"
  heart.style.zIndex = "1000"
  heart.style.animation = "floatUp 6s ease-out forwards"

  document.body.appendChild(heart)

  setTimeout(() => {
    if (heart.parentNode) {
      heart.remove()
    }
  }, 6000)
}

// Add float up animation
const style = document.createElement("style")
style.textContent = `
    @keyframes floatUp {
        0% {
            bottom: -50px;
            opacity: 0;
            transform: translateX(0) rotate(0deg);
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            bottom: 100vh;
            opacity: 0;
            transform: translateX(${Math.random() * 200 - 100}px) rotate(360deg);
        }
    }
`
document.head.appendChild(style)

function goToHome() {
  window.location.href = "index.html"
}

// Prevent zoom on double tap for iOS
let lastTouchEnd = 0
document.addEventListener(
  "touchend",
  (event) => {
    const now = new Date().getTime()
    if (now - lastTouchEnd <= 300) {
      event.preventDefault()
    }
    lastTouchEnd = now
  },
  false,
)
