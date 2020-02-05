function setNotificationCallback(createCallback, clickCallback) {
  const OldNotify = window.Notification;
  function newNotify(title, opt) {
    console.log("xzcxzcxz");
    createCallback(title, opt);
    const instance = new OldNotify(title, opt);
    instance.addEventListener("click", clickCallback);
    return instance;
  }
  console.log("old permissions");
  console.log(OldNotify.permission);
  console.log("old ");
  console.log(OldNotify);
  newNotify.requestPermission = OldNotify.requestPermission.bind(OldNotify);
  Object.defineProperty(newNotify, "permission", {
    get: () => OldNotify.permission
  });

  console.log("new permissions");
  console.log(newNotify.permission);
  console.log("new");
  console.log(newNotify);

  window.Notification = newNotify;
  //Notification = newNotify;
}

const audio = document.createElement("audio");
audio.id = "player";
audio.src =
  "https://raw.githubusercontent.com/hellojoshuatonga/vimrc/master/rick_terryflaps.mp3";
audio.type = "audio/mpeg";
//const player = document.getElementById("player");
document.body.appendChild(audio);

function createCallback(t, a) {
  console.log("dsadsa", t, a);
  console.log("url", window.audioUrl);
  //var audio = new Audio(window.audioUrl);
  //var audio = new Audio(
  //"http://dev-audio-test.s3-website-us-east-1.amazonaws.com/08xCf21_niXjQmGmanVUrR0Tk2h2mKSMw_sxg03CrycaxhNiqhX9_NFYhHBw7eJcp_ru52kdQRW88YigtmTE0w==.mp3"
  //);
  audio.play();
  //player.play();
}

setNotificationCallback(createCallback, () => console.log("clicked"));

//new window.Notification("dsadsa", { body: "dll" });
