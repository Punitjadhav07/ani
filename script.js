// Surprise button functionality
document.addEventListener("DOMContentLoaded", () => {
  const surpriseButtons = document.querySelectorAll(".surprise-btn")
  const modal = document.getElementById("messageModal")
  const modalMessage = document.querySelector(".modal-message")
  const closeBtn = document.querySelector(".close")

  surpriseButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const message = this.getAttribute("data-message")
      modalMessage.textContent = message
      modal.style.display = "block"
      document.body.style.overflow = "hidden" // Prevent background scroll

      // Add some sparkle effect
      createSparkles()
    })

    // Add touch feedback
    button.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.95)"
    })

    button.addEventListener("touchend", function () {
      this.style.transform = "scale(1)"
    })
  })

  closeBtn.addEventListener("click", closeModal)

  // Close modal on background click
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal()
    }
  })

  // Close modal on escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      closeModal()
    }
  })

  function closeModal() {
    modal.style.display = "none"
    document.body.style.overflow = "auto" // Restore scroll
  }

  // Add touch feedback to main button
  const collageBtn = document.querySelector(".collage-btn")
  if (collageBtn) {
    collageBtn.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.95)"
    })

    collageBtn.addEventListener("touchend", function () {
      this.style.transform = "scale(1)"
    })
  }
})

function createSparkles() {
  const sparkleCount = window.innerWidth < 768 ? 5 : 10 // Fewer sparkles on mobile

  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement("div")
    sparkle.innerHTML = "✨"
    sparkle.style.position = "fixed"
    sparkle.style.left = Math.random() * window.innerWidth + "px"
    sparkle.style.top = Math.random() * window.innerHeight + "px"
    sparkle.style.fontSize = window.innerWidth < 768 ? "1rem" : "1.5rem"
    sparkle.style.pointerEvents = "none"
    sparkle.style.zIndex = "9999"
    sparkle.style.animation = "sparkleFloat 2s ease-out forwards"

    document.body.appendChild(sparkle)

    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.remove()
      }
    }, 2000)
  }
}

// Add sparkle animation
const style = document.createElement("style")
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-50px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0);
        }
    }
`
document.head.appendChild(style)

function goToCollage() {
  window.location.href = "collage.html"
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
