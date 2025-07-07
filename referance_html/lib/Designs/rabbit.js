// Animated Rabbit - Bouncing cute rabbit with ears and tail
t=0
draw=_=>{
  t||createCanvas(w=400,w)
  background(20,30,50)
  
  // Rabbit body animation
  t+=0.05
  x=200+sin(t)*50
  y=250+cos(t*0.7)*20
  
  // Body (main oval)
  fill(220,200,180)
  noStroke()
  ellipse(x,y,60,80)
  
  // Head
  ellipse(x,y-50,50,50)
  
  // Long ears
  ellipse(x-15,y-75,12,40)
  ellipse(x+15,y-75,12,40)
  
  // Inner ears (pink)
  fill(255,150,150)
  ellipse(x-15,y-75,6,25)
  ellipse(x+15,y-75,6,25)
  
  // Eyes
  fill(0)
  ellipse(x-10,y-55,8,8)
  ellipse(x+10,y-55,8,8)
  
  // Eye shine
  fill(255)
  ellipse(x-8,y-57,3,3)
  ellipse(x+12,y-57,3,3)
  
  // Nose (triangle)
  fill(255,100,100)
  triangle(x,y-45,x-5,y-40,x+5,y-40)
  
  // Mouth
  stroke(0)
  strokeWeight(2)
  noFill()
  arc(x-3,y-35,8,8,0,PI/2)
  arc(x+3,y-35,8,8,PI/2,PI)
  
  // Front paws
  fill(220,200,180)
  noStroke()
  ellipse(x-20,y+20,15,25)
  ellipse(x+20,y+20,15,25)
  
  // Back feet
  ellipse(x-15,y+35,20,12)
  ellipse(x+15,y+35,20,12)
  
  // Fluffy tail
  fill(255,255,255)
  ellipse(x+25,y+10,15,15)
  
  // Whiskers
  stroke(0)
  strokeWeight(1)
  line(x-25,y-45,x-35,y-48)
  line(x-25,y-40,x-35,y-40)
  line(x+25,y-45,x+35,y-48)
  line(x+25,y-40,x+35,y-40)
} 