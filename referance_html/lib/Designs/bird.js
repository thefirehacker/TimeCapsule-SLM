// Stylized Bird Animation - Artistic and Elegant
// Enhanced with gradients, glows, and artistic effects
// Non-realistic but visually striking design

t=0
draw=_=>{
  t||createCanvas(w=800,h=600)
  t+=0.025 // Fix: Add time increment for movement
  
  // Gradient sky background
  for(i=0;i<h;i++){
    r=5+i*0.03+sin(t+i*0.01)*3
    g=15+i*0.05+cos(t*0.8+i*0.01)*5
    b=30+i*0.08+sin(t*0.6+i*0.01)*4
    stroke(r,g,b)
    line(0,i,w,i)
  }
  
  // Wind gusts instead of clouds
  stroke(255,255,255,60)
  strokeWeight(3)
  for(i=0;i<8;i++){
    windX=i*120+sin(t*0.4+i)*80
    windY=80+cos(t*0.3+i)*40
    windLen=40+sin(t*2+i)*20
    
    // Main wind gust
    line(windX,windY,windX+windLen,windY-8)
    line(windX+windLen*0.3,windY-3,windX+windLen*1.2,windY-12)
    line(windX+windLen*0.6,windY-6,windX+windLen*1.4,windY-15)
    
    // Wind particles
    stroke(255,255,255,40)
    strokeWeight(1)
    for(j=0;j<5;j++){
      px=windX+windLen+j*8+sin(t*4+i+j)*6
      py=windY-10+cos(t*3+i+j)*4
      point(px,py)
    }
  }
  
  // Moving grass blades at bottom
  stroke(50,150,50)
  strokeWeight(2)
  for(i=0;i<60;i++){
    grassX=i*15+sin(t*0.1+i)*3
    grassHeight=20+sin(i)*8
    grassSway=sin(t*2+i*0.2)*4
    
    // Grass blade with wind sway
    line(grassX,h,grassX+grassSway,h-grassHeight)
    
    // Grass tip
    stroke(80,200,80)
    strokeWeight(1)
    line(grassX+grassSway,h-grassHeight,grassX+grassSway+sin(t*3+i)*2,h-grassHeight-3)
  }
  
  // Elegant flight path with gentle curves - FULL CANVAS
  bx=w/2+sin(t*0.3)*300+cos(t*0.5)*100 // Larger movement range
  by=h/2+cos(t*0.2)*150+sin(t*0.4)*80  // Use more vertical space
  
  // Natural wing beat rhythm
  wing=sin(t*4)*0.5
  wingTip=sin(t*4.2)*0.3
  
  // Bird aura/glow effect
  noStroke()
  for(j=0;j<6;j++){
    fill(255,200+j*8,100,20-j*2)
    ellipse(bx,by,120-j*15,60-j*8)
  }
  
  // Enhanced bird colors with gradients
  stroke(255,240,120)
  strokeWeight(4)
  noFill()
  
  // Bird head with glow
  stroke(255,220,140)
  ellipse(bx-40,by-16,24,20)
  stroke(255,240,160)
  strokeWeight(2)
  ellipse(bx-40,by-16,20,16)
  
  // Elegant curved neck with gradient
  strokeWeight(4)
  stroke(255,220,140)
  line(bx-30,by-10,bx-16,by-5)
  strokeWeight(2)
  stroke(255,240,160)
  line(bx-30,by-9,bx-16,by-4)
  
  // Main body with layered effect
  strokeWeight(4)
  stroke(255,220,140)
  ellipse(bx,by,75,30)
  strokeWeight(2)
  stroke(255,240,160)
  ellipse(bx,by,70,26)
  
  // Stylized wings with color variations
  for(i=0;i<10;i++){
    wingHue=240-i*5+sin(t*4+i)*10
    stroke(255,wingHue,120+i*8)
    strokeWeight(3+sin(i)*0.5)
    
    // Left wing with curved feathers
    x1=bx-16-i*4.5
    y1=by-4+wing*i*2.2
    x2=bx-24-i*7
    y2=by+16+wing*i*3.2
    
    midX=(x1+x2)/2+sin(t*4+i)*4
    midY=(y1+y2)/2
    
    line(x1,y1,midX,midY)
    line(midX,midY,x2,y2)
    
    // Add feather highlights
    stroke(255,wingHue+20,140+i*6)
    strokeWeight(1.5)
    line(x1+2,y1+1,midX+2,midY+1)
    
    // Right wing with curved feathers
    stroke(255,wingHue,120+i*8)
    strokeWeight(3+sin(i)*0.5)
    x1=bx+16+i*4.5
    y1=by-4-wing*i*2.2
    x2=bx+24+i*7
    y2=by+16-wing*i*3.2
    
    midX=(x1+x2)/2-sin(t*4+i)*4
    midY=(y1+y2)/2
    
    line(x1,y1,midX,midY)
    line(midX,midY,x2,y2)
    
    // Add feather highlights
    stroke(255,wingHue+20,140+i*6)
    strokeWeight(1.5)
    line(x1-2,y1+1,midX-2,midY+1)
  }
  
  // Flowing tail with rainbow gradient
  for(i=0;i<6;i++){
    tailHue=200+i*15+sin(t*2+i)*20
    stroke(255,tailHue,100+i*10)
    strokeWeight(3+i*0.3)
    
    x1=bx+35
    y1=by+i*2-4
    x2=bx+60+sin(t*0.8+i*0.3)*10
    y2=by+i*3.5-7+cos(t*0.6+i*0.3)*5
    
    midX=(x1+x2)/2+sin(t+i)*5
    midY=(y1+y2)/2
    
    line(x1,y1,midX,midY)
    line(midX,midY,x2,y2)
    
    // Tail highlights
    stroke(255,tailHue+30,120+i*12)
    strokeWeight(1.5)
    line(x1+1,y1-1,midX+1,midY-1)
  }
  
  // Stylized wing tips with sparkles
  for(i=0;i<4;i++){
    // Left wing tips with glow
    x=bx-75-i*8+sin(t*4+i)*15+wingTip*10
    y=by+20+wing*25+i*4
    
    stroke(255,250,180)
    strokeWeight(3)
    point(x,y)
    stroke(255,255,220)
    strokeWeight(1)
    point(x,y)
    
    // Right wing tips with glow
    x=bx+75+i*8-sin(t*4+i)*15-wingTip*10
    y=by+20-wing*25+i*4
    
    stroke(255,250,180)
    strokeWeight(3)
    point(x,y)
    stroke(255,255,220)
    strokeWeight(1)
    point(x,y)
  }
  
  // Stylized beak with gradient
  stroke(255,180,60)
  strokeWeight(4)
  line(bx-50,by-16,bx-56,by-13)
  stroke(255,200,100)
  strokeWeight(2)
  line(bx-50,by-15,bx-55,by-12)
  
  // Glowing eye
  stroke(255,255,180)
  strokeWeight(4)
  point(bx-38,by-18)
  stroke(255,255,220)
  strokeWeight(2)
  point(bx-38,by-18)
  
  // Enhanced wind with color - across full canvas
  for(i=0;i<10;i++){
    windHue=200+i*20+sin(t*3+i)*30
    stroke(windHue,windHue+50,255,80)
    strokeWeight(2)
    
    airX=i*90+sin(t*2+i)*60
    airY=150+cos(t*1.5+i)*100
    line(airX,airY,airX+35,airY-8)
    
    // Wind sparkles
    stroke(255,255,255,120)
    strokeWeight(1)
    point(airX+30+sin(t*6+i)*8,airY-6+cos(t*6+i)*4)
  }
  
  // Bird's colorful wake trail
  for(i=0;i<4;i++){
    trailHue=220+i*25+sin(t*5+i)*40
    stroke(255,trailHue,120,100-i*15)
    strokeWeight(2-i*0.3)
    
    trailX=bx+40+i*12+sin(t*3+i)*6
    trailY=by+sin(t*2+i)*8
    line(trailX,trailY,trailX+15,trailY-3)
  }
  
  // Floating sparkles around bird - full canvas
  noStroke()
  for(i=0;i<12;i++){
    sparkleX=bx+sin(t*4+i*0.8)*120+cos(t*2+i)*80
    sparkleY=by+cos(t*3+i*0.8)*80+sin(t*1.5+i)*60
    sparkleHue=180+i*30+sin(t*6+i)*50
    
    fill(255,sparkleHue,200,150+sin(t*8+i)*50)
    ellipse(sparkleX,sparkleY,3+sin(t*10+i)*2,3+sin(t*10+i)*2)
  }
}