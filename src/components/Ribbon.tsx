import { Accessor, Component, createSignal, onMount } from 'solid-js';

interface Point {
  x: number;
  y: number;
}

const config = {
  z: -1, // z-index
  a: 0.6, // alpha
  s: 90, // size
};

const pi = Math.PI * 2;

const drawRibbon = (
  wh: Accessor<{ width: number; height: number }>,
  g2d: CanvasRenderingContext2D,
) => {
  let q: Point[];
  let r = 0;

  const line: (p: number) => number = (p) => {
    const t = p + (Math.random() * 2 - 1.1) * config.s;
    return t > wh().height || t < 0 ? line(p) : t;
  };

  const reDraw = () => {
    q = [
      { x: 0, y: wh().height * 0.7 + config.s },
      { x: 0, y: wh().height * 0.7 - config.s },
    ];
    while (q[1].x < wh().width + config.s) draw(q[0], q[1]);
  };

  const draw = (i: Point, j: Point) => {
    if (!g2d) return;
    g2d.beginPath();
    g2d.moveTo(i.x, i.y);
    g2d.lineTo(j.x, j.y);
    const k = j.x + (Math.random() * 2 - 0.25) * config.s,
      n = line(j.y);
    g2d.lineTo(k, n);
    g2d.closePath();
    r -= pi / -50;
    g2d.fillStyle =
      '#' +
      (
        ((Math.cos(r) * 127 + 128) << 16) |
        ((Math.cos(r + pi / 3) * 127 + 128) << 8) |
        (Math.cos(r + (pi / 3) * 2) * 127 + 128)
      ).toString(16);
    g2d.fill();
    q[0] = q[1];
    q[1] = { x: k, y: n };
  };
  reDraw();
};

const Ribbon: Component = () => {
  let canvas: HTMLCanvasElement | undefined;
  const [pr, setPr] = createSignal(window.devicePixelRatio || 1);
  const getWh = () => ({ width: window.innerWidth, height: window.innerHeight });
  const [wh, setWh] = createSignal(getWh());
  const draw = () => {
    setPr(window.devicePixelRatio || 1);
    setWh(getWh());
    if (!canvas) return;
    const g2d = canvas.getContext('2d');
    if (!g2d) return;
    g2d.scale(pr(), pr());
    drawRibbon(wh, g2d);
  };
  window.addEventListener('resize', () => {
    draw();
  });
  onMount(() => {
    draw();
  });
  return (
    <canvas
      class="h-screen w-screen"
      ref={canvas}
      height={wh().height * pr()}
      width={wh().width * pr()}
      style={{
        opacity: config.a,
        top: 0,
        left: 0,
        position: 'fixed',
        'z-index': config.z,
      }}
    />
  );
};

export default Ribbon;
