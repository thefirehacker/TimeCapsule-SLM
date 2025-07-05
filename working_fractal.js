// Working Fractal Animation - Optimized for Canvas Editor
// This version is fast and creates beautiful fractal patterns

t = 0
zoom = 1
offsetX = 0
offsetY = 0

draw = _ => {
  t || createCanvas(600, 400)
  background(0)
  
  t += 0.01
  zoom = 1 + sin(t * 0.5) * 0.5
  offsetX = cos(t * 0.3) * 0.2
  offsetY = sin(t * 0.2) * 0.2
  
  // Draw fractal with optimized sampling
  let detail = 32 // Reduced for performance
  let scale = 0.005 * zoom
  
  // Only calculate every 2nd pixel for speed
  for (let x = 0; x < width; x += 2) {
    for (let y = 0; y < height; y += 2) {
      let u = (x - width/2) * scale + offsetX
      let v = (y - height/2) * scale + offsetY
      
      // Mandelbrot-like calculation
      let iterations = 0
      let cx = u + sin(t) * 0.1
      let cy = v + cos(t) * 0.1
      let zx = 0
      let zy = 0
      
      while (iterations < detail && zx*zx + zy*zy < 4) {
        let temp = zx*zx - zy*zy + cx
        zy = 2*zx*zy + cy
        zx = temp
        iterations++
      }
      
      if (iterations < detail) {
        // Beautiful color mapping
        let hue = (iterations * 8 + t * 20) % 255
        let sat = 255
        let bright = map(iterations, 0, detail, 50, 255)
        
        // HSB to RGB conversion for better colors
        let r = bright * (1 - sat/255 * (1 - (hue/255 * 6) % 1))
        let g = bright * (1 - sat/255)
        let b = bright * (1 - sat/255 * (hue/255 * 6) % 1)
        
        fill(hue * 1.5, sat * 0.8, bright)
        noStroke()
        rect(x, y, 2, 2)
      }
    }
  }
  
  // Add some sparkles
  for (let i = 0; i < 20; i++) {
    let sx = random(width)
    let sy = random(height)
    let sparkle = sin(t * 5 + i) * 0.5 + 0.5
    
    fill(255, 255, 255, sparkle * 100)
    noStroke()
    ellipse(sx, sy, 2 + sparkle * 3)
  }
  
  // Info text (with safety checks)
  try {
    fill(255, 200)
    if (typeof textAlign !== 'undefined') textAlign(LEFT, TOP)
    if (typeof textSize !== 'undefined') textSize(12)
    if (typeof text !== 'undefined') {
      text("Fractal Explorer", 10, 10)
      text("Time: " + t.toFixed(2), 10, 25)
    }
  } catch(e) {
    // Fallback if text functions fail
    fill(255)
    ellipse(20, 20, 10)
  }
} 