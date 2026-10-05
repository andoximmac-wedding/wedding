document.addEventListener("DOMContentLoaded", function () {


  /* ==========================================
     RSVP GOOGLE APPS SCRIPT WEB APP
  ========================================== */

  const RSVP_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbyHRluj-FB5v2YY-vr5VHqeo2goCNca_h0tQ_VrF789KNZW_DAddAv4vxH_O5QVmBYgTQ/exec";



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
     RSVP FORM
  ========================================== */

  const rsvpForm =
    document.getElementById("rsvpForm");


  const rsvpSubmitButton =
    document.getElementById(
      "rsvpSubmitButton"
    );


  const rsvpStatus =
    document.getElementById(
      "rsvpStatus"
    );


  if (rsvpForm) {

    rsvpForm.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();


        /* ======================================
           GET FORM VALUES
        ====================================== */

        const guestName =
          document
            .getElementById("guestName")
            .value
            .trim();


        const attendanceElement =
          document.querySelector(
            'input[name="attendance"]:checked'
          );


        const attendance =
          attendanceElement
            ? attendanceElement.value
            : "";


        const numberOfGuests =
          document
            .getElementById(
              "numberOfGuests"
            )
            .value;


        const contactNumber =
          document
            .getElementById(
              "contactNumber"
            )
            .value
            .trim();


        const message =
          document
            .getElementById("message")
            .value
            .trim();



        /* ======================================
           VALIDATION
        ====================================== */

        if (!guestName) {

          showRSVPStatus(
            "Please enter your full name.",
            "error"
          );

          return;

        }


        if (!attendance) {

          showRSVPStatus(
            "Please select whether you will attend.",
            "error"
          );

          return;

        }


        if (!numberOfGuests) {

          showRSVPStatus(
            "Please select the number of guests.",
            "error"
          );

          return;

        }



        /* ======================================
           DISABLE BUTTON
        ====================================== */

        if (rsvpSubmitButton) {

          rsvpSubmitButton.disabled =
            true;

          rsvpSubmitButton.textContent =
            "SUBMITTING...";

        }


        showRSVPStatus(
          "Please wait while we submit your RSVP...",
          "success"
        );



        /* ======================================
           PREPARE DATA
        ====================================== */

        const rsvpData = {

          guestName:
            guestName,

          attendance:
            attendance,

          numberOfGuests:
            numberOfGuests,

          contactNumber:
            contactNumber,

          message:
            message

        };



        /* ======================================
           SEND TO GOOGLE APPS SCRIPT
        ====================================== */

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
                JSON.stringify(
                  rsvpData
                )

            }
          );


          /* ====================================
             SUCCESS MESSAGE
          ==================================== */

          showRSVPStatus(

            "Thank you, " +
            guestName +
            "! ❤️<br><br>" +

            "Your RSVP has been received.<br>" +

            "We are so happy to celebrate " +
            "with you on December 08, 2026.",

            "success"

          );


          /* ====================================
             CLEAR FORM
          ==================================== */

          rsvpForm.reset();


        } catch (error) {

          console.error(
            "RSVP Error:",
            error
          );


          showRSVPStatus(

            "We were unable to submit your RSVP. " +
            "Please try again.",

            "error"

          );

        }


        /* ======================================
           ENABLE BUTTON AGAIN
        ====================================== */

        if (rsvpSubmitButton) {

          rsvpSubmitButton.disabled =
            false;

          rsvpSubmitButton.textContent =
            "SUBMIT RSVP";

        }

      }
    );

  }



  /* ==========================================
     RSVP STATUS MESSAGE
  ========================================== */

  function showRSVPStatus(
    message,
    type
  ) {

    if (!rsvpStatus) {
      return;
    }


    rsvpStatus.innerHTML =
      message;


    rsvpStatus.className =
      "rsvp-status " +
      type;


    rsvpStatus.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

  }

});
