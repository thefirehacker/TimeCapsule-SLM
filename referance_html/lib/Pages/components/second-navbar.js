// Second Navbar Component for TimeCapsule-SLM Internal Headers
// Usage: SecondNavbar.init('deepresearch') or SecondNavbar.init('playground')

window.SecondNavbar = {
  // CSS styles for the second navbar (internal header)
  styles: `
    .header {
      grid-column: 1 / -1;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      display: flex;
      align-items: center;
      padding: 20px 30px;
      color: white;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
      border: 1px solid rgba(255, 255, 255, 0.18);
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.05) 100%);
      pointer-events: none;
    }
    
    .header h1 {
      font-size: 32px;
      font-weight: 800;
      color: white;
      text-shadow: 0 4px 8px rgba(0,0,0,0.3);
      letter-spacing: -0.02em;
      margin: 0;
    }

    /* Capsule Glow Animation */
    @keyframes capsuleGlow {
      0% {
        transform: scale(1);
        opacity: 0.6;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.8;
      }
      100% {
        transform: scale(1);
        opacity: 0.6;
      }
    }
  `,

  // Get page configuration
  getPageConfig: function(pageType) {
    const configs = {
      deepresearch: {
        icon: '🔬',
        title: 'DeepResearch TimeCapsule',
        subtitle: 'AI-powered research and analysis platform',
        githubLink: 'https://github.com/thefirehacker/TimeCapsule-SLM'
      },
      canvas: {
        icon: '🎨',
        title: 'Canvas Playground',
        subtitle: 'Creative Coding Environment',
        githubLink: 'https://github.com/thefirehacker/TimeCapsule-SLM'
      },
      playground: {
        icon: '🎮',
        title: 'AI Playground',
        subtitle: 'AI Chat, Research & RAG Environment',
        githubLink: 'https://github.com/thefirehacker/TimeCapsule-SLM'
      }
    };
    
    return configs[pageType] || configs.playground;
  },

  // Render the header HTML
  render: function(pageType = 'playground') {
    const config = this.getPageConfig(pageType);
    
    return `
      <div class="header">
        <div style="display: flex; align-items: center; gap: 25px;">
          <!-- Page Title -->
          <div style="display: flex; align-items: center; gap: 30px;">
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 140px; height: 140px;">
              <!-- Capsule Glow Effect -->
              <div style="position: absolute; width: 120px; height: 120px; background: linear-gradient(135deg, rgba(79, 172, 254, 0.3), rgba(0, 242, 254, 0.2)); border-radius: 50%; filter: blur(20px); animation: capsuleGlow 3s ease-in-out infinite;"></div>
              <!-- Main Capsule Logo -->
              <img src="lib/Media/TimeCapsule_04.png" alt="TimeCapsule-SLM" style="width: 110px; height: 110px; object-fit: contain; filter: drop-shadow(0 8px 20px rgba(79, 172, 254, 0.6)) drop-shadow(0 4px 10px rgba(0, 242, 254, 0.4)) brightness(1.2) contrast(1.1); border-radius: 16px; position: relative; z-index: 2; transition: all 0.5s ease; cursor: pointer;" 
                    onmouseover="this.style.filter='drop-shadow(0 12px 30px rgba(79, 172, 254, 0.8)) drop-shadow(0 6px 15px rgba(0, 242, 254, 0.6)) brightness(1.3) contrast(1.2)'; this.style.transform='scale(1.1) rotate(5deg)'; this.parentElement.querySelector('div').style.animationDuration='1.5s';" 
                    onmouseout="this.style.filter='drop-shadow(0 8px 20px rgba(79, 172, 254, 0.6)) drop-shadow(0 4px 10px rgba(0, 242, 254, 0.4)) brightness(1.2) contrast(1.1)'; this.style.transform='scale(1) rotate(0deg)'; this.parentElement.querySelector('div').style.animationDuration='3s';">
            </div>
            <div style="display: flex; flex-direction: column;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 800; color: white; text-shadow: 0 4px 8px rgba(0,0,0,0.3); letter-spacing: -0.02em;">${config.icon} ${config.title}</h1>
              <div style="font-size: 16px; color: rgba(255,255,255,0.9); margin-top: 4px; font-weight: 500; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">${config.subtitle}</div>
            </div>
          </div>
        </div>
        <div style="margin-left: auto; display: flex; align-items: center; gap: 20px;">
          <!-- FireHacker Attribution -->
          <a href="https://x.com/thefirehacker" target="_blank" class="firehacker-link" style="
            color: rgba(255,255,255,0.9); 
            text-decoration: none; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            gap: 4px; 
            padding: 8px 10px;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 10px;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            min-width: 60px;
          " 
          onmouseover="
            this.style.transform='translateY(-2px) scale(1.05)'; 
            this.style.background='rgba(255,255,255,0.15)';
            this.style.borderColor='rgba(255,255,255,0.3)';
            this.style.boxShadow='0 8px 30px rgba(0,0,0,0.25)';
            this.style.color='white';
            this.querySelector('.wizard-shimmer').style.left='100%';
          " 
          onmouseout="
            this.style.transform='translateY(0) scale(1)'; 
            this.style.background='rgba(255,255,255,0.08)';
            this.style.borderColor='rgba(255,255,255,0.15)';
            this.style.boxShadow='0 4px 20px rgba(0,0,0,0.15)';
            this.style.color='rgba(255,255,255,0.9)';
            this.querySelector('.wizard-shimmer').style.left='-100%';
          ">
            <img src="lib/Media/Firehacker_Wizard01.jpg" alt="FireHacker" style="
              width: 32px; 
              height: 32px; 
              border-radius: 50%; 
              object-fit: cover;
              filter: drop-shadow(0 3px 8px rgba(0,0,0,0.4));
              transition: all 0.3s ease;
            ">
            <span style="
              font-size: 9px; 
              font-weight: 700; 
              letter-spacing: 0.5px;
              text-transform: uppercase;
              background: linear-gradient(45deg, #ff6b35, #f7931e);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            ">FireHacker</span>
            <div style="
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,165,0,0.2), transparent);
              transition: left 0.6s ease;
              pointer-events: none;
            " class="wizard-shimmer"></div>
          </a>
          
          <a href="${config.githubLink}" target="_blank" class="github-link" style="
            color: rgba(255,255,255,0.9); 
            text-decoration: none; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            gap: 4px; 
            padding: 10px 12px;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 10px;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            min-width: 70px;
          " 
          onmouseover="
            this.style.transform='translateY(-2px) scale(1.05)'; 
            this.style.background='rgba(255,255,255,0.15)';
            this.style.borderColor='rgba(255,255,255,0.3)';
            this.style.boxShadow='0 8px 30px rgba(0,0,0,0.25)';
            this.style.color='white';
            this.querySelector('.shimmer').style.left='100%';
          " 
          onmouseout="
            this.style.transform='translateY(0) scale(1)'; 
            this.style.background='rgba(255,255,255,0.08)';
            this.style.borderColor='rgba(255,255,255,0.15)';
            this.style.boxShadow='0 4px 20px rgba(0,0,0,0.15)';
            this.style.color='rgba(255,255,255,0.9)';
            this.querySelector('.shimmer').style.left='-100%';
          ">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="
              filter: drop-shadow(0 3px 8px rgba(0,0,0,0.4));
              transition: all 0.3s ease;
            ">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span style="
              font-size: 10px; 
              font-weight: 700; 
              letter-spacing: 0.5px;
              text-transform: uppercase;
              background: linear-gradient(45deg, #fff, #f0f8ff);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            ">GitHub</span>
            <div style="
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
              transition: left 0.6s ease;
              pointer-events: none;
            " class="shimmer"></div>
          </a>
          <div style="
            color: rgba(255,255,255,0.85); 
            font-size: 16px; 
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          ">
            <span style="font-size: 20px;">🤖</span>
            <span id="headerAIStatus">AI Integration</span>
          </div>
        </div>
      </div>
    `;
  },

  // Initialize header link tracking
  initHeaderTracking: function() {
    setTimeout(() => {
      // Track FireHacker link clicks
      const fireHackerLink = document.querySelector('.header .firehacker-link');
      if (fireHackerLink) {
        fireHackerLink.addEventListener('click', (e) => {
                  if (window.AppConfig && typeof window.AppConfig.trackNavigation === 'function') {
          window.AppConfig.trackNavigation('navbar2', 'https://x.com/thefirehacker', 'FireHacker Profile');
        }
        });
      }

      // Track GitHub link clicks
      const githubLink = document.querySelector('.header .github-link');
      if (githubLink) {
        githubLink.addEventListener('click', (e) => {
          const destination = githubLink.getAttribute('href') || 'unknown';
                  if (window.AppConfig && typeof window.AppConfig.trackNavigation === 'function') {
          window.AppConfig.trackNavigation('navbar2', destination, 'GitHub Repository');
        }
        });
      }

      // Track TimeCapsule logo clicks
      const capsuleLogo = document.querySelector('.header img[src*="TimeCapsule"]');
      if (capsuleLogo) {
        capsuleLogo.addEventListener('click', (e) => {
                  if (window.AppConfig && typeof window.AppConfig.trackNavigation === 'function') {
          window.AppConfig.trackNavigation('navbar2', window.location.href, 'TimeCapsule Logo');
        }
        });
      }
    }, 100);
  },

  // Initialize the second navbar
  init: function(pageType = 'playground', forceReload = false) {
    // Wait for BubblSpace navbar to initialize first
    if (!window.BubblSpaceNavbarInitialized) {
      setTimeout(() => this.init(pageType, forceReload), 100);
      return;
    }

    // Add styles to head if not already added
    if (!document.querySelector('#second-navbar-styles')) {
      const style = document.createElement('style');
      style.id = 'second-navbar-styles';
      style.textContent = this.styles;
      document.head.appendChild(style);
    }

    // Find the container
    const container = document.querySelector('.container');
    if (!container) return;

    // Check if header already exists
    const existingHeader = container.querySelector('.header');
    
    if (existingHeader && forceReload) {
      // Remove existing header if force reload is requested
      existingHeader.remove();
    }
    
    // Add header if it doesn't exist or was removed
    if (!container.querySelector('.header')) {
      container.insertAdjacentHTML('afterbegin', this.render(pageType));
      
      // Initialize click tracking for header links
      this.initHeaderTracking();
    }
  }
};

// Auto-initialize if script is loaded directly
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    // Delay initialization to allow BubblSpace navbar to load first
    setTimeout(() => {
      // Auto-detect page type based on current page
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      
      // Skip auto-initialization for Canvas.html as it has explicit initialization
      if (currentPage.includes('Canvas')) {
        return; // Canvas.html will initialize explicitly
      }
      
      let pageType = 'playground';
      
      if (currentPage.includes('DeepResearch')) {
        pageType = 'deepresearch';
      } else if (currentPage.includes('Playground')) {
        pageType = 'playground';
      }
      
      // Only initialize if container exists and header not already present
      const container = document.querySelector('.container');
      if (container && !container.querySelector('.header')) {
        window.SecondNavbar.init(pageType);
      }
    }, 200);
  });
}
