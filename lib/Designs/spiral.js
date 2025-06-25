// Colorful Spiral - Rainbow spiral with particle trails
t=0
draw=_=>{
  t||createCanvas(w=600,w)
  background(0,10)
  
  t+=0.02
  
  // Multiple spirals
  for(j=0;j<5;j++){
    for(i=0;i<200;i++){
      a=i*0.1+t+j*TWO_PI/5
      r=i*2
      x=w/2+cos(a)*r
      y=w/2+sin(a)*r
      
      // Rainbow colors
      fill(sin(a+t)*127+128,cos(a+t*1.5)*127+128,sin(a*2+t*2)*127+128,150)
      noStroke()
      ellipse(x,y,sin(i*0.1+t)*10+5,sin(i*0.1+t)*10+5)
    }
  }
} 