# doc2 was flagged relavent why?
🧠 DataInspector Document 2 LLM Response: <think>
Okay, let's see. The user provided a document content and wants me to analyze it. The document is about Tyler Romero's blog post. The sample content shows Tyler's posts about training GPT-2 and running speed. The user's query is "give the best project by Rutwik," but the document doesn't mention Rutwik. So, the answer should be that the document is about Tyler Romero, and since the query is about Rutwik, it's irrelevant. I need to check if there's any other mention of Rutwik, but the sam...
DataInspectorAgent.ts:472 🔍 DataInspector Document 2 Parsed: {docType: 'Blog', primaryEntity: 'Tyler Romero', relevantText: 'YES', reasoning: "The document contains Tyler Romero's blog post dis…ing GPT-2 training, which is directly relevant..."}
DataInspectorAgent.ts:355 🔍 Document 2 intelligent analysis: {docType: 'Blog', primaryEntity: 'Tyler Romero', isRelevant: true, reasoning: "The document contains Tyler Romero's blog post dis…ing GPT-2 training, which is directly relevant..."}

# output
<think>
Okay, let's see. The user wants me to rank and attribute items from multiple documents. First, I need to extract comparable skills or achievements. Let me look through all the documents.

In the first document, there's mention of using MERN stack and Next.js for scalability. That's a skill, so I can rank that. Then, integrating Stripe and Razorpay for secure transactions, that's another skill. Authored AI research papers is another. A provider dashboard for bookings is third. All these are from different documents, so they can be combined.

I need to attribute each item properly. For example, the MERN stack is from the On-Demand Services Platform. The Stripe/Razorpay integration is from the same documents. The provider dashboard is mentioned in two documents. The AI research papers are from one document. 

Now, structuring the answer with the reasoning process and final answer. Make sure not to mix entities from different documents and cross-reason. Check all rules again. Yep, looks good. Final answer should list the skills in order with their owners. 

Wait, the user mentioned to start with reasoning, so the first part explains the process. Then the final answer. That's all. Let me put that together.


Okay, let me start by understanding the problem. The user wants me to rank and attribute items from multiple documents. First, I need to extract comparable items from all the documents. Then, clearly attribute each item to its owner.

Looking at the documents, there's a lot of information about Rutwik Shinde's experience and skills. Let me check each document to find relevant points. 

First, the key achievements mention creating technical documentation and optimizing legacy codebases. That's from one document, so I need to attribute that. Also, the use of React Query and Next.js is mentioned in another document, so that's an achievement. 

For the ranking, I need to list items that are comparable. For example, the use of MERN stack and Next.js is mentioned in multiple documents, so that's a ranking. Similarly, integrating Stripe and Razorpay is part of the same documents. 

I need to ensure that each item is attributed correctly. For example, when combining lists, specify whose achievement each item represents. Also, check for any contradictions between the documents. 

One challenge is combining items that come from different documents. For instance, a single achievement might be linked to multiple documents. I need to make sure each item is correctly attributed without mixing them. 

Finally, structure the response with the reasoning process and the final answer, making sure to follow all the critical rules.


# agent 
🤖 Multi-Agent Process Details
════════════════════════════════════════

1. DataInspector ✅
   Type: DataInspector
   Status: completed
   Progress: 100%
   Duration: 71581ms
   
   📤 Full Output:
   {
     "documentAnalysis": {
       "documentType": "Multi-Document Analysis",
       "structure": [
         "RESUME",
         "Blog"
       ],
       "contentAreas": [
         "<think>\nOkay",
         "let's see. The user provided a document type called \"Resume\" and a sample content. They want me to analyze the document and list the main content areas based on the sample content.\n\nFirst",
         "I need to look at the sample content. The sample starts with Rutwik Shinde",
         "his contact info",
         "and his LinkedIn and GitHub links. Then there's a resume-like experience section. The sample mentions \"Full Stack AI Developer",
         "Ai Edx (Remote) 01/2024 – Present\" with specific technologies like Next.js",
         "Sanity CMS",
         "and MongoDB. Also",
         "they talk about working with 10+ shops and online brands",
         "product listings",
         "and order flow with cart",
         "address",
         "checkout",
         "and payment.\n\nSo",
         "breaking it down",
         "the main sections would be the resume header (contact info)",
         "the experience section (his name",
         "company",
         "dates",
         "experience)",
         "and the project experience (specific projects and technologies used). I need to list these sections as specific types of information.\n\nWait",
         "the sample content is in a resume format",
         "so the main sections are typically the contact details",
         "the experience",
         "and maybe the projects. Let me check again. The sample includes his name",
         "contact info",
         "LinkedIn",
         "GitHub",
         "then the experience with dates and roles",
         "mentioning technologies and projects. So the main content areas are contact info",
         "experience",
         "and projects. Each of these should be listed as specific types. I need to make sure I don't assume anything beyond what's provided. So the answer should be those three sections.\n</think>\n\n- Contact Information  \n- Professional Experience  \n- Projects & Technologies",
         "<think>\nOkay",
         "let's see. The user provided a document type called Blog and some sample content. They want me to analyze the actual structure of this blog based on the sample content.\n\nFirst",
         "I need to look at the sample content. The sample starts with Tyler Romero's posts",
         "then lists the topics: \"Nano GPT Speedrun Living Worklog How fast can I train GPT-2 on two RTX 4090 GPUs? March 8",
         "2025 I’ve seen some... really really really really really really really really really really really really really awesome awesome awesome awesome awesome awesome awesome a\" to 216k tokens/second. Then there's a mention of increasing training steps to 3.31B tokens and a new run time of 4.26 hours. The part about the validation loss target is also mentioned.\n\nSo",
         "putting this all together",
         "the main sections would be the title or the main post. The sample content includes the date",
         "the topics covered",
         "the number of tokens",
         "training steps",
         "and run time. The user wants specific types of information",
         "so I need to list them as per the content. The main areas here are the topics like speedrun",
         "GPT training",
         "RTX 4090 GPUs",
         "and the performance metrics. Also",
         "the date and the validation loss target are part of the content. I should make sure not to include any assumptions and just describe what's there based on the content.\n</think>\n\n- **Date**: March 8",
         "2025  \n- **Topics**:  \n  - Speedrun training  \n  - GPT-2 training on two RTX 4090 GPUs  \n  - Training token usage (216k tokens/second)  \n- **Performance metrics**:  \n  - Increased training steps to 3.31B tokens  \n  - New run time: 4.26 hours  \n- **Validation loss target**: Mentioned for consistency."
       ],
       "queryIntent": "Extract information from 2 relevant documents",
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
             "let's see. The user provided a document type called \"Resume\" and a sample content. They want me to analyze the document and list the main content areas based on the sample content.\n\nFirst",
             "I need to look at the sample content. The sample starts with Rutwik Shinde",
             "his contact info",
             "and his LinkedIn and GitHub links. Then there's a resume-like experience section. The sample mentions \"Full Stack AI Developer",
             "Ai Edx (Remote) 01/2024 – Present\" with specific technologies like Next.js",
             "Sanity CMS",
             "and MongoDB. Also",
             "they talk about working with 10+ shops and online brands",
             "product listings",
             "and order flow with cart",
             "address",
             "checkout",
             "and payment.\n\nSo",
             "breaking it down",
             "the main sections would be the resume header (contact info)",
             "the experience section (his name",
             "company",
             "dates",
             "experience)",
             "and the project experience (specific projects and technologies used). I need to list these sections as specific types of information.\n\nWait",
             "the sample content is in a resume format",
             "so the main sections are typically the contact details",
             "the experience",
             "and maybe the projects. Let me check again. The sample includes his name",
             "contact info",
             "LinkedIn",
             "GitHub",
             "then the experience with dates and roles",
             "mentioning technologies and projects. So the main content areas are contact info",
             "experience",
             "and projects. Each of these should be listed as specific types. I need to make sure I don't assume anything beyond what's provided. So the answer should be those three sections.\n</think>\n\n- Contact Information  \n- Professional Experience  \n- Projects & Technologies"
           ],
           "keyEntities": [
             {
               "name": "Rutwik Shinde",
               "type": "person",
               "context": "Software Developer",
               "isOwner": false
             },
             {
               "name": "Ai Edx",
               "type": "company",
               "context": "Full Stack AI Developer",
               "isOwner": false
             },
             {
               "name": "Projects",
               "type": "project",
               "context": "End-to-end order flow",
               "isOwner": false
             },
             {
               "name": "Rutwik Shinde",
               "type": "person",
               "context": "Software Developer",
               "isOwner": false
             },
             {
               "name": "Ai Edx",
               "type": "company",
               "context": "Full Stack AI Developer",
               "isOwner": false
             },
             {
               "name": "Projects",
               "type": "project",
               "context": "End-to-end order flow",
               "isOwner": false
             },
             {
               "name": "Rutwik Shinde",
               "type": "person",
               "context": "Software Developer",
               "isOwner": false
             },
             {
               "name": "Ai Edx",
               "type": "company",
               "context": "Full Stack AI Developer",
               "isOwner": false
             },
             {
               "name": "Projects",
               "type": "project",
               "context": "End-to-end order flow",
               "isOwner": false
             }
           ],
           "role": "reference"
         },
         {
           "documentId": "doc_1754311559806_f7eqwqkcn",
           "documentName": "doc_1754311559806_f7eqwqkcn",
           "documentType": "Blog",
           "primaryEntity": "Tyler Romero",
           "structure": [
             "blog sections"
           ],
           "contentAreas": [
             "<think>\nOkay",
             "let's see. The user provided a document type called Blog and some sample content. They want me to analyze the actual structure of this blog based on the sample content.\n\nFirst",
             "I need to look at the sample content. The sample starts with Tyler Romero's posts",
             "then lists the topics: \"Nano GPT Speedrun Living Worklog How fast can I train GPT-2 on two RTX 4090 GPUs? March 8",
             "2025 I’ve seen some... really really really really really really really really really really really really really awesome awesome awesome awesome awesome awesome awesome a\" to 216k tokens/second. Then there's a mention of increasing training steps to 3.31B tokens and a new run time of 4.26 hours. The part about the validation loss target is also mentioned.\n\nSo",
             "putting this all together",
             "the main sections would be the title or the main post. The sample content includes the date",
             "the topics covered",
             "the number of tokens",
             "training steps",
             "and run time. The user wants specific types of information",
             "so I need to list them as per the content. The main areas here are the topics like speedrun",
             "GPT training",
             "RTX 4090 GPUs",
             "and the performance metrics. Also",
             "the date and the validation loss target are part of the content. I should make sure not to include any assumptions and just describe what's there based on the content.\n</think>\n\n- **Date**: March 8",
             "2025  \n- **Topics**:  \n  - Speedrun training  \n  - GPT-2 training on two RTX 4090 GPUs  \n  - Training token usage (216k tokens/second)  \n- **Performance metrics**:  \n  - Increased training steps to 3.31B tokens  \n  - New run time: 4.26 hours  \n- **Validation loss target**: Mentioned for consistency."
           ],
           "keyEntities": [
             {
               "name": "Tyler Romero",
               "type": "Person",
               "context": "User",
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
   Duration: 9707ms
   
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
   Duration: 21647ms
   
   📤 Full Output:
   {
     "patterns": [
       {
         "description": "RESUME extraction pattern for Rutwik Shinde",
         "examples": [
           "<think>\nOkay",
           "let's see. The user provided a document type called \"Resume\" and a sample content. They want me to analyze the document and list the main content areas based on the sample content.\n\nFirst",
           "I need to look at the sample content. The sample starts with Rutwik Shinde",
           "his contact info",
           "and his LinkedIn and GitHub links. Then there's a resume-like experience section. The sample mentions \"Full Stack AI Developer",
           "Ai Edx (Remote) 01/2024 – Present\" with specific technologies like Next.js",
           "Sanity CMS",
           "and MongoDB. Also",
           "they talk about working with 10+ shops and online brands",
           "product listings",
           "and order flow with cart",
           "address",
           "checkout",
           "and payment.\n\nSo",
           "breaking it down",
           "the main sections would be the resume header (contact info)",
           "the experience section (his name",
           "company",
           "dates",
           "experience)",
           "and the project experience (specific projects and technologies used). I need to list these sections as specific types of information.\n\nWait",
           "the sample content is in a resume format",
           "so the main sections are typically the contact details",
           "the experience",
           "and maybe the projects. Let me check again. The sample includes his name",
           "contact info",
           "LinkedIn",
           "GitHub",
           "then the experience with dates and roles",
           "mentioning technologies and projects. So the main content areas are contact info",
           "experience",
           "and projects. Each of these should be listed as specific types. I need to make sure I don't assume anything beyond what's provided. So the answer should be those three sections.\n</think>\n\n- Contact Information  \n- Professional Experience  \n- Projects & Technologies"
         ],
         "extractionStrategy": "Extract <think>\nOkay, let's see. The user provided a document type called \"Resume\" and a sample content. They want me to analyze the document and list the main content areas based on the sample content.\n\nFirst, I need to look at the sample content. The sample starts with Rutwik Shinde, his contact info, and his LinkedIn and GitHub links. Then there's a resume-like experience section. The sample mentions \"Full Stack AI Developer, Ai Edx (Remote) 01/2024 – Present\" with specific technologies like Next.js, Sanity CMS, and MongoDB. Also, they talk about working with 10+ shops and online brands, product listings, and order flow with cart, address, checkout, and payment.\n\nSo, breaking it down, the main sections would be the resume header (contact info), the experience section (his name, company, dates, experience), and the project experience (specific projects and technologies used). I need to list these sections as specific types of information.\n\nWait, the sample content is in a resume format, so the main sections are typically the contact details, the experience, and maybe the projects. Let me check again. The sample includes his name, contact info, LinkedIn, GitHub, then the experience with dates and roles, mentioning technologies and projects. So the main content areas are contact info, experience, and projects. Each of these should be listed as specific types. I need to make sure I don't assume anything beyond what's provided. So the answer should be those three sections.\n</think>\n\n- Contact Information  \n- Professional Experience  \n- Projects & Technologies from doc_1754292542574_sgxyitqvj",
         "confidence": 0.9
       },
       {
         "description": "Blog extraction pattern for Tyler Romero",
         "examples": [
           "<think>\nOkay",
           "let's see. The user provided a document type called Blog and some sample content. They want me to analyze the actual structure of this blog based on the sample content.\n\nFirst",
           "I need to look at the sample content. The sample starts with Tyler Romero's posts",
           "then lists the topics: \"Nano GPT Speedrun Living Worklog How fast can I train GPT-2 on two RTX 4090 GPUs? March 8",
           "2025 I’ve seen some... really really really really really really really really really really really really really awesome awesome awesome awesome awesome awesome awesome a\" to 216k tokens/second. Then there's a mention of increasing training steps to 3.31B tokens and a new run time of 4.26 hours. The part about the validation loss target is also mentioned.\n\nSo",
           "putting this all together",
           "the main sections would be the title or the main post. The sample content includes the date",
           "the topics covered",
           "the number of tokens",
           "training steps",
           "and run time. The user wants specific types of information",
           "so I need to list them as per the content. The main areas here are the topics like speedrun",
           "GPT training",
           "RTX 4090 GPUs",
           "and the performance metrics. Also",
           "the date and the validation loss target are part of the content. I should make sure not to include any assumptions and just describe what's there based on the content.\n</think>\n\n- **Date**: March 8",
           "2025  \n- **Topics**:  \n  - Speedrun training  \n  - GPT-2 training on two RTX 4090 GPUs  \n  - Training token usage (216k tokens/second)  \n- **Performance metrics**:  \n  - Increased training steps to 3.31B tokens  \n  - New run time: 4.26 hours  \n- **Validation loss target**: Mentioned for consistency."
         ],
         "extractionStrategy": "Extract <think>\nOkay, let's see. The user provided a document type called Blog and some sample content. They want me to analyze the actual structure of this blog based on the sample content.\n\nFirst, I need to look at the sample content. The sample starts with Tyler Romero's posts, then lists the topics: \"Nano GPT Speedrun Living Worklog How fast can I train GPT-2 on two RTX 4090 GPUs? March 8, 2025 I’ve seen some... really really really really really really really really really really really really really awesome awesome awesome awesome awesome awesome awesome a\" to 216k tokens/second. Then there's a mention of increasing training steps to 3.31B tokens and a new run time of 4.26 hours. The part about the validation loss target is also mentioned.\n\nSo, putting this all together, the main sections would be the title or the main post. The sample content includes the date, the topics covered, the number of tokens, training steps, and run time. The user wants specific types of information, so I need to list them as per the content. The main areas here are the topics like speedrun, GPT training, RTX 4090 GPUs, and the performance metrics. Also, the date and the validation loss target are part of the content. I should make sure not to include any assumptions and just describe what's there based on the content.\n</think>\n\n- **Date**: March 8, 2025  \n- **Topics**:  \n  - Speedrun training  \n  - GPT-2 training on two RTX 4090 GPUs  \n  - Training token usage (216k tokens/second)  \n- **Performance metrics**:  \n  - Increased training steps to 3.31B tokens  \n  - New run time: 4.26 hours  \n- **Validation loss target**: Mentioned for consistency. from doc_1754311559806_f7eqwqkcn",
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
         "extractionStrategy": "Direct regex search using: /[^\\n]/g",
         "confidence": 0.9,
         "regexPattern": "/[^\\n]/g"
       },
       {
         "description": "LLM-generated regex pattern 3",
         "examples": [],
         "extractionStrategy": "Direct regex search using: /(\\s*[0-9]+)/g",
         "confidence": 0.9,
         "regexPattern": "/(\\s*[0-9]+)/g"
       },
       {
         "description": "LLM-generated regex pattern 4",
         "examples": [],
         "extractionStrategy": "Direct regex search using: /([^\\n\\d]+)/g",
         "confidence": 0.9,
         "regexPattern": "/([^\\n\\d]+)/g"
       },
       {
         "description": "LLM-generated regex pattern 5",
         "examples": [],
         "extractionStrategy": "Direct regex search using: /(\\s*[0-9]+)/g",
         "confidence": 0.9,
         "regexPattern": "/(\\s*[0-9]+)/g"
       }
     ],
     "patternCount": 7,
     "extractionStrategies": {
       "generatedPatterns": [
         "/•\\s*([^\\n•]+)/g",
         "/[^\\n]/g",
         "/(\\s*[0-9]+)/g",
         "/([^\\n\\d]+)/g",
         "/(\\s*[0-9]+)/g"
       ],
       "generationMethod": "llm_dynamic_regex",
       "basedOnDocumentAnalysis": false,
       "timestamp": 1754476488325,
       "agentSource": "PatternGenerator",
       "llmResponse": "<think>\nOkay, let's start by looking at the user's query: \"give the best project by Rutwik\". They want me to analyze the provided document content and extract patterns that identify what data structures are present. The user specified that I need to use actual data, not assumptions, and generate patterns based on the actual text.\n\nFirst, I need to look at the actual document content. The user provided three samples, each with different project descriptions. Let me go through each one.\n\nSample 1: Rutwik Shinde's information includes his role as a Software Developer, his contact details, and some projects. The projects mention building a frontend architecture and a secure authentication system. There's a bullet point here: \"• Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback.\" So here's a project, and the data value is the number of iterations (rarely mentioned). \n\nSample 2: It talks about using Next.js, Sanity, and MongoDB for a project. The projects include dynamic product listings, end-to-end order flow, and integrating Stripe. The data here could be the number of shops or brands mentioned (10+), the duration of the project (not explicitly stated but inferred from the context). \n\nSample 3: The project is about training GPT-2, mentioning a speedrun. The data here is a time frame: March 8, 2025, which is a date, and the number is 4.26 hours. The project's success is measured by the time they ran it. \n\nSample 4: It discusses training GPT with 216k tokens/second. The data here is the number of tokens (216k) per second, and the time required to complete the training (3.31B tokens). \n\nNow, I need to extract measurable data values from these samples. For each project, the data is either a number, a time period, or a performance metric. Let me check each sample for relevant data.\n\nIn Sample 1, the project's iteration count is mentioned. In Sample 2, the number of shops is given. In Sample 3, the time is mentioned. In Sample 4, the tokens per second and the time required are there. \n\nNow, I need to create regex patterns based on these structures. For example, in Sample 1, the iteration count is a number. In Sample 2, the number of shops is a value. In Sample 3, the time is a duration. In Sample 4, the tokens per second and the time are both metrics.\n\nLet me structure the regex patterns accordingly. For each data structure, I'll create a pattern that matches the actual text. For example, in Sample 1, the bullet point has the iteration count, so the pattern would be /•\\s*([^\\n•]+)/g. In Sample 2, the number of shops is captured as /[^\\n]/g. In Sample 3, the time is captured as /(\\s*[0-9]+)/g. In Sample 4, the tokens per second and time are both metrics, so the patterns would be /([^\\n\\d]+)/g and /(\\s*[0-9]+)/g.\n\nI need to make sure each pattern starts with a hyphen and ends with the flags. Also, check for any other patterns that might be relevant. For example, in Sample 3, the date and time are mentioned, so the pattern could be /([^\\n\\s]+)/g. Finally, ensure that I don't include any generic patterns and only the specific ones observed in the document.\n</think>\n\nREGEX_PATTERNS:\n- /•\\s*([^\\n•]+)/g\n- /[^\\n]/g\n- /(\\s*[0-9]+)/g\n- /([^\\n\\d]+)/g\n- /(\\s*[0-9]+)/g  \n\nReasoning:  \n1. In *Sample 1*, the iteration count (number) is captured as a value.  \n2. In *Sample 2*, the number of shops is explicitly stated.  \n3. In *Sample 3*, the time duration is captured as a numeric value.  \n4. In *Sample 4*, both token performance metrics and training time are measurable.  \n\nThese patterns directly reflect the data structures present in the document, ensuring accuracy by focusing on specific numerical or time-based measurements."
     },
     "reasoning": "Pattern generation completed"
   }

───────────────────────────────────

4. Extractor ✅
   Type: Extractor
   Status: completed
   Progress: 100%
   Duration: 23ms
   
   📤 Full Output:
   {
     "extractedData": {
       "raw": [
         {
           "content": "speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-",
           "value": "speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-",
           "unit": "",
           "context": " speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-"
           },
           "originalContent": "speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-"
         },
         {
           "content": "on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to",
           "value": "on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to",
           "unit": "",
           "context": " on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to "
           },
           "originalContent": "on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to"
         },
         {
           "content": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of",
           "value": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of",
           "unit": "",
           "context": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of "
           },
           "originalContent": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of"
         },
         {
           "content": "– Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S",
           "value": "– Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S",
           "unit": "",
           "context": " – Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " – Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S"
           },
           "originalContent": "– Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S"
         },
         {
           "content": "Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA",
           "value": "•Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA:",
           "unit": "",
           "context": " •Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " •Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: "
           },
           "originalContent": "•Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA:"
         },
         {
           "content": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by",
           "value": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by",
           "unit": "",
           "context": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by "
           },
           "originalContent": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by"
         },
         {
           "content": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for",
           "value": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for",
           "unit": "",
           "context": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for"
           },
           "originalContent": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for"
         },
         {
           "content": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by",
           "value": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by",
           "unit": "",
           "context": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by "
           },
           "originalContent": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by"
         },
         {
           "content": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page (",
           "value": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page (",
           "unit": "",
           "context": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page (",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page ("
           },
           "originalContent": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page ("
         },
         {
           "content": "I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-",
           "value": "I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-",
           "unit": "",
           "context": " I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-"
           },
           "originalContent": "I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-"
         },
         {
           "content": "node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan",
           "value": "node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan",
           "unit": "",
           "context": " node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan"
           },
           "originalContent": "node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan"
         },
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
           "content": "Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of",
           "value": "Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of",
           "unit": "",
           "context": " Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of "
           },
           "originalContent": "Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of"
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
           "content": "validation loss target, we have also slightly increased the total number of training steps, so now",
           "value": "validation loss target, we have also slightly increased the total number of training steps, so now",
           "unit": "",
           "context": " validation loss target, we have also slightly increased the total number of training steps, so now ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " validation loss target, we have also slightly increased the total number of training steps, so now "
           },
           "originalContent": "validation loss target, we have also slightly increased the total number of training steps, so now"
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
           "content": "tokens into an element of the batch without regard for where the document starts or stops.",
           "value": "tokens into an element of the batch without regard for where the document starts or stops.",
           "unit": "",
           "context": " tokens into an element of the batch without regard for where the document starts or stops.",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " tokens into an element of the batch without regard for where the document starts or stops."
           },
           "originalContent": "tokens into an element of the batch without regard for where the document starts or stops."
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
           "content": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-",
           "value": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-",
           "unit": "",
           "context": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-"
           },
           "originalContent": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-"
         },
         {
           "content": "tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next",
           "value": "tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next",
           "unit": "",
           "context": " tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next "
           },
           "originalContent": "tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next"
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
           "content": "and initially used to improve the Nano GPT speedrun by @Grad",
           "value": "and initially used to improve the Nano GPT speedrun by @Grad",
           "unit": "",
           "context": " and initially used to improve the Nano GPT speedrun by @Grad",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " and initially used to improve the Nano GPT speedrun by @Grad"
           },
           "originalContent": "and initially used to improve the Nano GPT speedrun by @Grad"
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
           "content": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune)",
           "value": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune)",
           "unit": "",
           "context": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) "
           },
           "originalContent": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune)"
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
           "content": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕",
           "value": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕:",
           "unit": "",
           "context": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕: ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕: "
           },
           "originalContent": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕:"
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
           "content": "Logit Soft-capping Logit soft-capping is a technique popularized by Gemma",
           "value": "Logit Soft-capping Logit soft-capping is a technique popularized by Gemma",
           "unit": "",
           "context": " Logit Soft-capping Logit soft-capping is a technique popularized by Gemma ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " Logit Soft-capping Logit soft-capping is a technique popularized by Gemma "
           },
           "originalContent": "Logit Soft-capping Logit soft-capping is a technique popularized by Gemma"
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
           "content": "k tokens/second. In order to make runs more consistently hit the",
           "value": "k tokens/second. In order to make runs more consistently hit the",
           "unit": "",
           "context": "k tokens/second. In order to make runs more consistently hit the ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "k tokens/second. In order to make runs more consistently hit the "
           },
           "originalContent": "k tokens/second. In order to make runs more consistently hit the"
         },
         {
           "content": "(and doing some learning-rate tuning), the new run time is",
           "value": "(and doing some learning-rate tuning), the new run time is",
           "unit": "",
           "context": " (and doing some learning-rate tuning), the new run time is ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " (and doing some learning-rate tuning), the new run time is "
           },
           "originalContent": "(and doing some learning-rate tuning), the new run time is"
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
           "content": "validation loss on Fine Web as fast as possible on an",
           "value": "validation loss on Fine Web as fast as possible on an",
           "unit": "",
           "context": " validation loss on Fine Web as fast as possible on an ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " validation loss on Fine Web as fast as possible on an "
           },
           "originalContent": "validation loss on Fine Web as fast as possible on an"
         },
         {
           "content": "softcap(x, cap)=cap⋅tanh(capx) ----------------Page (",
           "value": "softcap(x, cap)=cap⋅tanh(capx) ----------------Page (",
           "unit": "",
           "context": " softcap(x, cap)=cap⋅tanh(capx) ----------------Page (",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " softcap(x, cap)=cap⋅tanh(capx) ----------------Page ("
           },
           "originalContent": "softcap(x, cap)=cap⋅tanh(capx) ----------------Page ("
         },
         {
           "content": "Rutwik Shinde Software Developer | Pune rutwikshinde",
           "value": "Rutwik Shinde Software Developer | Pune rutwikshinde",
           "unit": "",
           "context": "Rutwik Shinde Software Developer | Pune rutwikshinde",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "Rutwik Shinde Software Developer | Pune rutwikshinde"
           },
           "originalContent": "Rutwik Shinde Software Developer | Pune rutwikshinde"
         },
         {
           "content": "Experience Full Stack AI Developer, Ai Edx (Remote)",
           "value": "Experience Full Stack AI Developer, Ai Edx (Remote)",
           "unit": "",
           "context": " Experience Full Stack AI Developer, Ai Edx (Remote) ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " Experience Full Stack AI Developer, Ai Edx (Remote) "
           },
           "originalContent": "Experience Full Stack AI Developer, Ai Edx (Remote)"
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
           "content": "with Next.js, Sanity CMS, and Mongo DB. •Used by",
           "value": "with Next.js, Sanity CMS, and Mongo DB. •Used by",
           "unit": "",
           "context": "with Next.js, Sanity CMS, and Mongo DB. •Used by ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "with Next.js, Sanity CMS, and Mongo DB. •Used by "
           },
           "originalContent": "with Next.js, Sanity CMS, and Mongo DB. •Used by"
         },
         {
           "content": "d. At this point, we code that can train GPT-",
           "value": "d. At this point, we code that can train GPT-",
           "unit": "",
           "context": "d. At this point, we code that can train GPT-",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "d. At this point, we code that can train GPT-"
           },
           "originalContent": "d. At this point, we code that can train GPT-"
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
           "content": "B tokens are consumed. The new run time is",
           "value": "B tokens are consumed. The new run time is",
           "unit": "",
           "context": "B tokens are consumed. The new run time is ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "B tokens are consumed. The new run time is "
           },
           "originalContent": "B tokens are consumed. The new run time is"
         },
         {
           "content": "hours, and the changes can be found at d",
           "value": "hours, and the changes can be found at d",
           "unit": "",
           "context": " hours, and the changes can be found at d",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " hours, and the changes can be found at d"
           },
           "originalContent": "hours, and the changes can be found at d"
         },
         {
           "content": "almost twice as fast as the baseline.",
           "value": "almost twice as fast as the baseline.",
           "unit": "",
           "context": " almost twice as fast as the baseline. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " almost twice as fast as the baseline. "
           },
           "originalContent": "almost twice as fast as the baseline."
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
           "content": "). Throughput remained steady at ~",
           "value": "). Throughput remained steady at ~",
           "unit": "",
           "context": "). Throughput remained steady at ~",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "). Throughput remained steady at ~"
           },
           "originalContent": "). Throughput remained steady at ~"
         },
         {
           "content": "| linkedin.com/in/rutwik",
           "value": "| linkedin.com/in/rutwik",
           "unit": "",
           "context": " | linkedin.com/in/rutwik",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " | linkedin.com/in/rutwik"
           },
           "originalContent": "| linkedin.com/in/rutwik"
         },
         {
           "content": ") Break----------------",
           "value": ") Break----------------",
           "unit": "",
           "context": ") Break----------------",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": ") Break----------------"
           },
           "originalContent": ") Break----------------"
         },
         {
           "content": "| github.com/rutwik",
           "value": "| github.com/rutwik",
           "unit": "",
           "context": " | github.com/rutwik",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " | github.com/rutwik"
           },
           "originalContent": "| github.com/rutwik"
         },
         {
           "content": "Key Achievements •",
           "value": "Key Achievements •",
           "unit": "",
           "context": " Key Achievements •",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " Key Achievements •"
           },
           "originalContent": "Key Achievements •"
         },
         {
           "content": "hours, requiring",
           "value": "hours, requiring",
           "unit": "",
           "context": " hours, requiring ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " hours, requiring "
           },
           "originalContent": "hours, requiring"
         },
         {
           "content": "B tokens (commit",
           "value": "B tokens (commit",
           "unit": "",
           "context": "B tokens (commit ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "B tokens (commit "
           },
           "originalContent": "B tokens (commit"
         },
         {
           "content": "k tokens/second.",
           "value": "k tokens/second.",
           "unit": "",
           "context": "k tokens/second. ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "k tokens/second. "
           },
           "originalContent": "k tokens/second."
         },
         {
           "content": "@gmail.com |",
           "value": "@gmail.com |",
           "unit": "",
           "context": "@gmail.com | ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "@gmail.com | "
           },
           "originalContent": "@gmail.com |"
         },
         {
           "content": "GPUs? March",
           "value": "GPUs? March",
           "unit": "",
           "context": " GPUs? March ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " GPUs? March "
           },
           "originalContent": "GPUs? March"
         },
         {
           "content": "9370947507",
           "value": "9370947507",
           "unit": "",
           "context": " 9370947507",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/(\\s*[0-9]+)/g",
             "patternDescription": "LLM-generated regex pattern 3",
             "fullMatch": " 9370947507"
           },
           "originalContent": "9370947507"
         },
         {
           "content": "on two RTX",
           "value": "on two RTX",
           "unit": "",
           "context": " on two RTX ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": " on two RTX "
           },
           "originalContent": "on two RTX"
         },
         {
           "content": "62304977",
           "value": "62304977",
           "unit": "",
           "context": "62304977",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/(\\s*[0-9]+)/g",
             "patternDescription": "LLM-generated regex pattern 3",
             "fullMatch": "62304977"
           },
           "originalContent": "62304977"
         },
         {
           "content": "59944",
           "value": "59944",
           "unit": "",
           "context": "59944",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/(\\s*[0-9]+)/g",
             "patternDescription": "LLM-generated regex pattern 3",
             "fullMatch": "59944"
           },
           "originalContent": "59944"
         },
         {
           "content": "Gemma",
           "value": "Gemma",
           "unit": "",
           "context": "Gemma ",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "Gemma "
           },
           "originalContent": "Gemma"
         },
         {
           "content": "@Grad",
           "value": "@Grad",
           "unit": "",
           "context": "@Grad",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "@Grad"
           },
           "originalContent": "@Grad"
         },
         {
           "content": "2024",
           "value": "2024",
           "unit": "",
           "context": "2024",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/(\\s*[0-9]+)/g",
             "patternDescription": "LLM-generated regex pattern 3",
             "fullMatch": "2024"
           },
           "originalContent": "2024"
         },
         {
           "content": "2022",
           "value": "2022",
           "unit": "",
           "context": "2022",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/(\\s*[0-9]+)/g",
             "patternDescription": "LLM-generated regex pattern 3",
             "fullMatch": "2022"
           },
           "originalContent": "2022"
         },
         {
           "content": "2020",
           "value": "2020",
           "unit": "",
           "context": "2020",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
           "sourceDocument": "Rutwik_resume.pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/(\\s*[0-9]+)/g",
             "patternDescription": "LLM-generated regex pattern 3",
             "fullMatch": "2020"
           },
           "originalContent": "2020"
         },
         {
           "content": "4090",
           "value": "4090",
           "unit": "",
           "context": " 4090",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/(\\s*[0-9]+)/g",
             "patternDescription": "LLM-generated regex pattern 3",
             "fullMatch": " 4090"
           },
           "originalContent": "4090"
         },
         {
           "content": "2025",
           "value": "2025",
           "unit": "",
           "context": " 2025",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/(\\s*[0-9]+)/g",
             "patternDescription": "LLM-generated regex pattern 3",
             "fullMatch": " 2025"
           },
           "originalContent": "2025"
         },
         {
           "content": "4412",
           "value": "4412",
           "unit": "",
           "context": "4412",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/(\\s*[0-9]+)/g",
             "patternDescription": "LLM-generated regex pattern 3",
             "fullMatch": "4412"
           },
           "originalContent": "4412"
         },
         {
           "content": "1024",
           "value": "1024",
           "unit": "",
           "context": " 1024",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/(\\s*[0-9]+)/g",
             "patternDescription": "LLM-generated regex pattern 3",
             "fullMatch": " 1024"
           },
           "originalContent": "1024"
         },
         {
           "content": "GPT-",
           "value": "GPT-",
           "unit": "",
           "context": "GPT-",
           "confidence": 0.95,
           "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
           "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
           "metadata": {
             "extractionMethod": "regex_pattern",
             "regexPattern": "/([^\\n\\d]+)/g",
             "patternDescription": "LLM-generated regex pattern 4",
             "fullMatch": "GPT-"
           },
           "originalContent": "GPT-"
         }
       ],
       "structured": [
         {
           "items": [
             {
               "content": "speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-",
               "value": "speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-",
               "unit": "",
               "context": " speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-"
               },
               "originalContent": "speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-"
             }
           ],
           "bestItem": {
             "content": "speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-",
             "value": "speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-",
             "unit": "",
             "context": " speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-"
             },
             "originalContent": "speedrun results from people like Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan Keller Jordan, Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern Fern, Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky Braden Koszarsky, and others. I got a little inspired and wanted to see how fast I could train GPT-"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to",
               "value": "on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to",
               "unit": "",
               "context": " on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to "
               },
               "originalContent": "on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to"
             }
           ],
           "bestItem": {
             "content": "on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to",
             "value": "on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to",
             "unit": "",
             "context": " on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to "
             },
             "originalContent": "on my own hardware. Technically, the Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrunthe Nano GPT speedrun is to train a neural network to"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of",
               "value": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of",
               "unit": "",
               "context": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of "
               },
               "originalContent": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of"
             }
           ],
           "bestItem": {
             "content": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of",
             "value": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of",
             "unit": "",
             "context": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of "
             },
             "originalContent": ") Break---------------- Logit soft-capping prevents logits from growing excessively large by scaling them to a fixed range, which seems to help improve training dynamics. One could argue that this is imposing an inductive bias - and since we’re in a relatively small model/low data regime that this is helpful. After implementing logit soft-capping with a cap of"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "– Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S",
               "value": "– Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S",
               "unit": "",
               "context": " – Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " – Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S"
               },
               "originalContent": "– Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S"
             }
           ],
           "bestItem": {
             "content": "– Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S",
             "value": "– Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S",
             "unit": "",
             "context": " – Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " – Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S"
             },
             "originalContent": "– Present •Built and maintained the complete frontend architecture, iterating rapidly based on user and client feedback. •Developed a secure authentication system with role-based access control (RBAC) and a user management dash- board for seamless admin control. •Integrated Git Hub API, Razorpay payment gateway, and Eleven Labs API, enhancing platform functionality. •Engineered real-time features using Web Sockets for live collaboration and instant updates. •Designed a serverless backend with AWS Lambda, Dynamo DB, and S"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA",
               "value": "•Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA:",
               "unit": "",
               "context": " •Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " •Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: "
               },
               "originalContent": "•Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA:"
             }
           ],
           "bestItem": {
             "content": "Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA",
             "value": "•Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA:",
             "unit": "",
             "context": " •Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " •Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA: "
             },
             "originalContent": "•Developed e-commerce platforms, inventory systems, and business landing pages. •Engineered scalable systems with Next.js, Postgre SQL, and Node.js. •Integrated payment gateways and Sanity CMS. •Created technical documentation and optimized legacy codebases. Education B. Tech in Information Technology, JSPM RSCOE (CGPA:"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by",
               "value": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by",
               "unit": "",
               "context": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by "
               },
               "originalContent": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by"
             }
           ],
           "bestItem": {
             "content": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by",
             "value": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by",
             "unit": "",
             "context": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by "
             },
             "originalContent": "st place in nationwide Waving the Web Hackathon. •Authored and implemented AI research papers published by Springer. •Qualified for Smart India Hackathon Nationals and contributed to open source during Hacktoberfest. Projects E-commerce Platform for Small Businesses •Scalable and responsive web application built with Next.js, Sanity CMS, and Mongo DB. •Used by"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for",
               "value": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for",
               "unit": "",
               "context": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for"
               },
               "originalContent": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for"
             }
           ],
           "bestItem": {
             "content": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for",
             "value": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for",
             "unit": "",
             "context": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for"
             },
             "originalContent": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by",
               "value": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by",
               "unit": "",
               "context": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by "
               },
               "originalContent": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by"
             }
           ],
           "bestItem": {
             "content": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by",
             "value": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by",
             "unit": "",
             "context": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by "
             },
             "originalContent": "+ shops and online brands to manage their online storefronts. •Developed dynamic product listings, category filtering, and detailed product pages with SEO enhancements. •Built end-to-end order flow: cart, address input, checkout, payment, and order status tracking. •Integrated Stripe and Razorpay for secure transactions and coupon-based discounts. •Designed user account section with order history, address book, and profile management. •Built admin dashboard for managing inventory, orders, users, stock status, and invoice generation. •Integrated real-time order notifications and email confirmations for customers. Personalized Course Generator •AI-powered tool for generating customized educational course journeys. •Leveraged Open AI for course content, You Tube API for curated video lectures, and DALL·E for visual thumbnails. •Added interactive quizzes, progress-based summaries, and visual roadmaps for enhanced learning experience. Alumni Portal for College •React-based portal for connecting alumni and students. •Built features like student registration, profile management, and real-time messaging. •Used React Query for efficient data fetching and caching; currently used by"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page (",
               "value": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page (",
               "unit": "",
               "context": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page (",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page ("
               },
               "originalContent": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page ("
             }
           ],
           "bestItem": {
             "content": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page (",
             "value": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page (",
             "unit": "",
             "context": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page (",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page ("
             },
             "originalContent": "+ students. On-Demand Services Platform •MERN stack application enabling users to book local professional services. •Developed geolocation-based service provider discovery and responsive booking interfaces. •Built provider dashboard to manage bookings, availability, and service details. ----------------Page ("
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-",
               "value": "I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-",
               "unit": "",
               "context": " I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-"
               },
               "originalContent": "I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-"
             }
           ],
           "bestItem": {
             "content": "I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-",
             "value": "I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-",
             "unit": "",
             "context": " I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-"
             },
             "originalContent": "I’ve seen somesomesomesomesomesomesomesomesomesomesomesomesome reallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreally awesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesomeawesome GPT-"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan",
               "value": "node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan",
               "unit": "",
               "context": " node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan"
               },
               "originalContent": "node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan"
             }
           ],
           "bestItem": {
             "content": "node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan",
             "value": "node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan",
             "unit": "",
             "context": " node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan"
             },
             "originalContent": "node. Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan maintains a leaderboard here Keller Jordan"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
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
               "content": "Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of",
               "value": "Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of",
               "unit": "",
               "context": " Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of "
               },
               "originalContent": "Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of"
             }
           ],
           "bestItem": {
             "content": "Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of",
             "value": "Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of",
             "unit": "",
             "context": " Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of "
             },
             "originalContent": "Longer Training and Evaluation Sequence Length So far, we’ve been training and evaluating on sequences of"
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
               "content": "validation loss target, we have also slightly increased the total number of training steps, so now",
               "value": "validation loss target, we have also slightly increased the total number of training steps, so now",
               "unit": "",
               "context": " validation loss target, we have also slightly increased the total number of training steps, so now ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " validation loss target, we have also slightly increased the total number of training steps, so now "
               },
               "originalContent": "validation loss target, we have also slightly increased the total number of training steps, so now"
             }
           ],
           "bestItem": {
             "content": "validation loss target, we have also slightly increased the total number of training steps, so now",
             "value": "validation loss target, we have also slightly increased the total number of training steps, so now",
             "unit": "",
             "context": " validation loss target, we have also slightly increased the total number of training steps, so now ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " validation loss target, we have also slightly increased the total number of training steps, so now "
             },
             "originalContent": "validation loss target, we have also slightly increased the total number of training steps, so now"
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
               "content": "tokens into an element of the batch without regard for where the document starts or stops.",
               "value": "tokens into an element of the batch without regard for where the document starts or stops.",
               "unit": "",
               "context": " tokens into an element of the batch without regard for where the document starts or stops.",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " tokens into an element of the batch without regard for where the document starts or stops."
               },
               "originalContent": "tokens into an element of the batch without regard for where the document starts or stops."
             }
           ],
           "bestItem": {
             "content": "tokens into an element of the batch without regard for where the document starts or stops.",
             "value": "tokens into an element of the batch without regard for where the document starts or stops.",
             "unit": "",
             "context": " tokens into an element of the batch without regard for where the document starts or stops.",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " tokens into an element of the batch without regard for where the document starts or stops."
             },
             "originalContent": "tokens into an element of the batch without regard for where the document starts or stops."
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
               "content": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-",
               "value": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-",
               "unit": "",
               "context": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-"
               },
               "originalContent": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-"
             }
           ],
           "bestItem": {
             "content": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-",
             "value": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-",
             "unit": "",
             "context": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-"
             },
             "originalContent": "TYLER ROMERO POSTS Nano GPT Speedrun Living Worklog How fast can I train GPT-"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next",
               "value": "tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next",
               "unit": "",
               "context": " tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next "
               },
               "originalContent": "tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next"
             }
           ],
           "bestItem": {
             "content": "tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next",
             "value": "tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next",
             "unit": "",
             "context": " tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next "
             },
             "originalContent": "tokens. We also haven’t been particularly clever about how those sequences are processed. At each step, we simply load the next"
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
               "content": "and initially used to improve the Nano GPT speedrun by @Grad",
               "value": "and initially used to improve the Nano GPT speedrun by @Grad",
               "unit": "",
               "context": " and initially used to improve the Nano GPT speedrun by @Grad",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " and initially used to improve the Nano GPT speedrun by @Grad"
               },
               "originalContent": "and initially used to improve the Nano GPT speedrun by @Grad"
             }
           ],
           "bestItem": {
             "content": "and initially used to improve the Nano GPT speedrun by @Grad",
             "value": "and initially used to improve the Nano GPT speedrun by @Grad",
             "unit": "",
             "context": " and initially used to improve the Nano GPT speedrun by @Grad",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " and initially used to improve the Nano GPT speedrun by @Grad"
             },
             "originalContent": "and initially used to improve the Nano GPT speedrun by @Grad"
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
               "content": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune)",
               "value": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune)",
               "unit": "",
               "context": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) "
               },
               "originalContent": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune)"
             }
           ],
           "bestItem": {
             "content": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune)",
             "value": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune)",
             "unit": "",
             "context": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune) "
             },
             "originalContent": ", optimizing scalability and cost efficiency. Full Stack Developer Intern, Priyam IT Services (Pune)"
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
               "content": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕",
               "value": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕:",
               "unit": "",
               "context": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕: ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕: "
               },
               "originalContent": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕:"
             }
           ],
           "bestItem": {
             "content": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕",
             "value": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕:",
             "unit": "",
             "context": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕: ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕: "
             },
             "originalContent": ". Soft-capping is essentially a smooth and differentiable version of clipping⊕:"
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
               "content": "Logit Soft-capping Logit soft-capping is a technique popularized by Gemma",
               "value": "Logit Soft-capping Logit soft-capping is a technique popularized by Gemma",
               "unit": "",
               "context": " Logit Soft-capping Logit soft-capping is a technique popularized by Gemma ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " Logit Soft-capping Logit soft-capping is a technique popularized by Gemma "
               },
               "originalContent": "Logit Soft-capping Logit soft-capping is a technique popularized by Gemma"
             }
           ],
           "bestItem": {
             "content": "Logit Soft-capping Logit soft-capping is a technique popularized by Gemma",
             "value": "Logit Soft-capping Logit soft-capping is a technique popularized by Gemma",
             "unit": "",
             "context": " Logit Soft-capping Logit soft-capping is a technique popularized by Gemma ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " Logit Soft-capping Logit soft-capping is a technique popularized by Gemma "
             },
             "originalContent": "Logit Soft-capping Logit soft-capping is a technique popularized by Gemma"
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
               "content": "k tokens/second. In order to make runs more consistently hit the",
               "value": "k tokens/second. In order to make runs more consistently hit the",
               "unit": "",
               "context": "k tokens/second. In order to make runs more consistently hit the ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "k tokens/second. In order to make runs more consistently hit the "
               },
               "originalContent": "k tokens/second. In order to make runs more consistently hit the"
             }
           ],
           "bestItem": {
             "content": "k tokens/second. In order to make runs more consistently hit the",
             "value": "k tokens/second. In order to make runs more consistently hit the",
             "unit": "",
             "context": "k tokens/second. In order to make runs more consistently hit the ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "k tokens/second. In order to make runs more consistently hit the "
             },
             "originalContent": "k tokens/second. In order to make runs more consistently hit the"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "(and doing some learning-rate tuning), the new run time is",
               "value": "(and doing some learning-rate tuning), the new run time is",
               "unit": "",
               "context": " (and doing some learning-rate tuning), the new run time is ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " (and doing some learning-rate tuning), the new run time is "
               },
               "originalContent": "(and doing some learning-rate tuning), the new run time is"
             }
           ],
           "bestItem": {
             "content": "(and doing some learning-rate tuning), the new run time is",
             "value": "(and doing some learning-rate tuning), the new run time is",
             "unit": "",
             "context": " (and doing some learning-rate tuning), the new run time is ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " (and doing some learning-rate tuning), the new run time is "
             },
             "originalContent": "(and doing some learning-rate tuning), the new run time is"
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
               "content": "validation loss on Fine Web as fast as possible on an",
               "value": "validation loss on Fine Web as fast as possible on an",
               "unit": "",
               "context": " validation loss on Fine Web as fast as possible on an ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " validation loss on Fine Web as fast as possible on an "
               },
               "originalContent": "validation loss on Fine Web as fast as possible on an"
             }
           ],
           "bestItem": {
             "content": "validation loss on Fine Web as fast as possible on an",
             "value": "validation loss on Fine Web as fast as possible on an",
             "unit": "",
             "context": " validation loss on Fine Web as fast as possible on an ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " validation loss on Fine Web as fast as possible on an "
             },
             "originalContent": "validation loss on Fine Web as fast as possible on an"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "softcap(x, cap)=cap⋅tanh(capx) ----------------Page (",
               "value": "softcap(x, cap)=cap⋅tanh(capx) ----------------Page (",
               "unit": "",
               "context": " softcap(x, cap)=cap⋅tanh(capx) ----------------Page (",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " softcap(x, cap)=cap⋅tanh(capx) ----------------Page ("
               },
               "originalContent": "softcap(x, cap)=cap⋅tanh(capx) ----------------Page ("
             }
           ],
           "bestItem": {
             "content": "softcap(x, cap)=cap⋅tanh(capx) ----------------Page (",
             "value": "softcap(x, cap)=cap⋅tanh(capx) ----------------Page (",
             "unit": "",
             "context": " softcap(x, cap)=cap⋅tanh(capx) ----------------Page (",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " softcap(x, cap)=cap⋅tanh(capx) ----------------Page ("
             },
             "originalContent": "softcap(x, cap)=cap⋅tanh(capx) ----------------Page ("
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Rutwik Shinde Software Developer | Pune rutwikshinde",
               "value": "Rutwik Shinde Software Developer | Pune rutwikshinde",
               "unit": "",
               "context": "Rutwik Shinde Software Developer | Pune rutwikshinde",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "Rutwik Shinde Software Developer | Pune rutwikshinde"
               },
               "originalContent": "Rutwik Shinde Software Developer | Pune rutwikshinde"
             }
           ],
           "bestItem": {
             "content": "Rutwik Shinde Software Developer | Pune rutwikshinde",
             "value": "Rutwik Shinde Software Developer | Pune rutwikshinde",
             "unit": "",
             "context": "Rutwik Shinde Software Developer | Pune rutwikshinde",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "Rutwik Shinde Software Developer | Pune rutwikshinde"
             },
             "originalContent": "Rutwik Shinde Software Developer | Pune rutwikshinde"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Experience Full Stack AI Developer, Ai Edx (Remote)",
               "value": "Experience Full Stack AI Developer, Ai Edx (Remote)",
               "unit": "",
               "context": " Experience Full Stack AI Developer, Ai Edx (Remote) ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " Experience Full Stack AI Developer, Ai Edx (Remote) "
               },
               "originalContent": "Experience Full Stack AI Developer, Ai Edx (Remote)"
             }
           ],
           "bestItem": {
             "content": "Experience Full Stack AI Developer, Ai Edx (Remote)",
             "value": "Experience Full Stack AI Developer, Ai Edx (Remote)",
             "unit": "",
             "context": " Experience Full Stack AI Developer, Ai Edx (Remote) ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " Experience Full Stack AI Developer, Ai Edx (Remote) "
             },
             "originalContent": "Experience Full Stack AI Developer, Ai Edx (Remote)"
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
               "content": "with Next.js, Sanity CMS, and Mongo DB. •Used by",
               "value": "with Next.js, Sanity CMS, and Mongo DB. •Used by",
               "unit": "",
               "context": "with Next.js, Sanity CMS, and Mongo DB. •Used by ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "with Next.js, Sanity CMS, and Mongo DB. •Used by "
               },
               "originalContent": "with Next.js, Sanity CMS, and Mongo DB. •Used by"
             }
           ],
           "bestItem": {
             "content": "with Next.js, Sanity CMS, and Mongo DB. •Used by",
             "value": "with Next.js, Sanity CMS, and Mongo DB. •Used by",
             "unit": "",
             "context": "with Next.js, Sanity CMS, and Mongo DB. •Used by ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "with Next.js, Sanity CMS, and Mongo DB. •Used by "
             },
             "originalContent": "with Next.js, Sanity CMS, and Mongo DB. •Used by"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "d. At this point, we code that can train GPT-",
               "value": "d. At this point, we code that can train GPT-",
               "unit": "",
               "context": "d. At this point, we code that can train GPT-",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "d. At this point, we code that can train GPT-"
               },
               "originalContent": "d. At this point, we code that can train GPT-"
             }
           ],
           "bestItem": {
             "content": "d. At this point, we code that can train GPT-",
             "value": "d. At this point, we code that can train GPT-",
             "unit": "",
             "context": "d. At this point, we code that can train GPT-",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "d. At this point, we code that can train GPT-"
             },
             "originalContent": "d. At this point, we code that can train GPT-"
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
               "content": "B tokens are consumed. The new run time is",
               "value": "B tokens are consumed. The new run time is",
               "unit": "",
               "context": "B tokens are consumed. The new run time is ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "B tokens are consumed. The new run time is "
               },
               "originalContent": "B tokens are consumed. The new run time is"
             }
           ],
           "bestItem": {
             "content": "B tokens are consumed. The new run time is",
             "value": "B tokens are consumed. The new run time is",
             "unit": "",
             "context": "B tokens are consumed. The new run time is ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "B tokens are consumed. The new run time is "
             },
             "originalContent": "B tokens are consumed. The new run time is"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "hours, and the changes can be found at d",
               "value": "hours, and the changes can be found at d",
               "unit": "",
               "context": " hours, and the changes can be found at d",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " hours, and the changes can be found at d"
               },
               "originalContent": "hours, and the changes can be found at d"
             }
           ],
           "bestItem": {
             "content": "hours, and the changes can be found at d",
             "value": "hours, and the changes can be found at d",
             "unit": "",
             "context": " hours, and the changes can be found at d",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " hours, and the changes can be found at d"
             },
             "originalContent": "hours, and the changes can be found at d"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "almost twice as fast as the baseline.",
               "value": "almost twice as fast as the baseline.",
               "unit": "",
               "context": " almost twice as fast as the baseline. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " almost twice as fast as the baseline. "
               },
               "originalContent": "almost twice as fast as the baseline."
             }
           ],
           "bestItem": {
             "content": "almost twice as fast as the baseline.",
             "value": "almost twice as fast as the baseline.",
             "unit": "",
             "context": " almost twice as fast as the baseline. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " almost twice as fast as the baseline. "
             },
             "originalContent": "almost twice as fast as the baseline."
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
               "content": "). Throughput remained steady at ~",
               "value": "). Throughput remained steady at ~",
               "unit": "",
               "context": "). Throughput remained steady at ~",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "). Throughput remained steady at ~"
               },
               "originalContent": "). Throughput remained steady at ~"
             }
           ],
           "bestItem": {
             "content": "). Throughput remained steady at ~",
             "value": "). Throughput remained steady at ~",
             "unit": "",
             "context": "). Throughput remained steady at ~",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "). Throughput remained steady at ~"
             },
             "originalContent": "). Throughput remained steady at ~"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "| linkedin.com/in/rutwik",
               "value": "| linkedin.com/in/rutwik",
               "unit": "",
               "context": " | linkedin.com/in/rutwik",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " | linkedin.com/in/rutwik"
               },
               "originalContent": "| linkedin.com/in/rutwik"
             }
           ],
           "bestItem": {
             "content": "| linkedin.com/in/rutwik",
             "value": "| linkedin.com/in/rutwik",
             "unit": "",
             "context": " | linkedin.com/in/rutwik",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " | linkedin.com/in/rutwik"
             },
             "originalContent": "| linkedin.com/in/rutwik"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": ") Break----------------",
               "value": ") Break----------------",
               "unit": "",
               "context": ") Break----------------",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": ") Break----------------"
               },
               "originalContent": ") Break----------------"
             }
           ],
           "bestItem": {
             "content": ") Break----------------",
             "value": ") Break----------------",
             "unit": "",
             "context": ") Break----------------",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_1_tcl48d",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": ") Break----------------"
             },
             "originalContent": ") Break----------------"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "| github.com/rutwik",
               "value": "| github.com/rutwik",
               "unit": "",
               "context": " | github.com/rutwik",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " | github.com/rutwik"
               },
               "originalContent": "| github.com/rutwik"
             }
           ],
           "bestItem": {
             "content": "| github.com/rutwik",
             "value": "| github.com/rutwik",
             "unit": "",
             "context": " | github.com/rutwik",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " | github.com/rutwik"
             },
             "originalContent": "| github.com/rutwik"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Key Achievements •",
               "value": "Key Achievements •",
               "unit": "",
               "context": " Key Achievements •",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " Key Achievements •"
               },
               "originalContent": "Key Achievements •"
             }
           ],
           "bestItem": {
             "content": "Key Achievements •",
             "value": "Key Achievements •",
             "unit": "",
             "context": " Key Achievements •",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " Key Achievements •"
             },
             "originalContent": "Key Achievements •"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "hours, requiring",
               "value": "hours, requiring",
               "unit": "",
               "context": " hours, requiring ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " hours, requiring "
               },
               "originalContent": "hours, requiring"
             }
           ],
           "bestItem": {
             "content": "hours, requiring",
             "value": "hours, requiring",
             "unit": "",
             "context": " hours, requiring ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " hours, requiring "
             },
             "originalContent": "hours, requiring"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "B tokens (commit",
               "value": "B tokens (commit",
               "unit": "",
               "context": "B tokens (commit ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "B tokens (commit "
               },
               "originalContent": "B tokens (commit"
             }
           ],
           "bestItem": {
             "content": "B tokens (commit",
             "value": "B tokens (commit",
             "unit": "",
             "context": "B tokens (commit ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "B tokens (commit "
             },
             "originalContent": "B tokens (commit"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "k tokens/second.",
               "value": "k tokens/second.",
               "unit": "",
               "context": "k tokens/second. ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "k tokens/second. "
               },
               "originalContent": "k tokens/second."
             }
           ],
           "bestItem": {
             "content": "k tokens/second.",
             "value": "k tokens/second.",
             "unit": "",
             "context": "k tokens/second. ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "k tokens/second. "
             },
             "originalContent": "k tokens/second."
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "@gmail.com |",
               "value": "@gmail.com |",
               "unit": "",
               "context": "@gmail.com | ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "@gmail.com | "
               },
               "originalContent": "@gmail.com |"
             }
           ],
           "bestItem": {
             "content": "@gmail.com |",
             "value": "@gmail.com |",
             "unit": "",
             "context": "@gmail.com | ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "@gmail.com | "
             },
             "originalContent": "@gmail.com |"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "GPUs? March",
               "value": "GPUs? March",
               "unit": "",
               "context": " GPUs? March ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " GPUs? March "
               },
               "originalContent": "GPUs? March"
             }
           ],
           "bestItem": {
             "content": "GPUs? March",
             "value": "GPUs? March",
             "unit": "",
             "context": " GPUs? March ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " GPUs? March "
             },
             "originalContent": "GPUs? March"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "9370947507",
               "value": "9370947507",
               "unit": "",
               "context": " 9370947507",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/(\\s*[0-9]+)/g",
                 "patternDescription": "LLM-generated regex pattern 3",
                 "fullMatch": " 9370947507"
               },
               "originalContent": "9370947507"
             }
           ],
           "bestItem": {
             "content": "9370947507",
             "value": "9370947507",
             "unit": "",
             "context": " 9370947507",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/(\\s*[0-9]+)/g",
               "patternDescription": "LLM-generated regex pattern 3",
               "fullMatch": " 9370947507"
             },
             "originalContent": "9370947507"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "on two RTX",
               "value": "on two RTX",
               "unit": "",
               "context": " on two RTX ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": " on two RTX "
               },
               "originalContent": "on two RTX"
             }
           ],
           "bestItem": {
             "content": "on two RTX",
             "value": "on two RTX",
             "unit": "",
             "context": " on two RTX ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": " on two RTX "
             },
             "originalContent": "on two RTX"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "62304977",
               "value": "62304977",
               "unit": "",
               "context": "62304977",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/(\\s*[0-9]+)/g",
                 "patternDescription": "LLM-generated regex pattern 3",
                 "fullMatch": "62304977"
               },
               "originalContent": "62304977"
             }
           ],
           "bestItem": {
             "content": "62304977",
             "value": "62304977",
             "unit": "",
             "context": "62304977",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/(\\s*[0-9]+)/g",
               "patternDescription": "LLM-generated regex pattern 3",
               "fullMatch": "62304977"
             },
             "originalContent": "62304977"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "59944",
               "value": "59944",
               "unit": "",
               "context": "59944",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/(\\s*[0-9]+)/g",
                 "patternDescription": "LLM-generated regex pattern 3",
                 "fullMatch": "59944"
               },
               "originalContent": "59944"
             }
           ],
           "bestItem": {
             "content": "59944",
             "value": "59944",
             "unit": "",
             "context": "59944",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/(\\s*[0-9]+)/g",
               "patternDescription": "LLM-generated regex pattern 3",
               "fullMatch": "59944"
             },
             "originalContent": "59944"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "Gemma",
               "value": "Gemma",
               "unit": "",
               "context": "Gemma ",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "Gemma "
               },
               "originalContent": "Gemma"
             }
           ],
           "bestItem": {
             "content": "Gemma",
             "value": "Gemma",
             "unit": "",
             "context": "Gemma ",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "Gemma "
             },
             "originalContent": "Gemma"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "@Grad",
               "value": "@Grad",
               "unit": "",
               "context": "@Grad",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "@Grad"
               },
               "originalContent": "@Grad"
             }
           ],
           "bestItem": {
             "content": "@Grad",
             "value": "@Grad",
             "unit": "",
             "context": "@Grad",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "@Grad"
             },
             "originalContent": "@Grad"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "2024",
               "value": "2024",
               "unit": "",
               "context": "2024",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/(\\s*[0-9]+)/g",
                 "patternDescription": "LLM-generated regex pattern 3",
                 "fullMatch": "2024"
               },
               "originalContent": "2024"
             }
           ],
           "bestItem": {
             "content": "2024",
             "value": "2024",
             "unit": "",
             "context": "2024",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/(\\s*[0-9]+)/g",
               "patternDescription": "LLM-generated regex pattern 3",
               "fullMatch": "2024"
             },
             "originalContent": "2024"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "2022",
               "value": "2022",
               "unit": "",
               "context": "2022",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/(\\s*[0-9]+)/g",
                 "patternDescription": "LLM-generated regex pattern 3",
                 "fullMatch": "2022"
               },
               "originalContent": "2022"
             }
           ],
           "bestItem": {
             "content": "2022",
             "value": "2022",
             "unit": "",
             "context": "2022",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/(\\s*[0-9]+)/g",
               "patternDescription": "LLM-generated regex pattern 3",
               "fullMatch": "2022"
             },
             "originalContent": "2022"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "2020",
               "value": "2020",
               "unit": "",
               "context": "2020",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
               "sourceDocument": "Rutwik_resume.pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/(\\s*[0-9]+)/g",
                 "patternDescription": "LLM-generated regex pattern 3",
                 "fullMatch": "2020"
               },
               "originalContent": "2020"
             }
           ],
           "bestItem": {
             "content": "2020",
             "value": "2020",
             "unit": "",
             "context": "2020",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754292542574_sgxyitqvj_1754292543748_0_wmohy5",
             "sourceDocument": "Rutwik_resume.pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/(\\s*[0-9]+)/g",
               "patternDescription": "LLM-generated regex pattern 3",
               "fullMatch": "2020"
             },
             "originalContent": "2020"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "4090",
               "value": "4090",
               "unit": "",
               "context": " 4090",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/(\\s*[0-9]+)/g",
                 "patternDescription": "LLM-generated regex pattern 3",
                 "fullMatch": " 4090"
               },
               "originalContent": "4090"
             }
           ],
           "bestItem": {
             "content": "4090",
             "value": "4090",
             "unit": "",
             "context": " 4090",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/(\\s*[0-9]+)/g",
               "patternDescription": "LLM-generated regex pattern 3",
               "fullMatch": " 4090"
             },
             "originalContent": "4090"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "2025",
               "value": "2025",
               "unit": "",
               "context": " 2025",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/(\\s*[0-9]+)/g",
                 "patternDescription": "LLM-generated regex pattern 3",
                 "fullMatch": " 2025"
               },
               "originalContent": "2025"
             }
           ],
           "bestItem": {
             "content": "2025",
             "value": "2025",
             "unit": "",
             "context": " 2025",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/(\\s*[0-9]+)/g",
               "patternDescription": "LLM-generated regex pattern 3",
               "fullMatch": " 2025"
             },
             "originalContent": "2025"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "4412",
               "value": "4412",
               "unit": "",
               "context": "4412",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/(\\s*[0-9]+)/g",
                 "patternDescription": "LLM-generated regex pattern 3",
                 "fullMatch": "4412"
               },
               "originalContent": "4412"
             }
           ],
           "bestItem": {
             "content": "4412",
             "value": "4412",
             "unit": "",
             "context": "4412",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/(\\s*[0-9]+)/g",
               "patternDescription": "LLM-generated regex pattern 3",
               "fullMatch": "4412"
             },
             "originalContent": "4412"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "1024",
               "value": "1024",
               "unit": "",
               "context": " 1024",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/(\\s*[0-9]+)/g",
                 "patternDescription": "LLM-generated regex pattern 3",
                 "fullMatch": " 1024"
               },
               "originalContent": "1024"
             }
           ],
           "bestItem": {
             "content": "1024",
             "value": "1024",
             "unit": "",
             "context": " 1024",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_9_j9ramt",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/(\\s*[0-9]+)/g",
               "patternDescription": "LLM-generated regex pattern 3",
               "fullMatch": " 1024"
             },
             "originalContent": "1024"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         },
         {
           "items": [
             {
               "content": "GPT-",
               "value": "GPT-",
               "unit": "",
               "context": "GPT-",
               "confidence": 0.95,
               "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
               "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
               "metadata": {
                 "extractionMethod": "regex_pattern",
                 "regexPattern": "/([^\\n\\d]+)/g",
                 "patternDescription": "LLM-generated regex pattern 4",
                 "fullMatch": "GPT-"
               },
               "originalContent": "GPT-"
             }
           ],
           "bestItem": {
             "content": "GPT-",
             "value": "GPT-",
             "unit": "",
             "context": "GPT-",
             "confidence": 0.95,
             "sourceChunkId": "chunk_doc_1754311559806_f7eqwqkcn_1754311572503_0_uuyy04",
             "sourceDocument": "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf",
             "metadata": {
               "extractionMethod": "regex_pattern",
               "regexPattern": "/([^\\n\\d]+)/g",
               "patternDescription": "LLM-generated regex pattern 4",
               "fullMatch": "GPT-"
             },
             "originalContent": "GPT-"
           },
           "totalConfidence": 0.95,
           "isTableData": false
         }
       ]
     },
     "itemCount": 163,
     "reasoning": "Data extraction completed"
   }

───────────────────────────────────

5. Synthesizer ✅
   Type: Synthesizer
   Status: completed
   Progress: 100%
   Duration: 103879ms
   
   📤 Full Output:
   {
     "synthesis": {
       "answer": "<think>\nOkay, let me start by understanding the problem. The user wants me to rank and attribute items from multiple documents. First, I need to extract comparable items from all the documents. Then, clearly attribute each item to its owner.\n\nLooking at the documents, there's a lot of information about Rutwik Shinde's experience and skills. Let me check each document to find relevant points. \n\nFirst, the key achievements mention creating technical documentation and optimizing legacy codebases. That's from one document, so I need to attribute that. Also, the use of React Query and Next.js is mentioned in another document, so that's an achievement. \n\nFor the ranking, I need to list items that are comparable. For example, the use of MERN stack and Next.js is mentioned in multiple documents, so that's a ranking. Similarly, integrating Stripe and Razorpay is part of the same documents. \n\nI need to ensure that each item is attributed correctly. For example, when combining lists, specify whose achievement each item represents. Also, check for any contradictions between the documents. \n\nOne challenge is combining items that come from different documents. For instance, a single achievement might be linked to multiple documents. I need to make sure each item is correctly attributed without mixing them. \n\nFinally, structure the response with the reasoning process and the final answer, making sure to follow all the critical rules.\n</think>\n\n\n\n<think>\nOkay, let's see. The user wants me to rank and attribute items from multiple documents. First, I need to extract comparable skills or achievements. Let me look through all the documents.\n\nIn the first document, there's mention of using MERN stack and Next.js for scalability. That's a skill, so I can rank that. Then, integrating Stripe and Razorpay for secure transactions, that's another skill. Authored AI research papers is another. A provider dashboard for bookings is third. All these are from different documents, so they can be combined.\n\nI need to attribute each item properly. For example, the MERN stack is from the On-Demand Services Platform. The Stripe/Razorpay integration is from the same documents. The provider dashboard is mentioned in two documents. The AI research papers are from one document. \n\nNow, structuring the answer with the reasoning process and final answer. Make sure not to mix entities from different documents and cross-reason. Check all rules again. Yep, looks good. Final answer should list the skills in order with their owners. \n\nWait, the user mentioned to start with reasoning, so the first part explains the process. Then the final answer. That's all. Let me put that together.",
       "confidence": 0,
       "reasoning": "I extracted comparable items from all documents by identifying key skills and achievements. Here's the reasoning process:\n\n1. **Extract comparable items**: \n   - **Skill 1**: Used MERN stack and Next.js for scalability and performance. This is mentioned in multiple documents, so it's a ranking item.\n   - **Skill 2**: Integrated Stripe and Razorpay for secure transactions. This is part of the same documents, so it's an achievement.\n   - **Skill 3**: Authored AI research papers published by Springer. This is from one document, so it's an achievement.\n   - **Skill 4**: Built a provider dashboard to manage bookings, availability, and service details. This is mentioned in two documents, so it's an achievement.\n\n2. **Attribute each item to its owner**: \n   - **Skill 1**: Full Stack Developer Intern at Priyam IT Services (Pune) 2022–2024.\n   - **Skill 2**: Used React Query for data fetching and caching. This is part of the On-Demand Services Platform.\n   - **Skill 3**: Created technical documentation and optimized legacy codebases. This is from one document.\n   - **Skill 4**: Authored AI research papers. This is from one document.\n\n3. **Ranking**: \n   - Skill 1 (MERN stack) is ranked 1st.\n   - Skill 2 (Stripe/Razorpay integration) is ranked 2nd.\n   - Skill 3 (provider dashboard) is ranked 3rd.\n   - Skill 4 (AI research papers) is ranked 4th.\n\nThis ensures proper attribution and cross-document reasoning while adhering to the critical rules.",
       "structure": "paragraph"
     },
     "finalAnswer": "<think>\nOkay, let me start by understanding the problem. The user wants me to rank and attribute items from multiple documents. First, I need to extract comparable items from all the documents. Then, clearly attribute each item to its owner.\n\nLooking at the documents, there's a lot of information about Rutwik Shinde's experience and skills. Let me check each document to find relevant points. \n\nFirst, the key achievements mention creating technical documentation and optimizing legacy codebases. That's from one document, so I need to attribute that. Also, the use of React Query and Next.js is mentioned in another document, so that's an achievement. \n\nFor the ranking, I need to list items that are comparable. For example, the use of MERN stack and Next.js is mentioned in multiple documents, so that's a ranking. Similarly, integrating Stripe and Razorpay is part of the same documents. \n\nI need to ensure that each item is attributed correctly. For example, when combining lists, specify whose achievement each item represents. Also, check for any contradictions between the documents. \n\nOne challenge is combining items that come from different documents. For instance, a single achievement might be linked to multiple documents. I need to make sure each item is correctly attributed without mixing them. \n\nFinally, structure the response with the reasoning process and the final answer, making sure to follow all the critical rules.\n</think>\n\n\n\n<think>\nOkay, let's see. The user wants me to rank and attribute items from multiple documents. First, I need to extract comparable skills or achievements. Let me look through all the documents.\n\nIn the first document, there's mention of using MERN stack and Next.js for scalability. That's a skill, so I can rank that. Then, integrating Stripe and Razorpay for secure transactions, that's another skill. Authored AI research papers is another. A provider dashboard for bookings is third. All these are from different documents, so they can be combined.\n\nI need to attribute each item properly. For example, the MERN stack is from the On-Demand Services Platform. The Stripe/Razorpay integration is from the same documents. The provider dashboard is mentioned in two documents. The AI research papers are from one document. \n\nNow, structuring the answer with the reasoning process and final answer. Make sure not to mix entities from different documents and cross-reason. Check all rules again. Yep, looks good. Final answer should list the skills in order with their owners. \n\nWait, the user mentioned to start with reasoning, so the first part explains the process. Then the final answer. That's all. Let me put that together.",
     "reasoning": "I extracted comparable items from all documents by identifying key skills and achievements. Here's the reasoning process:\n\n1. **Extract comparable items**: \n   - **Skill 1**: Used MERN stack and Next.js for scalability and performance. This is mentioned in multiple documents, so it's a ranking item.\n   - **Skill 2**: Integrated Stripe and Razorpay for secure transactions. This is part of the same documents, so it's an achievement.\n   - **Skill 3**: Authored AI research papers published by Springer. This is from one document, so it's an achievement.\n   - **Skill 4**: Built a provider dashboard to manage bookings, availability, and service details. This is mentioned in two documents, so it's an achievement.\n\n2. **Attribute each item to its owner**: \n   - **Skill 1**: Full Stack Developer Intern at Priyam IT Services (Pune) 2022–2024.\n   - **Skill 2**: Used React Query for data fetching and caching. This is part of the On-Demand Services Platform.\n   - **Skill 3**: Created technical documentation and optimized legacy codebases. This is from one document.\n   - **Skill 4**: Authored AI research papers. This is from one document.\n\n3. **Ranking**: \n   - Skill 1 (MERN stack) is ranked 1st.\n   - Skill 2 (Stripe/Razorpay integration) is ranked 2nd.\n   - Skill 3 (provider dashboard) is ranked 3rd.\n   - Skill 4 (AI research papers) is ranked 4th.\n\nThis ensures proper attribution and cross-document reasoning while adhering to the critical rules."
   }

───────────────────────────────────

Total Agents: 5
Completed: 5
Generated: 06/08/2025, 16:10:27
