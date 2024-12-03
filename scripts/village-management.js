document.addEventListener("DOMContentLoaded", () => {
    const villageList = document.getElementById("villages");
    const searchInput = document.getElementById("search");
    const sortSelect = document.getElementById("sort");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
  
    const villages = [
      { name: "Village 1" },
      { name: "Village 2" },
      { name: "Village 3" },
      { name: "Village 4" },
      { name: "Village 5" },
    ];
    let currentPage = 1;
    const itemsPerPage = 2;
  
    const renderVillages = () => {
      const filteredVillages = villages.filter((village) =>
        village.name.toLowerCase().includes(searchInput.value.toLowerCase())
      );
      const sortedVillages =
        sortSelect.value === "alphabetical"
          ? filteredVillages.sort((a, b) => a.name.localeCompare(b.name))
          : filteredVillages;
  
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
  
      villageList.innerHTML = sortedVillages.slice(startIndex, endIndex).map(
        (village) => `<li>${village.name}</li>`
      ).join("");
    };
  
    searchInput.addEventListener("input", renderVillages);
    sortSelect.addEventListener("change", renderVillages);
    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderVillages();
      }
    });
    nextPageBtn.addEventListener("click", () => {
      if (currentPage * itemsPerPage < villages.length) {
        currentPage++;
        renderVillages();
      }
    });
  
    renderVillages();
  });


  const addVillageBtn = document.getElementById("add-village-btn");
const modal = document.getElementById("village-modal");
const closeBtn = document.querySelector(".close-btn");

// فتح النافذة المنبثقة عند الضغط على الزر
addVillageBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// إغلاق النافذة المنبثقة عند الضغط على زر الإغلاق
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// إغلاق النافذة عند النقر في أي مكان خارج النافذة المنبثقة
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// إرسال النموذج
const villageForm = document.getElementById("village-form");
villageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // هنا يمكن إضافة الكود لإرسال البيانات إلى الخادم أو معالجتها.
  const villageName = document.getElementById("village-name").value;
  const villageDescription = document.getElementById("village-description").value;
  const villageLocation = document.getElementById("village-location").value;
  
  console.log("Village Added:", villageName, villageDescription, villageLocation);

  // إغلاق النافذة بعد إضافة القرية
  modal.style.display = "none";
});
  