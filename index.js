const startButton = document.querySelector(".start-button");
const stopButton = document.querySelector(".stop-button");
const markButton = document.querySelector(".mark-attendance");
const cameraPreview = document.querySelector(".camera-preview");
const downloadContainer = document.querySelector(".download-link-container");

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
  downloadContainer.innerHTML = "";
});

markButton.addEventListener("click", () => {
  if (videoElement && stream) {
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const blobUrl = URL.createObjectURL(blob);
          console.log("Blob URL:", blobUrl);
          const a = document.createElement("a");
          a.href = blobUrl;
          a.download = `captured-image-${Date.now()}.jpg`;
          a.textContent = "Download captured image";
          a.style.color = "white";
          a.style.fontSize = "1rem";
          a.style.display = "inline-block";
          a.style.marginTop = "1rem";

          downloadContainer.innerHTML = "";
          downloadContainer.appendChild(a);

          alert("Image captured and ready to download!");
        } else {
          alert("Failed to capture image.");
        }
      },
      "image/jpeg",
      0.95
    );
  } else {
    alert("Please start the camera before marking attendance.");
  }
});
