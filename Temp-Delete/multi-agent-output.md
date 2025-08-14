**1. ****Eliminating Gradient Clipping**  
From Tyler’s blog, the top 3 speed improvements are:  
• **Eliminating Gradient Clipping**: To stabilize training while minimizing speed, we eliminated gradient clipping, a hyperparameter that often slows training. This approach ensures smoother convergence and faster execution.  

**2. ****Extending Sequence Length**  
The blog’s dataset includes a sequence length of 8192 tokens, addressing document splitting issues and enabling faster processing. This optimization reduces processing delays and enhances overall speed.  

**3. ****Addressing Document Splitting**  
By cutting documents in the middle and avoiding unnecessary restarts, we reduce loss penalties and improve efficiency. This method enhances performance by streamlining document handling.  

These optimizations directly address the challenges of speed-running, ensuring efficient performance from Tyler’s blog.