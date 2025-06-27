// Cosmic Spiral - Mesmerizing spiral with dynamic color cycling
// A hypnotic spiral that grows outward with smooth color transitions
// Perfect example of mathematical beauty in motion

t=0
draw=_=>{
  t||createCanvas(w=800,h=600)
  background(0,30)
  t+=0.04
  for(i=0;i<80;i++){
    x=w/2+sin(t+i*0.1)*i*2.5
    y=h/2+cos(t+i*0.15)*i*2.5
    fill(sin(t+i)*127+128,cos(t+i*0.5)*127+128,255)
    ellipse(x,y,8,8)
  }
} 