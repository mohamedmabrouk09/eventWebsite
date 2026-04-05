/* ================================================================
   HYPERSPEED — Three.js highway with UnrealBloomPass
   Renders the animated neon road from reactbits.dev/backgrounds/hyperspeed
================================================================ */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }     from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const lerp  = (c,t,s=.1,l=.001)=>{let ch=(t-c)*s;if(Math.abs(ch)<l)ch=t-c;return ch;};
const rand  = b=>Array.isArray(b)?Math.random()*(b[1]-b[0])+b[0]:Math.random()*b;
const pick  = a=>Array.isArray(a)?a[Math.floor(Math.random()*a.length)]:a;
const nsin  = v=>Math.sin(v)*.5+.5;

/* ── Turbulent distortion ────────────────────────────────── */
const turbUni = {
  uFreq:{value:new THREE.Vector4(4,8,8,1)},
  uAmp:{value:new THREE.Vector4(25,5,10,10)}
};
const turbDistortion = {
  uniforms: turbUni,
  getDistortion:`
    uniform vec4 uFreq;uniform vec4 uAmp;
    float nsin(float v){return sin(v)*.5+.5;}
    #define PI 3.14159265358979
    float getDX(float p){return cos(PI*p*uFreq.r+uTime)*uAmp.r+pow(cos(PI*p*uFreq.g+uTime*(uFreq.g/uFreq.r)),2.)*uAmp.g;}
    float getDY(float p){return -nsin(PI*p*uFreq.b+uTime)*uAmp.b-pow(nsin(PI*p*uFreq.a+uTime/(uFreq.b/uFreq.a)),5.)*uAmp.a;}
    vec3 getDistortion(float progress){return vec3(getDX(progress)-getDX(0.0125),getDY(progress)-getDY(0.0125),0.);}
  `,
  getJS:(prog,t)=>{
    const f=turbUni.uFreq.value, a=turbUni.uAmp.value;
    const gx=p=>Math.cos(Math.PI*p*f.x+t)*a.x+Math.pow(Math.cos(Math.PI*p*f.y+t*(f.y/f.x)),2)*a.y;
    const gy=p=>-nsin(Math.PI*p*f.z+t)*a.z-Math.pow(nsin(Math.PI*p*f.w+t/(f.z/f.w)),5)*a.w;
    return new THREE.Vector3(gx(prog)-gx(prog+.007),gy(prog)-gy(prog+.007),0)
      .multiply(new THREE.Vector3(-2,-5,0)).add(new THREE.Vector3(0,0,-10));
  }
};

/* ── Shader source strings ───────────────────────────────── */
const roadVertex = `
  #define USE_FOG
  uniform float uTime;
  ${THREE.ShaderChunk.fog_pars_vertex}
  uniform float uTravelLength;
  varying vec2 vUv;
  #include <getDistortion_vertex>
  void main(){
    vec3 transformed = position.xyz;
    vec3 distortion  = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
    transformed.x += distortion.x;
    transformed.z += distortion.y;
    transformed.y += -1.0 * distortion.z;
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
    ${THREE.ShaderChunk.fog_vertex}
  }`;

const islandFragment = `
  #define USE_FOG
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uTime;
  ${THREE.ShaderChunk.fog_pars_fragment}
  void main(){
    gl_FragColor = vec4(uColor, 1.0);
    ${THREE.ShaderChunk.fog_fragment}
  }`;

const roadFragment = `
  #define USE_FOG
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uLanes;
  uniform vec3 uBrokenLinesColor;
  uniform vec3 uShoulderLinesColor;
  uniform float uShoulderLinesWidthPercentage;
  uniform float uBrokenLinesLengthPercentage;
  uniform float uBrokenLinesWidthPercentage;
  ${THREE.ShaderChunk.fog_pars_fragment}
  void main(){
    vec2 uv = vUv;
    uv.y = mod(uv.y + uTime * 0.05, 1.0);
    float laneWidth = 1.0 / uLanes;
    float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;
    float laneEmptySpace  = 1.0 - uBrokenLinesLengthPercentage;
    float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));
    float sideLines   = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);
    brokenLines = mix(brokenLines, sideLines, uv.x);
    vec3 color = uColor;
    color = mix(color, mix(uBrokenLinesColor, uShoulderLinesColor, uv.x), brokenLines * 0.7);
    gl_FragColor = vec4(color, 1.0);
    ${THREE.ShaderChunk.fog_fragment}
  }`;

const carLightsVertex = `
  #define USE_FOG
  ${THREE.ShaderChunk.fog_pars_vertex}
  attribute vec3 aOffset;
  attribute vec3 aMetrics;
  attribute vec3 aColor;
  uniform float uTravelLength;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vColor;
  #include <getDistortion_vertex>
  void main(){
    vec3 transformed = position.xyz;
    float radius = aMetrics.r;
    float myLength = aMetrics.g;
    float speed = aMetrics.b;
    transformed.xy *= radius;
    transformed.z  *= myLength;
    transformed.z  += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
    transformed.xy += aOffset.xy;
    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
    vColor = aColor;
    ${THREE.ShaderChunk.fog_vertex}
  }`;

const carLightsFragment = `
  #define USE_FOG
  ${THREE.ShaderChunk.fog_pars_fragment}
  varying vec3 vColor;
  varying vec2 vUv;
  uniform vec2 uFade;
  void main(){
    vec3 color = vec3(vColor);
    float fadeAlpha = smoothstep(uFade.x, uFade.y, vUv.x);
    gl_FragColor = vec4(color, fadeAlpha);
    if (gl_FragColor.a < 0.0001) discard;
    ${THREE.ShaderChunk.fog_fragment}
  }`;

const sticksVertex = `
  #define USE_FOG
  ${THREE.ShaderChunk.fog_pars_vertex}
  attribute float aOffset;
  attribute vec3 aColor;
  attribute vec2 aMetrics;
  uniform float uTravelLength;
  uniform float uTime;
  varying vec3 vColor;
  mat4 rotationY(in float angle){
    return mat4(cos(angle),0,sin(angle),0, 0,1,0,0, -sin(angle),0,cos(angle),0, 0,0,0,1);
  }
  #include <getDistortion_vertex>
  void main(){
    vec3 transformed = position.xyz;
    float width  = aMetrics.x;
    float height = aMetrics.y;
    transformed.xy *= vec2(width, height);
    float time = mod(uTime * 60.0 * 2.0 + aOffset, uTravelLength);
    transformed = (rotationY(3.14159 / 2.0) * vec4(transformed, 1.0)).xyz;
    transformed.z += -uTravelLength + time;
    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);
    transformed.y += height / 2.0;
    transformed.x += -width / 2.0;
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vColor = aColor;
    ${THREE.ShaderChunk.fog_vertex}
  }`;

const sticksFragment = `
  #define USE_FOG
  ${THREE.ShaderChunk.fog_pars_fragment}
  varying vec3 vColor;
  void main(){
    gl_FragColor = vec4(vColor, 1.0);
    ${THREE.ShaderChunk.fog_fragment}
  }`;

/* ── Material factory ────────────────────────────────────── */
function makeMat(vert, frag, uniforms, distortion, opts = {}) {
  const m = new THREE.ShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
    uniforms,
    transparent: !!opts.transparent,
    blending: opts.blending || THREE.NormalBlending,
    side: opts.side || THREE.FrontSide,
    depthWrite: opts.depthWrite !== undefined ? opts.depthWrite : true
  });
  m.onBeforeCompile = sh => {
    sh.vertexShader = sh.vertexShader.replace('#include <getDistortion_vertex>', distortion.getDistortion);
  };
  return m;
}

/* ── Road ─────────────────────────────────────────────────── */
class Road {
  constructor(app, o) { this.app = app; this.o = o; this.uTime = { value: 0 }; }

  createPlane(side, isRoad) {
    const o = this.o;
    const geo = new THREE.PlaneGeometry(isRoad ? o.roadWidth : o.islandWidth, o.length, 20, 100);
    let uni = {
      uTravelLength: { value: o.length },
      uColor: { value: new THREE.Color(isRoad ? o.colors.roadColor : o.colors.islandColor) },
      uTime: this.uTime,
      ...this.app.fogU,
      ...o.distortion.uniforms
    };
    if (isRoad) Object.assign(uni, {
      uLanes: { value: o.lanesPerRoad },
      uBrokenLinesColor: { value: new THREE.Color(o.colors.brokenLines) },
      uShoulderLinesColor: { value: new THREE.Color(o.colors.shoulderLines) },
      uShoulderLinesWidthPercentage: { value: o.shoulderLinesWidthPercentage },
      uBrokenLinesLengthPercentage: { value: o.brokenLinesLengthPercentage },
      uBrokenLinesWidthPercentage: { value: o.brokenLinesWidthPercentage }
    });
    const mat = makeMat(roadVertex, isRoad ? roadFragment : islandFragment, uni, o.distortion, { side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.z = -o.length / 2;
    mesh.position.x = (o.islandWidth / 2 + o.roadWidth / 2) * side;
    this.app.scene.add(mesh);
    return mesh;
  }

  init() {
    this.createPlane(-1, true);
    this.createPlane(1, true);
    this.createPlane(0, false);
  }

  update(t) { this.uTime.value = t; }
}

/* ── Car Lights ───────────────────────────────────────────── */
class CarLights {
  constructor(app, o, colors, speed, fade) {
    this.app = app; this.o = o; this.colors = colors; this.speed = speed; this.fade = fade;
  }

  init() {
    const o = this.o;
    const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));
    const baseGeo = new THREE.TubeGeometry(curve, 40, 1, 8, false);
    const ig = new THREE.InstancedBufferGeometry().copy(baseGeo);
    ig.instanceCount = o.lightPairsPerRoadWay * 2;
    const laneWidth = o.roadWidth / o.lanesPerRoad;
    const aO = [], aM = [], aC = [];
    let cols = Array.isArray(this.colors) ? this.colors.map(c => new THREE.Color(c)) : new THREE.Color(this.colors);

    for (let i = 0; i < o.lightPairsPerRoadWay; i++) {
      const r = rand(o.carLightsRadius), len = rand(o.carLightsLength), spd = rand(this.speed);
      let laneX = (i % o.lanesPerRoad) * laneWidth - o.roadWidth / 2 + laneWidth / 2 + rand(o.carShiftX) * laneWidth;
      const oy = rand(o.carFloorSeparation) + r * 1.3;
      const oz = -rand(o.length);
      const cw = rand(o.carWidthPercentage) * laneWidth;
      aO.push(laneX - cw / 2, oy, oz, laneX + cw / 2, oy, oz);
      aM.push(r, len, spd, r, len, spd);
      const c = pick(cols);
      aC.push(c.r, c.g, c.b, c.r, c.g, c.b);
    }
    ig.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aO), 3, false));
    ig.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aM), 3, false));
    ig.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aC), 3, false));

    const uni = {
      uTime: { value: 0 }, uTravelLength: { value: o.length }, uFade: { value: this.fade },
      ...this.app.fogU, ...o.distortion.uniforms
    };
    const mat = makeMat(carLightsVertex, carLightsFragment, uni, o.distortion, {
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    });
    this.mesh = new THREE.Mesh(ig, mat);
    this.mesh.frustumCulled = false;
    this.app.scene.add(this.mesh);
  }

  update(t) { this.mesh.material.uniforms.uTime.value = t; }
}

/* ── Light Sticks ─────────────────────────────────────────── */
class LightSticks {
  constructor(app, o) { this.app = app; this.o = o; }

  init() {
    const o = this.o, total = o.totalSideLightSticks;
    const stickStep = o.length / (total - 1);
    const ig = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneGeometry(1, 1));
    ig.instanceCount = total;
    const aO = [], aC = [], aM = [];
    let cols = Array.isArray(o.colors.sticks) ? o.colors.sticks.map(c => new THREE.Color(c)) : new THREE.Color(o.colors.sticks);

    for (let i = 0; i < total; i++) {
      aO.push((i - 1) * stickStep * 2 + stickStep * Math.random());
      const c = pick(cols); aC.push(c.r, c.g, c.b);
      aM.push(rand(o.lightStickWidth), rand(o.lightStickHeight));
    }
    ig.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aO), 1, false));
    ig.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aC), 3, false));
    ig.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aM), 2, false));

    const uni = { uTravelLength: { value: o.length }, uTime: { value: 0 }, ...this.app.fogU, ...o.distortion.uniforms };
    const mat = makeMat(sticksVertex, sticksFragment, uni, o.distortion, { side: THREE.DoubleSide });
    this.mesh = new THREE.Mesh(ig, mat);
    this.mesh.frustumCulled = false;
    this.app.scene.add(this.mesh);
  }

  update(t) { this.mesh.material.uniforms.uTime.value = t; }
}

/* ── Main App ─────────────────────────────────────────────── */
class HyperspeedApp {
  constructor(container, opts) {
    this.container = container;
    this.opts = opts;
    this.disposed = false;

    const W = Math.max(1, container.offsetWidth);
    const H = Math.max(1, container.offsetHeight);

    this.renderer = new THREE.WebGLRenderer({
      antialias: !!opts.antialias,
      alpha: false,
      powerPreference: opts.powerPreference || 'high-performance'
    });
    this.renderer.setSize(W, H, false);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, opts.maxPixelRatio || 2));
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(opts.fov, W / H, 0.1, 10000);
    this.camera.position.set(0, 8, -5);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(opts.colors.background);

    const fog = new THREE.Fog(opts.colors.background, opts.length * 0.2, opts.length * 500);
    this.scene.fog = fog;
    this.fogU = {
      fogColor: { value: fog.color },
      fogNear: { value: fog.near },
      fogFar: { value: fog.far }
    };

    // ── Post-processing: bloom ──
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 1.5, 0.4, 0.1);
    bloom.strength  = opts.bloomStrength ?? 2.5;
    bloom.radius    = opts.bloomRadius ?? 0.6;
    bloom.threshold = opts.bloomThreshold ?? 0.02;
    this.composer.addPass(bloom);

    this.clock = new THREE.Clock();
    this.speedUp = 0;
    this.speedUpTarget = 0;
    this.timeOffset = 0;
    this.fovTarget = opts.fov;

    this.road    = new Road(this, opts);
    this.lCars   = new CarLights(this, opts, opts.colors.leftCars, opts.movingAwaySpeed,   new THREE.Vector2(0, 1 - opts.carLightsFade));
    this.rCars   = new CarLights(this, opts, opts.colors.rightCars, opts.movingCloserSpeed, new THREE.Vector2(1, 0 + opts.carLightsFade));
    this.sticks  = new LightSticks(this, opts);

    this._resize = this._resize.bind(this);
    this._tick   = this._tick.bind(this);
    this._down   = () => { this.fovTarget = opts.fovSpeedUp; this.speedUpTarget = opts.speedUp; };
    this._up     = () => { this.fovTarget = opts.fov;        this.speedUpTarget = 0; };
    window.addEventListener('resize', this._resize);
    container.addEventListener('mousedown', this._down);
    container.addEventListener('mouseup', this._up);
    container.addEventListener('touchstart', this._down, { passive: true });
    container.addEventListener('touchend', this._up, { passive: true });
  }

  _resize() {
    const W = this.container.offsetWidth, H = this.container.offsetHeight;
    if (!W || !H) return;
    this.renderer.setSize(W, H, false);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, this.opts.maxPixelRatio || 2));
    this.composer.setSize(W, H);
    this.camera.aspect = W / H;
    this.camera.updateProjectionMatrix();
  }

  init() {
    this.road.init();
    this.lCars.init();  this.lCars.mesh.position.x = -this.opts.roadWidth / 2 - this.opts.islandWidth / 2;
    this.rCars.init();  this.rCars.mesh.position.x =  this.opts.roadWidth / 2 + this.opts.islandWidth / 2;
    this.sticks.init(); this.sticks.mesh.position.x = -(this.opts.roadWidth + this.opts.islandWidth / 2);
    this._tick();
  }

  _tick() {
    if (this.disposed) return;
    const d = this.clock.getDelta();
    const lp = Math.exp(-(-60 * Math.log2(1 - 0.1)) * d);
    this.speedUp += lerp(this.speedUp, this.speedUpTarget, lp, 0.00001);
    this.timeOffset += this.speedUp * d;
    const t = this.clock.elapsedTime + this.timeOffset;

    this.lCars.update(t);
    this.rCars.update(t);
    this.sticks.update(t);
    this.road.update(t);

    const fc = lerp(this.camera.fov, this.fovTarget, lp);
    this.camera.fov += fc * d * 6;
    if (this.opts.distortion.getJS) {
      const dist = this.opts.distortion.getJS(0.025, t);
      this.camera.lookAt(new THREE.Vector3(
        this.camera.position.x + dist.x,
        this.camera.position.y + dist.y,
        this.camera.position.z + dist.z
      ));
    }
    this.camera.updateProjectionMatrix();

    // Render through bloom composer
    this.composer.render(d);
    requestAnimationFrame(this._tick);
  }

  dispose() {
    this.disposed = true;
    window.removeEventListener('resize', this._resize);
    this.scene.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());
        else o.material.dispose();
      }
    });
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode) this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
  }
}

/* ── Public API ───────────────────────────────────────────── */
export function createHyperspeed(container, overrides = {}) {
  const DEFAULT = {
    distortion: turbDistortion,
    length: 400, roadWidth: 10, islandWidth: 2, lanesPerRoad: 3,
    fov: 90, fovSpeedUp: 150, speedUp: 2, carLightsFade: 0.4,
    maxPixelRatio: 2, antialias: false, powerPreference: 'high-performance',
    bloomStrength: 2.5, bloomRadius: 0.6, bloomThreshold: 0.02,
    totalSideLightSticks: 50, lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05, brokenLinesWidthPercentage: 0.1, brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5], lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80], movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15], carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5], carShiftX: [-0.8, 0.8], carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808, islandColor: 0x0a0a0a, background: 0x000000,
      shoulderLines: 0x131318, brokenLines: 0x131318,
      leftCars: [0xff102f, 0xeb383e, 0xff519a],
      rightCars: [0x00d4ff, 0x00a1ff, 0x44e5e7],
      sticks: 0x00d4ff
    }
  };
  const opts = { ...DEFAULT, ...overrides, colors: { ...DEFAULT.colors, ...(overrides.colors || {}) } };
  const app = new HyperspeedApp(container, opts);
  app.init();
  return app;
}
