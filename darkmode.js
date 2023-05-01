// Darkmode functionality
(() => {
  // check for saved 'darkMode' in localStorage
  let darkMode = localStorage.getItem("darkMode");

  const darkModeToggle = document.querySelector(".day-night-toggle");

  const darkModeItems = document.querySelectorAll("[data-dark-mode]");
  const lightModeItems = document.querySelectorAll("[data-light-mode]");

  const showDarkItems = function () {
    darkModeItems.forEach((item) => item.classList.remove("hide"));

    lightModeItems.forEach((item) => item.classList.add("hide"));
  };

  const showLightItems = function () {
    lightModeItems.forEach((item) => item.classList.remove("hide"));

    darkModeItems.forEach((item) => item.classList.add("hide"));
  };

  const images = [
    ...document.querySelectorAll("img[data-has-dark-image=next]")
  ].map((el) => {
    return {
      lightImage: {
        el: el,
        loaded: false
      },
      darkImage: {
        el: el.nextElementSibling,
        loaded: false
      }
    };
  });

  // render dark images
  const renderDarkImages = function () {
    images.forEach((item) => {
      if (!item.darkImage.loaded) {
        const img = new Image();

        img.addEventListener("load", function () {
          item.lightImage.el.classList.add("hide");
          item.darkImage.el.classList.remove("hide");

          item.darkImage.loaded = true;
        });

        img.src = item.darkImage.el.src;
      } else {
        item.lightImage.el.classList.add("hide");
        item.darkImage.el.classList.remove("hide");
      }
    });
  };

  // render light images
  const renderLightImages = function () {
    images.forEach((item) => {
      if (!item.lightImage.loaded) {
        const img = new Image();

        img.addEventListener("load", function () {
          item.darkImage.el.classList.add("hide");
          item.lightImage.el.classList.remove("hide");

          item.lightImage.loaded = true;
        });

        img.src = item.lightImage.el.src;
      } else {
        item.darkImage.el.classList.add("hide");
        item.lightImage.el.classList.remove("hide");
      }
    });
  };

  const enableDarkMode = () => {
    // Update darkMode in localStorage
    localStorage.setItem("darkMode", "enabled");

    // Add the class to the body
    document.body.classList.add("dm");

    // Show Dark items
    showDarkItems();

    // Render dark images
    renderDarkImages(images);
  };

  const disableDarkMode = () => {
    // Update darkMode in localStorage
    localStorage.setItem("darkMode", null);

    // Remove the class from the body
    document.body.classList.remove("dm");

    // Show Light items
    showLightItems();

    // Render light images
    renderLightImages(images);
  };

  // If the user already visited and enabled darkMode
  // start things off with it on
  if (darkMode === "enabled") {
    enableDarkMode();
  }

  // When someone clicks the button
  darkModeToggle.addEventListener("click", () => {
    // get their darkMode setting
    darkMode = localStorage.getItem("darkMode");

    // if it not current enabled, enable it
    if (darkMode !== "enabled") {
      enableDarkMode();
      // if it is enabled, turn it off
    } else {
      disableDarkMode();
    }
  });
})();
