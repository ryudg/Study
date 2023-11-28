interface Vector3D {
  x: number;
  y: number;
  z: number;
}

function calculateLength(v: Vector3D) {
  let length = 0;

  for (const axis of Object.keys(v)) {
    const coord = v[axis];
    //            ^^^^^^^ Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Vector3D'.
    length += Math.abs(coord);
  }

  return length;
}

/* function calculateLength(v: Vector3D) {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
} */

const vec3D = { x: 3, y: 4, z: 1, address: "anyangcheonseoro" };

console.log(calculateLength(vec3D));
