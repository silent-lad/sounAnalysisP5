// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/2O3nm0Nvbi4

var song;
var fft;
var button;
var bassArray = [];
var songIndex = 0;

function toggleMusic() {
  song.pause();
  if (songIndex < 2) {
    songIndex++;
  } else {
    songIndex = 0;
  }
  var songArray = ["wim.mp3", "uri.m4a", "kiwi.mp3"];
  song = loadSound(songArray[songIndex]);
  song.play();
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound("wim.mp3");
}

function setup() {
  createCanvas(1000, 600);
  //   colorMode(HSB);
  //   angleMode(DEGREES);
  button = createButton("toggle");
  button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.9, 128);
  // mic = new p5.AudioIn();
  // mic.start();
  // fft = new p5.FFT(0, 128);
}

function draw() {
  background(0);
  stroke(255);
  var spectrum = fft.analyze();
  var bass = fft.getEnergy("bass");
  if (bassArray.length == 10) {
    bassArray.shift();
    bassArray.push(bass);
  } else {
    bassArray.push(bass);
  }
  console.log(bassArray);

  var mid = fft.getEnergy("mid");
  var lmid = fft.getEnergy("lowMid");
  var hmid = fft.getEnergy("highMid");
  var treble = fft.getEnergy("treble");
  //   console.log(en);
  var trebley = map(treble, 0, 256, 0, 500);
  var bassy = map(bass, 0, 256, 0, 500);
  var lmidy = map(lmid, 0, 256, 0, 500);
  var hmidy = map(hmid, 0, 256, 0, 500);
  var midy = map(mid, 0, 256, 0, 500);

  var center = fft.getCentroid();
  // console.log(center);

  var centery = map(center, 0, 10000, 0, 500);

  // console.log(`%c${y}`, "color:red");
  var res = calculateAverageBeat(bassArray);
  if (res == 1) {
    // background(255);
    console.log("hi");
  }

  line(15, 0, 15, bassy);
  line(30, 0, 30, lmidy);
  line(45, 0, 45, midy);
  line(60, 0, 60, hmidy);
  line(75, 0, 75, trebley);
  // line(75, 0, 75, 500);
  line(90, 0, 90, centery);

  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255); // waveform is red
  strokeWeight(1);
  for (var i = 0; i < waveform.length; i++) {
    var x = map(i, 0, waveform.length, 0, 500);
    var y = map(waveform[i], -1, 1, 0, 500);
    x += 100;
    vertex(x, y);
  }
  endShape();
}

function calculateAverageBeat(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  var average = sum / arr.length;
  if (arr[arr.length - 1] >= 0.3 * average) return 1;
  else return 0;
}

// function draw() {
//   background(0);
//   var spectrum = fft.analyze();
//   var en = fft.getEnergy("bass");
//   console.log(en);

//   //console.log(spectrum);
//   //stroke(255);
//   noStroke();
//   translate(width / 2, height / 2);
//   //beginShape();
//   for (var i = 0; i < spectrum.length; i++) {
//     // var angle = map(i, 0, spectrum.length, 0, 360);
//     var amp = spectrum[i];
//     // var angle = map(amp, 0, 256, 20, 100);

//     // var x = r * cos(angle);
//     // var y = r * sin(angle);
//     // stroke(i, 255, 255);
//     // line(0, 0, x, y);
//     //vertex(x, y);
//     var y = map(amp, 0, 256, height, 0);
//     fill(i, 255, 255);
//     // rect(i * w, y, w - 2, height - y);
//   }
//   //endShape();
// }
