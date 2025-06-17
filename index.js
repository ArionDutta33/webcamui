const startButton = document.querySelector(".start-button");
const stopButton = document.querySelector(".stop-button");
const markButton = document.querySelector(".mark-attendance");
const cameraPreview = document.querySelector(".camera-preview");

let stream = null;
let videoElement = null;

function createVideoElement() {
  videoElement = document.createElement("video");
  videoElement.setAttribute("autoplay", true);
  videoElement.setAttribute("playsinline", true);
  videoElement.style.width = "100%";
  videoElement.style.height = "100%";
  videoElement.style.borderRadius = "2rem";

  cameraPreview.textContent = "";
  cameraPreview.appendChild(videoElement);
}

startButton.addEventListener("click", async () => {
  try {
    if (!videoElement) {
      createVideoElement();
    }

    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("Error accessing camera:", error);
    alert("Camera access denied or not available.");
  }
});

stopButton.addEventListener("click", () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }
  if (videoElement) {
    videoElement.srcObject = null;
  }
  cameraPreview.innerHTML = "camera preview";
  videoElement = null;
});

markButton.addEventListener("click", () => {
  if (stream) {
    alert("Attendance marked successfully!");
  } else {
    alert("Please start the camera before marking attendance.");
  }
});
