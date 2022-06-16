interface Point {
  x: number;
  y: number;
}

/** Got from [here](https://github.com/hustcc/ribbon.js) */
const getRibbon = () => {
  const config = {
    z: -1, // z-index
    a: 0.6, // alpha
    s: 90, // size
  };

  const canvas = document.createElement('canvas'),
    g2d = canvas.getContext('2d'),
    pr = window.devicePixelRatio || 1,
    width = window.innerWidth,
    height = window.innerHeight,
    f = config.s,
    m = Math,
    pi = m.PI * 2,
    cos = m.cos,
    random = m.random;
  let t,
    q: Point[],
    r = 0;
  canvas.width = width * pr;
  canvas.height = height * pr;
  if (!g2d) return null;
  g2d.scale(pr, pr);
  g2d.globalAlpha = config.a;
  canvas.style.cssText =
    'opacity: ' +
    config.a +
    ';position:fixed;top:0;left:0;z-index: ' +
    config.z +
    ';width:100%;height:100%;pointer-events:none;';
  // create canvas
  document.getElementsByTagName('body')[0].appendChild(canvas);

  function redraw() {
    g2d?.clearRect(0, 0, width, height);
    q = [
      { x: 0, y: height * 0.7 + f },
      { x: 0, y: height * 0.7 - f },
    ];
    while (q[1].x < width + f) draw(q[0], q[1]);
  }

  function draw(i: Point, j: Point) {
    if (!g2d) return;
    g2d.beginPath();
    g2d.moveTo(i.x, i.y);
    g2d.lineTo(j.x, j.y);
    var k = j.x + (random() * 2 - 0.25) * f,
      n = line(j.y);
    g2d.lineTo(k, n);
    g2d.closePath();
    r -= pi / -50;
    g2d.fillStyle =
      '#' +
      (
        ((cos(r) * 127 + 128) << 16) |
        ((cos(r + pi / 3) * 127 + 128) << 8) |
        (cos(r + (pi / 3) * 2) * 127 + 128)
      ).toString(16);
    g2d.fill();
    q[0] = q[1];
    q[1] = { x: k, y: n };
  }

  function line(p: number): number {
    t = p + (random() * 2 - 1.1) * f;
    return t > height || t < 0 ? line(p) : t;
  }

  document.addEventListener('click', redraw);
  document.addEventListener('touchstart', redraw);
  redraw();
};

export default getRibbon;
