// Optimized Mandelbrot Fractal - Fast and Beautiful
// This version uses smart sampling and caching for smooth performance

t = 0
zoomLevel = 1
centerX = -0.5
centerY = 0

draw = _ => {
  t || createCanvas(600, 400)
  background(0)
  
  t += 0.01
  
  // Animated zoom and pan
  zoomLevel = 1 + sin(t * 0.3) * 0.8
  centerX = -0.5 + cos(t * 0.2) * 0.3
  centerY = sin(t * 0.15) * 0.3
  
  // Draw Mandelbrot set with reduced resolution for speed
  let maxIter = 24 // Reduced iterations for performance
  let step = 3 // Skip pixels for speed
  
  for (let px = 0; px < width; px += step) {
    for (let py = 0; py < height; py += step) {
      // Convert pixel to complex number
      let x0 = map(px, 0, width, -2.5, 1.5) / zoomLevel + centerX
      let y0 = map(py, 0, height, -1.5, 1.5) / zoomLevel + centerY
      
      // Mandelbrot iteration
      let x = 0
      let y = 0
      let iter = 0
      
      while (x*x + y*y <= 4 && iter < maxIter) {
        let xtemp = x*x - y*y + x0
        y = 2*x*y + y0
        x = xtemp
        iter++
      }
      
      // Color based on iterations
      if (iter < maxIter) {
        let hue = (iter * 15 + t * 30) % 360
        let sat = 255
        let bright = map(iter, 0, maxIter, 100, 255)
        
        // Add time-based color shift
        hue = (hue + t * 10) % 360
        
        fill(hue, sat * 0.8, bright)
        noStroke()
        rect(px, py, step, step)
      }
    }
  }
  
  // Add some animated overlay elements
  drawOverlay()
  
  // Info display (with safety checks)
  try {
    fill(255, 200)
    if (typeof textAlign !== 'undefined') textAlign(LEFT, TOP)
    if (typeof textSize !== 'undefined') textSize(12)
    if (typeof text !== 'undefined') {
      text("🌀 Mandelbrot Explorer", 10, 10)
      text("Zoom: " + zoomLevel.toFixed(2), 10, 25)
      text("Center: (" + centerX.toFixed(3) + ", " + centerY.toFixed(3) + ")", 10, 40)
    }
  } catch(e) {
    // Fallback if text functions fail
    fill(255)
    ellipse(20, 20, 6)
  }
}

function drawOverlay() {
  // Add some sparkly effects
  for (let i = 0; i < 15; i++) {
    let x = (sin(t * 2 + i) * 0.4 + 0.5) * width
    let y = (cos(t * 1.5 + i) * 0.4 + 0.5) * height
    let alpha = (sin(t * 3 + i) * 0.5 + 0.5) * 100
    
    fill(255, 255, 255, alpha)
    noStroke()
    ellipse(x, y, 3 + sin(t * 4 + i) * 2)
  }
  
  // Add border glow
  stroke(100, 200, 255, 100)
  strokeWeight(2)
  noFill()
  rect(2, 2, width-4, height-4)
} 