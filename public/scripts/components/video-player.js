export function videoPlayer(video) {
  const videoElement = video.querySelector("video");
  const videoUrlInput = video.querySelector(".video-url-input");
  const videoUrlButton = video.querySelector(".video-url-button");
  const videoAddSavePointButton = video.querySelector(".video-add-savepoint");
  const videoSavePointControls = video.querySelector(".video-savepoints");
  let videoState = {
    videoUrl: "",
    videoSavePoints: [],
  };

  function localStorageInit() {
    if (localStorage.getItem("videoState")) {
      videoState = JSON.parse(localStorage.getItem("videoState"));
      videoElement.src = videoState.videoUrl;
    } else {
      localStorage.setItem("videoState", JSON.stringify(videoState));
    }

    localStorageSync();
  }

  function localStorageSync() {
    localStorage.setItem("videoState", JSON.stringify(videoState));
    renderSavePoints();
  }

  function attachVideoUrlInput() {
    const videoUrl = videoUrlInput.value;
    videoElement.src = videoUrl;
    videoState.videoUrl = videoUrl;
    videoState.videoSavePoints = [];
    localStorageSync();
  }

  function addSavePoint() {
    if (!videoElement.src) {
      console.error("No video available");
      return;
    }

    const currentVideoTimeStamp = videoElement.currentTime;
    videoState.videoSavePoints.push(currentVideoTimeStamp);
    localStorageSync();
  }

  function savePointControls(event) {
    const controlType = event.target.dataset.savepointBtn;
    const savePoint = event.target.parentNode.parentNode.id;

    if (controlType === "play") {
      videoElement.currentTime = savePoint;
    }

    if (controlType === "delete") {
      videoState.videoSavePoints = videoState.videoSavePoints.filter(
        (item) => item != savePoint
      );
    }
    localStorageSync();
  }

  function renderSavePoints() {
    const videoSavePoints = videoState.videoSavePoints;
    const videoSavePointHTML = videoState.videoSavePoints.map((savePoint) => {
      const savePointHours = parseInt(savePoint / (60 * 60), 10);
      const savePointMinutes = parseInt(savePoint / 60, 10);
      const savePointSeconds = Math.floor(savePoint % 60);
      return `
    <li id="${savePoint}" class="video-save-point card">
    <p>${savePointHours}:${savePointMinutes}:${savePointSeconds}</p>
    <div>
    <button class="video-play-savepoint btn" data-savepoint-btn="play">Play</button>
    <button class="video-delete-savepoint btn" data-savepoint-btn="delete">Delete</button>
    </div>
    </li>
    `;
    });
    video.querySelector(".video-savepoints").innerHTML = videoSavePointHTML;
  }

  videoUrlButton.addEventListener("click", attachVideoUrlInput);

  videoAddSavePointButton.addEventListener("click", addSavePoint);
  videoSavePointControls.addEventListener("click", savePointControls);
  //   videoPlaySavePointButton.map(playSavePointButton => playSavePointButton.addEventListener("click", playSavePoint(playSavePointButton)))
  //   videoDeleteSavePointButton.map(deleteSavePointButton => deleteSavePointButton.addEventListener("click", playSavePoint(deleteSavePointButton)))
  localStorageInit();
}
