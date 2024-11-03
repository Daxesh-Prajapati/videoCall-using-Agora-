import agoradata from "./AgoraToken.js";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let localTracks = [];
let remoteUsers = {};

let joinAndDisplayLocalStream = async () => {
  // publishing remote user
  client.on("user-published", handleRemoteUserJioned);

  // removing remote user
  client.on("user-left", handleRemoteUserLeft);

  let UID = await client.join(
    agoradata.APP_ID,
    agoradata.CHANNEL,
    agoradata.TOKEN,
    null
  );

  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

  let player = `<div class="video-container" id="user-container-${UID}">
                        <div class="video-player" id="user-${UID}"></div>
                  </div>`;

  document
    .getElementById("video-streams")
    .insertAdjacentHTML("beforeend", player);

  localTracks[1].play(`user-${UID}`);

  await client.publish([localTracks[0], localTracks[1]]);

  document.getElementById(`user-${UID}`).firstElementChild.style.borderRadius =
    "20px";
};

// local user joining
let joinStream = async () => {
  await joinAndDisplayLocalStream();
  join_btn.style.display = "none";
  document.getElementsByClassName("stream-controls")[0].style.display = "flex";
  document.getElementById("stream-wrapper").style.display = "flex";
};

let join_btn = document.getElementById("join_call");
join_btn.addEventListener("click", joinStream);

// microphone on and off
let microphoneToggle = async () => {
  try {
    let mic_img = document.getElementById("microphone_img");
    if (localTracks[0].muted) {
      await localTracks[0].setMuted(false);
      console.log("Microphone unmuted");

      mic_img.src = "./assets/microphone-on.svg";
    } else {
      await localTracks[0].setMuted(true);
      console.log("Microphone muted");

      mic_img.src = "./assets/microphone-off.svg";
    }
  } catch (error) {
    console.error("Error toggling microphone:", error);
  }
};

let mic_btn = document.getElementById("microphone");
mic_btn.addEventListener("click", microphoneToggle);

// camera on and off
let cameraToggle = async () => {
  try {
    let cam_img = document.getElementById("camera_img");
    if (localTracks[1].muted) {
      await localTracks[1].setMuted(false);
      console.log("camera Unmuted");

      cam_img.src = "./assets/camera-on.svg";
    } else {
      await localTracks[1].setMuted(true);
      console.log("camera muted");

      cam_img.src = "./assets/camera-off.svg";
    }
  } catch (error) {
    console.log("Error Toggling Camera: ", error);
  }
};

let cam_btn = document.getElementById("camera");
cam_btn.addEventListener("click", cameraToggle);

// leave meeting
let localUserLeaveMeeting = async () => {
  for (let i = 0; i < localTracks.length; i++) {
    localTracks[i].stop();
    localTracks[i].close();
  }

  // removing the client such that meeting gets over
  await client.leave();

  //   // recreating joining page
  join_btn.style.display = "block";
  document.getElementsByClassName("stream-controls")[0].style.display = "none";
  document.getElementById("video-streams").innerHTML = "";
  document.getElementById("stream-wrapper").style.display = "none";
};

let leave_btn = document.getElementById("leaveMeeting");
leave_btn.addEventListener("click", localUserLeaveMeeting);

// handling remote users
let handleRemoteUserJioned = async (user, mediaType) => {
  // adding users to remote user
  remoteUsers[user.uid] = user;

  // subcribing user to rtc
  await client.subscribe(user, mediaType);

  // checking which media type is and playing it
  if (mediaType === "video") {
    let player = document.getElementById(`user-container-${user.uid}`);
    // if player already exist , remove user
    if (player != null) {
      player.remove();
    }

    player = `<div class="video-container" id="user-container-${user.uid}">
                        <div class="video-player" id="user-${user.uid}"></div>
                  </div>`;

    document
      .getElementById("video-streams")
      .insertAdjacentHTML("beforeend", player);

    user.videoTrack.play(`user-${user.uid}`);
  }

  if (mediaType === "audio") {
    user.audioTrack.play();
  }

  document.getElementById(
    `user-${user.uid}`
  ).firstElementChild.style.borderRadius = "20px";
};

// when remote user leaves
let handleRemoteUserLeft = async (user) => {
  delete remoteUsers[user.uid];
  document.getElementById(`user-container-${user.uid}`).remove();
};
