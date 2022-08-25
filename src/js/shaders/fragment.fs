varying vec2 vUv;
uniform sampler2D map;
uniform vec3 hue;

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec4 tex = texture2D(map, vUv);
  vec3 col = hsv2rgb(hue) * tex.rgb;
  gl_FragColor = vec4(col, 1.0);
}