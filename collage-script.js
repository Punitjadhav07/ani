// Scroll-triggered animations
document.addEventListener("DOMContentLoaded", () => {
  const photoItems = document.querySelectorAll(".photo-item")

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  photoItems.forEach((item) => {
    observer.observe(item)
  })

  // Add staggered animation delays
  photoItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`
  })

  // Add touch feedback to navigation buttons
  const navBtns = document.querySelectorAll(".nav-btn")
  navBtns.forEach((btn) => {
    btn.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.95)"
    })

    btn.addEventListener("touchend", function () {
      this.style.transform = "scale(1)"
    })
  })

  // Touch handling for photo items
  photoItems.forEach((item) => {
    let touchStartTime = 0

    item.addEventListener("touchstart", function () {
      touchStartTime = Date.now()
      this.style.transform = "scale(0.98)"
    })

    item.addEventListener("touchend", function () {
      const touchDuration = Date.now() - touchStartTime
      this.style.transform = "scale(1)"

      // Show overlay on tap for mobile
      if (touchDuration < 500) {
        const overlay = this.querySelector(".photo-overlay")
        if (overlay) {
          overlay.style.transform = "translateY(0)"
          setTimeout(() => {
            overlay.style.transform = "translateY(100%)"
          }, 3000)
        }
      }
    })
  })
})

// Enhanced zoom effect on scroll
let ticking = false

function updatePhotoEffects() {
  const photoItems = document.querySelectorAll(".photo-item")
  const scrollTop = window.pageYOffset
  const windowHeight = window.innerHeight

  photoItems.forEach((item, index) => {
    const itemTop = item.offsetTop
    const itemHeight = item.offsetHeight

    // Calculate if item is in viewport
    if (scrollTop + windowHeight > itemTop && scrollTop < itemTop + itemHeight) {
      const progress = (scrollTop + windowHeight - itemTop) / (windowHeight + itemHeight)
      const scale = 0.8 + progress * 0.2 // Scale from 0.8 to 1.0
      const opacity = Math.min(progress * 2, 1) // Fade in effect

      item.style.transform = `scale(${Math.min(scale, 1)})`
      item.style.opacity = opacity
    }
  })

  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updatePhotoEffects)
    ticking = true
  }
})

function goToHome() {
  window.location.href = "index.html"
}

function goToFinal() {
  window.location.href = "final.html"
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
