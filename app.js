document.addEventListener("DOMContentLoaded", function () {


  /* ==========================================
     MOBILE MENU
  ========================================== */

  const menuToggle =
    document.getElementById("menuToggle");

  const navMenu =
    document.getElementById("navMenu");


  if (menuToggle && navMenu) {

    menuToggle.addEventListener(
      "click",
      function () {

        navMenu.classList.toggle("active");

      }
    );

  }



  /* ==========================================
     NAVIGATION
  ========================================== */

  const navLinks =
    document.querySelectorAll("#navMenu a");


  navLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        event.preventDefault();


        const targetId =
          this.getAttribute("href");


        if (!targetId) {
          return;
        }


        const target =
          document.querySelector(targetId);


        if (target) {

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }


        if (navMenu) {

          navMenu.classList.remove("active");

        }

      }
    );

  });



  /* ==========================================
     LOGO → HOME
  ========================================== */

  const logo =
    document.querySelector(".logo");


  if (logo) {

    logo.addEventListener(
      "click",
      function (event) {

        event.preventDefault();


        const home =
          document.getElementById("home");


        if (home) {

          home.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }


        if (navMenu) {

          navMenu.classList.remove("active");

        }

      }
    );

  }



  /* ==========================================
     OUR WEDDING BUTTON
  ========================================== */

  const weddingButton =
    document.querySelector(
      '.main-button[href="#details"]'
    );


  if (weddingButton) {

    weddingButton.addEventListener(
      "click",
      function (event) {

        event.preventDefault();


        const details =
          document.getElementById("details");


        if (details) {

          details.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      }
    );

  }



  /* ==========================================
     WEDDING COUNTDOWN

     DECEMBER 08, 2026
     2:00 PM
  ========================================== */

  const weddingDate =
    new Date(
      "2026-12-08T14:00:00"
    ).getTime();



  function updateCountdown() {

    const now =
      new Date().getTime();


    const distance =
      weddingDate - now;


    if (distance <= 0) {

      setCountdown(
        "00",
        "00",
        "00",
        "00"
      );

      return;

    }


    const days =
      Math.floor(
        distance /
        (1000 * 60 * 60 * 24)
      );


    const hours =
      Math.floor(
        (
          distance %
          (1000 * 60 * 60 * 24)
        ) /
        (1000 * 60 * 60)
      );


    const minutes =
      Math.floor(
        (
          distance %
          (1000 * 60 * 60)
        ) /
        (1000 * 60)
      );


    const seconds =
      Math.floor(
        (
          distance %
          (1000 * 60)
        ) /
        1000
      );


    setCountdown(

      String(days).padStart(
        2,
        "0"
      ),

      String(hours).padStart(
        2,
        "0"
      ),

      String(minutes).padStart(
        2,
        "0"
      ),

      String(seconds).padStart(
        2,
        "0"
      )

    );

  }



  /* ==========================================
     SET COUNTDOWN
  ========================================== */

  function setCountdown(
    days,
    hours,
    minutes,
    seconds
  ) {


    const daysElement =
      document.getElementById("days");


    const hoursElement =
      document.getElementById("hours");


    const minutesElement =
      document.getElementById("minutes");


    const secondsElement =
      document.getElementById("seconds");


    if (daysElement) {

      daysElement.textContent =
        days;

    }


    if (hoursElement) {

      hoursElement.textContent =
        hours;

    }


    if (minutesElement) {

      minutesElement.textContent =
        minutes;

    }


    if (secondsElement) {

      secondsElement.textContent =
        seconds;

    }

  }



  /* ==========================================
     START COUNTDOWN
  ========================================== */

  updateCountdown();


  setInterval(
    updateCountdown,
    1000
  );



  /* ==========================================
     RSVP BUTTON
  ========================================== */

  const rsvpButton =
    document.getElementById("rsvpButton");


  if (rsvpButton) {

    rsvpButton.addEventListener(
      "click",
      function () {

        alert(
          "Thank you for celebrating " +
          "with Leandro & Immaculate!\n\n" +
          "The RSVP form will be available soon."
        );

      }
    );

  }

});
