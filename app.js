document.addEventListener("DOMContentLoaded", () => {


    /* =========================================================
     WEDDING LOADING SCREEN
     ========================================================= */

  /* =========================================================
   FAIRY-TALE WEDDING LOADING SCREEN
   ========================================================= */

const weddingLoader =
  document.getElementById("weddingLoader");

if (weddingLoader) {

  const loaderStartTime = Date.now();

  /*
   * Give the magical name animation enough time
   * to finish before revealing the homepage.
   */
  const minimumLoaderTime = 5200;

  function hideWeddingLoader() {

    const elapsed =
      Date.now() - loaderStartTime;

    const remaining =
      Math.max(
        0,
        minimumLoaderTime - elapsed
      );

    setTimeout(() => {

      weddingLoader.classList.add(
        "loader-hidden"
      );

      setTimeout(() => {

        weddingLoader.remove();

      }, 1500);

    }, remaining);
  }


  if (document.readyState === "complete") {

    hideWeddingLoader();

  } else {

    window.addEventListener(
      "load",
      hideWeddingLoader,
      { once: true }
    );

  }
}

    // =========================================================
// WEDDING MUSIC
// Starts after the loading screen.
// Falls back to a "Tap to play" button if autoplay is blocked.
// =========================================================

const weddingMusic =
  document.getElementById("weddingMusic");

const musicToggle =
  document.getElementById("musicToggle");

if (weddingMusic && musicToggle) {

  function showMusicButton() {
    musicToggle.classList.add("show");
  }

  function hideMusicButton() {
    musicToggle.classList.remove("show");
  }

  function updateMusicButton() {

    if (!weddingMusic.paused) {
      musicToggle.classList.add("playing");
      musicToggle.querySelector("span").textContent =
        "Music playing";
    } else {
      musicToggle.classList.remove("playing");
      musicToggle.querySelector("span").textContent =
        "Tap to play";
    }
  }

  async function startWeddingMusic() {

    try {

      await weddingMusic.play();

      updateMusicButton();
      hideMusicButton();

    } catch (error) {

      // Browser blocked autoplay.
      showMusicButton();
      updateMusicButton();

    }
  }

  musicToggle.addEventListener("click", async () => {

    if (weddingMusic.paused) {

      try {

        await weddingMusic.play();

      } catch (error) {

        console.log(
          "Wedding music could not be started.",
          error
        );

      }

    } else {

      weddingMusic.pause();

    }

    updateMusicButton();
  });

  weddingMusic.addEventListener(
    "play",
    updateMusicButton
  );

  weddingMusic.addEventListener(
    "pause",
    updateMusicButton
  );

  /*
   * Wait until the wedding loading screen has finished.
   * Your existing loader uses 5200ms.
   */
  setTimeout(() => {

    startWeddingMusic();

  }, 5400);
}
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
  document.getElementById("galleryLightboxClose");

const galleryPrev =
  document.getElementById("galleryLightboxPrev");

const galleryNext =
  document.getElementById("galleryLightboxNext");


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

/* =========================================================
   LIVE WEDDING MEMORIES — GALLERY CONNECTION
========================================================= */

(() => {

  // ==========================================
  // CONFIGURATION
  // ==========================================

  const MEMORIES_API_URL =
    "https://script.google.com/macros/s/AKfycbylezaH__z4EkA7r4Qh6HmVrXBT3joEvVnqxQSaul1gGUXtiYYhckIkiVF0fOTjWPeIng/exec";

  // ==========================================
  // ELEMENTS
  // ==========================================

  const memoriesGrid = document.getElementById("weddingMemoriesGrid");
  const memoriesTotal = document.getElementById("memoriesTotal");
  const memoriesEmpty = document.getElementById("memoriesEmpty");
  const refreshMemoriesBtn = document.getElementById("refreshMemories");

  if (!memoriesGrid) return;

  // ==========================================
  // ESCAPE HTML
  // ==========================================

  function memoriesEscapeHTML(value) {

    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }

  // ==========================================
  // FORMAT DATE
  // ==========================================

  function memoriesFormatDate(value) {

    if (!value) return "";

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString("en-PH", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

  }

    // ==========================================
// WEDDING MEMORY GUEST IDENTITY
// ==========================================

const memoriesGuestId = (() => {

  let id = localStorage.getItem("wedding_memories_guest_id");

  if (!id) {
    id = "guest_" + crypto.randomUUID();

    localStorage.setItem(
      "wedding_memories_guest_id",
      id
    );
  }

  return id;

})();

// ==========================================
// GUEST NAME
// ==========================================

function memoriesGetGuestName() {

  let name = localStorage.getItem(
    "wedding_memories_guest_name"
  );

  if (!name) {

    name = prompt(
      "Please enter your name to send love to our wedding photos:"
    );

    if (!name || !name.trim()) {
      name = "Wedding Guest";
    }

    name = name.trim();

    localStorage.setItem(
      "wedding_memories_guest_name",
      name
    );

  }

  return name;

}

// ==========================================
// GET LOCALLY LIKED PHOTOS
// ==========================================

function memoriesGetLikedPhotos() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "wedding_memories_liked_photos"
      ) || "[]"
    );

  } catch (error) {

    return [];

  }

}

// ==========================================
// SAVE LOCALLY LIKED PHOTOS
// ==========================================

function memoriesSaveLikedPhotos(photos) {

  localStorage.setItem(
    "wedding_memories_liked_photos",
    JSON.stringify(photos)
  );

}

  // ==========================================
  // CREATE PHOTO CARD
  // ==========================================

// ==========================================
// CREATE PHOTO CARD WITH LIKE BUTTON
// ==========================================

function memoriesCreateCard(photo) {

  const originalUrl = String(photo.imageUrl || "");

  let fileId = "";

  try {

    const parsedUrl = new URL(originalUrl);

    fileId = parsedUrl.searchParams.get("id") || "";

  } catch (error) {

    fileId = "";

  }

  const imageUrl = fileId
    ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1200`
    : originalUrl;

  const safeImageUrl = memoriesEscapeHTML(imageUrl);

  const safeOriginalUrl = memoriesEscapeHTML(originalUrl);

  const guestName = memoriesEscapeHTML(
    photo.guestName || "Wedding Guest"
  );

  const caption = memoriesEscapeHTML(
    photo.caption || ""
  );

  const date = memoriesEscapeHTML(
    memoriesFormatDate(photo.uploadDate)
  );

  const photoId = memoriesEscapeHTML(
    photo.photoId || ""
  );

  const likedPhotos = memoriesGetLikedPhotos();

  const isLiked = likedPhotos.includes(
    String(photo.photoId)
  );

  const likeCount = Number(photo.likeCount || 0);

  return `
    <article class="memory-card" data-photo-id="${photoId}">

      <div class="memory-photo-wrap">

        <a
          href="${safeOriginalUrl}"
          target="_blank"
          rel="noopener"
        >

          <img
            class="memory-photo"
            src="${safeImageUrl}"
            alt="Wedding memory shared by ${guestName}"
            loading="lazy"
          >

        </a>

      </div>

      <div class="memory-card-content">

        <div class="memory-uploader">
          ♡ ${guestName}
        </div>

        ${caption ? `
          <div class="memory-caption">
            ${caption}
          </div>
        ` : ""}

        ${date ? `
          <div class="memory-date">
            ${date}
          </div>
        ` : ""}

        <div class="memory-reaction-row">

          <button
            type="button"
            class="memory-like-button ${isLiked ? "liked" : ""}"
            data-photo-id="${photoId}"
            aria-pressed="${isLiked}"
          >

            <span class="memory-heart">
              ${isLiked ? "♥" : "♡"}
            </span>

            <span class="memory-like-label">
              ${isLiked ? "Loved" : "Love"}
            </span>

          </button>

          <span
            class="memory-like-count"
            data-like-count="${photoId}"
          >
            ${likeCount}
            ${likeCount === 1 ? "love" : "loves"}
          </span>

        </div>

      </div>

    </article>
  `;

}  // ==========================================
  // LOAD GALLERY
  // ==========================================

  async function loadWeddingMemories() {

    memoriesGrid.innerHTML = `
      <div class="memories-message">
        Loading our beautiful memories...
      </div>
    `;

    memoriesEmpty.hidden = true;

    if (refreshMemoriesBtn) {
      refreshMemoriesBtn.disabled = true;
      refreshMemoriesBtn.textContent = "Loading...";
    }

    try {

      const response = await fetch(
        MEMORIES_API_URL + "?action=gallery&_=" + Date.now()
      );

      if (!response.ok) {
        throw new Error("Gallery API request failed.");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Unable to load gallery.");
      }

      const photos = Array.isArray(result.photos)
        ? result.photos
        : [];

      memoriesGrid.innerHTML = "";

      if (memoriesTotal) {
        memoriesTotal.textContent =
          photos.length +
          (photos.length === 1
            ? " beautiful memory"
            : " beautiful memories");
      }

      if (photos.length === 0) {

        memoriesEmpty.hidden = false;
        memoriesGrid.innerHTML = "";

        return;

      }

      memoriesEmpty.hidden = true;

      photos.forEach(photo => {

        memoriesGrid.insertAdjacentHTML(
          "beforeend",
          memoriesCreateCard(photo)
        );

      });

    } catch (error) {

      console.error("Wedding Memories Gallery Error:", error);

      memoriesGrid.innerHTML = `
        <div class="memories-message">
          Our memories could not be loaded at this moment.
          Please try refreshing the gallery.
        </div>
      `;

      if (memoriesTotal) {
        memoriesTotal.textContent = "Unable to load memories";
      }

    } finally {

      if (refreshMemoriesBtn) {
        refreshMemoriesBtn.disabled = false;
        refreshMemoriesBtn.textContent = "↻ Refresh";
      }

    }

  }

  // ==========================================
  // REFRESH BUTTON
  // ==========================================

  if (refreshMemoriesBtn) {

    refreshMemoriesBtn.addEventListener(
      "click",
      loadWeddingMemories
    );

  }

    // ==========================================
// LIKE / UNLIKE PHOTO
// ==========================================

memoriesGrid.addEventListener("click", async function(event) {

  const button = event.target.closest(
    ".memory-like-button"
  );

  if (!button) return;

  const photoId = button.dataset.photoId;

  if (!photoId || button.disabled) return;

  button.disabled = true;

  try {

    const guestName = memoriesGetGuestName();

    const response = await fetch(MEMORIES_API_URL, {

      method: "POST",

      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },

      body: JSON.stringify({

        action: "react",

        photoId: photoId,

        guestId: memoriesGuestId,

        guestName: guestName,

        reactionType: "LIKE"

      })

    });

    const result = await response.json();

    if (!result.success) {

      throw new Error(
        result.message || "Unable to update reaction."
      );

    }

    // SAVE LOCAL LIKE STATE

    let likedPhotos = memoriesGetLikedPhotos();

    if (result.liked) {

      if (!likedPhotos.includes(photoId)) {
        likedPhotos.push(photoId);
      }

    } else {

      likedPhotos = likedPhotos.filter(
        id => id !== photoId
      );

    }

    memoriesSaveLikedPhotos(likedPhotos);

    // UPDATE BUTTON

    button.classList.toggle(
      "liked",
      result.liked
    );

    button.setAttribute(
      "aria-pressed",
      String(result.liked)
    );

    button.querySelector(
      ".memory-heart"
    ).textContent = result.liked ? "♥" : "♡";

    button.querySelector(
      ".memory-like-label"
    ).textContent = result.liked ? "Loved" : "Love";

    // UPDATE COUNTER

    const countElement = memoriesGrid.querySelector(
      `[data-like-count="${photoId}"]`
    );

    if (countElement) {

      const count = Number(result.likeCount || 0);

      countElement.textContent =
        count + (count === 1 ? " love" : " loves");

    }

  } catch (error) {

    console.error(
      "Wedding Memories Reaction Error:",
      error
    );

    alert(
      "Unable to send your love right now. Please try again."
    );

  } finally {

    button.disabled = false;

  }

});
    
  // ==========================================
  // INITIAL LOAD
  // ==========================================

  loadWeddingMemories();

})();
