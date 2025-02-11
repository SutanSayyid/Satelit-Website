document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
      e.preventDefault();
        // Change navbar background on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
          let startPosition = window.pageYOffset;
          let targetPosition = target.offsetTop;
          let distance = targetPosition - startPosition;
          let duration = 1000; // Increase for a smoother effect (1000ms = 1s)
          let startTime = null;

          function animation(currentTime) {
              if (startTime === null) startTime = currentTime;
              let timeElapsed = currentTime - startTime;
              let run = ease(timeElapsed, startPosition, distance, duration);
              window.scrollTo(0, run);
              if (timeElapsed < duration) requestAnimationFrame(animation);
          }

          function ease(t, b, c, d) {
              t /= d / 2;
              if (t < 1) return (c / 2) * t * t + b;
              t--;
              return (-c / 2) * (t * (t - 2) - 1) + b;
          }

          requestAnimationFrame(animation);
      }
  });
});

  // Animation triggers on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    { threshold: 0.1 },
  )
  
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section)
  })


  document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/projects")  // Calls the backend API to fetch data
        .then(response => response.json())
        .then(data => {
            const dashboardContent = document.getElementById("dashboard-content");
            dashboardContent.innerHTML = "";

            data.forEach(project => {
                dashboardContent.innerHTML += `
                    <div class="progress-card">
                        <h3>${project.name}</h3>
                        <p>Completion: ${project.progress}%</p>
                    </div>
                `;
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});

  