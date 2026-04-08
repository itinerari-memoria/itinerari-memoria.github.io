document.addEventListener("DOMContentLoaded", function() {
    const qrSection = document.getElementById("qrSection");
    const noCameraMsg = qrSection ? qrSection.querySelector(".no-camera") : null;
  
    if (qrSection) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        qrSection.classList.remove("collapsed");
        if (noCameraMsg) noCameraMsg.style.display = "none";
      } else {
        qrSection.classList.add("collapsed");
        if (noCameraMsg) noCameraMsg.style.display = "block";
      }
    }
  });
  