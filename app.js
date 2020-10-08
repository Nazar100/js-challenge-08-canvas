const canvasRef = document.querySelector("#draw");
const ctx = canvasRef.getContext("2d");
console.log(ctx, canvasRef);

canvasRef.width = window.innerWidth;
canvasRef.height = window.innerHeight;
ctx.strokeStyle = "blue";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 50;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

function draw(e) {
  if (!isDrawing) {
    return;
  }
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastY = e.offsetY;
  lastX = e.offsetX;
  hue++;
  if (hue >= 100) {
    hue = 0;
  }
  ctx.lineWidth = hue;
  if (ctx.lineWidth >= 100) {
    // console.log(typeof ctx.lineWidth);
    ctx.lineWidth -= 1;
    console.log(ctx.lineWidth);
  } else if (ctx.lineWidth < 1) {
    // console.log(ctx.lineWidth);
    ctx.lineWidth += 1;
  }
}
canvasRef.addEventListener("mousemove", draw);
canvasRef.addEventListener("mousedown", (e) => {
  //   console.log(ctx.lineWidth, direction);
  isDrawing = true;
  lastY = e.offsetY;
  lastX = e.offsetX;
});
canvasRef.addEventListener("mouseup", () => (isDrawing = false));
canvasRef.addEventListener("mouseout", () => (isDrawing = false));
