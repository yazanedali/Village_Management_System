function initializeVillageManagement() {
  // Get DOM elements
  const userType = localStorage.getItem("userType");
  const viewButtons = document.querySelectorAll(".view-btn");
  const updateButtons = document.querySelectorAll(".update-btn");
  const deleteButtons = document.querySelectorAll(".delete-btn");
  const addButtons = document.querySelectorAll(".add-btn");
  const addVillageBtn = document.getElementById('addVillageBtn');
  const villageModal = document.getElementById('villageModal');
  const closeModalBtn = document.querySelector('.modal .close');
  const villageForm = document.getElementById('villageForm');
  const villageList = document.getElementById('villageList');
  const searchInput = document.querySelector('.search-sort input');
  const sortSelect = document.querySelector('.sort-pagination select');


  if (userType === "user") {

    viewButtons.forEach(button => button.style.display = "inline-block");
    updateButtons.forEach(button => button.style.display = "none");
    deleteButtons.forEach(button => button.style.display = "none");
    addButtons.forEach(button => button.style.display = "none");
    addVillageBtn.style.display = "none";
  } else if (userType === "admin") {

    viewButtons.forEach(button => button.style.display = "inline-block");
    updateButtons.forEach(button => button.style.display = "inline-block");
    deleteButtons.forEach(button => button.style.display = "inline-block");
    addButtons.forEach(button => button.style.display = "inline-block");
    addVillageBtn.style.display = "inline-block";
  }
  // Remove any existing event listeners
  addVillageBtn?.removeEventListener('click', showModal);
  closeModalBtn?.removeEventListener('click', hideModal);
  villageForm?.removeEventListener('submit', handleFormSubmit);

  // Function to filter villages
  function filterVillages(searchTerm) {
      const villages = villageList.getElementsByClassName('village');
      searchTerm = searchTerm.toLowerCase();

      Array.from(villages).forEach(village => {
          const text = village.querySelector('span').textContent.toLowerCase();
          village.style.display = text.includes(searchTerm) ? '' : 'none';
      });
  }

  // Modal functions
  function showModal() {
      villageModal.style.display = 'flex';
  }

  function hideModal() {
      villageModal.style.display = 'none';
  }

  // Handle View Button
  function handleViewButton(event) {
      if (event.target.classList.contains('view-btn')) {
          const villageData = JSON.parse(event.target.dataset.village);
          const viewModal = document.getElementById('viewVillageModal');
          
          // Fill modal with village data
          document.getElementById('villageNameDetail').textContent = villageData.name;
          document.getElementById('regionDetail').textContent = villageData.region;
          document.getElementById('landAreaDetail').textContent = villageData.landArea;
          document.getElementById('latitudeDetail').textContent = villageData.latitude;
          document.getElementById('longitudeDetail').textContent = villageData.longitude;
          document.getElementById('tagsDetail').textContent = villageData.tags;
          document.getElementById('villageImage').src = villageData.image || '';

          // Show modal
          viewModal.style.display = 'flex';
      }
  }

  // Handle Update Button
  function handleUpdateButton(event) {
      if (event.target.classList.contains('update-btn')) {
          const villageData = JSON.parse(event.target.dataset.village);
          const updateModal = document.getElementById('updateVillageModal');
          
          // Fill form with current data
          document.getElementById('updateVillageId').value = villageData.index;
          document.getElementById('updateVillageName').value = villageData.name;
          document.getElementById('updateRegion').value = villageData.region;
          document.getElementById('updateLandArea').value = villageData.landArea;
          document.getElementById('updateLatitude').value = villageData.latitude;
          document.getElementById('updateLongitude').value = villageData.longitude;
          document.getElementById('updateCategories').value = villageData.tags;
          updateModal.style.display = 'flex';
      }
  }

  // Handle Delete Button
  function handleDeleteButton(event) {
    if (event.target.classList.contains('delete-btn')) {
        const villageDiv = event.target.closest('.village');
        
        if (villageDiv) {

            const villageName = villageDiv.querySelector('span')?.textContent || 'this village';
            

            if (confirm(`Are you sure you want to delete ${villageName}?`)) {
                villageDiv.style.opacity = '0';
                setTimeout(() => villageDiv.remove(), 300);
            }
        }
    }
}
//Handle Add Demographic Data
function handleAddDemographicDataButton(event) {
    if (event.target.classList.contains('add-btn')) {
        alert("add demographic data")
        const viewModal = document.getElementById('demographicData');
        viewModal.style.display = 'flex';
    }
}


  function handleFormSubmit(event) {
      event.preventDefault();

      const villageName = document.getElementById('villageName').value;
      const region = document.getElementById('region').value;
      const landArea = document.getElementById('landArea').value;
      const latitude = document.getElementById('latitude').value;
      const longitude = document.getElementById('longitude').value;
      const categories = document.getElementById('categories').value;
      const fileInput = document.getElementById('file');
      
      let imageUrl = '';
      if (fileInput.files && fileInput.files[0]) {
          imageUrl = URL.createObjectURL(fileInput.files[0]);
      }

      const villageIndex = villageList.children.length;
      const villageDiv = document.createElement('div');
      villageDiv.className = 'village';
      villageDiv.dataset.index = villageIndex;

      const villageData = {
          index: villageIndex,
          name: villageName,
          region: region,
          landArea: landArea,
          latitude: latitude,
          longitude: longitude,
          tags: categories,
          image: imageUrl
      };

      villageDiv.innerHTML = `
          <span>${villageName} - ${region}</span>
          <div class="btns">
              <button class="view-btn" data-village='${JSON.stringify(villageData)}'>View</button>
              <button class="update-btn" data-village='${JSON.stringify(villageData)}'>Update</button>
              <button class="delete-btn">Delete</button>
              <button class="add-btn"">Update Demographics</button>
          </div>
      `;

      villageList.appendChild(villageDiv);
      hideModal();
      villageForm.reset();
  }

  // Handle Update Form Submit
  const updateVillageForm = document.getElementById('updateVillageForm');
  if (updateVillageForm) {
      updateVillageForm.addEventListener('submit', function(event) {
          event.preventDefault();

          const villageIndex = document.getElementById('updateVillageId').value;
          const villageName = document.getElementById('updateVillageName').value;
          const region = document.getElementById('updateRegion').value;
          const landArea = document.getElementById('updateLandArea').value;
          const latitude = document.getElementById('updateLatitude').value;
          const longitude = document.getElementById('updateLongitude').value;
          const categories = document.getElementById('updateCategories').value;
          const fileInput = document.getElementById('updateFile');

          let imageUrl = '';
          if (fileInput.files && fileInput.files[0]) {
              imageUrl = URL.createObjectURL(fileInput.files[0]);
          }

          // Find the village div to update
          const villageDiv = document.querySelector(`.village[data-index="${villageIndex}"]`);
          if (villageDiv) {
              const villageData = {
                  index: villageIndex,
                  name: villageName,
                  region: region,
                  landArea: landArea,
                  latitude: latitude,
                  longitude: longitude,
                  tags: categories,
                  image: imageUrl || JSON.parse(villageDiv.querySelector('.view-btn').dataset.village).image
              };

              // Update village display
              villageDiv.innerHTML = `
                  <span>${villageName} - ${region}</span>
                  <div class="btns">
                      <button class="view-btn" data-village='${JSON.stringify(villageData)}'>View</button>
                      <button class="update-btn" data-village='${JSON.stringify(villageData)}'>Update</button>
                      <button class="delete-btn">Delete</button>
                       <button class="add-btn">Update Demographics</button>
                  </div>
              `;
          }

          // Close modal and reset form
          document.getElementById('updateVillageModal').style.display = 'none';
          updateVillageForm.reset();
      });
  }

  // Add event listeners
  if (addVillageBtn) {
      addVillageBtn.addEventListener('click', showModal);
  }

  if (closeModalBtn) {
      closeModalBtn.addEventListener('click', hideModal);
  }

  if (villageForm) {
      villageForm.addEventListener('submit', handleFormSubmit);
  }

  if (searchInput) {
      searchInput.addEventListener('input', (e) => {
          filterVillages(e.target.value);
      });
  }

  if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
          const villages = Array.from(villageList.getElementsByClassName('village'));
          villages.sort((a, b) => {
              const textA = a.querySelector('span').textContent.toLowerCase();
              const textB = b.querySelector('span').textContent.toLowerCase();
              return e.target.value === 'alphabetical' 
                  ? textA.localeCompare(textB)
                  : parseInt(a.dataset.index) - parseInt(b.dataset.index);
          });

          villages.forEach(village => villageList.appendChild(village));
      });
  }

  // Add click event listeners for view, update and delete
  villageList.addEventListener('click', (event) => {
      handleViewButton(event);
      handleUpdateButton(event);
      handleDeleteButton(event);
      handleAddDemographicDataButton(event);
  });

  // Close buttons functionality for all modals
  document.querySelectorAll('.modal .close').forEach(closeBtn => {
      closeBtn.addEventListener('click', function() {
          this.closest('.modal').style.display = 'none';
      });
  });

  // Close modals when clicking outside
  window.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal')) {
          event.target.style.display = 'none';
      }
  });
}

// Initialize when the script loads
initializeVillageManagement();

// Export for external use
window.initializeVillageManagement = initializeVillageManagement;