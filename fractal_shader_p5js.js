// Fractal Shader Recreation in p5.js
// Based on the GLSL code: Complex fractal with HSV coloring and 3D-like effects

let time = 0;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
}

function draw() {
  // Update time for animation
  time += 0.02;
  
  // Clear background
  background(0, 0, 5); // Very dark background
  
  loadPixels();
  
  // Process each pixel
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Convert screen coordinates to normalized coordinates (-1 to 1)
      let u = (x / width) * 2 - 1;
      let v = (y / height) * 2 - 1;
      
      // Aspect ratio correction
      u *= width / height;
      
      // Create 3D-like ray direction
      let rayX = u;
      let rayY = v;
      let rayZ = 1.0;
      
      // Normalize ray direction
      let rayLength = sqrt(rayX*rayX + rayY*rayY + rayZ*rayZ);
      rayX /= rayLength;
      rayY /= rayLength;
      rayZ /= rayLength;
      
      // Ray marching simulation
      let totalDistance = 0;
      let iterations = 0;
      let maxIterations = 99;
      let brightness = 0;
      
      // Starting position
      let posX = 0;
      let posY = 0;
      let posZ = -2;
      
      // Ray marching loop
      for (let i = 0; i < maxIterations && totalDistance < 20; i++) {
        iterations = i;
        
        // Current position along ray
        let currentX = posX + rayX * totalDistance;
        let currentY = posY + rayY * totalDistance;
        let currentZ = posZ + rayZ * totalDistance;
        
        // Distance field approximation (fractal-like)
        let distance = calculateDistance(currentX, currentY, currentZ, time);
        
        // Accumulate brightness based on proximity to surface
        brightness += 1.0 / (1.0 + distance * 50);
        
        // Step forward
        totalDistance += max(distance * 0.5, 0.01);
        
        if (distance < 0.01) break;
      }
      
      // Calculate color
      let hue = (brightness * 20 + time * 10) % 360;
      let saturation = min(brightness * 100, 90);
      let value = min(brightness * iterations * 0.3, 80);
      
      // Set pixel color
      let index = (x + y * width) * 4;
      let c = color(hue, saturation, value);
      
      pixels[index] = red(c);
      pixels[index + 1] = green(c);
      pixels[index + 2] = blue(c);
      pixels[index + 3] = 255;
    }
  }
  
  updatePixels();
  
  // Display info
  fill(0, 0, 100);
  textAlign(LEFT, TOP);
  textSize(12);
  text("Fractal Shader Recreation", 10, 10);
  text("Time: " + time.toFixed(2), 10, 25);
  text("Click to reset | Space to pause", 10, 40);
}

// Distance field function - creates fractal-like structures
function calculateDistance(x, y, z, t) {
  // Transform coordinates
  let px = x;
  let py = y;
  let pz = z;
  
  // Add time-based rotation and movement
  let cosT = cos(t * 0.1);
  let sinT = sin(t * 0.1);
  
  // Rotate around Y axis
  let newX = px * cosT - pz * sinT;
  let newZ = px * sinT + pz * cosT;
  px = newX;
  pz = newZ;
  
  // Fractal iterations
  let distance = 1000;
  let scale = 1;
  
  for (let i = 0; i < 5; i++) {
    // Fold space
    px = abs(px);
    py = abs(py);
    pz = abs(pz);
    
    // Rotate
    if (px + py < 0) {
      let temp = px;
      px = -py;
      py = -temp;
    }
    if (px + pz < 0) {
      let temp = px;
      px = -pz;
      pz = -temp;
    }
    if (py + pz < 0) {
      let temp = py;
      py = -pz;
      pz = -temp;
    }
    
    // Scale and translate
    px = px * 3 - 2;
    py = py * 3 - 2;
    pz = pz * 3 - 2;
    
    scale *= 3;
    
    // Add some noise
    px += sin(py * 2 + t) * 0.1;
    py += cos(pz * 2 + t) * 0.1;
    pz += sin(px * 2 + t) * 0.1;
  }
  
  // Calculate distance to a sphere
  let sphereDistance = sqrt(px*px + py*py + pz*pz) - 1.0;
  distance = min(distance, sphereDistance / scale);
  
  // Add some periodic structures
  let periodicX = sin(px * 4 + t) * cos(py * 4);
  let periodicY = cos(pz * 4 + t) * sin(px * 4);
  let periodicDistance = (periodicX + periodicY) * 0.1;
  
  return max(distance + periodicDistance, 0.001);
}

// Interactive controls
function mousePressed() {
  time = 0;
  background(0);
}

function keyPressed() {
  if (key === ' ') {
    if (isLooping()) {
      noLoop();
    } else {
      loop();
    }
  }
  if (key === 'r' || key === 'R') {
    time = 0;
    background(0);
  }
}

// Alternative: Faster version with lower resolution
function setupFast() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  pixelDensity(1); // Lower pixel density for better performance
}

// Alternative: Simple fractal pattern (much faster)
function drawSimpleFractal() {
  background(0, 0, 5);
  
  let detail = 100;
  let zoom = 0.01 + time * 0.001;
  
  for (let x = 0; x < width; x += 2) {
    for (let y = 0; y < height; y += 2) {
      let u = (x - width/2) * zoom;
      let v = (y - height/2) * zoom;
      
      // Simple fractal calculation
      let iterations = 0;
      let cx = u;
      let cy = v;
      let zx = 0;
      let zy = 0;
      
      while (iterations < detail && zx*zx + zy*zy < 4) {
        let temp = zx*zx - zy*zy + cx + sin(time) * 0.1;
        zy = 2*zx*zy + cy + cos(time) * 0.1;
        zx = temp;
        iterations++;
      }
      
      if (iterations < detail) {
        let hue = (iterations * 5 + time * 50) % 360;
        let sat = 80;
        let bright = map(iterations, 0, detail, 20, 80);
        
        fill(hue, sat, bright);
        noStroke();
        rect(x, y, 2, 2);
      }
    }
  }
} 