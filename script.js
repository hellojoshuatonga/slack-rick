const AUDIO_PLAYER_ID = "rick-player";
const SOUNDS_BASE_URL =
  "https://raw.githubusercontent.com/hellojoshuatonga/slack-rick/master/sounds/";
const SOUNDS_LIST_URL = SOUNDS_BASE_URL + "list.txt";
let soundNames = [];

function fetchRickTones() {
  return fetch(SOUNDS_LIST_URL)
    .then(result => result.text())
    .then(rawTones => {
      const tones = rawTones.split("\n");
      // There's an empty new line so just pop it from the array
      tones.pop();

      soundNames = soundNames.concat(tones);
    });
}

fetchRickTones();

function getRandomRickTone() {
  const selectedSoundName =
    soundNames[Math.floor(Math.random() * soundNames.length)];
  return SOUNDS_BASE_URL + selectedSoundName;
}

function rickTonePlayer() {
  const existingPlayer = document.getElementById(AUDIO_PLAYER_ID);
  if (existingPlayer) {
    return;
  }

  const audio = document.createElement("audio");
  audio.id = AUDIO_PLAYER_ID;
  audio.src = getRandomRickTone();
  audio.type = "audio/mpeg";
  audio.onended = function() {
    document.body.removeChild(audio);
  };

  document.body.appendChild(audio);
  audio.play().catch(function() {
    document.body.removeChild(audio);
  });
}

function addNotificationListener(fn) {
  const OldNotification = window.Notification;

  function NewNotification(title, opt) {
    fn(title, opt);
    const instance = new OldNotification(title, opt);
    return instance;
  }

  NewNotification.requestPermission = OldNotification.requestPermission.bind(
    OldNotification
  );
  Object.defineProperty(NewNotification, "permission", {
    get: () => OldNotification.permission
  });

  window.Notification = NewNotification;
}

addNotificationListener(rickTonePlayer);
