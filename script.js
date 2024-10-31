/**
 * Function executed when the document is fully loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".gallery-item button");
  const images = document.querySelectorAll(".gallery img");
  const detailsSection = document.querySelector(".details");

  /**
   * Monuments data
   * @type {Object}
   */
  const monumentsData = {
    "tour-eiffel": {
      title: "Tour Eiffel",
      location: "Paris, France",
      description:
        "La tour Eiffel est un monument emblématique de Paris, construit par Gustave Eiffel pour l'Exposition universelle de 1889. Mesurant 330 mètres de hauteur, elle est faite de fer et a été initialement critiquée, mais elle est devenue un symbole mondial de la France et de l'ingénierie moderne.",
      coords: [48.8584, 2.2945],
    },
    "notre-dame": {
      title: "Notre-Dame",
      location: "Paris, France",
      description:
        "La cathédrale Notre-Dame de Paris est l'un des monuments gothiques les plus emblématiques au monde. Inaugurée en 1345, elle est connue pour son architecture impressionnante et ses vitraux remarquables.",
      coords: [48.8529, 2.3508],
    },
    "arc-triomphe": {
      title: "Arc de Triomphe",
      location: "Paris, France",
      description:
        "L'Arc de Triomphe est l'un des monuments les plus célèbres de Paris, commandé par Napoléon en 1806 pour commémorer la Grande Armée. Situé sur l'avenue des Champs-Élysées, il offre une vue spectaculaire sur la ville.",
      coords: [48.8738, 2.295],
    },
    "mont-saint-michel": {
      title: "Mont Saint-Michel",
      location: "Normandie, France",
      description:
        "Le Mont Saint-Michel est un îlot rocheux en Normandie, célèbre pour son abbaye médiévale et son architecture unique. Il est l'une des attractions les plus populaires de France.",
      coords: [48.636, -1.512],
    },
    versailles: {
      title: "Château de Versailles",
      location: "Versailles, France",
      description:
        "Le Château de Versailles est un ancien pavillon de chasse transformé en palais majestueux par Louis XIV. Il est célèbre pour ses jardins, ses sculptures et la Galerie des Glaces.",
      coords: [48.8049, 2.1204],
    },
  };

  let mapInstance = null;
  let activeMarker = null;

  /**
   * Initializes the map
   * @param {Array<number>} coordinates
   */
  function initializeMap(coordinates) {
    if (!mapInstance) {
      mapInstance = L.map("mapid").setView(coordinates, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstance);
    }
  }

  /**
   * Resets animations on elements
   */
  function resetAnimation() {
    if (detailsSection) {
      detailsSection.classList.remove("show");
      const animatableElements = detailsSection.querySelectorAll("h2, p, #mapid");
      animatableElements.forEach((element) => {
        if (element) {
          element.style.animation = "none";
          element.offsetHeight; // Trigger reflow
          element.style.animation = "";
        }
      });
      requestAnimationFrame(() => {
        detailsSection.classList.add("show");
      });
    }
  }

  /**
   * Displays monument information
   * @param {string} monumentKey
   */
  function displayMonument(monumentKey) {
    const monument = monumentsData[monumentKey];
    if (monument) {
      resetAnimation();

      if (detailsSection) {
        detailsSection.querySelector("h2").innerText = monument.title;
        detailsSection.querySelector("p strong").innerText = monument.location;
        detailsSection.querySelector("p:nth-child(3)").innerText = monument.description;
      }

      setTimeout(() => {
        initializeMap(monument.coords);

        if (activeMarker) {
          mapInstance.removeLayer(activeMarker);
        }

        if (mapInstance) {
          activeMarker = L.marker(monument.coords)
            .addTo(mapInstance)
            .bindPopup(`<b>${monument.title}</b><br>${monument.location}`)
            .openPopup();
          mapInstance.setView(monument.coords, 13);
          mapInstance.invalidateSize();
        }
      }, 100);

      images.forEach((img) => (img.style.filter = "grayscale(100%)"));
      const selectedImage = document.querySelector(`img[data-monument="${monumentKey}"]`);
      if (selectedImage) {
        selectedImage.style.filter = "none";
      }
    }
  }

  if (buttons) {
    buttons.forEach((button) => {
      button.addEventListener("click", () => displayMonument(button.dataset.monument));
    });

    images.forEach((image) => {
      image.addEventListener("click", () => displayMonument(image.dataset.monument));
    });

    images.forEach((img) => (img.style.filter = "none"));
  }
});


/**
 * Initializes the map
 * @param {Array<number>} coordinates
 */
function initializeMap(coordinates) {
  if (!mapInstance) {
    mapInstance = L.map("mapid").setView(coordinates, 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>",
    }).addTo(mapInstance);
  }
}

/**
 * Resets animations on elements
 */
function resetAnimation() {
  if (detailsSection) {
    detailsSection.classList.remove("show");
    const animatableElements = detailsSection.querySelectorAll("h2, p, #mapid");
    animatableElements.forEach((element) => {
      if (element) {
        element.style.animation = "none";
        element.offsetHeight; // Trigger reflow
        element.style.animation = "";
      }
    });
    requestAnimationFrame(() => {
      detailsSection.classList.add("show");
    });
  }
}

/**
 * Displays monument information
 * @param {string} monumentKey
 */
function displayMonument(monumentKey) {
  const monument = monumentsData[monumentKey];
  if (monument) {
    resetAnimation();

    if (detailsSection) {
      detailsSection.querySelector("h2").innerText = monument.title;
      detailsSection.querySelector("p strong").innerText = monument.location;
      detailsSection.querySelector("p:nth-child(3)").innerText = monument.description;
    }

    setTimeout(() => {
      initializeMap(monument.coords);

      if (activeMarker) {
        mapInstance.removeLayer(activeMarker);
      }

      if (mapInstance) {
        activeMarker = L.marker(monument.coords)
          .addTo(mapInstance)
          .bindPopup(`<b>${monument.title}</b><br>${monument.location}`)
          .openPopup();
        mapInstance.setView(monument.coords, 13);
        mapInstance.invalidateSize();
      }
    }, 100);

    images.forEach((img) => (img.style.filter = "grayscale(100%)"));
    const selectedImage = document.querySelector(`img[data-monument="${monumentKey}"]`);
    if (selectedImage) {
      selectedImage.style.filter = "none";
    }
  }

}