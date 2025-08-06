# Final output 

So the key points are his name, contact info, experience in AI, technologies, projects. I should list these as bullet points, ensuring all details are included. Make sure there are no errors in the data. Check for any missing sections. Once structured, present it clearly.

# ai agent 
🤖 Multi-Agent Process Details
════════════════════════════════════════

1. DataInspector ✅
   Type: DataInspector
   Status: completed
   Progress: 100%
   Duration: 41613ms
   
   📤 Full Output:
   {
     "documentAnalysis": {
       "documentType": "Multi-Document Analysis",
       "structure": [
         "RESUME"
       ],
       "contentAreas": [
         "<think>\nOkay",
         "let's see. The user wants me to analyze the given document type and sample content to figure out its actual structure. The document type is a resume",
         "so I need to look at the sample content to identify the sections present.\n\nFirst",
         "the sample content starts with Rutwik Shinde",
         "his name",
         "contact info",
         "and LinkedIn and GitHub links. Then there's a section about his experience as a Full Stack AI Developer",
         "Ai Edx (Remote) from 01/2024 to present. \n\nLooking at the content",
         "there's a list of projects or experiences",
         "mentioning technologies like Next.js",
         "Sanity CMS",
         "and Mongo DB. They also talk about using these technologies for 10+ shops and online brands. Then there's a section about product listings",
         "category filtering",
         "and detailed product pages with SEO. Plus",
         "they built an end-to-end order flow with cart",
         "address input",
         "checkout",
         "and payment systems.\n\nSo putting this all together",
         "the main content areas would be his name",
         "contact details",
         "experience in Full Stack AI",
         "technologies used",
         "number of shops or brands",
         "product features",
         "and order flow systems. Each of these should be listed as specific sections. I need to make sure there are no assumptions and only describe what's actually there.\n</think>\n\n- Name: Rutwik Shinde  \n- Contact Information: LinkedIn (in/rutwik187)",
         "GitHub (github.com/rutwik187)  \n- Experience: Full Stack AI Developer",
         "Ai Edx (Remote) from 01/2024 – Present  \n- Technologies Used: Next.js",
         "Sanity CMS",
         "Mongo DB  \n- Projects/Experience: Built frontend architecture",
         "managed storefronts for 10+ brands",
         "developed product listings",
         "category filters",
         "SEO enhancements",
         "and built end-to-end order flow systems."
       ],
       "queryIntent": "Extract information from 1 relevant documents",
       "extractionStrategy": "Extract from each relevant document separately with proper attribution",
       "expectedOutputFormat": "structured synthesis with proper attribution",
       "documents": [
         {
           "documentId": "doc_1754292542574_sgxyitqvj",
           "documentName": "doc_1754292542574_sgxyitqvj",
           "documentType": "RESUME",
           "primaryEntity": "Rutwik Shinde",
           "structure": [
             "resume sections"
           ],
           "contentAreas": [
             "<think>\nOkay",
             "let's see. The user wants me to analyze the given document type and sample content to figure out its actual structure. The document type is a resume",
             "so I need to look at the sample content to identify the sections present.\n\nFirst",
             "the sample content starts with Rutwik Shinde",
             "his name",
             "contact info",
             "and LinkedIn and GitHub links. Then there's a section about his experience as a Full Stack AI Developer",
             "Ai Edx (Remote) from 01/2024 to present. \n\nLooking at the content",
             "there's a list of projects or experiences",
             "mentioning technologies like Next.js",
             "Sanity CMS",
             "and Mongo DB. They also talk about using these technologies for 10+ shops and online brands. Then there's a section about product listings",
             "category filtering",
             "and detailed product pages with SEO. Plus",
             "they built an end-to-end order flow with cart",
             "address input",
             "checkout",
             "and payment systems.\n\nSo putting this all together",
             "the main content areas would be his name",
             "contact details",
             "experience in Full Stack AI",
             "technologies used",
             "number of shops or brands",
             "product features",
             "and order flow systems. Each of these should be listed as specific sections. I need to make sure there are no assumptions and only describe what's actually there.\n</think>\n\n- Name: Rutwik Shinde  \n- Contact Information: LinkedIn (in/rutwik187)",
             "GitHub (github.com/rutwik187)  \n- Experience: Full Stack AI Developer",
             "Ai Edx (Remote) from 01/2024 – Present  \n- Technologies Used: Next.js",
             "Sanity CMS",
             "Mongo DB  \n- Projects/Experience: Built frontend architecture",
             "managed storefronts for 10+ brands",
             "developed product listings",
             "category filters",
             "SEO enhancements",
             "and built end-to-end order flow systems."
           ],
           "keyEntities": [
             {
               "name": "Rutwik Shinde",
               "type": "Software Developer",
               "context": "Full Stack AI Developer, Ai Edx (Remote) 01/2024 – Present • Built and maintained the complete frontend architecture, iterating rapidly based on user and client",
               "isOwner": false
             }
           ],
           "role": "reference"
         }
       ],
       "relationships": [],
       "crossDocumentStrategy": "Process each document independently to prevent cross-contamination"
     },
     "sharedKnowledge": {},
     "filteredDocuments": 4,
     "reasoning": "Document analysis completed"
   }

───────────────────────────────────

2. PlanningAgent ✅
   Type: PlanningAgent
   Status: completed
   Progress: 100%
   Duration: 12512ms
   
   📤 Full Output:
   {
     "executionPlan": "Execution strategy created",
     "reasoning": "Planning completed"
   }

───────────────────────────────────

3. PatternGenerator ✅
   Type: PatternGenerator
   Status: completed
   Progress: 100%
   Duration: 9673ms
   
   📤 Full Output:
   {
     "patterns": [
       {
         "description": "RESUME extraction pattern for Rutwik Shinde",
         "examples": [
           "<think>\nOkay",
           "let's see. The user wants me to analyze the given document type and sample content to figure out its actual structure. The document type is a resume",
           "so I need to look at the sample content to identify the sections present.\n\nFirst",
           "the sample content starts with Rutwik Shinde",
           "his name",
           "contact info",
           "and LinkedIn and GitHub links. Then there's a section about his experience as a Full Stack AI Developer",
           "Ai Edx (Remote) from 01/2024 to present. \n\nLooking at the content",
           "there's a list of projects or experiences",
           "mentioning technologies like Next.js",
           "Sanity CMS",
           "and Mongo DB. They also talk about using these technologies for 10+ shops and online brands. Then there's a section about product listings",
           "category filtering",
           "and detailed product pages with SEO. Plus",
           "they built an end-to-end order flow with cart",
           "address input",
           "checkout",
           "and payment systems.\n\nSo putting this all together",
           "the main content areas would be his name",
           "contact details",
           "experience in Full Stack AI",
           "technologies used",
           "number of shops or brands",
           "product features",
           "and order flow systems. Each of these should be listed as specific sections. I need to make sure there are no assumptions and only describe what's actually there.\n</think>\n\n- Name: Rutwik Shinde  \n- Contact Information: LinkedIn (in/rutwik187)",
           "GitHub (github.com/rutwik187)  \n- Experience: Full Stack AI Developer",
           "Ai Edx (Remote) from 01/2024 – Present  \n- Technologies Used: Next.js",
           "Sanity CMS",
           "Mongo DB  \n- Projects/Experience: Built frontend architecture",
           "managed storefronts for 10+ brands",
           "developed product listings",
           "category filters",
           "SEO enhancements",
           "and built end-to-end order flow systems."
         ],
         "extractionStrategy": "Extract <think>\nOkay, let's see. The user wants me to analyze the given document type and sample content to figure out its actual structure. The document type is a resume, so I need to look at the sample content to identify the sections present.\n\nFirst, the sample content starts with Rutwik Shinde, his name, contact info, and LinkedIn and GitHub links. Then there's a section about his experience as a Full Stack AI Developer, Ai Edx (Remote) from 01/2024 to present. \n\nLooking at the content, there's a list of projects or experiences, mentioning technologies like Next.js, Sanity CMS, and Mongo DB. They also talk about using these technologies for 10+ shops and online brands. Then there's a section about product listings, category filtering, and detailed product pages with SEO. Plus, they built an end-to-end order flow with cart, address input, checkout, and payment systems.\n\nSo putting this all together, the main content areas would be his name, contact details, experience in Full Stack AI, technologies used, number of shops or brands, product features, and order flow systems. Each of these should be listed as specific sections. I need to make sure there are no assumptions and only describe what's actually there.\n</think>\n\n- Name: Rutwik Shinde  \n- Contact Information: LinkedIn (in/rutwik187), GitHub (github.com/rutwik187)  \n- Experience: Full Stack AI Developer, Ai Edx (Remote) from 01/2024 – Present  \n- Technologies Used: Next.js, Sanity CMS, Mongo DB  \n- Projects/Experience: Built frontend architecture, managed storefronts for 10+ brands, developed product listings, category filters, SEO enhancements, and built end-to-end order flow systems. from doc_1754292542574_sgxyitqvj",
         "confidence": 0.9
       },
       {
         "description": "LLM-generated regex pattern 1",
         "examples": [],
         "extractionStrategy": "Direct regex search using: /Projects?:\\s*\\n([\\s\\S]*?)(?=\\n[A-Z]|$)/gi",
         "confidence": 0.9,
         "regexPattern": "/Projects?:\\s*\\n([\\s\\S]*?)(?=\\n[A-Z]|$)/gi"
       },
       {
         "description": "LLM-generated regex pattern 2",
         "examples": [],
         "extractionStrategy": "Direct regex search using: /•\\s*([^\\n•]+)/g",
         "confidence": 0.9,
         "regexPattern": "/•\\s*([^\\n•]+)/g"
       },
       {
         "description": "LLM-generated regex pattern 3",
         "examples": [],
         "extractionStrategy": "Direct regex search using: /(\\d+)(\\.\\d+)/g",
         "confidence": 0.9,
         "regexPattern": "/(\\d+)(\\.\\d+)/g"
       }
     ],
     "patternCount": 4,
     "extractionStrategies": {
       "generatedPatterns": [
         "/Projects?:\\s*\\n([\\s\\S]*?)(?=\\n[A-Z]|$)/gi",
         "/•\\s*([^\\n•]+)/g",
         "/(\\d+)(\\.\\d+)/g"
       ],
       "generationMethod": "llm_dynamic_regex",
       "basedOnDocumentAnalysis": false,
       "timestamp": 1754489531079,
       "agentSource": "PatternGenerator",
       "llmResponse": "<think>\nOkay, let's see. The user wants to find patterns in the document content related to Rutwik's projects, specifically the best one. First, I need to look at the three samples provided.\n\nStarting with Sample 1: Rutwik Shinde has a Software Developer role with GitHub links and some project experience. The key here is the bullet points. They mention built and maintained the frontend architecture, which is a project. So maybe a bullet point pattern for projects. Also, numbers like 9370947507 and GitHub links are there, so maybe include those in the pattern.\n\nSample 2 talks about using Next.js, Sanity, and MongoDB. They mention 10+ shops and online brands, which shows a project's impact. The data here includes numbers and categories, so maybe a pattern like \"Projects: [Category: Number]\".\n\nSample 3 is about a speedrun project, mentioning the GPU and validation loss. The pattern here is about performance metrics, so maybe a bullet point with numbers like 2.28 and 3.31 for training steps.\n\nSample 4 has a mention of 216k tokens and a time frame. The pattern here could be about time and performance, so maybe a table with time and tokens.\n\nWait, the user's query is about the best project, so I need to focus on that. Each pattern should match the actual structure in the document. Let me check again. For each sample, the data values are numbers or measurements, and the structure is either bullet points or tables. So the regex patterns should capture those elements. Let me compile the patterns accordingly.\n</think>\n\nREGEX_PATTERNS:\n- /Projects?:\\s*\\n([\\s\\S]*?)(?=\\n[A-Z]|$)/gi\n- /•\\s*([^\\n•]+)/g\n- /(\\d+)(\\.\\d+)/g\n\nRATIONING:  \n- In Sample 1, the project description includes bullet points like \"• Built...\", so the pattern captures technical achievements.  \n- In Sample 2, numbers like 10+ and MongoDB are structured with word boundaries, matching the data structure.  \n- In Sample 3, performance metrics (tokens and validation loss) are presented with numerical values.  \n- In Sample 4, time and token metrics are organized in a table format.  \n\nEach pattern matches the actual data structure in the document, extracting measurable values for the user's query."
     },
     "reasoning": "Pattern generation completed"
   }

───────────────────────────────────

4. Extractor ✅
   Type: Extractor
   Status: completed
   Progress: 100%
   Duration: 2ms
   
   📤 Full Output:
   {
     "extractedData": {
       "raw": [
         {
           "content": "Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024",
           "value": "Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024",
           "unit": "",
           "context": "•Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024 ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024 "
           },
           "originalContent": "Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024"
         },
         {
           "content": "Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements",
           "value": "Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements",
           "unit": "",
           "context": "•Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements "
           },
           "originalContent": "Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements"
         },
         {
           "content": "Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses",
           "value": "Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses",
           "unit": "",
           "context": "•Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses "
           },
           "originalContent": "Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses"
         },
         {
           "content": "Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control.",
           "value": "Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control.",
           "unit": "",
           "context": "•Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. "
           },
           "originalContent": "Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control."
         },
         {
           "content": "Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College",
           "value": "Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College",
           "unit": "",
           "context": "•Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College "
           },
           "originalContent": "Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College"
         },
         {
           "content": "Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------",
           "value": "Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------",
           "unit": "",
           "context": "•Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------"
           },
           "originalContent": "Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------"
         },
         {
           "content": "Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform",
           "value": "Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform",
           "unit": "",
           "context": "•Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform "
           },
           "originalContent": "Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform"
         },
         {
           "content": "Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails.",
           "value": "Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails.",
           "unit": "",
           "context": "•Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. "
           },
           "originalContent": "Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails."
         },
         {
           "content": "Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback.",
           "value": "Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback.",
           "unit": "",
           "context": "•Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. "
           },
           "originalContent": "Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback."
         },
         {
           "content": "Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator",
           "value": "Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator",
           "unit": "",
           "context": "•Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator "
           },
           "originalContent": "Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator"
         },
         {
           "content": "Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements.",
           "value": "Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements.",
           "unit": "",
           "context": "•Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. "
           },
           "originalContent": "Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements."
         },
         {
           "content": "Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality.",
           "value": "Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality.",
           "unit": "",
           "context": "•Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. "
           },
           "originalContent": "Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality."
         },
         {
           "content": "Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation.",
           "value": "Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation.",
           "unit": "",
           "context": "•Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. "
           },
           "originalContent": "Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation."
         },
         {
           "content": "Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking.",
           "value": "Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking.",
           "unit": "",
           "context": "•Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. "
           },
           "originalContent": "Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking."
         },
         {
           "content": "Engineered real-time features using Web Sockets for live collaboration and instant updates.",
           "value": "Engineered real-time features using Web Sockets for live collaboration and instant updates.",
           "unit": "",
           "context": "•Engineered real-time features using Web Sockets for live collaboration and instant updates. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Engineered real-time features using Web Sockets for live collaboration and instant updates. "
           },
           "originalContent": "Engineered real-time features using Web Sockets for live collaboration and instant updates."
         },
         {
           "content": "Developed geolocation-based service provider discovery and responsive booking interfaces.",
           "value": "Developed geolocation-based service provider discovery and responsive booking interfaces.",
           "unit": "",
           "context": "•Developed geolocation-based service provider discovery and responsive booking interfaces. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Developed geolocation-based service provider discovery and responsive booking interfaces. "
           },
           "originalContent": "Developed geolocation-based service provider discovery and responsive booking interfaces."
         },
         {
           "content": "Designed user account section with order history, address book, and profile management.",
           "value": "Designed user account section with order history, address book, and profile management.",
           "unit": "",
           "context": "•Designed user account section with order history, address book, and profile management. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Designed user account section with order history, address book, and profile management. "
           },
           "originalContent": "Designed user account section with order history, address book, and profile management."
         },
         {
           "content": "Built features like student registration, profile management, and real-time messaging.",
           "value": "Built features like student registration, profile management, and real-time messaging.",
           "unit": "",
           "context": "•Built features like student registration, profile management, and real-time messaging. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Built features like student registration, profile management, and real-time messaging. "
           },
           "originalContent": "Built features like student registration, profile management, and real-time messaging."
         },
         {
           "content": "Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB.",
           "value": "Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB.",
           "unit": "",
           "context": "•Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. "
           },
           "originalContent": "Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB."
         },
         {
           "content": "Integrated Stripe and Razorpay for secure transactions and coupon-based discounts.",
           "value": "Integrated Stripe and Razorpay for secure transactions and coupon-based discounts.",
           "unit": "",
           "context": "•Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. "
           },
           "originalContent": "Integrated Stripe and Razorpay for secure transactions and coupon-based discounts."
         },
         {
           "content": "Developed e-commerce platforms, inventory systems, and business landing pages.",
           "value": "Developed e-commerce platforms, inventory systems, and business landing pages.",
           "unit": "",
           "context": "•Developed e-commerce platforms, inventory systems, and business landing pages. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Developed e-commerce platforms, inventory systems, and business landing pages. "
           },
           "originalContent": "Developed e-commerce platforms, inventory systems, and business landing pages."
         },
         {
           "content": "MERN stack application enabling users to book local professional services.",
           "value": "MERN stack application enabling users to book local professional services.",
           "unit": "",
           "context": "•MERN stack application enabling users to book local professional services. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•MERN stack application enabling users to book local professional services. "
           },
           "originalContent": "MERN stack application enabling users to book local professional services."
         },
         {
           "content": "Used by 10+ shops and online brands to manage their online storefronts.",
           "value": "Used by 10+ shops and online brands to manage their online storefronts.",
           "unit": "",
           "context": "•Used by 10+ shops and online brands to manage their online storefronts. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Used by 10+ shops and online brands to manage their online storefronts. "
           },
           "originalContent": "Used by 10+ shops and online brands to manage their online storefronts."
         },
         {
           "content": "AI-powered tool for generating customized educational course journeys.",
           "value": "AI-powered tool for generating customized educational course journeys.",
           "unit": "",
           "context": "•AI-powered tool for generating customized educational course journeys. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•AI-powered tool for generating customized educational course journeys. "
           },
           "originalContent": "AI-powered tool for generating customized educational course journeys."
         },
         {
           "content": "Engineered scalable systems with Next.js, Postgre SQL, and Node.js.",
           "value": "Engineered scalable systems with Next.js, Postgre SQL, and Node.js.",
           "unit": "",
           "context": "•Engineered scalable systems with Next.js, Postgre SQL, and Node.js. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Engineered scalable systems with Next.js, Postgre SQL, and Node.js. "
           },
           "originalContent": "Engineered scalable systems with Next.js, Postgre SQL, and Node.js."
         },
         {
           "content": "Authored and implemented AI research papers published by Springer.",
           "value": "Authored and implemented AI research papers published by Springer.",
           "unit": "",
           "context": "•Authored and implemented AI research papers published by Springer. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Authored and implemented AI research papers published by Springer. "
           },
           "originalContent": "Authored and implemented AI research papers published by Springer."
         },
         {
           "content": "React-based portal for connecting alumni and students.",
           "value": "React-based portal for connecting alumni and students.",
           "unit": "",
           "context": "•React-based portal for connecting alumni and students. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•React-based portal for connecting alumni and students. "
           },
           "originalContent": "React-based portal for connecting alumni and students."
         },
         {
           "content": "1st place in nationwide Waving the Web Hackathon.",
           "value": "1st place in nationwide Waving the Web Hackathon.",
           "unit": "",
           "context": "•1st place in nationwide Waving the Web Hackathon. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•1st place in nationwide Waving the Web Hackathon. "
           },
           "originalContent": "1st place in nationwide Waving the Web Hackathon."
         },
         {
           "content": "Integrated payment gateways and Sanity CMS.",
           "value": "Integrated payment gateways and Sanity CMS.",
           "unit": "",
           "context": "•Integrated payment gateways and Sanity CMS. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Integrated payment gateways and Sanity CMS. "
           },
           "originalContent": "Integrated payment gateways and Sanity CMS."
         },
         {
           "content": "Integrated Stripe and Razorpay for",
           "value": "Integrated Stripe and Razorpay for",
           "unit": "",
           "context": "•Integrated Stripe and Razorpay for",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/•\\s*([^\\n•]+)/g",
             "patternDescription": "LLM-generated regex pattern 2",
             "fullMatch": "•Integrated Stripe and Razorpay for"
           },
           "originalContent": "Integrated Stripe and Razorpay for"
         }
       ],
       "structured": [
         {
           "items": [
             {
               "content": "Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024",
               "value": "Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024",
               "unit": "",
               "context": "•Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024 ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024 "
               },
               "originalContent": "Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024"
             }
           ],
           "bestItem": {
             "content": "Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024",
             "value": "Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024",
             "unit": "",
             "context": "•Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024 ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024 "
             },
             "originalContent": "Designed a serverless backend with AWS Lambda, Dynamo DB, and S3, optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) 06/2022 – 01/2024"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements",
               "value": "Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements",
               "unit": "",
               "context": "•Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements "
               },
               "originalContent": "Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements"
             }
           ],
           "bestItem": {
             "content": "Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements",
             "value": "Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements",
             "unit": "",
             "context": "•Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements "
             },
             "originalContent": "Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: 8.7+) 06/2020 – 06/2024 Key Achievements"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses",
               "value": "Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses",
               "unit": "",
               "context": "•Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses "
               },
               "originalContent": "Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses"
             }
           ],
           "bestItem": {
             "content": "Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses",
             "value": "Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses",
             "unit": "",
             "context": "•Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses "
             },
             "originalContent": "Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control.",
               "value": "Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control.",
               "unit": "",
               "context": "•Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. "
               },
               "originalContent": "Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control."
             }
           ],
           "bestItem": {
             "content": "Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control.",
             "value": "Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control.",
             "unit": "",
             "context": "•Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. "
             },
             "originalContent": "Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College",
               "value": "Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College",
               "unit": "",
               "context": "•Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College "
               },
               "originalContent": "Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College"
             }
           ],
           "bestItem": {
             "content": "Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College",
             "value": "Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College",
             "unit": "",
             "context": "•Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College "
             },
             "originalContent": "Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------",
               "value": "Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------",
               "unit": "",
               "context": "•Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------"
               },
               "originalContent": "Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------"
             }
           ],
           "bestItem": {
             "content": "Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------",
             "value": "Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------",
             "unit": "",
             "context": "•Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------"
             },
             "originalContent": "Built provider dashboard to manage bookings, availability, and service details. ----------------Page (0) Break----------------"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform",
               "value": "Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform",
               "unit": "",
               "context": "•Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform "
               },
               "originalContent": "Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform"
             }
           ],
           "bestItem": {
             "content": "Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform",
             "value": "Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform",
             "unit": "",
             "context": "•Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform "
             },
             "originalContent": "Used React Query for efficient data fetching and caching; currently used by 5,000+ students. On-Demand Services Platform"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails.",
               "value": "Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails.",
               "unit": "",
               "context": "•Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. "
               },
               "originalContent": "Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails."
             }
           ],
           "bestItem": {
             "content": "Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails.",
             "value": "Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails.",
             "unit": "",
             "context": "•Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. "
             },
             "originalContent": "Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback.",
               "value": "Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback.",
               "unit": "",
               "context": "•Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. "
               },
               "originalContent": "Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback."
             }
           ],
           "bestItem": {
             "content": "Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback.",
             "value": "Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback.",
             "unit": "",
             "context": "•Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. "
             },
             "originalContent": "Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator",
               "value": "Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator",
               "unit": "",
               "context": "•Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator "
               },
               "originalContent": "Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator"
             }
           ],
           "bestItem": {
             "content": "Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator",
             "value": "Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator",
             "unit": "",
             "context": "•Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator "
             },
             "originalContent": "Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements.",
               "value": "Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements.",
               "unit": "",
               "context": "•Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. "
               },
               "originalContent": "Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements."
             }
           ],
           "bestItem": {
             "content": "Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements.",
             "value": "Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements.",
             "unit": "",
             "context": "•Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. "
             },
             "originalContent": "Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality.",
               "value": "Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality.",
               "unit": "",
               "context": "•Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. "
               },
               "originalContent": "Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality."
             }
           ],
           "bestItem": {
             "content": "Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality.",
             "value": "Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality.",
             "unit": "",
             "context": "•Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. "
             },
             "originalContent": "Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation.",
               "value": "Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation.",
               "unit": "",
               "context": "•Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. "
               },
               "originalContent": "Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation."
             }
           ],
           "bestItem": {
             "content": "Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation.",
             "value": "Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation.",
             "unit": "",
             "context": "•Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. "
             },
             "originalContent": "Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking.",
               "value": "Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking.",
               "unit": "",
               "context": "•Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. "
               },
               "originalContent": "Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking."
             }
           ],
           "bestItem": {
             "content": "Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking.",
             "value": "Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking.",
             "unit": "",
             "context": "•Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. "
             },
             "originalContent": "Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Engineered real-time features using Web Sockets for live collaboration and instant updates.",
               "value": "Engineered real-time features using Web Sockets for live collaboration and instant updates.",
               "unit": "",
               "context": "•Engineered real-time features using Web Sockets for live collaboration and instant updates. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Engineered real-time features using Web Sockets for live collaboration and instant updates. "
               },
               "originalContent": "Engineered real-time features using Web Sockets for live collaboration and instant updates."
             }
           ],
           "bestItem": {
             "content": "Engineered real-time features using Web Sockets for live collaboration and instant updates.",
             "value": "Engineered real-time features using Web Sockets for live collaboration and instant updates.",
             "unit": "",
             "context": "•Engineered real-time features using Web Sockets for live collaboration and instant updates. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Engineered real-time features using Web Sockets for live collaboration and instant updates. "
             },
             "originalContent": "Engineered real-time features using Web Sockets for live collaboration and instant updates."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Developed geolocation-based service provider discovery and responsive booking interfaces.",
               "value": "Developed geolocation-based service provider discovery and responsive booking interfaces.",
               "unit": "",
               "context": "•Developed geolocation-based service provider discovery and responsive booking interfaces. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Developed geolocation-based service provider discovery and responsive booking interfaces. "
               },
               "originalContent": "Developed geolocation-based service provider discovery and responsive booking interfaces."
             }
           ],
           "bestItem": {
             "content": "Developed geolocation-based service provider discovery and responsive booking interfaces.",
             "value": "Developed geolocation-based service provider discovery and responsive booking interfaces.",
             "unit": "",
             "context": "•Developed geolocation-based service provider discovery and responsive booking interfaces. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Developed geolocation-based service provider discovery and responsive booking interfaces. "
             },
             "originalContent": "Developed geolocation-based service provider discovery and responsive booking interfaces."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Designed user account section with order history, address book, and profile management.",
               "value": "Designed user account section with order history, address book, and profile management.",
               "unit": "",
               "context": "•Designed user account section with order history, address book, and profile management. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Designed user account section with order history, address book, and profile management. "
               },
               "originalContent": "Designed user account section with order history, address book, and profile management."
             }
           ],
           "bestItem": {
             "content": "Designed user account section with order history, address book, and profile management.",
             "value": "Designed user account section with order history, address book, and profile management.",
             "unit": "",
             "context": "•Designed user account section with order history, address book, and profile management. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Designed user account section with order history, address book, and profile management. "
             },
             "originalContent": "Designed user account section with order history, address book, and profile management."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Built features like student registration, profile management, and real-time messaging.",
               "value": "Built features like student registration, profile management, and real-time messaging.",
               "unit": "",
               "context": "•Built features like student registration, profile management, and real-time messaging. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Built features like student registration, profile management, and real-time messaging. "
               },
               "originalContent": "Built features like student registration, profile management, and real-time messaging."
             }
           ],
           "bestItem": {
             "content": "Built features like student registration, profile management, and real-time messaging.",
             "value": "Built features like student registration, profile management, and real-time messaging.",
             "unit": "",
             "context": "•Built features like student registration, profile management, and real-time messaging. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Built features like student registration, profile management, and real-time messaging. "
             },
             "originalContent": "Built features like student registration, profile management, and real-time messaging."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB.",
               "value": "Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB.",
               "unit": "",
               "context": "•Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. "
               },
               "originalContent": "Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB."
             }
           ],
           "bestItem": {
             "content": "Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB.",
             "value": "Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB.",
             "unit": "",
             "context": "•Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. "
             },
             "originalContent": "Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Integrated Stripe and Razorpay for secure transactions and coupon-based discounts.",
               "value": "Integrated Stripe and Razorpay for secure transactions and coupon-based discounts.",
               "unit": "",
               "context": "•Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. "
               },
               "originalContent": "Integrated Stripe and Razorpay for secure transactions and coupon-based discounts."
             }
           ],
           "bestItem": {
             "content": "Integrated Stripe and Razorpay for secure transactions and coupon-based discounts.",
             "value": "Integrated Stripe and Razorpay for secure transactions and coupon-based discounts.",
             "unit": "",
             "context": "•Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. "
             },
             "originalContent": "Integrated Stripe and Razorpay for secure transactions and coupon-based discounts."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Developed e-commerce platforms, inventory systems, and business landing pages.",
               "value": "Developed e-commerce platforms, inventory systems, and business landing pages.",
               "unit": "",
               "context": "•Developed e-commerce platforms, inventory systems, and business landing pages. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Developed e-commerce platforms, inventory systems, and business landing pages. "
               },
               "originalContent": "Developed e-commerce platforms, inventory systems, and business landing pages."
             }
           ],
           "bestItem": {
             "content": "Developed e-commerce platforms, inventory systems, and business landing pages.",
             "value": "Developed e-commerce platforms, inventory systems, and business landing pages.",
             "unit": "",
             "context": "•Developed e-commerce platforms, inventory systems, and business landing pages. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Developed e-commerce platforms, inventory systems, and business landing pages. "
             },
             "originalContent": "Developed e-commerce platforms, inventory systems, and business landing pages."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "MERN stack application enabling users to book local professional services.",
               "value": "MERN stack application enabling users to book local professional services.",
               "unit": "",
               "context": "•MERN stack application enabling users to book local professional services. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•MERN stack application enabling users to book local professional services. "
               },
               "originalContent": "MERN stack application enabling users to book local professional services."
             }
           ],
           "bestItem": {
             "content": "MERN stack application enabling users to book local professional services.",
             "value": "MERN stack application enabling users to book local professional services.",
             "unit": "",
             "context": "•MERN stack application enabling users to book local professional services. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•MERN stack application enabling users to book local professional services. "
             },
             "originalContent": "MERN stack application enabling users to book local professional services."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Used by 10+ shops and online brands to manage their online storefronts.",
               "value": "Used by 10+ shops and online brands to manage their online storefronts.",
               "unit": "",
               "context": "•Used by 10+ shops and online brands to manage their online storefronts. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Used by 10+ shops and online brands to manage their online storefronts. "
               },
               "originalContent": "Used by 10+ shops and online brands to manage their online storefronts."
             }
           ],
           "bestItem": {
             "content": "Used by 10+ shops and online brands to manage their online storefronts.",
             "value": "Used by 10+ shops and online brands to manage their online storefronts.",
             "unit": "",
             "context": "•Used by 10+ shops and online brands to manage their online storefronts. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Used by 10+ shops and online brands to manage their online storefronts. "
             },
             "originalContent": "Used by 10+ shops and online brands to manage their online storefronts."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "AI-powered tool for generating customized educational course journeys.",
               "value": "AI-powered tool for generating customized educational course journeys.",
               "unit": "",
               "context": "•AI-powered tool for generating customized educational course journeys. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•AI-powered tool for generating customized educational course journeys. "
               },
               "originalContent": "AI-powered tool for generating customized educational course journeys."
             }
           ],
           "bestItem": {
             "content": "AI-powered tool for generating customized educational course journeys.",
             "value": "AI-powered tool for generating customized educational course journeys.",
             "unit": "",
             "context": "•AI-powered tool for generating customized educational course journeys. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•AI-powered tool for generating customized educational course journeys. "
             },
             "originalContent": "AI-powered tool for generating customized educational course journeys."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Engineered scalable systems with Next.js, Postgre SQL, and Node.js.",
               "value": "Engineered scalable systems with Next.js, Postgre SQL, and Node.js.",
               "unit": "",
               "context": "•Engineered scalable systems with Next.js, Postgre SQL, and Node.js. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Engineered scalable systems with Next.js, Postgre SQL, and Node.js. "
               },
               "originalContent": "Engineered scalable systems with Next.js, Postgre SQL, and Node.js."
             }
           ],
           "bestItem": {
             "content": "Engineered scalable systems with Next.js, Postgre SQL, and Node.js.",
             "value": "Engineered scalable systems with Next.js, Postgre SQL, and Node.js.",
             "unit": "",
             "context": "•Engineered scalable systems with Next.js, Postgre SQL, and Node.js. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Engineered scalable systems with Next.js, Postgre SQL, and Node.js. "
             },
             "originalContent": "Engineered scalable systems with Next.js, Postgre SQL, and Node.js."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Authored and implemented AI research papers published by Springer.",
               "value": "Authored and implemented AI research papers published by Springer.",
               "unit": "",
               "context": "•Authored and implemented AI research papers published by Springer. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Authored and implemented AI research papers published by Springer. "
               },
               "originalContent": "Authored and implemented AI research papers published by Springer."
             }
           ],
           "bestItem": {
             "content": "Authored and implemented AI research papers published by Springer.",
             "value": "Authored and implemented AI research papers published by Springer.",
             "unit": "",
             "context": "•Authored and implemented AI research papers published by Springer. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Authored and implemented AI research papers published by Springer. "
             },
             "originalContent": "Authored and implemented AI research papers published by Springer."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "React-based portal for connecting alumni and students.",
               "value": "React-based portal for connecting alumni and students.",
               "unit": "",
               "context": "•React-based portal for connecting alumni and students. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•React-based portal for connecting alumni and students. "
               },
               "originalContent": "React-based portal for connecting alumni and students."
             }
           ],
           "bestItem": {
             "content": "React-based portal for connecting alumni and students.",
             "value": "React-based portal for connecting alumni and students.",
             "unit": "",
             "context": "•React-based portal for connecting alumni and students. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•React-based portal for connecting alumni and students. "
             },
             "originalContent": "React-based portal for connecting alumni and students."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "1st place in nationwide Waving the Web Hackathon.",
               "value": "1st place in nationwide Waving the Web Hackathon.",
               "unit": "",
               "context": "•1st place in nationwide Waving the Web Hackathon. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•1st place in nationwide Waving the Web Hackathon. "
               },
               "originalContent": "1st place in nationwide Waving the Web Hackathon."
             }
           ],
           "bestItem": {
             "content": "1st place in nationwide Waving the Web Hackathon.",
             "value": "1st place in nationwide Waving the Web Hackathon.",
             "unit": "",
             "context": "•1st place in nationwide Waving the Web Hackathon. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•1st place in nationwide Waving the Web Hackathon. "
             },
             "originalContent": "1st place in nationwide Waving the Web Hackathon."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Integrated payment gateways and Sanity CMS.",
               "value": "Integrated payment gateways and Sanity CMS.",
               "unit": "",
               "context": "•Integrated payment gateways and Sanity CMS. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Integrated payment gateways and Sanity CMS. "
               },
               "originalContent": "Integrated payment gateways and Sanity CMS."
             }
           ],
           "bestItem": {
             "content": "Integrated payment gateways and Sanity CMS.",
             "value": "Integrated payment gateways and Sanity CMS.",
             "unit": "",
             "context": "•Integrated payment gateways and Sanity CMS. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Integrated payment gateways and Sanity CMS. "
             },
             "originalContent": "Integrated payment gateways and Sanity CMS."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Integrated Stripe and Razorpay for",
               "value": "Integrated Stripe and Razorpay for",
               "unit": "",
               "context": "•Integrated Stripe and Razorpay for",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/•\\s*([^\\n•]+)/g",
                 "patternDescription": "LLM-generated regex pattern 2",
                 "fullMatch": "•Integrated Stripe and Razorpay for"
               },
               "originalContent": "Integrated Stripe and Razorpay for"
             }
           ],
           "bestItem": {
             "content": "Integrated Stripe and Razorpay for",
             "value": "Integrated Stripe and Razorpay for",
             "unit": "",
             "context": "•Integrated Stripe and Razorpay for",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/•\\s*([^\\n•]+)/g",
               "patternDescription": "LLM-generated regex pattern 2",
               "fullMatch": "•Integrated Stripe and Razorpay for"
             },
             "originalContent": "Integrated Stripe and Razorpay for"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         }
       ]
     },
     "itemCount": 34,
     "reasoning": "Data extraction completed"
   }

───────────────────────────────────

5. Synthesizer ✅
   Type: Synthesizer
   Status: completed
   Progress: 100%
   Duration: 55098ms
   
   📤 Full Output:
   {
     "synthesis": {
       "answer": "So the key points are his name, contact info, experience in AI, technologies, projects. I should list these as bullet points, ensuring all details are included. Make sure there are no errors in the data. Check for any missing sections. Once structured, present it clearly.",
       "confidence": 0,
       "reasoning": "The document outlines Rutwik Shinde's professional experience, key technologies, and projects. The main content areas are:\n\n1. **Name and Contact**: Rutwik Shinde with LinkedIn and GitHub links.  \n2. **Experience**: Full Stack AI Developer at Ai Edx from 01/2024 to present.  \n3. **Key Technologies**: Next.js, Sanity CMS, and MongoDB.  \n4. **Projects/Experience**: Built frontend architecture, managed 10+ brands, optimized product listings, and developed an end-to-end order flow system.  \n\nThis synthesis highlights his expertise in AI, technology stack, and project outcomes.",
       "structure": "paragraph"
     },
     "finalAnswer": "So the key points are his name, contact info, experience in AI, technologies, projects. I should list these as bullet points, ensuring all details are included. Make sure there are no errors in the data. Check for any missing sections. Once structured, present it clearly.",
     "reasoning": "The document outlines Rutwik Shinde's professional experience, key technologies, and projects. The main content areas are:\n\n1. **Name and Contact**: Rutwik Shinde with LinkedIn and GitHub links.  \n2. **Experience**: Full Stack AI Developer at Ai Edx from 01/2024 to present.  \n3. **Key Technologies**: Next.js, Sanity CMS, and MongoDB.  \n4. **Projects/Experience**: Built frontend architecture, managed 10+ brands, optimized product listings, and developed an end-to-end order flow system.  \n\nThis synthesis highlights his expertise in AI, technology stack, and project outcomes."
   }

───────────────────────────────────

Total Agents: 5
Completed: 5
Generated: 06/08/2025, 19:44:38
