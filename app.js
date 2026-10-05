document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     RSVP GOOGLE APPS SCRIPT ENDPOINT
     ========================================================= */

  const RSVP_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbyHRluj-FB5v2YY-vr5VHqeo2goCNca_h0tQ_VrF789KNZW_DAddAv4vxH_O5QVmBYgTQ/exec";


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("#navMenu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });
  }


  /* =========================================================
     NAVIGATION SMOOTH SCROLL
     ========================================================= */

 /* =========================================================
   NAVIGATION SMOOTH SCROLL
   ========================================================= */

const navigationLinks = document.querySelectorAll('#navMenu a[href^="#"]');

navigationLinks.forEach(link => {

  link.addEventListener("click", function (e) {

    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") return;

    /* HOME BUTTON */
    if (targetId === "#home") {

      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      return;
    }

    /* OTHER NAVIGATION LINKS */
    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


  /* =========================================================
     LOGO / NAVIGATION EFFECT
     ========================================================= */

  const logo = document.querySelector(".logo");

  if (logo) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 30) {
        logo.classList.add("scrolled");
      } else {
        logo.classList.remove("scrolled");
      }

    });

  }


  /* =========================================================
     WEDDING BUTTON
     ========================================================= */

  const weddingButton = document.querySelector('.main-button[href="#details"]');

  if (weddingButton) {

    weddingButton.addEventListener("click", function (e) {

      const details = document.querySelector("#details");

      if (details) {

        e.preventDefault();

        details.scrollIntoView({
          behavior: "smooth"
        });

      }

    });

  }


  /* =========================================================
     COUNTDOWN
     WEDDING DATE:
     DECEMBER 08, 2026
     2:00 PM
     ========================================================= */

  const weddingDate = new Date("2026-12-08T14:00:00").getTime();

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance <= 0) {

      if (daysElement) daysElement.textContent = "00";
      if (hoursElement) hoursElement.textContent = "00";
      if (minutesElement) minutesElement.textContent = "00";
      if (secondsElement) secondsElement.textContent = "00";

      return;
    }

    const days = Math.floor(
      distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    const seconds = Math.floor(
      (distance % (1000 * 60)) /
      1000
    );

    if (daysElement) {
      daysElement.textContent = String(days).padStart(2, "0");
    }

    if (hoursElement) {
      hoursElement.textContent = String(hours).padStart(2, "0");
    }

    if (minutesElement) {
      minutesElement.textContent = String(minutes).padStart(2, "0");
    }

    if (secondsElement) {
      secondsElement.textContent = String(seconds).padStart(2, "0");
    }

  }

  updateCountdown();

  setInterval(updateCountdown, 1000);


  /* =========================================================
     WEDDING GALLERY
     ========================================================= */

  const galleryItems = document.querySelectorAll(".gallery-item");

  const galleryLightbox =
    document.getElementById("galleryLightbox");

  const galleryLightboxImage =
    document.getElementById("galleryLightboxImage");

  const galleryLightboxCaption =
    document.getElementById("galleryLightboxCaption");

  const galleryClose =
    document.getElementById("galleryClose");

  const galleryPrev =
    document.getElementById("galleryPrev");

  const galleryNext =
    document.getElementById("galleryNext");


  let currentGalleryIndex = 0;


  function openGallery(index) {

    if (!galleryItems.length) return;

    currentGalleryIndex = index;

    const item = galleryItems[currentGalleryIndex];

    if (!item) return;

    const image = item.querySelector("img");

    if (!image) return;

    if (galleryLightboxImage) {

      galleryLightboxImage.src = image.src;

      galleryLightboxImage.alt =
        image.alt || "Wedding Gallery Photo";

    }

    if (galleryLightboxCaption) {

      galleryLightboxCaption.textContent =
        image.alt || "";

    }

    if (galleryLightbox) {

      galleryLightbox.classList.add("active");

      galleryLightbox.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.classList.add(
        "gallery-lightbox-open"
      );

    }

  }


  function closeGallery() {

    if (!galleryLightbox) return;

    galleryLightbox.classList.remove("active");

    galleryLightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "gallery-lightbox-open"
    );

  }


  function showPreviousGalleryImage() {

    if (!galleryItems.length) return;

    currentGalleryIndex--;

    if (currentGalleryIndex < 0) {

      currentGalleryIndex =
        galleryItems.length - 1;

    }

    openGallery(currentGalleryIndex);

  }


  function showNextGalleryImage() {

    if (!galleryItems.length) return;

    currentGalleryIndex++;

    if (
      currentGalleryIndex >=
      galleryItems.length
    ) {

      currentGalleryIndex = 0;

    }

    openGallery(currentGalleryIndex);

  }


  galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

      openGallery(index);

    });

  });


  if (galleryClose) {

    galleryClose.addEventListener(
      "click",
      closeGallery
    );

  }


  if (galleryPrev) {

    galleryPrev.addEventListener(
      "click",
      showPreviousGalleryImage
    );

  }


  if (galleryNext) {

    galleryNext.addEventListener(
      "click",
      showNextGalleryImage
    );

  }


  /* =========================================================
     CLOSE LIGHTBOX WHEN CLICKING BACKDROP
     ========================================================= */

  if (galleryLightbox) {

    galleryLightbox.addEventListener(
      "click",
      function (e) {

        if (e.target === galleryLightbox) {

          closeGallery();

        }

      }
    );

  }


  /* =========================================================
     KEYBOARD CONTROLS FOR GALLERY
     ========================================================= */

  document.addEventListener("keydown", (e) => {

    if (
      !galleryLightbox ||
      !galleryLightbox.classList.contains("active")
    ) {
      return;
    }

    if (e.key === "Escape") {

      closeGallery();

    }

    if (e.key === "ArrowLeft") {

      showPreviousGalleryImage();

    }

    if (e.key === "ArrowRight") {

      showNextGalleryImage();

    }

  });


  /* =========================================================
     RSVP FORM
     ========================================================= */

  const rsvpForm =
    document.getElementById("rsvpForm");

  const rsvpStatus =
    document.getElementById("rsvpStatus");


  if (rsvpForm) {

    rsvpForm.addEventListener(
      "submit",
      async function (e) {

        e.preventDefault();


        const submitButton =
          rsvpForm.querySelector(
            'button[type="submit"]'
          );


        const formData =
          new FormData(rsvpForm);


        const rsvpData = {

          fullName:
            formData.get("fullName") || "",

          attendance:
            formData.get("attendance") || "",

          numberGuests:
            formData.get("numberGuests") || "",

          contactNumber:
            formData.get("contactNumber") || "",

          message:
            formData.get("message") || ""

        };


        if (submitButton) {

          submitButton.disabled = true;

          submitButton.textContent =
            "SENDING...";

        }


        if (rsvpStatus) {

          rsvpStatus.textContent =
            "Sending your RSVP...";

          rsvpStatus.className =
            "rsvp-status";

        }


        try {

          await fetch(
            RSVP_ENDPOINT,
            {
              method: "POST",

              mode: "no-cors",

              headers: {
                "Content-Type":
                  "text/plain;charset=utf-8"
              },

              body:
                JSON.stringify(rsvpData)

            }
          );


          if (rsvpStatus) {

            rsvpStatus.textContent =
              "Thank you! Your RSVP has been submitted successfully.";

            rsvpStatus.className =
              "rsvp-status success";

          }


          rsvpForm.reset();


        } catch (error) {

          console.error(
            "RSVP submission error:",
            error
          );


          if (rsvpStatus) {

            rsvpStatus.textContent =
              "Something went wrong. Please try again.";

            rsvpStatus.className =
              "rsvp-status error";

          }

        } finally {

          if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
              "SUBMIT RSVP";

          }

        }

      }
    );

  }

});
