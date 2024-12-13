function OverviewFun() {

    const loadGoogleMapsAPI = () => {
      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAysQBM3-leTK8l9EKH9GpzS5HeIplJeUM&callback=initMap";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      } else {
        initMap();
      }
    };
  
    // Make initMap globally accessible
    window.initMap = function () {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 31.9686, lng: 35.2433 },
        zoom: 8,
      });
  
      const marker = new google.maps.Marker({
        position: { lat: 31.4086, lng: 34.3433 },
        map: map,
        title: "Main Location",
      });
    };
  
    loadGoogleMapsAPI();
    console.log("Overview script executed.");

    const loadChartJS = () => {
        if (!document.querySelector('script[src*="cdn.jsdelivr.net/npm/chart.js"]')) {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/chart.js";
          script.async = true;
          script.onload = () => initializeCharts(); // تنفيذ الكود بعد تحميل المكتبة
          document.body.appendChild(script);
        } else {
          initializeCharts(); // إذا كانت المكتبة محملة مسبقًا
        }
      };
    
      // تعريف البيانات وإنشاء الرسوم البيانية
      const initializeCharts = () => {
        const ageData = {
          labels: ["0-18", "19-35", "36-50", "51-65", "65+"],
          datasets: [
            {
              label: "Age Distribution",
              data: [20, 35, 25, 15, 5],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };
    
        const genderData = {
          labels: ["Male", "Female"],
          datasets: [
            {
              label: "Gender Ratios",
              data: [60, 40],
              backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
              borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        };
    
        const populationData = {
          labels: ["Jabalia", "Beit Lahia", "Quds", "Shejaiya", "Hebron", "Nablus", "Ramallah", "Beit Jala"],
          datasets: [
            {
              label: "Population",
              data: [100000, 120000, 80000, 90000, 150000, 140000, 130000, 110000],
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };
    
        const configAge = {
          type: "pie",
          data: ageData,
          options: {
            responsive: true,
          },
        };
    
        const configGender = {
          type: "pie",
          data: genderData,
          options: {
            responsive: true,
          },
        };
    
        const configPopulation = {
          type: "bar",
          data: populationData,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };
    
        const ageCanvas = document.getElementById("ageDistributionChart");
        const genderCanvas = document.getElementById("genderRatiosChart");
        const populationCanvas = document.getElementById("populationChart");
    
        if (ageCanvas) new Chart(ageCanvas, configAge);
        if (genderCanvas) new Chart(genderCanvas, configGender);
        if (populationCanvas) new Chart(populationCanvas, configPopulation);
      };
    
      // استدعاء تحميل المكتبة وإنشاء الرسوم البيانية
      loadChartJS();
    }

  
  
  // Initialize when the script loads
  OverviewFun();
  
  // Export for external use
  window.OverviewFun = OverviewFun;




// const ageData = {
//     labels: ["0-18", "19-35", "36-50", "51-65", "65+"],
//     datasets: [
//       {
//         label: "Age Distribution",
//         data: [20, 35, 25, 15, 5], 
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.6)",
//           "rgba(54, 162, 235, 0.6)",
//           "rgba(255, 206, 86, 0.6)",
//           "rgba(75, 192, 192, 0.6)",
//           "rgba(153, 102, 255, 0.6)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };
  
//   const genderData = {
//     labels: ["Male", "Female"],
//     datasets: [
//       {
//         label: "Gender Ratios",
//         data: [60, 40], 
//         backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
//         borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
//         borderWidth: 1,
//       },
//     ],
//   };
  
//   const populationData = {
//     labels: ["Jabalia", "Beit Lahia", "Quds", "Shejaiya", "Hebron", "Nablus", "Ramallah", "Beit Jala"],
//     datasets: [
//       {
//         label: "Population",
//         data: [100000, 120000, 80000, 90000, 150000, 140000, 130000, 110000], 
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };
  
//   const configAge = {
//     type: "pie", 
//     data: ageData,
//     options: {
//       responsive: true,
//     },
//   };
  
//   const configGender = {
//     type: "pie", 
//     data: genderData,
//     options: {
//       responsive: true,
//     },
//   };
  
//   const configPopulation = {
//     type: "bar", 
//     data: populationData,
//     options: {
//       responsive: true,
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   };
  
//   const ageCanvas = document.getElementById("ageDistributionChart");
//   const genderCanvas = document.getElementById("genderRatiosChart");
//   const populationCanvas = document.getElementById("populationChart");
  
//   if (ageCanvas && genderCanvas && populationCanvas) {
//     console.log("Canvas elements found");
  
//     new Chart(ageCanvas, configAge);
//     new Chart(genderCanvas, configGender);
//     new Chart(populationCanvas, configPopulation); 
//   } else {
//     console.error("Canvas elements not found");
//   }