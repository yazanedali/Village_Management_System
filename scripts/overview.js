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
  }
  
  // Initialize when the script loads
  OverviewFun();
  
  // Export for external use
  window.OverviewFun = OverviewFun;