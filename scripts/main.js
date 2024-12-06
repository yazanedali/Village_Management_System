const menuBtn = document.getElementById("menu-btn");
const dashboard = document.getElementById("dashboard");
const pageTitle = document.getElementById("page-title");
const pageContent = document.getElementById("page-content");
const links = document.querySelectorAll("#dashboard a");


menuBtn.addEventListener("click", () => {
  dashboard.classList.toggle("active");
});


const loadPage = (page, script) => {
  fetch(page)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {

      pageTitle.textContent = page.replace(".html", "").replace("-", " ").toUpperCase();
      pageContent.innerHTML = data;


      if (script) {
        loadScript(script);
      }
    })
    .catch((error) => {
      console.error("Error loading the page:", error);
      pageContent.innerHTML = "There was an error loading the page.";
    });
};


const loadScript = (src) => {

  const existingScript = document.querySelector(`script[data-loaded="true"]`);
  if (existingScript) {
    existingScript.remove();
  }

  const newScript = document.createElement("script");
  newScript.src = src;
  newScript.dataset.loaded = "true";
  newScript.onload = () => {
    console.log(`Script ${src} loaded successfully.`);
  };
  newScript.onerror = () => {
    console.error(`Failed to load script: ${src}`);
  };
  document.body.appendChild(newScript);
};


window.addEventListener("DOMContentLoaded", () => {
  loadPage("overview.html", "scripts/overview.js");
});


links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const page = link.dataset.page;
    const script = link.dataset.script;
    loadPage(page, script);
  });
});
