debugMode: false,
  siteName: 'TimeCapsule- SLM',
  siteUrl: 'http://localhost:3000',
  allEnvVars: {
    NEXT_PUBLIC_GA4_MEASUREMENT_ID: 'G-V1B8R98P79',
    GA4_ANONYMIZE_IP: 'true',
    GA4_DEBUG_MODE: 'false',
    NEXT_PUBLIC_SITE_NAME: 'TimeCapsule- SLM',
    NEXT_PUBLIC_SITE_URL: 'http://localhost:3000'
  }
}
 GET /.well-known/appspecific/com.chrome.devtools.json 404 in 550ms
 GET /api/auth/session 200 in 126ms
 GET /api/auth/session 200 in 13ms
DynamoDB clients initialized successfully
 GET /api/auth/session 200 in 64ms
 GET /api/auth/session 200 in 31ms
DynamoDB clients initialized successfully
 GET /api/auth/session 200 in 69ms
 GET /api/auth/session 200 in 31ms
DynamoDB clients initialized successfully
 GET /api/auth/session 200 in 120ms
 GET /api/auth/session 200 in 37ms
DynamoDB clients initialized successfully
 GET /api/auth/session 200 in 74ms
 GET /api/auth/session 200 in 7ms
DynamoDB clients initialized successfully
 GET /api/auth/session 200 in 51ms
 GET /api/auth/session 200 in 34ms
DynamoDB clients initialized successfully
 ○ Compiling /api/test-firecrawl ...
 ✓ Compiled /api/test-firecrawl in 1585ms (6600 modules)
🔥 Firecrawl service initialized successfully
🔍 Searching web for: "test"
🔍 Searching web for: "test"
🔍 Raw search results: 1 results found
🌐 Scraping content from: https://www.speedtest.net/
🔍 Raw search results: 1 results found
🌐 Scraping content from: https://www.speedtest.net/
🔍 Searching web for: "test"
🔍 Searching web for: "test"
🔍 Searching web for: "test"
🔍 Raw search results: 1 results found
🌐 Scraping content from: https://www.speedtest.net/
🔍 Raw search results: 1 results found
🌐 Scraping content from: https://www.speedtest.net/
🔍 Raw search results: 1 results found
🌐 Scraping content from: https://www.speedtest.net/
🔍 Searching web for: "test"
❌ Web search failed: Error: Request failed with status code 429. Error: Rate limit exceeded. Consumed (req/min): 6, Remaining (req/min): 0. Upgrade your plan at https://firecrawl.dev/pricing for increased rate limits or please retry after 49s, resets at Tue Nov 11 2025 13:36:33 GMT+0000 (Coordinated Universal Time) 
    at async FirecrawlService.searchWeb (src/lib/FirecrawlService.ts:137:28)
    at async POST (src/app/api/test-firecrawl/route.ts:22:25)
  135 |
  136 |       // Perform web search using Firecrawl
> 137 |       const searchResults = await this.firecrawl.search(query, {
      |                            ^
  138 |         limit: limit,
  139 |         excludeDomains: excludeDomains,
  140 |         includeDomains: includeDomains.length > 0 ? includeDomains : undefined, {
  statusCode: 429,
  details: undefined
}
Firecrawl API test failed: Error: Web search failed: Request failed with status code 429. Error: Rate limit exceeded. Consumed (req/min): 6, Remaining (req/min): 0. Upgrade your plan at https://firecrawl.dev/pricing for increased rate limits or please retry after 49s, resets at Tue Nov 11 2025 13:36:33 GMT+0000 (Coordinated Universal Time) 
    at FirecrawlService.searchWeb (src/lib/FirecrawlService.ts:267:12)
    at async POST (src/app/api/test-firecrawl/route.ts:22:25)
  265 |     } catch (error) {
  266 |       console.error("❌ Web search failed:", error);
> 267 |       throw new Error(
      |            ^
  268 |         `Web search failed: ${error instanceof Error ? error.message : String(error)}`
  269 |       );
  270 |     }
 POST /api/test-firecrawl 400 in 860ms
❌ Scraping failed for https://www.speedtest.net/: Failed to scrape URL. Status code: 408. Error: Scrape timed out
⚠️ Using search data only for: Speedtest by Ookla - The Global Broadband Speed Test (https://www.speedtest.net/)
🌐 Web search completed in 1256ms: {
  query: 'test',
  resultsFound: 1,
  domains: [ 'www.speedtest.net' ],
  avgRelevance: '0.300',
  rawResults: 1
}
 POST /api/test-firecrawl 200 in 12802ms
❌ Scraping failed for https://www.speedtest.net/: Failed to scrape URL. Status code: 408. Error: Scrape timed out
⚠️ Using search data only for: Speedtest by Ookla - The Global Broadband Speed Test (https://www.speedtest.net/)
🌐 Web search completed in 1304ms: {
  query: 'test',
  resultsFound: 1,
  domains: [ 'www.speedtest.net' ],
  avgRelevance: '0.300',
  rawResults: 1
}
 POST /api/test-firecrawl 200 in 13589ms
❌ Scraping failed for https://www.speedtest.net/: Failed to scrape URL. Status code: 408. Error: Scrape timed out
⚠️ Using search data only for: Speedtest by Ookla - The Global Broadband Speed Test (https://www.speedtest.net/)
🌐 Web search completed in 1048ms: {
  query: 'test',
  resultsFound: 1,
  domains: [ 'www.speedtest.net' ],
  avgRelevance: '0.300',
  rawResults: 1
}
 POST /api/test-firecrawl 200 in 11541ms
❌ Scraping failed for https://www.speedtest.net/: Failed to scrape URL. Status code: 408. Error: Scrape timed out
⚠️ Using search data only for: Speedtest by Ookla - The Global Broadband Speed Test (https://www.speedtest.net/)
🌐 Web search completed in 1190ms: {
  query: 'test',
  resultsFound: 1,
  domains: [ 'www.speedtest.net' ],
  avgRelevance: '0.300',
  rawResults: 1
}
 POST /api/test-firecrawl 200 in 11602ms
❌ Scraping failed for https://www.speedtest.net/: Failed to scrape URL. Status code: 408. Error: Scrape timed out
⚠️ Using search data only for: Speedtest by Ookla - The Global Broadband Speed Test (https://www.speedtest.net/)
🌐 Web search completed in 1090ms: {
  query: 'test',
  resultsFound: 1,
  domains: [ 'www.speedtest.net' ],
  avgRelevance: '0.300',
  rawResults: 1
}
 POST /api/test-firecrawl 200 in 11687ms
debug-enabled 0 [ 'debug-enabled' ]
 GET /api/auth/session 200 in 78ms
 GET /api/auth/session 200 in 17ms
DynamoDB clients initialized successfully
🔍 Searching web for: "test"
❌ Web search failed: Error: Request failed with status code 429. Error: Rate limit exceeded. Consumed (req/min): 7, Remaining (req/min): 0. Upgrade your plan at https://firecrawl.dev/pricing for increased rate limits or please retry after 36s, resets at Tue Nov 11 2025 13:36:33 GMT+0000 (Coordinated Universal Time) 
    at async FirecrawlService.searchWeb (src/lib/FirecrawlService.ts:137:28)
    at async POST (src/app/api/test-firecrawl/route.ts:22:25)
  135 |
  136 |       // Perform web search using Firecrawl
> 137 |       const searchResults = await this.firecrawl.search(query, {
      |                            ^
  138 |         limit: limit,
  139 |         excludeDomains: excludeDomains,
  140 |         includeDomains: includeDomains.length > 0 ? includeDomains : undefined, {
  statusCode: 429,
  details: undefined
}
Firecrawl API test failed: Error: Web search failed: Request failed with status code 429. Error: Rate limit exceeded. Consumed (req/min): 7, Remaining (req/min): 0. Upgrade your plan at https://firecrawl.dev/pricing for increased rate limits or please retry after 36s, resets at Tue Nov 11 2025 13:36:33 GMT+0000 (Coordinated Universal Time) 
    at FirecrawlService.searchWeb (src/lib/FirecrawlService.ts:267:12)
    at async POST (src/app/api/test-firecrawl/route.ts:22:25)
  265 |     } catch (error) {
  266 |       console.error("❌ Web search failed:", error);
> 267 |       throw new Error(
      |            ^
  268 |         `Web search failed: ${error instanceof Error ? error.message : String(error)}`
  269 |       );
  270 |     }
 POST /api/test-firecrawl 400 in 798ms
 GET /api/auth/session 200 in 22ms
 GET /api/auth/session 200 in 17ms
DynamoDB clients initialized successfully
🔍 Searching web for: "test"
🔍 Raw search results: 1 results found
🌐 Scraping content from: https://www.speedtest.net/
❌ Failed to scrape https://www.speedtest.net/
⚠️ Using search data only for: Speedtest by Ookla - The Global Broadband Speed Test (https://www.speedtest.net/)
🌐 Web search completed in 1574ms: {
  query: 'test',
  resultsFound: 1,
  domains: [ 'www.speedtest.net' ],
  avgRelevance: '0.300',
  rawResults: 1
}
 POST /api/test-firecrawl 200 in 2571ms
 GET /api/auth/session 200 in 171ms
 GET /api/auth/session 200 in 32ms
DynamoDB clients initialized successfully
 GET /api/auth/session 200 in 53ms
 GET /api/auth/session 200 in 12ms
DynamoDB clients initialized successfully
 GET /api/auth/session 200 in 41ms
 GET /api/auth/session 200 in 21ms
DynamoDB clients initialized successfully