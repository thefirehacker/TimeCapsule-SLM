/**
 * Quill Editor Module for DeepResearch
 * Handles rich text editing with markdown conversion
 */

class QuillEditorManager {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.quillInstance = null;
    this.currentTab = "research";
    this.content = {
      research: "",
      sources: "",
      notes: "",
    };

    this.options = {
      theme: "snow",
      placeholder: "Start typing your research content...",
      readOnly: false, // Always editable
      ...options,
    };

    // Verify container exists before proceeding
    if (!this.container) {
      console.error(
        `❌ QuillEditorManager: Container with ID "${containerId}" not found`
      );
      throw new Error(`Container element with ID "${containerId}" not found`);
    }

    console.log(
      `✅ QuillEditorManager: Container "${containerId}" found, proceeding with initialization`
    );
    this.init();
  }

  init() {
    console.log("🖋️ Initializing Quill Editor Manager...");

    // Create editor container structure
    this.createEditorStructure();

    // Initialize Quill editor
    this.initializeQuill();

    // Setup event listeners
    this.setupEventListeners();

    console.log("✅ Quill Editor Manager initialized successfully");
  }

  createEditorStructure() {
    if (!this.container) {
      console.error("❌ Editor container not found:", this.containerId);
      return;
    }

    this.container.innerHTML = `
      <div class="quill-editor-header">
        <div class="editor-tabs">
          <button class="editor-tab-btn active" data-tab="research">📊 Research</button>
          <button class="editor-tab-btn" data-tab="sources">📚 Sources</button>
          <button class="editor-tab-btn" data-tab="notes">📝 Notes</button>
        </div>
        <div class="editor-controls">
          <button class="editor-control-btn" id="exportEditor" title="Export Content">📥</button>
          <button class="editor-control-btn" id="clearEditor" title="Clear Content">🗑️</button>
          <button class="editor-control-btn" id="fullscreenEditor" title="Fullscreen">⛶</button>
        </div>
      </div>
      <div class="quill-editor-container">
        <div id="quill-editor-${this.containerId}"></div>
      </div>
      <div class="editor-status-bar">
        <span id="editorWordCount">0 words</span>
        <span id="editorMode">Edit Mode</span>
        <span id="editorStatus">Ready</span>
      </div>
    `;
  }

  initializeQuill() {
    const editorId = `quill-editor-${this.containerId}`;
    const editorElement = document.getElementById(editorId);

    if (!editorElement) {
      console.error("❌ Quill editor element not found:", editorId);
      return;
    }

    // Comprehensive toolbar configuration
    const toolbarOptions = [
      // Text formatting
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],

      // Text style
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],

      // Paragraph formatting
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],

      // Media and links
      ["link", "image", "video"],

      // Advanced
      ["clean"],
    ];

    this.quillInstance = new Quill(editorElement, {
      theme: this.options.theme,
      placeholder: this.options.placeholder,
      readOnly: false, // Always editable
      modules: {
        toolbar: toolbarOptions,
        history: {
          delay: 2000,
          maxStack: 500,
          userOnly: true,
        },
        clipboard: {
          matchVisual: false,
        },
      },
    });

    console.log("✅ Quill editor initialized in edit mode");

    // Setup Quill event listeners
    this.setupQuillEvents();

    // Load initial content
    this.loadContentForTab(this.currentTab);
  }

  setupQuillEvents() {
    if (!this.quillInstance) return;

    // Track content changes
    this.quillInstance.on("text-change", () => {
      this.updateWordCount();
      this.updateEditorStatus("Modified");

      // Save content for current tab
      const currentContent = this.quillInstance.root.innerHTML;
      this.content[this.currentTab] = currentContent;
    });

    // Track selection changes
    this.quillInstance.on("selection-change", (range, oldRange, source) => {
      if (range) {
        this.updateEditorStatus("Editing");
      } else {
        this.updateEditorStatus("Ready");
      }
    });
  }

  setupEventListeners() {
    // Tab switching
    this.container.addEventListener("click", (e) => {
      if (e.target.classList.contains("editor-tab-btn")) {
        const tab = e.target.dataset.tab;
        this.switchTab(tab);
      }
    });

    // Control buttons (removed edit toggle)
    document.getElementById("exportEditor")?.addEventListener("click", () => {
      this.exportContent();
    });

    document.getElementById("clearEditor")?.addEventListener("click", () => {
      this.clearContent();
    });

    document
      .getElementById("fullscreenEditor")
      ?.addEventListener("click", () => {
        this.toggleFullscreen();
      });
  }

  switchTab(tab) {
    console.log(`🔄 Switching from ${this.currentTab} to ${tab} tab`);

    // Save current content
    if (this.quillInstance) {
      this.content[this.currentTab] = this.quillInstance.root.innerHTML;
      console.log(
        `💾 Saved content for ${this.currentTab} tab:`,
        this.content[this.currentTab].substring(0, 100) + "..."
      );
    }

    // Update active tab
    this.container.querySelectorAll(".editor-tab-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tab);
    });

    this.currentTab = tab;

    // Load content for new tab
    this.loadContentForTab(tab);

    console.log(`📋 Successfully switched to ${tab} tab`);
  }

  loadContentForTab(tab) {
    if (!this.quillInstance) {
      console.warn("⚠️ Quill instance not available for loadContentForTab");
      return;
    }

    const content = this.content[tab];
    console.log(
      `📖 Loading content for ${tab} tab:`,
      content ? content.substring(0, 100) + "..." : "Empty"
    );

    if (content && content.trim()) {
      // Set content using Quill's API
      this.quillInstance.root.innerHTML = content;
      console.log(`✅ Content loaded for ${tab} tab`);
    } else {
      // Set empty content with placeholder
      this.quillInstance.setText("");
      console.log(`📝 Set empty content for ${tab} tab`);
    }

    this.updateWordCount();
    this.updateEditorStatus("Ready");
  }

  setContent(content, tab = null) {
    const targetTab = tab || this.currentTab;
    console.log("🔄 setContent called for", targetTab, "tab");
    console.log("📝 Content type:", typeof content);
    console.log("📝 Content length:", content ? content.length : 0);
    console.log(
      "📝 Content preview:",
      content ? content.substring(0, 200) + "..." : "No content"
    );

    // Store content for the target tab
    this.content[targetTab] = content;

    if (!content || content.trim() === "") {
      console.log("⚠️ Empty content provided for", targetTab);
      if (targetTab === this.currentTab && this.quillInstance) {
        this.quillInstance.setContents([]);
        this.renderEmptyState();
      }
      return;
    }

    try {
      // Clean AI-generated content by removing thinking tags and artifacts
      let cleanedContent = this.cleanAIContent(content);
      console.log(
        "🧹 Cleaned content preview:",
        cleanedContent.substring(0, 200) + "..."
      );

      // Check if content is markdown and convert to HTML
      let htmlContent;
      const isMarkdownContent = this.isMarkdown(cleanedContent);
      console.log("🔍 Content detected as markdown:", isMarkdownContent);

      if (isMarkdownContent) {
        console.log("🔄 Converting markdown to HTML for display");
        htmlContent = this.convertMarkdownToHtml(cleanedContent);
        console.log(
          "🔄 Converted HTML preview:",
          htmlContent.substring(0, 300) + "..."
        );
      } else {
        console.log(
          "📝 Content not detected as markdown, processing as plain text"
        );
        // Convert line breaks to proper HTML
        htmlContent = cleanedContent
          .replace(/\n\n+/g, "</p><p>")
          .replace(/\n/g, "<br>");

        // Wrap in paragraphs if not already wrapped
        if (!htmlContent.startsWith("<p>") && htmlContent.trim()) {
          htmlContent = "<p>" + htmlContent + "</p>";
        }
      }

      // Only set content in editor if this is the current tab
      if (targetTab === this.currentTab && this.quillInstance) {
        console.log("📋 Setting content in active editor for", targetTab);
        console.log(
          "🔧 Final HTML content:",
          htmlContent.substring(0, 500) + "..."
        );

        this.insertContentIntoEditor(htmlContent);

        // Update UI elements
        this.updateWordCount();
        this.updateEditorStatus("Content Loaded");

        console.log(
          "✅ Content successfully loaded and displayed for",
          targetTab,
          "tab"
        );
      } else {
        console.log(
          "💾 Content stored for",
          targetTab,
          "tab (not currently active)"
        );
      }
    } catch (error) {
      console.error("❌ Error setting content for", targetTab, ":", error);
      this.handleContentError(content, targetTab);
    }
  }

  // Enhanced method to safely insert content into the editor
  insertContentIntoEditor(htmlContent) {
    try {
      // Clear existing content first
      this.quillInstance.setContents([]);

      // Sanitize and validate HTML content
      const sanitizedHtml = this.sanitizeHtml(htmlContent);
      console.log(
        "🧽 Sanitized HTML preview:",
        sanitizedHtml.substring(0, 300) + "..."
      );

      // Use clipboard API for rich HTML content
      if (sanitizedHtml.includes("<")) {
        console.log("📋 Inserting HTML content using clipboard API");
        this.quillInstance.clipboard.dangerouslyPasteHTML(0, sanitizedHtml);

        // Post-insertion cleanup - remove any white text styles
        setTimeout(() => {
          this.cleanupWhiteTextStyles();
        }, 100);
      } else {
        console.log("📝 Inserting plain text content");
        this.quillInstance.setText(sanitizedHtml);
      }

      // Force update and focus the editor
      this.quillInstance.update();

      // Add a small delay before focusing to ensure content is rendered
      setTimeout(() => {
        this.quillInstance.focus();
      }, 100);
    } catch (error) {
      console.error("❌ Error inserting content into editor:", error);
      // Fallback to plain text
      this.quillInstance.setText(htmlContent.replace(/<[^>]*>/g, ""));
    }
  }

  // Method to clean up any white text styles that might have been inserted
  cleanupWhiteTextStyles() {
    if (!this.quillInstance || !this.quillInstance.root) return;

    console.log("🧹 Cleaning up white text styles...");

    const editor = this.quillInstance.root;

    // Find all elements with white text
    const whiteTextElements = editor.querySelectorAll(
      [
        '[style*="color: white"]',
        '[style*="color: #fff"]',
        '[style*="color: #ffffff"]',
        '[style*="color:white"]',
        '[style*="color:#fff"]',
        '[style*="color:#ffffff"]',
      ].join(",")
    );

    console.log(
      `🔍 Found ${whiteTextElements.length} elements with white text`
    );

    whiteTextElements.forEach((element, index) => {
      const originalStyle = element.getAttribute("style");
      console.log(
        `  Element ${index + 1}: ${
          element.tagName
        } with style: ${originalStyle}`
      );

      // Remove white color and set to dark
      let newStyle = originalStyle
        .replace(/color\s*:\s*white\s*;?/gi, "color: #2c3e50;")
        .replace(/color\s*:\s*#fff\s*;?/gi, "color: #2c3e50;")
        .replace(/color\s*:\s*#ffffff\s*;?/gi, "color: #2c3e50;");

      element.setAttribute("style", newStyle);
      console.log(`    Updated style: ${newStyle}`);
    });

    // Also force all text to be dark by adding a class
    editor.style.color = "#2c3e50";

    console.log("✅ White text cleanup completed");
  }

  // Enhanced markdown conversion with better error handling
  convertMarkdownToHtml(markdown) {
    try {
      if (typeof marked !== "undefined") {
        console.log("✅ Using marked.js for markdown conversion");

        // Configure marked for better HTML output
        marked.setOptions({
          breaks: true, // Convert line breaks to <br>
          gfm: true, // GitHub Flavored Markdown
          headerIds: false, // Don't add IDs to headers
          sanitize: false, // Don't sanitize HTML (we'll do it ourselves)
          smartypants: true, // Use smart quotes
          xhtml: false, // Don't use XHTML
        });

        // Configure enhanced renderer for better output
        const renderer = new marked.Renderer();

        // Custom heading renderer with better styling
        renderer.heading = function (text, level) {
          const sizes = {
            1: "2.2em",
            2: "1.8em",
            3: "1.5em",
            4: "1.3em",
            5: "1.1em",
            6: "1em",
          };
          const margins = {
            1: "1.5em 0 1em 0",
            2: "1.3em 0 0.8em 0",
            3: "1.1em 0 0.6em 0",
            4: "1em 0 0.5em 0",
            5: "0.9em 0 0.4em 0",
            6: "0.8em 0 0.3em 0",
          };
          return `<h${level} style="font-size: ${
            sizes[level]
          }; font-weight: bold; margin: ${
            margins[level]
          }; color: #2c3e50; line-height: 1.3; border-bottom: ${
            level <= 2 ? "2px solid #e1e8ed" : "none"
          }; padding-bottom: ${
            level <= 2 ? "0.3em" : "0"
          };">${text}</h${level}>`;
        };

        // Enhanced paragraph renderer
        renderer.paragraph = function (text) {
          return `<p style="margin: 0.8em 0; line-height: 1.7; color: #333; font-size: 1em;">${text}</p>`;
        };

        // Enhanced list renderers
        renderer.list = function (body, ordered) {
          const tag = ordered ? "ol" : "ul";
          const listStyle = ordered ? "decimal" : "disc";
          return `<${tag} style="margin: 1em 0; padding-left: 1.5em; list-style-type: ${listStyle};">${body}</${tag}>`;
        };

        renderer.listitem = function (text) {
          return `<li style="margin: 0.4em 0; line-height: 1.6; color: #333;">${text}</li>`;
        };

        // Enhanced blockquote renderer
        renderer.blockquote = function (quote) {
          return `<blockquote style="margin: 1.2em 0; padding: 0.8em 1.2em; border-left: 4px solid #3498db; background: #f8f9fa; font-style: italic; color: #555;">${quote}</blockquote>`;
        };

        // Enhanced code block renderer
        renderer.code = function (code, language) {
          const lang = language ? ` class="language-${language}"` : "";
          return `<pre style="background: #f4f4f4; border: 1px solid #ddd; border-radius: 4px; padding: 1em; margin: 1em 0; overflow-x: auto; font-family: 'Consolas', 'Monaco', 'Courier New', monospace; font-size: 0.9em; line-height: 1.4;"><code${lang}>${code}</code></pre>`;
        };

        // Enhanced inline code renderer
        renderer.codespan = function (code) {
          return `<code style="background: #f1f2f6; padding: 0.2em 0.4em; border-radius: 3px; font-family: 'Consolas', 'Monaco', 'Courier New', monospace; font-size: 0.9em; color: #e74c3c;">${code}</code>`;
        };

        // Enhanced strong and emphasis
        renderer.strong = function (text) {
          return `<strong style="font-weight: bold; color: #2c3e50;">${text}</strong>`;
        };

        renderer.em = function (text) {
          return `<em style="font-style: italic; color: #7f8c8d;">${text}</em>`;
        };

        // Enhanced link renderer
        renderer.link = function (href, title, text) {
          const titleAttr = title ? ` title="${title}"` : "";
          return `<a href="${href}"${titleAttr} style="color: #3498db; text-decoration: none; border-bottom: 1px dotted #3498db;" target="_blank" rel="noopener noreferrer">${text}</a>`;
        };

        // Enhanced table renderer
        renderer.table = function (header, body) {
          return `<table style="border-collapse: collapse; width: 100%; margin: 1em 0; border: 1px solid #ddd;"><thead>${header}</thead><tbody>${body}</tbody></table>`;
        };

        renderer.tablerow = function (content) {
          return `<tr style="border-bottom: 1px solid #eee;">${content}</tr>`;
        };

        renderer.tablecell = function (content, flags) {
          const type = flags.header ? "th" : "td";
          const style = flags.header
            ? "padding: 0.75em; text-align: left; font-weight: bold; background: #f8f9fa; border: 1px solid #ddd;"
            : "padding: 0.75em; text-align: left; border: 1px solid #ddd;";
          return `<${type} style="${style}">${content}</${type}>`;
        };

        // Enhanced horizontal rule
        renderer.hr = function () {
          return `<hr style="border: none; border-top: 2px solid #ecf0f1; margin: 2em 0;">`;
        };

        marked.setOptions({ renderer });

        // Convert markdown to HTML
        const html = marked(markdown);
        console.log("✅ Markdown converted to styled HTML");
        console.log("🎨 HTML preview:", html.substring(0, 500) + "...");

        return html;
      } else {
        console.warn("⚠️ marked.js not available, using fallback conversion");
        return this.fallbackMarkdownToHtml(markdown);
      }
    } catch (error) {
      console.error("❌ Error converting markdown with marked.js:", error);
      return this.fallbackMarkdownToHtml(markdown);
    }
  }

  // Enhanced fallback markdown conversion
  fallbackMarkdownToHtml(markdown) {
    console.log("🔄 Using enhanced fallback markdown conversion");

    let html = markdown
      // Enhanced headings with proper styling
      .replace(
        /^### (.*$)/gim,
        '<h3 style="font-size: 1.5em; font-weight: bold; margin: 1.1em 0 0.6em 0; color: #2c3e50; line-height: 1.3;">$1</h3>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 style="font-size: 1.8em; font-weight: bold; margin: 1.3em 0 0.8em 0; color: #2c3e50; line-height: 1.3; border-bottom: 2px solid #e1e8ed; padding-bottom: 0.3em;">$1</h2>'
      )
      .replace(
        /^# (.*$)/gim,
        '<h1 style="font-size: 2.2em; font-weight: bold; margin: 1.5em 0 1em 0; color: #2c3e50; line-height: 1.3; border-bottom: 2px solid #e1e8ed; padding-bottom: 0.3em;">$1</h1>'
      )

      // Enhanced code blocks with syntax highlighting look
      .replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        "<pre style=\"background: #f4f4f4; border: 1px solid #ddd; border-radius: 4px; padding: 1em; margin: 1em 0; overflow-x: auto; font-family: 'Consolas', 'Monaco', 'Courier New', monospace; font-size: 0.9em; line-height: 1.4;\"><code>$2</code></pre>"
      )

      // Enhanced inline code
      .replace(
        /`([^`]+)`/g,
        "<code style=\"background: #f1f2f6; padding: 0.2em 0.4em; border-radius: 3px; font-family: 'Consolas', 'Monaco', 'Courier New', monospace; font-size: 0.9em; color: #e74c3c;\">$1</code>"
      )

      // Enhanced blockquotes
      .replace(
        /^> (.*$)/gim,
        '<blockquote style="margin: 1.2em 0; padding: 0.8em 1.2em; border-left: 4px solid #3498db; background: #f8f9fa; font-style: italic; color: #555;">$1</blockquote>'
      )

      // Enhanced bold text
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong style="font-weight: bold; color: #2c3e50;">$1</strong>'
      )

      // Enhanced italic text
      .replace(
        /\*(.*?)\*/g,
        '<em style="font-style: italic; color: #7f8c8d;">$1</em>'
      )

      // Enhanced links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" style="color: #3498db; text-decoration: none; border-bottom: 1px dotted #3498db;" target="_blank" rel="noopener noreferrer">$1</a>'
      )

      // Enhanced unordered lists
      .replace(
        /^\* (.*$)/gim,
        '<li style="margin: 0.4em 0; line-height: 1.6; color: #333;">$1</li>'
      )
      .replace(
        /(<li.*<\/li>)/gs,
        '<ul style="margin: 1em 0; padding-left: 1.5em; list-style-type: disc;">$1</ul>'
      )

      // Enhanced ordered lists
      .replace(
        /^\d+\. (.*$)/gim,
        '<li style="margin: 0.4em 0; line-height: 1.6; color: #333;">$1</li>'
      )
      .replace(
        /(<li.*<\/li>)/gs,
        '<ol style="margin: 1em 0; padding-left: 1.5em; list-style-type: decimal;">$1</ol>'
      )

      // Enhanced horizontal rules
      .replace(
        /^---$/gm,
        '<hr style="border: none; border-top: 2px solid #ecf0f1; margin: 2em 0;">'
      )

      // Enhanced line breaks - convert double newlines to paragraphs
      .replace(
        /\n\n+/g,
        '</p><p style="margin: 0.8em 0; line-height: 1.7; color: #333; font-size: 1em;">'
      )
      .replace(/\n/g, "<br>")

      // Enhanced strikethrough
      .replace(
        /~~(.*?)~~/g,
        '<del style="text-decoration: line-through; color: #999;">$1</del>'
      )

      // Enhanced task lists
      .replace(
        /- \[ \] (.*$)/gim,
        '<div style="margin: 0.3em 0;"><input type="checkbox" disabled style="margin-right: 0.5em;"> $1</div>'
      )
      .replace(
        /- \[x\] (.*$)/gim,
        '<div style="margin: 0.3em 0;"><input type="checkbox" checked disabled style="margin-right: 0.5em;"> <span style="text-decoration: line-through; color: #666;">$1</span></div>'
      );

    // Wrap in paragraphs if not already wrapped
    if (!html.startsWith("<") && html.trim()) {
      html =
        '<p style="margin: 0.8em 0; line-height: 1.7; color: #333; font-size: 1em;">' +
        html +
        "</p>";
    }

    console.log("🎨 Enhanced fallback conversion complete");
    console.log("📄 Fallback HTML preview:", html.substring(0, 500) + "...");

    return html;
  }

  // Enhanced HTML sanitization
  sanitizeHtml(html) {
    // Basic sanitization - remove potentially dangerous elements
    const dangerousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
      /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,
      /<applet\b[^<]*(?:(?!<\/applet>)<[^<]*)*<\/applet>/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
    ];

    let sanitized = html;
    dangerousPatterns.forEach((pattern) => {
      sanitized = sanitized.replace(pattern, "");
    });

    return sanitized;
  }

  // Error handler for content setting
  handleContentError(content, targetTab) {
    console.error("🚨 Content setting failed, attempting recovery...");

    if (targetTab === this.currentTab && this.quillInstance) {
      try {
        // Clean the content and try as plain text
        let cleanedContent = this.cleanAIContent(content);
        cleanedContent = cleanedContent.replace(/<[^>]*>/g, ""); // Strip HTML
        this.quillInstance.setText(cleanedContent);
        this.updateEditorStatus("Content Loaded (Plain Text)");
        console.log("✅ Fallback: Content set as plain text");
      } catch (fallbackError) {
        console.error("❌ Complete fallback failed:", fallbackError);
        this.quillInstance.setText("Error loading content. Please try again.");
        this.updateEditorStatus("Error");
      }
    }
  }

  // Enhanced method to clean AI-generated content
  cleanAIContent(content) {
    if (!content || typeof content !== "string") {
      return "";
    }

    console.log("🧹 Cleaning AI content...");

    // Remove thinking tags and content (case insensitive)
    let cleaned = content.replace(/<think>[\s\S]*?<\/think>/gi, "");
    cleaned = cleaned.replace(/<thinking>[\s\S]*?<\/thinking>/gi, "");

    // Remove XML-style artifacts that might appear in AI responses
    cleaned = cleaned.replace(/<\?xml[^>]*\?>/gi, "");
    cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/gi, "");

    // Remove any leading/trailing artifacts
    cleaned = cleaned.replace(/^[\s\n]*/, ""); // Remove leading whitespace
    cleaned = cleaned.replace(/[\s\n]*$/, ""); // Remove trailing whitespace

    // Remove any remaining AI response artifacts
    cleaned = cleaned.replace(
      /^(Here's|Here is|I'll|I will|Let me).*?:/gim,
      ""
    );
    cleaned = cleaned.replace(/^(Based on|According to).*?:/gim, "");

    console.log("🧹 Content cleaned, length:", cleaned.length);
    return cleaned.trim();
  }

  getContent(tab = null) {
    const targetTab = tab || this.currentTab;
    return this.content[targetTab] || "";
  }

  getAllContent() {
    // Ensure current tab content is saved
    if (this.quillInstance) {
      this.content[this.currentTab] = this.quillInstance.root.innerHTML;
    }

    return { ...this.content };
  }

  isMarkdown(text) {
    if (!text || typeof text !== "string") {
      return false;
    }

    console.log("🔍 Analyzing text for markdown patterns...");

    let score = 0;
    const lines = text.split("\n");
    const totalLines = lines.length;

    // Enhanced pattern detection with weighted scoring
    const patterns = [
      // Headers (high weight)
      { regex: /^#{1,6}\s+.+$/m, weight: 15, name: "headers" },
      { regex: /^.+\n[=-]{3,}$/m, weight: 12, name: "underlined headers" },

      // Code blocks (high weight)
      { regex: /```[\s\S]*?```/g, weight: 20, name: "code blocks" },
      { regex: /^    .+$/m, weight: 8, name: "indented code" },

      // Lists (medium-high weight)
      { regex: /^[\s]*[-*+]\s+/m, weight: 10, name: "unordered lists" },
      { regex: /^[\s]*\d+\.\s+/m, weight: 10, name: "ordered lists" },
      { regex: /^[\s]*- \[[x ]\]\s+/m, weight: 12, name: "task lists" },

      // Links and images (medium weight)
      { regex: /\[([^\]]+)\]\(([^)]+)\)/g, weight: 8, name: "links" },
      { regex: /!\[([^\]]*)\]\(([^)]+)\)/g, weight: 10, name: "images" },

      // Text formatting (medium weight)
      { regex: /\*\*([^*]+)\*\*/g, weight: 5, name: "bold text" },
      { regex: /\*([^*]+)\*/g, weight: 3, name: "italic text" },
      { regex: /`([^`]+)`/g, weight: 6, name: "inline code" },
      { regex: /~~([^~]+)~~/g, weight: 4, name: "strikethrough" },

      // Blockquotes (medium weight)
      { regex: /^>\s+/m, weight: 8, name: "blockquotes" },

      // Tables (high weight)
      { regex: /\|.*\|/g, weight: 15, name: "tables" },

      // Horizontal rules (medium weight)
      { regex: /^[-*_]{3,}$/m, weight: 7, name: "horizontal rules" },

      // Line breaks (low weight but common in markdown)
      { regex: /  $/m, weight: 2, name: "hard line breaks" },
    ];

    // Check each pattern and accumulate score
    let detectedPatterns = [];
    patterns.forEach((pattern) => {
      const matches = text.match(pattern.regex);
      if (matches) {
        const matchCount = matches.length;
        const patternScore = pattern.weight * Math.min(matchCount, 5); // Cap at 5 matches per pattern
        score += patternScore;
        detectedPatterns.push(
          `${pattern.name} (${matchCount} matches, +${patternScore})`
        );
        console.log(
          `  ✓ Found ${pattern.name}: ${matchCount} matches (+${patternScore} points)`
        );
      }
    });

    // Additional scoring based on content structure

    // Multiple consecutive newlines (common in markdown)
    const doubleNewlines = (text.match(/\n\n+/g) || []).length;
    if (doubleNewlines > 2) {
      score += Math.min(doubleNewlines * 2, 10);
      detectedPatterns.push(
        `double newlines (${doubleNewlines} matches, +${Math.min(
          doubleNewlines * 2,
          10
        )})`
      );
    }

    // Markdown-style emphasis patterns
    const emphasisDensity = (text.match(/[*_`]/g) || []).length / text.length;
    if (emphasisDensity > 0.02) {
      // More than 2% emphasis characters
      const emphasisScore = Math.min(Math.floor(emphasisDensity * 100), 8);
      score += emphasisScore;
      detectedPatterns.push(`high emphasis density (+${emphasisScore})`);
    }

    // Penalty for HTML tags (suggests it's already HTML)
    const htmlTags = (text.match(/<[^>]+>/g) || []).length;
    if (htmlTags > 0) {
      const htmlPenalty = Math.min(htmlTags * 5, 20);
      score -= htmlPenalty;
      detectedPatterns.push(`HTML tags penalty (-${htmlPenalty})`);
    }

    // Bonus for typical markdown document structure
    if (text.match(/^#\s+.+$/m)) {
      // Starts with a main heading
      score += 8;
      detectedPatterns.push("main heading structure (+8)");
    }

    const threshold = 15; // Adjusted threshold for better detection
    const isMarkdown = score >= threshold;

    console.log(`🔍 Markdown analysis complete:`);
    console.log(`  📊 Total score: ${score} (threshold: ${threshold})`);
    console.log(`  📋 Detected patterns: ${detectedPatterns.join(", ")}`);
    console.log(`  ✅ Result: ${isMarkdown ? "MARKDOWN" : "NOT MARKDOWN"}`);

    return isMarkdown;
  }

  // Legacy method - now redirects to enhanced conversion
  markdownToHtml(markdown) {
    console.log(
      "⚠️ Using legacy markdownToHtml method - redirecting to enhanced version"
    );
    return this.convertMarkdownToHtml(markdown);
  }

  exportContent() {
    const allContent = this.getAllContent();

    // Create export data
    const exportData = {
      research: this.htmlToMarkdown(allContent.research || ""),
      sources: this.htmlToMarkdown(allContent.sources || ""),
      notes: this.htmlToMarkdown(allContent.notes || ""),
      exportDate: new Date().toISOString(),
      format: "markdown",
    };

    // Create markdown export
    const markdownContent = `# DeepResearch Export

**Exported on:** ${new Date().toLocaleString()}

## Research Content
${exportData.research}

---

## Sources
${exportData.sources}

---

## Notes
${exportData.notes}
`;

    // Download as markdown file
    this.downloadFile(
      markdownContent,
      `deepresearch-export-${Date.now()}.md`,
      "text/markdown"
    );

    this.updateEditorStatus("Content Exported");
    console.log("📥 Content exported successfully");
  }

  htmlToMarkdown(html) {
    if (!html) return "";

    // Basic HTML to markdown conversion
    let markdown = html;

    // Headers
    markdown = markdown.replace(/<h1>(.*?)<\/h1>/g, "# $1\n");
    markdown = markdown.replace(/<h2>(.*?)<\/h2>/g, "## $1\n");
    markdown = markdown.replace(/<h3>(.*?)<\/h3>/g, "### $1\n");

    // Bold and italic
    markdown = markdown.replace(/<strong>(.*?)<\/strong>/g, "**$1**");
    markdown = markdown.replace(/<em>(.*?)<\/em>/g, "*$1*");

    // Code
    markdown = markdown.replace(/<code>(.*?)<\/code>/g, "`$1`");

    // Links
    markdown = markdown.replace(/<a href="(.*?)">(.*?)<\/a>/g, "[$2]($1)");

    // Lists
    markdown = markdown.replace(/<li>(.*?)<\/li>/g, "- $1\n");
    markdown = markdown.replace(/<ul>(.*?)<\/ul>/gs, "$1\n");
    markdown = markdown.replace(/<ol>(.*?)<\/ol>/gs, "$1\n");

    // Line breaks
    markdown = markdown.replace(/<br\s*\/?>/g, "\n");
    markdown = markdown.replace(/<p>(.*?)<\/p>/g, "$1\n\n");

    // Remove remaining HTML tags
    markdown = markdown.replace(/<[^>]*>/g, "");

    // Clean up extra whitespace
    markdown = markdown.replace(/\n{3,}/g, "\n\n");

    return markdown.trim();
  }

  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  clearContent() {
    if (!confirm("Are you sure you want to clear the current content?")) {
      return;
    }

    this.content[this.currentTab] = "";

    if (this.quillInstance) {
      this.quillInstance.setText("");
    }

    this.updateWordCount();
    this.updateEditorStatus("Content Cleared");

    console.log(`🗑️ Cleared ${this.currentTab} content`);
  }

  toggleFullscreen() {
    const editorContainer = this.container.closest(".research-output");

    if (!document.fullscreenElement) {
      editorContainer.requestFullscreen?.() ||
        editorContainer.mozRequestFullScreen?.() ||
        editorContainer.webkitRequestFullscreen?.() ||
        editorContainer.msRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() ||
        document.mozCancelFullScreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.msExitFullscreen?.();
    }
  }

  updateWordCount() {
    if (!this.quillInstance) return;

    const text = this.quillInstance.getText();
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

    const wordCountElement = document.getElementById("editorWordCount");
    if (wordCountElement) {
      wordCountElement.textContent = `${wordCount} words`;
    }
  }

  updateEditorStatus(status) {
    const statusElement = document.getElementById("editorStatus");
    if (statusElement) {
      statusElement.textContent = status;
    }
  }

  renderEmptyState() {
    if (!this.quillInstance) return;
    this.quillInstance.setText("");
  }

  getEmptyStateTitle() {
    const titles = {
      research: "🌟 Research Content",
      sources: "📚 Source References",
      notes: "📝 Research Notes",
    };
    return titles[this.currentTab] || "🌟 Editor Ready";
  }

  getEmptyStateMessage() {
    const messages = {
      research:
        "AI-generated research content will appear here with full editing capabilities.",
      sources:
        "Source references and citations will be displayed here for easy access.",
      notes:
        "Add your personal notes and observations about the research here.",
    };
    return messages[this.currentTab] || "Start typing your content here.";
  }

  // Public API methods
  enable() {
    // Always enabled, no-op
  }

  disable() {
    // Always enabled, no-op
  }

  focus() {
    if (this.quillInstance) this.quillInstance.focus();
  }

  blur() {
    if (this.quillInstance) this.quillInstance.blur();
  }

  getSelection() {
    return this.quillInstance ? this.quillInstance.getSelection() : null;
  }

  setSelection(index, length) {
    if (this.quillInstance) this.quillInstance.setSelection(index, length);
  }

  insertText(index, text, formats) {
    if (this.quillInstance) this.quillInstance.insertText(index, text, formats);
  }

  insertEmbed(index, type, value) {
    if (this.quillInstance) this.quillInstance.insertEmbed(index, type, value);
  }

  formatText(index, length, format, value) {
    if (this.quillInstance)
      this.quillInstance.formatText(index, length, format, value);
  }

  destroy() {
    if (this.quillInstance) {
      this.quillInstance = null;
    }
  }
}

// Make available globally
window.QuillEditorManager = QuillEditorManager;
