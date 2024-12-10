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

      if (page === "overview.html") {
        loadGoogleMapsAPI(); 
      }

    })
    .catch((error) => {
      console.error("Error loading the page:", error);
      pageContent.innerHTML = "There was an error loading the page.";
    });
};


const loadGoogleMapsAPI = () => {
  if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAysQBM3-leTK8l9EKH9GpzS5HeIplJeUM&callback=initMap";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
   else {
    initMap();
  }
};

function initMap() {

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 31.9686, lng: 35.2433 },
    zoom: 8,
  });

  const marker = new google.maps.Marker({
    position: { lat: 31.4086, lng: 34.3433 },
    map: map,
    title: "Main Location",
  });
}

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

const username = localStorage.getItem('username');
const typeUser = localStorage.getItem('userType'); 

if (username) {
  document.querySelector('#admin-info h4').innerText = username;

  let imageUrl = '';
  if (typeUser === "admin" && username === "deyaa") {
    imageUrl = "https://th.bing.com/th/id/OIP.USP1T_5fjD1VcqeFBkbNDwHaHa?rs=1&pid=ImgDetMain&fbclid=IwZXh0bgNhZW0CMTEAAR0vJqEiR6evR_QCJCdRw4ypP4gCVb0VWgYTiF_7eJjsuIUTM9jaS0f4f8I_aem_Pm_DYSNedC84sovrP1OEgQ";
  } else if (typeUser === "admin" && username === "yazan") {
    console.log("first")
    imageUrl = "https://th.bing.com/th/id/OIP.USP1T_5fjD1VcqeFBkbNDwHaHa?rs=1&pid=ImgDetMain&fbclid=IwZXh0bgNhZW0CMTEAAR0vJqEiR6evR_QCJCdRw4ypP4gCVb0VWgYTiF_7eJjsuIUTM9jaS0f4f8I_aem_Pm_DYSNedC84sovrP1OEgQ";
  } else if (typeUser === "admin" && username === "moamen") {
    imageUrl = "https://th.bing.com/th/id/OIP.USP1T_5fjD1VcqeFBkbNDwHaHa?rs=1&pid=ImgDetMain&fbclid=IwZXh0bgNhZW0CMTEAAR0vJqEiR6evR_QCJCdRw4ypP4gCVb0VWgYTiF_7eJjsuIUTM9jaS0f4f8I_aem_Pm_DYSNedC84sovrP1OEgQ";
  }

  if (imageUrl) {
    document.querySelector('#admin-info img').src = imageUrl;
  }
} else {
  window.location.href = 'login.html';
}

document.querySelector('a[href="#logout"]').addEventListener('click', function () {
  localStorage.removeItem('username');
  localStorage.removeItem('typeUser'); 
  
  window.location.href = 'login.html'; 
});
});



