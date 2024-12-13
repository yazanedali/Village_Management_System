    const button = document.querySelector(".btn");
    const container = document.querySelector(".container");
  
    button.addEventListener("click", () => {
      container.innerHTML += `
       
        <div class="item">
          <div class="img"></div>
          <p class="desc">Description of the village image.</p>
   
      </div>
      `;
    });
  
  