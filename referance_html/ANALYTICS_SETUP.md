# Google Analytics 4 Setup for SketchPad-SLM

## Setup Instructions

### 1. Configure Your GA4 Measurement ID

#### Option A: Using .env file (Recommended)
1. Copy `.env.example` to `.env`
2. Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID
3. Update the site URL to match your domain

#### Option B: Direct configuration in config.js
1. Open `config.js`
2. Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID
3. Update `SITE_URL` with your actual domain

### 2. Find Your GA4 Measurement ID

1. Go to Google Analytics 4 dashboard
2. Navigate to **Admin** → **Data Streams**
3. Click on your web stream
4. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

### 3. Tracked Events

The system automatically tracks:

#### User Interactions
- `code_executed` - When user runs p5.js code
- `design_loaded` - When user loads a preset design
- `ai_panel_toggled` - When AI panel is opened/closed
- `ai_panel_minimized` - When AI panel is minimized
- `ai_panel_closed` - When AI panel is closed

#### AI Interactions  
- `ai_init_clicked` - When user clicks to initialize AI
- `chat_mode_toggled` - When switching between Creative/General mode
- `ai_code_generated` - When AI generates code
- `ai_model_loaded` - When Qwen2.5 loads successfully
- `ai_template_fallback` - When system falls back to templates

### 4. Custom Event Tracking

You can track custom events using:

```javascript
// Track a custom event
window.AppConfig.trackEvent('custom_action', 'category', 'label', value);

// Track page views
window.AppConfig.trackPageView('Page Title', 'https://example.com/page');
```

### 5. Privacy & Security

- The `.env` file is automatically ignored by git
- IP addresses are anonymized by default
- Debug mode is disabled in production
- Only essential interaction data is tracked

### 6. Verification

After setup, check:
1. Browser console shows: "✅ Google Analytics 4 initialized with ID: G-XXXXXXXXXX"
2. Real-time reports in GA4 dashboard show page views
3. Events appear in GA4 Events section

## Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `GA4_MEASUREMENT_ID` | Your GA4 tracking ID | `G-XXXXXXXXXX` |
| `SITE_NAME` | Site name for tracking | `SketchPad-SLM` |
| `SITE_URL` | Your site URL | `https://your-domain.com` |
| `GA4_DEBUG_MODE` | Enable debug logging | `false` |
| `GA4_ANONYMIZE_IP` | Anonymize IP addresses | `true` | 