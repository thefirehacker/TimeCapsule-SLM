// Mandelbrot Fractal - Compact Format for Canvas Playground
// Pure visual fractal without text dependencies

t = 0

draw = _ => {
  // Conditional canvas creation (proper format)
  t || createCanvas(w = 800, h = 600)
  
  background(0)
  t += 0.01
  
  // Animated parameters for dynamic fractal
  let zoom = 0.5 + sin(t * 0.3) * 0.4
  let offsetX = cos(t * 0.2) * 0.2
  let offsetY = sin(t * 0.15) * 0.2
  
  // Fractal rendering parameters
  let step = 3 // Pixel step for performance
  let maxIter = 30 // Maximum iterations
  let scale = 0.004 / zoom
  
  // Render Mandelbrot set
  for (let px = 0; px < w; px += step) {
    for (let py = 0; py < h; py += step) {
      // Map pixel to complex plane
      let x0 = (px - w/2) * scale + offsetX
      let y0 = (py - h/2) * scale + offsetY
      
      // Mandelbrot iteration
      let x = 0, y = 0, iter = 0
      
      while (x*x + y*y <= 4 && iter < maxIter) {
        let xtemp = x*x - y*y + x0
        y = 2*x*y + y0
        x = xtemp
        iter++
      }
      
      // Color based on iterations (RGB)
      if (iter < maxIter) {
        // Create vibrant RGB colors
        let colorPhase = (iter * 12 + t * 60) % 360
        let intensity = 255 - (iter * 6)
        
        // Convert HSB-like values to RGB
        let r = sin(colorPhase * 0.01745 + t * 2) * 127 + 128
        let g = sin(colorPhase * 0.01745 + t * 2 + 2.094) * 127 + 128
        let b = sin(colorPhase * 0.01745 + t * 2 + 4.188) * 127 + 128
        
        // Apply intensity
        r = (r * intensity) / 255
        g = (g * intensity) / 255
        b = (b * intensity) / 255
        
        fill(r, g, b)
        noStroke()
        rect(px, py, step, step)
      }
    }
  }
  
  // Corner indicators (visual feedback)
  fill(255, 255, 0)
  ellipse(10, 10, 15)
  ellipse(w-10, 10, 15)
  ellipse(10, h-10, 15)
  ellipse(w-10, h-10, 15)
  
  // Center indicator (pulsing)
  fill(255, 255, 255, 100 + sin(t * 5) * 50)
  ellipse(w/2, h/2, 10 + sin(t * 3) * 5)
} 