var capture;
var glasses;
var col1 = '#ff0080';
var col2 = '#ff6600';


function preload() {
  // put preload code here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  capture = createCapture(VIDEO);
  capture.size(640, 480)
  capture.hide();

  glasses = new Glass(width / 2 - 38, height / 2, 50);

}

function draw() {
  background('#006666')

  //images from camera
  var myFeed = capture.loadPixels();
  var xImg = 450;
  var yImg = 240;
  var wImg = 480;
  var hImg = 360;

  push()
  translate(width / 2, height / 2)
  imageMode(CENTER)
  image(myFeed, -xImg, -yImg, wImg, hImg);
  image(myFeed, xImg, -yImg, wImg, hImg);
  image(myFeed, -xImg, yImg, wImg, hImg);
  image(myFeed, xImg, yImg, wImg, hImg);
  filter(GRAY)
  pop()


  // grid of coloured rectangles
  for (var x = 0; x < width; x += 25) {
    for (var y = 0; y < height; y += 25) {
      var distance = dist(x, y, mouseX, mouseY);
      var remap = map(distance, 0, width, 0, 50);
      fill(mouseX / 5, 255 - (mouseX / 2 + mouseY / 2), mouseY);
      rect(x, y, remap, remap);
    }
  }


  // glasses
  glasses.display();


  //change the filter
  if (keyIsDown(UP_ARROW)) {
    filter(INVERT);
  }

  //text
  textAlign(CENTER)
  text('Press up arrow to change filter', width / 2, 100)

  push()
  var myText = 'Try on these new glasses!'
  drawingContext.font = "20px Kaushan Script";
  drawingContext.textAlign = "center";
  fill(color(col2));
  text(myText, width / 2, height / 2 + 50)
  pop()
}

function mouseDragged(e) {
  console.log(e);
  console.log("Mouse dragged");
  glasses.dragged();
  //prevent default
  return false;
}

function mouseReleased() {
  console.log("Mouse released");
  glasses.released();
}

function Glass(_x, _y, _diam) {
  this.x = _x;
  this.y = _y;
  this.diam = _diam;
  this.color = col2;

  this.display = function() {
    push()
    noFill();
    stroke(this.color);
    strokeWeight(8);
    ellipse(this.x, this.y, this.diam)
    ellipse(this.x + 75, this.y, this.diam)
    strokeWeight(4);
    line(this.x + 25, this.y - 5, this.x + 50, this.y - 5)
    pop()
  }

  this.dragged = function() {
    this.x = mouseX;
    this.y = mouseY;
    this.diam = _diam;
    this.color = color(mouseX / 5, 255 - (mouseX / 2 + mouseY / 2), mouseY);


  }

  this.released = function() {
    this.x = _x;
    this.y = _y;
    this.diam = _diam;
    this.color = col2;
  }

}
