// Dancing Sine Wave - Fluid wave animation with dynamic colors
// A mesmerizing sine wave that dances with rhythm and flowing colors
// Mathematical harmony in continuous motion

t=0
draw=_=>{
  t||createCanvas(w=800,h=600)
  background(0,20)
  t+=0.05
  
  // Draw multiple dancing sine wave layers
  for(layer=0;layer<3;layer++){
    strokeWeight(3-layer)
    
    // Wave parameters that change over time
    amplitude = 80 + sin(t*0.7+layer)*30
    frequency = 0.02 + sin(t*0.3+layer*0.5)*0.01
    phase = t*2 + layer*1.2
    
    // Dynamic colors for each wave layer
    r = sin(t*0.8+layer)*127+128
    g = cos(t*0.6+layer*1.5)*127+128  
    b = sin(t*1.2+layer*2)*127+128
    stroke(r,g,b,150)
    
    // Draw the dancing sine wave with connected lines
    for(x=0;x<w-3;x+=3){
      y1 = h/2 + sin(x*frequency + phase)*amplitude
      y2 = h/2 + sin((x+3)*frequency + phase)*amplitude
      line(x,y1,x+3,y2)
    }
    
    // Add dancing particles along the wave
    noStroke()
    for(i=0;i<20;i++){
      px = (t*50 + i*40) % w
      py = h/2 + sin(px*frequency + phase)*amplitude
      fill(r,g,b,100)
      size = 6+sin(t*3+i)*3
      ellipse(px, py, size, size)
    }
  }
}