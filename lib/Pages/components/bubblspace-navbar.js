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
    
    /* Mobile Hamburger Menu */
    .mobile-menu-toggle {
      display: none;
      background: rgba(255, 255, 255, 0.9);
      border: 2px solid rgba(255, 255, 255, 0.8);
      border-radius: 12px;
      padding: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(15px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      z-index: 1001;
      position: relative;
    }
    
    .mobile-menu-toggle:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
      transform: scale(1.05);
    }
    
    .mobile-menu-toggle span {
      display: block;
      width: 25px;
      height: 3px;
      background: #333 !important;
      margin: 5px 0;
      transition: all 0.3s ease;
      border-radius: 2px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .mobile-nav-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
    }
    
    .mobile-nav-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    
    .mobile-nav-menu {
      position: fixed;
      top: 0;
      right: -100%;
      width: 280px;
      height: 100%;
      background: linear-gradient(180deg, 
        rgba(102, 126, 234, 0.95) 0%, 
        rgba(118, 75, 162, 0.95) 100%
      );
      backdrop-filter: blur(20px);
      z-index: 1000;
      transition: right 0.3s ease;
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      overflow-y: auto;
    }
    
    .mobile-nav-menu.active {
      right: 0;
    }
    
    .mobile-nav-header {
      padding: 25px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .mobile-nav-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      color: white;
      text-decoration: none;
    }
    
    .mobile-nav-logo img {
      width: 35px;
      height: 35px;
      border-radius: 8px;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    }
    
    .mobile-nav-logo span {
      font-size: 18px;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .mobile-nav-close {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 8px;
      padding: 8px;
      cursor: pointer;
      color: white;
      font-size: 18px;
      transition: all 0.3s ease;
    }
    
    .mobile-nav-close:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
    
    .mobile-nav-links {
      padding: 20px;
    }
    
    .mobile-nav-section {
      margin-bottom: 25px;
    }
    
    .mobile-nav-section-title {
      color: rgba(255, 255, 255, 0.8);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 15px;
      padding-left: 15px;
    }
    
    .mobile-nav-links a {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px;
      color: white;
      text-decoration: none;
      border-radius: 12px;
      margin-bottom: 8px;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      font-weight: 600;
      font-size: 16px;
    }
    
    .mobile-nav-links a:hover,
    .mobile-nav-links a.active {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
      transform: translateX(5px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .mobile-nav-section:last-child {
      margin-bottom: 0;
    }
    
    .mobile-nav-section .mobile-nav-section-title {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 8px;
      margin-bottom: 12px;
    }
    
    /* FORCE MOBILE NAVIGATION - MAXIMUM OVERRIDE */
    @media screen and (max-width: 768px), screen and (max-device-width: 768px) {
      
      /* NUCLEAR DESKTOP HIDE - MAXIMUM SPECIFICITY */
      html body .sketchpad-nav .nav-links,
      html body .sketchpad-nav .nav-links *,
      html body .sketchpad-nav .nav-group,
      html body .sketchpad-nav .nav-group *,
      html body .sketchpad-nav .mode-nav,
      html body .sketchpad-nav .mode-nav *,
      html body .sketchpad-nav .mode-nav-btn,
      html body .sketchpad-nav .mode-nav-label,
      html body .sketchpad-nav .nav-dropdown,
      html body .sketchpad-nav .nav-dropdown *,
      html body .sketchpad-nav .nav-dropdown-menu,
      html body .sketchpad-nav .nav-dropdown-toggle,
      html body div.sketchpad-nav div.nav-container div.nav-links,
      html body div.sketchpad-nav div.nav-container div.nav-group,
      html body div.sketchpad-nav div.nav-container div.mode-nav,
      .nav-links,
      .nav-group,
      .mode-nav,
      .nav-dropdown,
      .nav-dropdown-menu {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        z-index: -9999 !important;
      }
      
      /* FORCE SHOW HAMBURGER MENU - MAXIMUM SPECIFICITY */
      html body .sketchpad-nav .mobile-menu-toggle,
      html body div.sketchpad-nav button.mobile-menu-toggle {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: rgba(255, 255, 255, 0.2) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        border-radius: 8px !important;
        padding: 10px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5) !important;
        width: 50px !important;
        height: 50px !important;
        cursor: pointer !important;
        position: relative !important;
        z-index: 1002 !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
        left: auto !important;
        top: auto !important;
      }
      
      /* FORCE MENU ICON - MAXIMUM VISIBILITY */
      html body .sketchpad-nav .mobile-menu-toggle svg,
      html body div.sketchpad-nav button.mobile-menu-toggle svg {
        display: block !important;
        width: 24px !important;
        height: 24px !important;
        stroke: white !important;
        transition: all 0.3s ease !important;
        opacity: 1 !important;
        visibility: visible !important;
        position: relative !important;
        z-index: 1003 !important;
      }
      
      /* MENU ICON HOVER EFFECT */
      html body .sketchpad-nav .mobile-menu-toggle:hover svg,
      html body div.sketchpad-nav button.mobile-menu-toggle:hover svg {
        stroke: #4facfe !important;
        transform: scale(1.1) !important;
      }
      
      /* FORCE MOBILE NAVBAR LAYOUT */
      html body .sketchpad-nav,
      html body div.sketchpad-nav {
        padding: 10px 0 !important;
        backdrop-filter: blur(10px) !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 1000 !important;
        width: 100% !important;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      }
      
      html body .sketchpad-nav .nav-container,
      html body div.sketchpad-nav div.nav-container {
        display: flex !important;
        padding: 0 20px !important;
        justify-content: space-between !important;
        align-items: center !important;
        min-height: 60px !important;
        max-width: none !important;
        margin: 0 !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      
      /* FORCE MOBILE LOGO DISPLAY */
      html body .sketchpad-nav .nav-logo,
      html body div.sketchpad-nav a.nav-logo {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        padding: 4px 8px !important;
        border-radius: 6px !important;
        background: rgba(255, 255, 255, 0.1) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        box-shadow: none !important;
        animation: none !important;
        transform: none !important;
        transition: none !important;
        text-decoration: none !important;
        position: relative !important;
        z-index: 1001 !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
        left: auto !important;
        max-width: 140px !important;
        top: auto !important;
      }
      
      /* Remove all fancy effects */
      .sketchpad-nav .nav-logo::before,
      .sketchpad-nav .nav-logo::after {
        display: none !important;
        content: none !important;
      }
      
      .sketchpad-nav .nav-logo:hover {
        transform: none !important;
        box-shadow: none !important;
        animation: none !important;
        background: rgba(255, 255, 255, 0.2) !important;
      }
      
      /* Tiny logo image */
      .sketchpad-nav .nav-logo img {
        width: 28px !important;
        height: 28px !important;
        object-fit: contain !important;
        filter: none !important;
        animation: none !important;
        transition: none !important;
        border-radius: 6px !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
      }
      
      .sketchpad-nav .nav-logo:hover img {
        transform: none !important;
        filter: none !important;
        animation: none !important;
      }
      
      /* Simple text */
      .sketchpad-nav .nav-logo span {
        font-size: 14px !important;
        font-weight: 700 !important;
        max-width: 100px !important;
        color: white !important;
        text-shadow: 0 1px 3px rgba(0,0,0,0.6) !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        letter-spacing: -0.5px !important;
      }
      
      .sketchpad-nav .nav-logo:hover span {
        color: white !important;
        text-shadow: 0 1px 3px rgba(0,0,0,0.6) !important;
        letter-spacing: -0.5px !important;
      }
    }
    
    /* Tablet responsive adjustments */
    @media (min-width: 769px) and (max-width: 1024px) {
      .mode-nav {
        margin-left: 12px;
        padding: 8px 12px;
      }
      
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
      
      .nav-links.studio-page {
        gap: 20px;
      }
      
      .nav-links.studio-page .nav-group {
        gap: 16px;
      }
    }
    
    /* Extra small mobile screens */
    @media screen and (max-width: 480px) {
      .sketchpad-nav .nav-container {
        padding: 0 12px !important;
        min-height: 45px !important;
      }
      
      .sketchpad-nav .nav-logo {
        padding: 3px 6px !important;
      }
      
      .sketchpad-nav .nav-logo span {
        font-size: 12px !important;
        max-width: 80px !important;
      }
      
      .sketchpad-nav .nav-logo img {
        width: 20px !important;
        height: 20px !important;
      }
      
      .sketchpad-nav .mobile-menu-toggle {
        width: 36px !important;
        height: 36px !important;
        padding: 6px !important;
      }
      
      .mobile-menu-toggle svg {
        width: 18px !important;
        height: 18px !important;
      }
      
      /* Compact mobile menu */
      .mobile-nav-menu {
        width: 280px !important;
      }
      
      .mobile-nav-header {
        padding: 18px 15px !important;
      }
      
      .mobile-nav-links {
        padding: 15px !important;
      }
      
      .mobile-nav-links a {
        padding: 12px 15px !important;
        font-size: 14px !important;
      }
      
      .mobile-nav-section-title {
        font-size: 11px !important;
        padding-left: 10px !important;
      }
    }
    
    /* Large mobile - show simplified desktop nav */
    @media (min-width: 769px) {
      .sketchpad-nav .mobile-menu-toggle,
      .sketchpad-nav .mobile-nav-overlay,
      .sketchpad-nav .mobile-nav-menu {
        display: none !important;
      }
      
      .sketchpad-nav .nav-links {
        display: flex !important;
      }
    }
  `,

  // Render the navbar with active tab
  render: function(activeTab = 'home') {
    const isHomeActive = activeTab === 'home';
    const isDeepResearchActive = activeTab === 'deepresearch';
    const isPlaygroundActive = activeTab === 'playground';
    const isVisionActive = activeTab === 'vision';
    const isStudioPage = isDeepResearchActive || isPlaygroundActive || isVisionActive;

    return `
      <!-- BubblSpace Navigation -->
      <div class="sketchpad-nav">
        <div class="nav-container${isStudioPage ? ' studio-page' : ''}">
          <a href="https://www.bubblspace.com/" target="_blank" rel="noopener" class="nav-logo">
            <img src="lib/Media/BubblLogZoomed.png" alt="BubblSpace">
            <span>BubblSpace</span>
          </a>
          
          <!-- Desktop Navigation -->
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
                <a href="Playground.html" class="mode-nav-btn ${isPlaygroundActive ? 'active' : ''}">
                  <span>🎮</span>
                  <span>Playground</span>
                </a>
                <a href="vision.html" class="mode-nav-btn ${activeTab === 'vision' ? 'active' : ''}">
                  <span>🔮</span>
                  <span>Vision & Roadmap</span>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Mobile Menu Toggle -->
          <button class="mobile-menu-toggle" id="mobileMenuToggle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Navigation Overlay -->
      <div class="mobile-nav-overlay" id="mobileNavOverlay"></div>
      
      <!-- Mobile Navigation Menu -->
      <div class="mobile-nav-menu" id="mobileNavMenu">
        <div class="mobile-nav-header">
          <a href="https://www.bubblspace.com/" target="_blank" rel="noopener" class="mobile-nav-logo">
            <img src="lib/Media/BubblLogZoomed.png" alt="BubblSpace">
            <span>BubblSpace</span>
          </a>
          <button class="mobile-nav-close" id="mobileNavClose">×</button>
        </div>
        
        <div class="mobile-nav-links">
          <!-- About Section -->
          <div class="mobile-nav-section">
            <div class="mobile-nav-section-title">About</div>
            <a href="https://www.bubblspace.com/" target="_blank" rel="noopener">
              <span>🌐</span>
              <span>BubblSpace Home</span>
            </a>
            <a href="https://www.bubblspace.com/about-aiedx" target="_blank" rel="noopener">
              <span>ℹ️</span>
              <span>About AIEdx</span>
            </a>
            <a href="https://www.bubblspace.com/contact" target="_blank" rel="noopener">
              <span>📧</span>
              <span>Contact Us</span>
            </a>
          </div>
          
          <!-- Main App Section -->
          <div class="mobile-nav-section">
            <div class="mobile-nav-section-title">TimeCapsule-SLM</div>
            <a href="index.html" ${isHomeActive ? 'class="active"' : ''}>
              <span>🏠</span>
              <span>Home</span>
            </a>
          </div>
          
          <!-- Studio Section -->
          <div class="mobile-nav-section">
            <div class="mobile-nav-section-title">Studio</div>
            <a href="DeepResearch.html" ${isDeepResearchActive ? 'class="active"' : ''}>
              <span>🔬</span>
              <span>DeepResearch TimeCapsule</span>
            </a>
            <a href="Playground.html" ${isPlaygroundActive ? 'class="active"' : ''}>
              <span>🎮</span>
              <span>Playground</span>
            </a>
            <a href="vision.html" ${activeTab === 'vision' ? 'class="active"' : ''}>
              <span>🔮</span>
              <span>Vision & Roadmap</span>
            </a>
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

    // Initialize desktop navigation tracking
    this.initDesktopTracking();

    // Initialize mobile menu functionality
    this.initMobileMenu();

    // Don't set padding-top as it interferes with existing layout
    // The existing CSS already handles proper spacing
  },

  // Initialize desktop navigation tracking
  initDesktopTracking: function() {
    setTimeout(() => {
      // Track all desktop navigation links
      const desktopNavLinks = document.querySelectorAll('.sketchpad-nav .nav-link, .sketchpad-nav .nav-logo');
      desktopNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const linkText = link.textContent?.trim() || link.getAttribute('href') || 'unknown';
          const destination = link.getAttribute('href') || 'unknown';
          
          console.log('Desktop navigation clicked:', linkText);
          
          // Track navigation click with enhanced analytics
                  if (window.AppConfig && typeof window.AppConfig.trackNavigation === 'function') {
          window.AppConfig.trackNavigation('navbar1_desktop', destination, linkText);
        }
        });
      });
    }, 100);
  },

  // Initialize mobile menu interactions
  initMobileMenu: function() {
    // Use a timeout to ensure DOM is fully loaded
    setTimeout(() => {
      const mobileMenuToggle = document.getElementById('mobileMenuToggle');
      const mobileNavOverlay = document.getElementById('mobileNavOverlay');
      const mobileNavMenu = document.getElementById('mobileNavMenu');
      const mobileNavClose = document.getElementById('mobileNavClose');

      if (!mobileMenuToggle || !mobileNavOverlay || !mobileNavMenu || !mobileNavClose) {
        console.warn('Mobile menu elements not found, retrying...');
        // Try again after a longer delay
        setTimeout(() => this.initMobileMenu(), 500);
        return;
      }

      // Debug: Log that mobile menu is initializing
      console.log('Mobile menu initialized successfully');

      // Open mobile menu
      const openMobileMenu = () => {
        console.log('Opening mobile menu');
        mobileMenuToggle.classList.add('active');
        mobileNavOverlay.classList.add('active');
        mobileNavMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      };

      // Close mobile menu
      const closeMobileMenu = () => {
        console.log('Closing mobile menu');
        mobileMenuToggle.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        mobileNavMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
      };

      // Event listeners
      mobileMenuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openMobileMenu();
      });
      
      mobileNavClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMobileMenu();
      });
      
      mobileNavOverlay.addEventListener('click', closeMobileMenu);

      // Close menu when clicking on navigation links
      const mobileNavLinks = mobileNavMenu.querySelectorAll('a[href]');
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
          // Track mobile navigation click
          const linkText = link.textContent?.trim() || 'unknown';
          const destination = link.getAttribute('href') || 'unknown';
          
                  if (window.AppConfig && typeof window.AppConfig.trackNavigation === 'function') {
          window.AppConfig.trackNavigation('navbar1_mobile', destination, linkText);
        }
          
          // Small delay to allow navigation to begin
          setTimeout(closeMobileMenu, 100);
        });
      });

      // Close menu on ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavMenu.classList.contains('active')) {
          closeMobileMenu();
        }
      });

      // Handle window resize - close mobile menu if window becomes large
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileNavMenu.classList.contains('active')) {
          closeMobileMenu();
        }
      });
    }, 100);
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
    } else if (currentPage.includes('Playground')) {
      activeTab = 'playground';
    } else if (currentPage.includes('vision')) {
      activeTab = 'vision';
    }
    
    // Only initialize if not already initialized and no conflicts
    if (!document.querySelector('.sketchpad-nav') && !window.BubblSpaceNavbarInitialized) {
      window.BubblSpaceNavbar.init(activeTab);
      window.BubblSpaceNavbarInitialized = true;
    }
  });
}
