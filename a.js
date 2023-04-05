async function play(e, name) {
  createRipple(e);
  const buffer = await getBuffer("voices/" + name + ".aac");
  buffer && playAudio(buffer);
}
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("div");
  button.appendChild(circle);

  // 计算水波纹的位置和大小
  var x =
    event.pageX ||
    document.documentElement.scrollLeft +
      document.body.scrollLeft +
      event.clientX;
  var y =
    event.pageY ||
    document.documentElement.scrollTop +
      document.body.scrollTop +
      event.clientY;
  var wx = button.offsetWidth;
  x = x - button.offsetLeft - wx / 2;
  y = y - button.offsetTop - wx / 2;
  circle.style.cssText =
    "width: " +
    wx +
    "px;height: " +
    wx +
    "px;top: " +
    y +
    "px;left: " +
    x +
    "px";

  // 启动动画
  circle.classList.add("ripple");
  setTimeout(() => circle.remove(), 1000);
}

const audioContext = new AudioContext();
const gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);
gainNode.gain.value = 0.3;
const playAudio = function (buffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(gainNode);
  source.start();
};
const getBuffer = function (url) {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    request.onload = () => {
      audioContext.decodeAudioData(request.response, (buffer) =>
        buffer ? resolve(buffer) : reject("decoding error")
      );
    };
    request.onerror = (error) => reject(error);
    request.send();
  });
};

var ottocount = 0;
function otto(event) {
  let kj = event.currentTarget;
  if (ottocount >= 3) {
    play(event, "otto");
  } else {
    kj.classList.add("shaky");
    setTimeout(function () {
      kj.classList.remove("shaky");
    }, 1000);
    ottocount++;
  }
}
//Qmsg.info()
