// BubblSpace Navigation Component for TimeCapsule-SLM
// Usage: BubblSpaceNavbar.init(activeTab) where activeTab is 'home', 'deepresearch', or 'playground'

window.BubblSpaceNavbar = {
  // CSS styles for the navbar
  styles: `
    /* SketchPad-SLM Navigation Styles - Cool & Modern */
    .sketchpad-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(180deg, 
        rgba(255, 255, 255, 0.98) 0%, 
        rgba(255, 255, 255, 0.92) 50%, 
        rgba(255, 255, 255, 0.75) 70%, 
        rgba(255, 255, 255, 0.5) 90%, 
        rgba(255, 255, 255, 0.2) 100%
      );
      backdrop-filter: blur(35px);
      -webkit-backdrop-filter: blur(35px);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      z-index: 1000;
      padding: 18px 0 30px 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 40px;
      width: 100%;
    }
    
    /* Enhanced container width for studio pages */
    .nav-container.studio-page {
      max-width: 1600px;
      padding: 0 50px;
    }
    
    .nav-logo {
      display: flex;
      align-items: center;
      gap: 18px;
      text-decoration: none;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      padding: 14px 28px;
      border-radius: 20px;
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, 
        rgba(255, 87, 87, 0.12) 0%, 
        rgba(255, 138, 128, 0.08) 50%, 
        rgba(255, 87, 87, 0.12) 100%
      );
      border: 3px solid transparent;
      background-clip: padding-box;
      box-shadow: 
        0 8px 32px rgba(255, 87, 87, 0.2), 
        0 4px 16px rgba(255, 87, 87, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
      animation: logoGlow 4s ease-in-out infinite;
    }
    
    @keyframes logoGlow {
      0%, 100% { 
        box-shadow: 
          0 8px 32px rgba(255, 87, 87, 0.2), 
          0 4px 16px rgba(255, 87, 87, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);
      }
      50% { 
        box-shadow: 
          0 12px 48px rgba(255, 87, 87, 0.3), 
          0 6px 24px rgba(255, 87, 87, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.4);
      }
    }
    
    .nav-logo::before {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      background: linear-gradient(45deg, 
        #ff5757 0%, 
        #ff8a80 25%, 
        #ff5757 50%, 
        #ff8a80 75%, 
        #ff5757 100%
      );
      background-size: 400% 400%;
      border-radius: 23px;
      z-index: -1;
      animation: borderGlow 3s linear infinite;
      opacity: 1;
      box-shadow: 0 0 20px rgba(255, 87, 87, 0.6), 0 0 40px rgba(255, 87, 87, 0.3);
    }
    
    @keyframes borderGlow {
      0% { background-position: 0% 50%; }
      25% { background-position: 100% 0%; }
      50% { background-position: 100% 50%; }
      75% { background-position: 0% 100%; }
      100% { background-position: 0% 50%; }
    }
    
    .nav-logo::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.4) 20%, 
        rgba(255, 255, 255, 0.6) 50%, 
        rgba(255, 255, 255, 0.4) 80%, 
        transparent 100%
      );
      transition: left 1s ease;
      animation: shimmerLoop 4s ease-in-out infinite;
    }
    
    @keyframes shimmerLoop {
      0%, 90%, 100% { left: -100%; }
      10%, 80% { left: 100%; }
    }
    
    .nav-logo:hover::after {
      animation-duration: 0.8s;
    }
    
    .nav-logo:hover {
      transform: scale(1.12) translateY(-4px) rotate(1deg);
      background: linear-gradient(135deg, 
        rgba(255, 87, 87, 0.18) 0%, 
        rgba(255, 138, 128, 0.12) 50%, 
        rgba(255, 87, 87, 0.18) 100%
      );
      box-shadow: 
        0 16px 64px rgba(255, 87, 87, 0.35), 
        0 8px 32px rgba(255, 87, 87, 0.25),
        0 4px 16px rgba(255, 87, 87, 0.2),
        inset 0 2px 0 rgba(255, 255, 255, 0.4),
        0 0 0 1px rgba(255, 87, 87, 0.2);
      animation-duration: 2s;
    }
    
    .nav-logo img {
      width: 40px;
      height: 40px;
      object-fit: contain;
      filter: 
        drop-shadow(0 6px 16px rgba(255, 87, 87, 0.4)) 
        drop-shadow(0 3px 8px rgba(255, 87, 87, 0.3))
        brightness(1.1)
        contrast(1.1);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      animation: iconFloat 3s ease-in-out infinite;
    }
    
    @keyframes iconFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-2px); }
    }
    
    .nav-logo:hover img {
      filter: 
        drop-shadow(0 12px 32px rgba(255, 87, 87, 0.6)) 
        drop-shadow(0 6px 16px rgba(255, 87, 87, 0.4))
        drop-shadow(0 0 20px rgba(255, 87, 87, 0.3))
        brightness(1.2)
        contrast(1.2);
      transform: rotate(12deg) scale(1.15) translateY(-2px);
      animation-duration: 1.5s;
    }
    
    .nav-logo span {
      font-size: 26px;
      font-weight: 900;
      color: white;
      letter-spacing: -0.05em;
      text-shadow: 
        0 6px 12px rgba(255, 87, 87, 0.6),
        0 3px 6px rgba(255, 87, 87, 0.4),
        0 1px 3px rgba(0, 0, 0, 0.3);
      transition: all 0.5s ease;
      position: relative;
      overflow: hidden;
      display: inline-block;
      max-width: 200px;
      white-space: nowrap;
    }
    
    /* Responsive logo text sizing for studio pages */
    .nav-container.studio-page .nav-logo span {
      font-size: 22px !important;
      max-width: 160px !important;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    
    .nav-logo:hover span {
      text-shadow: 
        0 8px 16px rgba(255, 87, 87, 0.8),
        0 4px 8px rgba(255, 87, 87, 0.6),
        0 2px 4px rgba(0, 0, 0, 0.4);
      color: rgba(255, 255, 255, 1);
      letter-spacing: 0.05em;
    }
    
    .nav-links {
      display: flex;
      align-items: center;
      gap: 20px;    
    }
    
    .nav-group {
      display: flex;
      align-items: center;
      gap: 18px;
      position: relative;
    }
    
    /* Enhanced spacing for studio pages (DeepResearch and Playground) */
    .nav-links.studio-page {
      gap: 28px !important;
    }
    
    .nav-links.studio-page .nav-group {
      gap: 24px !important;
    }
    
    /* Visual separator between nav groups */
    .nav-group:not(:last-child)::after {
      content: '';
      position: absolute;
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 32px;
      background: linear-gradient(180deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.3) 25%, 
        rgba(255, 255, 255, 0.5) 50%, 
        rgba(255, 255, 255, 0.3) 75%, 
        transparent 100%
      );
      opacity: 0.7;
    }
    
    .nav-links a {
      color: rgba(255, 255, 255, 1);
      text-decoration: none;
      font-size: 15px;
      font-weight: 700;
      padding: 12px 20px;
      border-radius: 12px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(15px);
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      overflow: hidden;
    }
    
    .nav-links a::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }
    
    .nav-links a::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 87, 87, 0.3), rgba(255, 138, 128, 0.2));
      border-radius: 16px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .nav-links a:hover::before {
      left: 100%;
    }
    
    .nav-links a:hover::after {
      opacity: 1;
    }
    
    .nav-links a:hover {
      color: #0f1419;
      background: rgba(255, 255, 255, 0.95);
      border-color: rgba(255, 87, 87, 0.3);
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15), 0 6px 15px rgba(255, 87, 87, 0.2), 0 0 0 1px rgba(255, 87, 87, 0.1);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      font-weight: 700;
    }
    
    .nav-links a:active {
      transform: translateY(-2px) scale(1.03);
    }
    
    /* Dropdown navigation styles */
    .nav-dropdown {
      position: relative;
      display: inline-block;
    }
    
    .nav-dropdown-toggle {
      cursor: pointer;
      position: relative;
    }
    
    .nav-dropdown-toggle::after {
      content: '▼';
      margin-left: 8px;
      font-size: 10px;
      opacity: 0.8;
      transition: all 0.3s ease;
    }
    
    .nav-dropdown:hover .nav-dropdown-toggle::after {
      transform: translateY(-1px) rotate(180deg);
      opacity: 1;
    }
    
    .nav-dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 220px;
      background: rgba(255, 255, 255, 0.98);
      border-radius: 14px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25), 0 4px 16px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(25px);
      border: 2px solid rgba(255, 255, 255, 0.6);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
      padding: 12px;
      margin-top: 8px;
    }
    
    .nav-dropdown-menu::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%);
      border-radius: 14px;
      z-index: -1;
    }
    
    .nav-dropdown:hover .nav-dropdown-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    .nav-dropdown-menu a {
      display: block;
      padding: 16px 20px;
      margin: 4px 0;
      font-size: 16px;
      font-weight: 700;
      color: #0f1419 !important;
      border-radius: 12px;
      transition: all 0.3s ease;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-decoration: none;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(0, 0, 0, 0.15);
      letter-spacing: 0.3px;
    }
    
    .nav-dropdown-menu a:hover {
      background: rgba(255, 87, 87, 0.15);
      color: #0f1419 !important;
      transform: translateX(6px) scale(1.02);
      box-shadow: 0 6px 18px rgba(255, 87, 87, 0.3);
      border-color: rgba(255, 87, 87, 0.3);
      font-weight: 700;
    }
    
    .mode-nav-label {
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
      font-weight: 800;
      margin-right: 8px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6), 0 1px 2px rgba(0, 0, 0, 0.4);
      letter-spacing: 0.5px;
      text-transform: uppercase;
      opacity: 1;
      background: rgba(255, 255, 255, 0.15);
      padding: 4px 8px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    
    /* Studio section styling */
    .mode-nav {
      display: flex;
      align-items: center;
      gap: 16px;
      background: rgba(255, 255, 255, 0.15);
      border: 2px solid rgba(255, 255, 255, 0.35);
      border-radius: 16px;
      padding: 12px 20px;
      backdrop-filter: blur(15px);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
      margin-left: 24px;
    }
    
    /* Enhanced spacing for studio pages */
    .nav-links.studio-page .mode-nav {
      margin-left: 32px !important;
      gap: 20px !important;
      padding: 14px 24px !important;
    }
    
    .mode-nav:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
      transform: translateY(-1px);
    }
    
    .mode-nav-btn {
      color: rgba(255, 255, 255, 1);
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      padding: 10px 16px;
      border-radius: 10px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      background: rgba(255, 255, 255, 0.15);
      border: 2px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(10px);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7), 0 1px 2px rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
    }
    
    .mode-nav-btn.active {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      border-color: rgba(79, 172, 254, 0.5);
      box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
    }
    
    .mode-nav-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
    }
    
    .mode-nav-btn:not(.active):hover {
      background: rgba(255, 255, 255, 0.15);
    }
    
    /* Responsive design for mode navigation */
    @media (max-width: 1024px) {
      .mode-nav {
        margin-left: 12px;
        padding: 8px 12px;
      }
      
      /* Maintain enhanced spacing for studio pages even on smaller screens */
      .nav-links.studio-page .mode-nav {
        margin-left: 20px;
        padding: 10px 16px;
      }
      
      .mode-nav-btn {
        padding: 8px 12px;
        font-size: 12px;
      }
      
      .mode-nav-btn span:last-child {
        display: none;
      }
      
      .nav-links {
        gap: 12px;
      }
      
      /* Enhanced spacing for studio pages on tablets */
      .nav-links.studio-page {
        gap: 20px;
      }
      
      .nav-links.studio-page .nav-group {
        gap: 16px;
      }
    }
    
    @media (max-width: 768px) {
      .nav-container {
        padding: 0 24px;
      }
      
      .nav-links {
        gap: 10px;
      }
      
      /* Enhanced spacing for studio pages on mobile */
      .nav-links.studio-page {
        gap: 16px;
      }
      
      .nav-group {
        gap: 8px;
      }
      
      .nav-links.studio-page .nav-group {
        gap: 12px;
      }
      
      .nav-links a {
        padding: 10px 16px;
        font-size: 14px;
      }
      
      .mode-nav {
        margin-left: 8px;
        padding: 6px 10px;
      }
      
      /* Maintain some enhanced spacing for studio pages on mobile */
      .nav-links.studio-page .mode-nav {
        margin-left: 12px;
        padding: 8px 12px;
      }
    }
  `,

  // Render the navbar with active tab
  render: function(activeTab = 'home') {
    const isHomeActive = activeTab === 'home';
    const isDeepResearchActive = activeTab === 'deepresearch';
    const isPlaygroundActive = activeTab === 'playground';
    const isStudioPage = isDeepResearchActive || isPlaygroundActive;

    return `
      <!-- BubblSpace Navigation -->
      <div class="sketchpad-nav">
        <div class="nav-container${isStudioPage ? ' studio-page' : ''}">
          <a href="https://www.bubblspace.com/" target="_blank" rel="noopener" class="nav-logo">
            <img src="lib/Media/BubblLogZoomed.png" alt="BubblSpace">
            <span>BubblSpace</span>
          </a>
          <div class="nav-links${isStudioPage ? ' studio-page' : ''}">
            <!-- About Us Dropdown -->
            <div class="nav-group">
              <div class="nav-dropdown">
                <a href="#" class="nav-dropdown-toggle">About Us</a>
                <div class="nav-dropdown-menu">
                  <a href="https://www.bubblspace.com/" target="_blank" rel="noopener">BubblSpace Home</a>
                  <a href="https://www.bubblspace.com/about-aiedx" target="_blank" rel="noopener">About AIEdx</a>
                  <a href="https://www.bubblspace.com/contact" target="_blank" rel="noopener">Contact Us</a>
                </div>
              </div>
            </div>

            <!-- Main App Home Section -->
            <div class="nav-group">
              <a href="index.html" ${isHomeActive ? 'class="active"' : ''} style="font-weight: 700; font-size: 18px;">🏠 Home</a>
              
              <!-- Studio Subsection -->
              <div class="mode-nav">
                <span class="mode-nav-label">Studio</span>
                <a href="DeepResearch.html" class="mode-nav-btn ${isDeepResearchActive ? 'active' : ''}">
                  <span>🔬</span>
                  <span>DeepResearch TimeCapsule</span>
                </a>
                <a href="Canvas.html" class="mode-nav-btn ${isPlaygroundActive ? 'active' : ''}">
                  <span>🎮</span>
                  <span>Playground</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Initialize the navbar
  init: function(activeTab = 'home') {
    // Prevent multiple initializations
    if (document.querySelector('.sketchpad-nav') || window.BubblSpaceNavbarInitialized) {
      return;
    }

    // Add styles to head if not already added
    if (!document.querySelector('#bubblspace-navbar-styles')) {
      const style = document.createElement('style');
      style.id = 'bubblspace-navbar-styles';
      style.textContent = this.styles;
      document.head.appendChild(style);
    }

    // Add navbar HTML to body
    const navbarHTML = this.render(activeTab);
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Mark as initialized
    window.BubblSpaceNavbarInitialized = true;

    // Don't set padding-top as it interferes with existing layout
    // The existing CSS already handles proper spacing
  }
};

// Auto-initialize if script is loaded directly
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    // Auto-detect active tab based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    let activeTab = 'home';
    
    if (currentPage.includes('DeepResearch')) {
      activeTab = 'deepresearch';
    } else if (currentPage.includes('Canvas')) {
      activeTab = 'playground';
    }
    
    // Only initialize if not already initialized and no conflicts
    if (!document.querySelector('.sketchpad-nav') && !window.BubblSpaceNavbarInitialized) {
      window.BubblSpaceNavbar.init(activeTab);
      window.BubblSpaceNavbarInitialized = true;
    }
  });
}
