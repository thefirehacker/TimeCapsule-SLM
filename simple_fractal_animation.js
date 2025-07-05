// Simple Fractal Animation - Guaranteed to Work
// Beautiful spirals and patterns without heavy computation

t = 0

draw = _ => {
  t || createCanvas(600, 400)
  background(0, 0, 20)
  
  t += 0.02
  
  // Draw animated fractal spirals
  translate(width/2, height/2)
  
  // Multiple spiral layers
  for (let layer = 0; layer < 5; layer++) {
    push()
    rotate(t * 0.5 + layer * 0.3)
    
    // Draw spiral points
    for (let i = 0; i < 100; i++) {
      let angle = i * 0.3 + t
      let radius = i * 2 + sin(t + layer) * 20
      
      let x = cos(angle) * radius
      let y = sin(angle) * radius
      
      // Color based on position and time
      let hue = (i * 3 + t * 50 + layer * 60) % 360
      let brightness = 255 - (radius * 0.5)
      
      fill(hue, 200, brightness, 150)
      noStroke()
      ellipse(x, y, 6 + sin(t * 2 + i) * 2)
    }
    pop()
  }
  
  // Add central glow
  fill(255, 255, 255, 50)
  ellipse(0, 0, 40 + sin(t * 3) * 20)
  
  // Reset transform for text (with safety checks)
  try {
    if (typeof resetMatrix !== 'undefined') resetMatrix()
    fill(255, 200)
    if (typeof textAlign !== 'undefined') textAlign(LEFT, TOP)
    if (typeof textSize !== 'undefined') textSize(14)
    if (typeof text !== 'undefined') {
      text("✨ Fractal Spirals", 10, 10)
      text("Time: " + t.toFixed(2), 10, 30)
    }
  } catch(e) {
    // Fallback if text functions fail
    fill(255)
    ellipse(20, 20, 8)
  }
} 