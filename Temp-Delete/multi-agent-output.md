<reasoning>
The best project by Rutwik is the **serverless backend optimized with AWS Lambda, Dynamo DB, and S3**, as it showcases scalability and cost efficiency, aligning with the resume's emphasis on resource optimization. Other relevant projects include the **e-commerce platform** (showing technical expertise), **secure authentication system**, and **interactive quizzes** (highlighting user engagement). These projects collectively demonstrate Rutwik's ability to tackle scalable and innovative projects.
</reasoning>

# agent
🤖 Multi-Agent Process Details
════════════════════════════════════════

1. DataInspector ✅
   Type: DataInspector
   Status: completed
   Progress: 100%
   Duration: 39988ms
   
   📤 Full Output:
   {
     "documentAnalysis": {
       "documentType": "Multi-Document Analysis",
       "structure": [
         "Resume"
       ],
       "contentAreas": [
         "<think>\nOkay",
         "let me start by analyzing the given document type and sample content. The user mentioned it's a resume",
         "so the structure should follow typical resume sections. \n\nFirst",
         "I need to identify the main content areas. Looking at the sample content",
         "there's Rutwik's name",
         "contact information",
         "and his experience. Then there's his skills listed under \"Experience\"",
         "which includes a Full Stack AI Developer role with specific dates. \n\nI should check if there are other sections. The sample mentions technologies like Next.js",
         "Sanity CMS",
         "and Mongo DB. Also",
         "there's a part about using these technologies for product listings and order flow. So that's another content area. \n\nWait",
         "the user wants specific types of information. Let me make sure I'm not missing anything. The resume sections usually include the person's name",
         "contact details",
         "location",
         "and then the professional experience. The skills and technologies also fall under experience or skills. \n\nSo putting it all together: Name",
         "contact info",
         "location",
         "experience (skills and technologies)",
         "and specific projects or responsibilities. The sample content covers all these aspects. I need to list them as a comma-separated list without any assumptions.\n</think>\n\nName",
         "Contact Information",
         "Location",
         "Professional Experience (Skills and Technologies)",
         "Projects and Responsibilities."
       ],
       "queryIntent": "Extract information from 1 relevant documents",
       "extractionStrategy": "Extract from each relevant document separately with proper attribution",
       "expectedOutputFormat": "structured synthesis with proper attribution",
       "documents": [
         {
           "documentId": "doc_1754292542574_sgxyitqvj",
           "documentName": "doc_1754292542574_sgxyitqvj",
           "documentType": "Resume",
           "primaryEntity": "Rutwik Shinde",
           "structure": [
             "resume sections"
           ],
           "contentAreas": [
             "<think>\nOkay",
             "let me start by analyzing the given document type and sample content. The user mentioned it's a resume",
             "so the structure should follow typical resume sections. \n\nFirst",
             "I need to identify the main content areas. Looking at the sample content",
             "there's Rutwik's name",
             "contact information",
             "and his experience. Then there's his skills listed under \"Experience\"",
             "which includes a Full Stack AI Developer role with specific dates. \n\nI should check if there are other sections. The sample mentions technologies like Next.js",
             "Sanity CMS",
             "and Mongo DB. Also",
             "there's a part about using these technologies for product listings and order flow. So that's another content area. \n\nWait",
             "the user wants specific types of information. Let me make sure I'm not missing anything. The resume sections usually include the person's name",
             "contact details",
             "location",
             "and then the professional experience. The skills and technologies also fall under experience or skills. \n\nSo putting it all together: Name",
             "contact info",
             "location",
             "experience (skills and technologies)",
             "and specific projects or responsibilities. The sample content covers all these aspects. I need to list them as a comma-separated list without any assumptions.\n</think>\n\nName",
             "Contact Information",
             "Location",
             "Professional Experience (Skills and Technologies)",
             "Projects and Responsibilities."
           ],
           "keyEntities": [
             {
               "name": "Rutwik Shinde",
               "type": "Person",
               "context": "Full Stack AI Developer | Ai Edx (Remote)",
               "isOwner": false
             },
             {
               "name": "Ai Edx",
               "type": "Company",
               "context": "Full Stack AI Developer",
               "isOwner": false
             },
             {
               "name": "Order Flow System",
               "type": "Project",
               "context": "end-to-end order flow",
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
   Duration: 10231ms
   
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
   Duration: 15556ms
   
   📤 Full Output:
   {
     "patterns": [
       {
         "description": "Resume extraction pattern for Rutwik Shinde",
         "examples": [
           "<think>\nOkay",
           "let me start by analyzing the given document type and sample content. The user mentioned it's a resume",
           "so the structure should follow typical resume sections. \n\nFirst",
           "I need to identify the main content areas. Looking at the sample content",
           "there's Rutwik's name",
           "contact information",
           "and his experience. Then there's his skills listed under \"Experience\"",
           "which includes a Full Stack AI Developer role with specific dates. \n\nI should check if there are other sections. The sample mentions technologies like Next.js",
           "Sanity CMS",
           "and Mongo DB. Also",
           "there's a part about using these technologies for product listings and order flow. So that's another content area. \n\nWait",
           "the user wants specific types of information. Let me make sure I'm not missing anything. The resume sections usually include the person's name",
           "contact details",
           "location",
           "and then the professional experience. The skills and technologies also fall under experience or skills. \n\nSo putting it all together: Name",
           "contact info",
           "location",
           "experience (skills and technologies)",
           "and specific projects or responsibilities. The sample content covers all these aspects. I need to list them as a comma-separated list without any assumptions.\n</think>\n\nName",
           "Contact Information",
           "Location",
           "Professional Experience (Skills and Technologies)",
           "Projects and Responsibilities."
         ],
         "extractionStrategy": "Extract <think>\nOkay, let me start by analyzing the given document type and sample content. The user mentioned it's a resume, so the structure should follow typical resume sections. \n\nFirst, I need to identify the main content areas. Looking at the sample content, there's Rutwik's name, contact information, and his experience. Then there's his skills listed under \"Experience\", which includes a Full Stack AI Developer role with specific dates. \n\nI should check if there are other sections. The sample mentions technologies like Next.js, Sanity CMS, and Mongo DB. Also, there's a part about using these technologies for product listings and order flow. So that's another content area. \n\nWait, the user wants specific types of information. Let me make sure I'm not missing anything. The resume sections usually include the person's name, contact details, location, and then the professional experience. The skills and technologies also fall under experience or skills. \n\nSo putting it all together: Name, contact info, location, experience (skills and technologies), and specific projects or responsibilities. The sample content covers all these aspects. I need to list them as a comma-separated list without any assumptions.\n</think>\n\nName, Contact Information, Location, Professional Experience (Skills and Technologies), Projects and Responsibilities. from doc_1754292542574_sgxyitqvj",
         "confidence": 0.9
       },
       {
         "description": "LLM-generated regex pattern 1",
         "examples": [],
         "extractionStrategy": "Direct regex search using: /•\\s*([^\\n•]+)/g",
         "confidence": 0.9,
         "regexPattern": "/•\\s*([^\\n•]+)/g"
       },
       {
         "description": "LLM-generated regex pattern 2",
         "examples": [],
         "extractionStrategy": "Direct regex search using: /Projects?:\\s*\\n([\\s\\S]*?)(?=\\n[A-Z]|$)/gi",
         "confidence": 0.9,
         "regexPattern": "/Projects?:\\s*\\n([\\s\\S]*?)(?=\\n[A-Z]|$)/gi"
       },
       {
         "description": "LLM-generated regex pattern 3",
         "examples": [],
         "extractionStrategy": "Direct regex search using: /216k tokens/second/g",
         "confidence": 0.9,
         "regexPattern": "/216k tokens/second/g"
       }
     ],
     "patternCount": 4,
     "extractionStrategies": {
       "generatedPatterns": [
         "/•\\s*([^\\n•]+)/g",
         "/Projects?:\\s*\\n([\\s\\S]*?)(?=\\n[A-Z]|$)/gi",
         "/216k tokens/second/g"
       ],
       "generationMethod": "llm_dynamic_regex",
       "basedOnDocumentAnalysis": false,
       "timestamp": 1754487544828,
       "agentSource": "PatternGenerator",
       "llmResponse": "<think>\nOkay, let's tackle this query. The user wants to find the best project by Rutwik. First, I need to look at the document content provided.\n\nLooking at sample 1, Rutwik Shinde has a project mentioned: \"Full Stack AI Developer, Ai Edx (Remote) 01/2024 – Present •Built and maintained the complete frontend architecture...\" Here, the data value is \"Full Stack AI Developer, Ai Edx (Remote)\". So the pattern would be something like \"Full Stack AI Developer, Ai Edx (Remote)\".\n\nSample 2 talks about projects like \"Next.js, Sanity CMS, and Mongo DB\" and \"end-to-end order flow\" with specific technologies. The data here is \"Next.js, Sanity CMS, and Mongo DB\". So the pattern would be \"Next.js, Sanity CMS, and Mongo DB\".\n\nSample 3 mentions a project about training GPT-2 with GPUs, but there's no number here. Sample 4 mentions a performance metric of 216k tokens/second. So the pattern would be \"216k tokens/second\".\n\nSample 2 also has \"built end-to-end order flow\" which is a project. So the pattern is \"end-to-end order flow\".\n\nWait, but the user asked specifically for the best project by Rutwik. So looking at all samples, the data values are projects related to his work, technologies he uses, and performance metrics. The patterns should capture these elements.\n\nSo, the regex patterns would be for each of these data points. Each pattern should match the specific structure in the text. For example, using bullet points for projects, technologies, and performance metrics. Since the user wants the best, maybe prioritize the highest-ranking projects, but the actual content shows different project details. The key is to capture the specific values and structures found in the text.\n\nI need to make sure each pattern starts with a hyphen and ends with the flags, and that they're based on the actual content. Let me check again. Each sample has a specific data value, so the regex should capture those. So the final answer should list three patterns based on the data found in the document.\n</think>\n\nREGEX_PATTERNS:\n- /•\\s*([^\\n•]+)/g  \n- /Projects?:\\s*\\n([\\s\\S]*?)(?=\\n[A-Z]|$)/gi  \n- /216k tokens/second/g  \n\nRATIONING:  \n- The first pattern captures project descriptions with bullet points, extracting values like \"Full Stack AI Developer, Ai Edx (Remote)\" or \"Next.js, Sanity CMS, and Mongo DB\".  \n- The second pattern matches project lists with sections, extracting \"end-to-end order flow\" as a structure.  \n- The third pattern highlights a specific performance metric \"216k tokens/second\" from sample 4.  \n\nEach pattern matches the ACTUAL document structure, extracting measurable data values without assumptions."
     },
     "reasoning": "Pattern generation completed"
   }

───────────────────────────────────

4. Extractor ✅
   Type: Extractor
   Status: completed
   Progress: 100%
   Duration: 4ms
   
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
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
             "patternDescription": "LLM-generated regex pattern 1",
             "fullMatch": "•Integrated Stripe and Razorpay for"
           },
           "originalContent": "Integrated Stripe and Razorpay for"
         },
         {
           "content": "216k tokens/second",
           "value": "216k tokens/second",
           "unit": "",
           "context": "216k tokens/second",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/216k tokens/second/g",
             "patternDescription": "LLM-generated regex pattern 3",
             "fullMatch": "216k tokens/second"
           },
           "originalContent": "216k tokens/second"
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
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
                 "patternDescription": "LLM-generated regex pattern 1",
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
               "patternDescription": "LLM-generated regex pattern 1",
               "fullMatch": "•Integrated Stripe and Razorpay for"
             },
             "originalContent": "Integrated Stripe and Razorpay for"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "216k tokens/second",
               "value": "216k tokens/second",
               "unit": "",
               "context": "216k tokens/second",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/216k tokens/second/g",
                 "patternDescription": "LLM-generated regex pattern 3",
                 "fullMatch": "216k tokens/second"
               },
               "originalContent": "216k tokens/second"
             }
           ],
           "bestItem": {
             "content": "216k tokens/second",
             "value": "216k tokens/second",
             "unit": "",
             "context": "216k tokens/second",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/216k tokens/second/g",
               "patternDescription": "LLM-generated regex pattern 3",
               "fullMatch": "216k tokens/second"
             },
             "originalContent": "216k tokens/second"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         }
       ]
     },
     "itemCount": 31,
     "reasoning": "Data extraction completed"
   }

───────────────────────────────────

5. WebSearchAgent ✅
   Type: WebSearchAgent
   Status: completed
   Progress: 100%
   Duration: 9592ms
   
   📤 Full Output:
   {
     "webResults": "Web search completed",
     "reasoning": "Web search completed"
   }

───────────────────────────────────

6. Synthesizer ✅
   Type: Synthesizer
   Status: completed
   Progress: 100%
   Duration: 46092ms
   
   📤 Full Output:
   {
     "synthesis": {
       "answer": "<reasoning>\nThe best project by Rutwik is the **serverless backend optimized with AWS Lambda, Dynamo DB, and S3**, as it showcases scalability and cost efficiency, aligning with the resume's emphasis on resource optimization. Other relevant projects include the **e-commerce platform** (showing technical expertise), **secure authentication system**, and **interactive quizzes** (highlighting user engagement). These projects collectively demonstrate Rutwik's ability to tackle scalable and innovative projects.\n</reasoning>",
       "confidence": 0,
       "reasoning": "The best project by Rutwik is the **serverless backend optimized with AWS Lambda, Dynamo DB, and S3**, as it demonstrates scalability and cost efficiency, aligning with the resume's emphasis on optimizing resources. Additionally, the **e-commerce platform** project showcases technical expertise and real-world application. Other projects like secure authentication, dashboard, and interactive quizzes also highlight key skills and contributions. These projects reflect Rutwik's ability to tackle scalable and innovative projects.",
       "structure": "paragraph"
     },
     "finalAnswer": "<reasoning>\nThe best project by Rutwik is the **serverless backend optimized with AWS Lambda, Dynamo DB, and S3**, as it showcases scalability and cost efficiency, aligning with the resume's emphasis on resource optimization. Other relevant projects include the **e-commerce platform** (showing technical expertise), **secure authentication system**, and **interactive quizzes** (highlighting user engagement). These projects collectively demonstrate Rutwik's ability to tackle scalable and innovative projects.\n</reasoning>",
     "reasoning": "The best project by Rutwik is the **serverless backend optimized with AWS Lambda, Dynamo DB, and S3**, as it demonstrates scalability and cost efficiency, aligning with the resume's emphasis on optimizing resources. Additionally, the **e-commerce platform** project showcases technical expertise and real-world application. Other projects like secure authentication, dashboard, and interactive quizzes also highlight key skills and contributions. These projects reflect Rutwik's ability to tackle scalable and innovative projects."
   }

───────────────────────────────────

Total Agents: 6
Completed: 6
Generated: 06/08/2025, 19:13:53
