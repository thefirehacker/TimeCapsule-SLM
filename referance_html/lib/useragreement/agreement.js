/**
 * SketchPad-SLM User Agreement Module
 * Provides consistent user agreement functionality across all pages
 * 
 * Features:
 * - Cross-page status persistence via localStorage
 * - Consistent styling and UX
 * - Modal management
 * - Status display updates
 */

class UserAgreementManager {
    constructor() {
        this.userAgreementAccepted = false;
        this.agreementTimestamp = null;
        this.agreementModalOpen = false;
        
        // Initialize styles and status
        this.injectStyles();
        this.initializeAgreementStatus();
    }

    // Inject CSS styles for consistent appearance
    injectStyles() {
        const styles = `
            /* User Agreement Modal Styles */
            .user-agreement-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(15px);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .user-agreement-modal.show {
                opacity: 1;
            }
            
            .user-agreement-content {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 15px;
                padding: 30px;
                width: 90%;
                max-width: 700px;
                max-height: 85vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.2);
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .user-agreement-modal.show .user-agreement-content {
                transform: scale(1);
            }
            
            .agreement-header {
                text-align: center;
                margin-bottom: 25px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                padding-bottom: 15px;
            }
            
            .agreement-header h2 {
                margin: 0;
                font-size: 24px;
                color: #fff;
            }
            
            .agreement-header p {
                margin: 10px 0 0 0;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.8);
            }
            
            .agreement-section {
                margin-bottom: 20px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 15px;
                border-left: 4px solid #fa709a;
            }
            
            .agreement-section h3 {
                margin: 0 0 10px 0;
                font-size: 16px;
                color: #fee140;
            }
            
            .agreement-section p, .agreement-section ul {
                margin: 8px 0;
                font-size: 14px;
                line-height: 1.6;
                color: rgba(255, 255, 255, 0.9);
            }
            
            .agreement-section ul {
                padding-left: 20px;
            }
            
            .agreement-section li {
                margin: 5px 0;
            }
            
            .warning-box {
                background: rgba(255, 69, 0, 0.2);
                border: 2px solid rgba(255, 69, 0, 0.5);
                border-radius: 8px;
                padding: 15px;
                margin: 15px 0;
            }
            
            .warning-box h4 {
                margin: 0 0 8px 0;
                color: #ff6b35;
                font-size: 16px;
            }
            
            .warning-box p {
                margin: 0;
                font-size: 14px;
                line-height: 1.6;
                color: rgba(255, 255, 255, 0.9);
            }
            
            .agreement-actions {
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin-top: 25px;
                padding-top: 15px;
                border-top: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .agreement-checkbox {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.9);
            }
            
            .agreement-checkbox input[type="checkbox"] {
                width: 18px;
                height: 18px;
                margin: 0;
            }
            
            .agreement-checkbox label {
                cursor: pointer;
            }
            
            .agreement-buttons {
                display: flex;
                gap: 15px;
                justify-content: center;
            }
            
            .context-btn {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                min-width: 120px;
            }
            
            .context-btn.primary {
                background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
                color: white;
                box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
            }
            
            .context-btn.primary:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(79, 172, 254, 0.6);
            }
            
            .context-btn.secondary {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            .context-btn.secondary:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            .context-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none !important;
            }
        `;
        
        // Inject styles into head
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Initialize agreement status from localStorage
    initializeAgreementStatus() {
        const savedStatus = localStorage.getItem('sketchpad_agreement_status');
        const savedTimestamp = localStorage.getItem('sketchpad_agreement_timestamp');
        
        if (savedStatus === 'accepted' && savedTimestamp) {
            this.userAgreementAccepted = true;
            this.agreementTimestamp = new Date(savedTimestamp);
            this.updateAgreementStatusDisplay();
        }
    }

    // Save agreement status to localStorage
    saveAgreementStatus() {
        if (this.userAgreementAccepted && this.agreementTimestamp) {
            localStorage.setItem('sketchpad_agreement_status', 'accepted');
            localStorage.setItem('sketchpad_agreement_timestamp', this.agreementTimestamp.toISOString());
        } else {
            localStorage.removeItem('sketchpad_agreement_status');
            localStorage.removeItem('sketchpad_agreement_timestamp');
        }
    }

    // Update Agreement Status Display
    updateAgreementStatusDisplay() {
        const statusDiv = document.getElementById('agreementStatus');
        const statusBtn = document.getElementById('agreementStatusBtn');
        
        if (!statusDiv || !statusBtn) return;
        
        if (this.userAgreementAccepted && this.agreementTimestamp) {
            const dateStr = this.agreementTimestamp.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            const timeStr = this.agreementTimestamp.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            
            statusDiv.innerHTML = `Status: ✅ Agreed<br/><span style="font-size: 10px; color: rgba(255,255,255,0.6);">${dateStr} at ${timeStr}</span>`;
            statusBtn.style.background = 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)';
            statusBtn.style.color = 'white';
        } else {
            statusDiv.textContent = 'Status: Not Reviewed';
            statusBtn.style.background = 'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)';
            statusBtn.style.color = '#333';
        }
    }

    // Show User Agreement Modal
    showUserAgreement() {
        if (this.agreementModalOpen) {
            console.log('⚠️ Agreement modal already open - skipping duplicate');
            return;
        }

        this.agreementModalOpen = true;

        const modal = document.createElement('div');
        modal.className = 'user-agreement-modal';
        modal.id = 'userAgreementModal';

        modal.innerHTML = `
        <div class="user-agreement-content">
            <div class="agreement-header">
                <h2>📋 Usage Agreement & Terms</h2>
                <p>Please review these important terms before using AI features</p>
            </div>
            
            <div class="agreement-section">
                <h3>🤖 AI Technology Usage</h3>
                <p>TimeCapsule-SLM integrates artificial intelligence for <strong>workflow automation and creative assistance</strong>. AI features include:</p>
                <ul>
                    <li>Ollama Support for local AI processing</li>
                    <li>Local Qwen2.5 language model with optimized inference for offline code generation</li>
                    <li>DeepResearch & Execution using Playground</li>
                    <li>OpenAI API integration for advanced AI capabilities</li>
                    <li>Automated p5.js code generation and creative coding assistance</li>
                    <li>Context-aware chat and programming help</li>
                </ul>
            </div>

            <div class="warning-box">
                <h4>⚠️ IMPORTANT AI ACCURACY DISCLAIMER</h4>
                <p><strong>AI is NOT a fully accurate tool.</strong> Generated code, responses, and suggestions may contain errors, bugs, or inaccuracies. All AI output should be thoroughly reviewed, tested, and validated by the end user before implementation or reliance.</p>
            </div>

            <div class="agreement-section">
                <h3>👤 User Responsibilities</h3>
                <p>By using AI features, you acknowledge and agree to:</p>
                <ul>
                    <li><strong>Review all AI-generated content</strong> for accuracy and appropriateness</li>
                    <li><strong>Test generated code</strong> before using in production environments</li>
                    <li><strong>Verify AI responses</strong> against authoritative sources when needed</li>
                    <li><strong>Use AI as an assistant tool</strong>, not as a replacement for human judgment</li>
                    <li><strong>Comply with OpenAI's usage policies</strong> when using API features</li>
                </ul>
            </div>

            <div class="agreement-section">
                <h3>⚖️ Liability Limitation</h3>
                <p><strong>AIEDX Private Limited or any of its employees</strong> provides AI features "as-is" and makes no warranties regarding:</p>
                <ul>
                    <li>Accuracy, completeness, or reliability of AI-generated content</li>
                    <li>Suitability for any particular purpose or use case</li>
                    <li>Absence of errors, bugs, or security vulnerabilities in generated code</li>
                </ul>
            </div>

            <div class="agreement-section">
                <h3>🔒 Privacy & Data Processing</h3>
                <p>Your privacy matters to us:</p>
                <ul>
                    <li>AI prompts and responses are processed temporarily for functionality</li>
                    <li>No permanent storage of personal conversations or generated content</li>
                    <li>API keys (if used) are session-only and not permanently stored</li>
                    <li>Local AI processing keeps data on your device when possible</li>
                    <li>Basic usage analytics may be collected for service improvement</li>
                </ul>
            </div>

            <div class="agreement-actions">
                <div class="agreement-checkbox">
                    <input type="checkbox" id="agreementCheckbox">
                    <label for="agreementCheckbox">I have read, understood, and agree to these terms</label>
                </div>
                <div class="agreement-buttons">
                    <button class="context-btn secondary" id="declineAgreementBtn">Decline</button>
                    <button class="context-btn primary" id="acceptAgreementBtn" disabled>Accept & Continue</button>
                </div>
            </div>
        </div>
        `;

        document.body.appendChild(modal);

        // Add smooth show animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // Enable accept button when checkbox is checked
        const checkbox = document.getElementById('agreementCheckbox');
        const acceptBtn = document.getElementById('acceptAgreementBtn');
        
        checkbox.addEventListener('change', (e) => {
            acceptBtn.disabled = !e.target.checked;
        });

        // Button event listeners
        document.getElementById('acceptAgreementBtn').addEventListener('click', () => {
            this.acceptAgreement();
        });

        document.getElementById('declineAgreementBtn').addEventListener('click', () => {
            this.declineAgreement();
        });

        // Prevent closing by clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                console.log('⚠️ Agreement must be accepted or declined - cannot close by clicking outside');
            }
        });
    }

    // Accept User Agreement
    acceptAgreement() {
        this.userAgreementAccepted = true;
        this.agreementTimestamp = new Date();
        
        // Save to localStorage for cross-page persistence
        this.saveAgreementStatus();
        
        this.agreementModalOpen = false;
        
        const modal = document.getElementById('userAgreementModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
        
        // Update agreement status display
        this.updateAgreementStatusDisplay();
        
        console.log('✅ Agreement accepted');
        
        // Fire custom event for other systems to listen to
        window.dispatchEvent(new CustomEvent('agreementAccepted', {
            detail: { timestamp: this.agreementTimestamp }
        }));
    }

    // Decline User Agreement
    declineAgreement() {
        this.agreementModalOpen = false;
        
        const modal = document.getElementById('userAgreementModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
        
        console.log('❌ Agreement declined');
        
        // Fire custom event for other systems to listen to
        window.dispatchEvent(new CustomEvent('agreementDeclined'));
    }

    // Show Agreement from Status Button
    showAgreementFromStatus() {
        console.log('📋 Showing agreement for review');
        this.showUserAgreement();
    }

    // Initialize for a page (call this in DOMContentLoaded)
    initializeForPage() {
        // Initialize agreement status
        this.initializeAgreementStatus();
        
        // Add event listener for agreement status button if it exists
        const statusBtn = document.getElementById('agreementStatusBtn');
        if (statusBtn) {
            statusBtn.addEventListener('click', () => {
                this.showAgreementFromStatus();
            });
        }
    }

    // Check if agreement is accepted (for other systems to use)
    isAgreementAccepted() {
        return this.userAgreementAccepted;
    }

    // Get agreement timestamp
    getAgreementTimestamp() {
        return this.agreementTimestamp;
    }
}

// Create global instance
window.UserAgreementManager = UserAgreementManager;

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
    window.userAgreement = new UserAgreementManager();
}
