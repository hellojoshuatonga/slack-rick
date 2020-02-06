function setNotificationCallback(createCallback, clickCallback) {
  const OldNotify = window.Notification;
  function newNotify(title, opt) {
    createCallback(title, opt);
    const instance = new OldNotify(title, opt);
    instance.addEventListener("click", clickCallback);
    return instance;
  }
  newNotify.requestPermission = OldNotify.requestPermission.bind(OldNotify);
  Object.defineProperty(newNotify, "permission", {
    get: () => OldNotify.permission
  });

  window.Notification = newNotify;
  //Notification = newNotify;
}

let sounds = [];

fetch(
  "https://raw.githubusercontent.com/hellojoshuatonga/slack-rick/master/sounds/list.txt"
)
  .then(r => r.text())
  .then(result => {
    const hell = result.split("\n");
    hell.pop(); // there's an empty line

    sounds = sounds.concat(hell);
  });

function getRickSound() {
  const rick = sounds[Math.floor(Math.random() * sounds.length)];
  return (
    "https://raw.githubusercontent.com/hellojoshuatonga/slack-rick/master/sounds/" +
    rick
  );
}

function createCallback(t, a) {
  const existingPlayer = document.getElementById("rick-player");
  if (existingPlayer) {
    return;
  }

  const audio = document.createElement("audio");
  audio.id = "rick-player";
  audio.src = getRickSound();
  audio.type = "audio/mpeg";
  audio.onended = function() {
    console.log("audio ended");
    document.body.removeChild(audio);
  };
  document.body.appendChild(audio);
  audio.play();
}

setNotificationCallback(createCallback, () => null);
