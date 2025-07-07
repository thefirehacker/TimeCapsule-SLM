// Fish Animation - Parametric curve with trigonometric functions
// Original algorithm by @yuruyurau - Scaled to larger canvas
a=(x,y,d=mag(k=(4+cos(y))*cos(x/4),e=y/8-20))=>point((q=sin(k*3)+sin(y/19+9)*k*(6+sin(e*14-d)))*cos(d/8+t/4)+50*cos(c=d-t)+w/2,q*sin(c)+d*7*sin(c/4)+h/2)
t=0,draw=$=>{if(!t){w=800;h=600;createCanvas(w,h)}background(9);stroke(255,116);for(t+=PI/120,i=1e4;i--;)a(i,i/235)}
