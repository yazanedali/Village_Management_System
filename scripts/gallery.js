    function initializeVillageGallery(){
    
    const buttons = document.querySelectorAll(".btn");
    const container = document.querySelector(".container");
    const userType = localStorage.getItem("userType");

    if (userType === "user") {
      buttons.forEach(button => button.style.display = "none");
    }
     else if (userType === "admin") {
      buttons.forEach(button => button.style.display = "inline-block");
     }
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        container.innerHTML += `
          <div class="item">
            <div class="img"></div>
            <p class="desc">Description of the village image.</p>
          </div>
        `;
      });
    });
  }
  initializeVillageGallery();
  
  // Export for external use
  window.initializeVillageGallery = initializeVillageGallery;
  
  