
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

if (ageCanvas && genderCanvas && populationCanvas) {
  console.log("Canvas elements found");

  new Chart(ageCanvas, configAge);
  new Chart(genderCanvas, configGender);
  new Chart(populationCanvas, configPopulation); 
} else {
  console.error("Canvas elements not found");
}
