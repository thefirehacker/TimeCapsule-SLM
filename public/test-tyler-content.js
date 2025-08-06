/**
 * Simple Browser Console Test for Tyler's Speed Run Content
 * Copy-paste this into browser console at localhost:3000/deep-research
 */

// Expected timing values from Tyler's speed run table
const EXPECTED_TIMINGS = ["8.13", "7.51", "4.53", "4.26", "4.01", "2.55"];

async function testTylerContent() {
  console.log('🔍 TESTING TYLER SPEED RUN CONTENT IN RXDB...\n');
  
  // Get VectorStore
  const vectorStore = window.sharedVectorStore || window.getVectorStore?.();
  if (!vectorStore) {
    console.log('❌ VectorStore not available');
    return;
  }
  
  console.log('✅ VectorStore connected');
  
  // Test 1: Search for Tyler's blog
  console.log('\n🔍 TEST 1: Tyler Blog Search');
  const blogResults = await vectorStore.searchSimilar("Tyler blog", 0.1, 10);
  console.log(`📊 Found ${blogResults.length} results for "Tyler blog"`);
  
  if (blogResults.length > 0) {
    console.log('📄 Top results:');
    blogResults.slice(0, 3).forEach((result, i) => {
      console.log(`   ${i + 1}. ${result.document?.title || 'Unknown'} (${result.similarity?.toFixed(3)})`);
      console.log(`      ${result.chunk?.content?.substring(0, 150)}...`);
    });
  }
  
  // Test 2: Search for specific timing values
  console.log('\n🔍 TEST 2: Timing Values Search');
  const foundTimings = [];
  
  for (const timing of EXPECTED_TIMINGS) {
    const results = await vectorStore.searchSimilar(`${timing} hours`, 0.1, 5);
    console.log(`   ${timing} hours: ${results.length} results`);
    
    if (results.length > 0) {
      foundTimings.push(timing);
      results.forEach((result, i) => {
        const content = result.chunk?.content || '';
        if (content.includes(timing)) {
          console.log(`   ✅ FOUND "${timing}" in: ${content.substring(0, 100)}...`);
        }
      });
    }
  }
  
  // Test 3: Search for table keywords
  console.log('\n🔍 TEST 3: Table Keywords Search');
  const keywords = ["Record time", "Training Tokens", "Progress so far", "Initial baseline"];
  const foundKeywords = [];
  
  for (const keyword of keywords) {
    const results = await vectorStore.searchSimilar(keyword, 0.2, 3);
    if (results.length > 0) {
      foundKeywords.push(keyword);
      console.log(`   ✅ Found "${keyword}": ${results.length} results`);
    } else {
      console.log(`   ❌ Missing "${keyword}"`);
    }
  }
  
  // Summary
  console.log('\n📊 SUMMARY:');
  console.log(`   Expected timings: ${EXPECTED_TIMINGS.length}`);
  console.log(`   Found timings: ${foundTimings.length} (${foundTimings.join(', ')})`);
  console.log(`   Missing timings: ${EXPECTED_TIMINGS.filter(t => !foundTimings.includes(t)).join(', ')}`);
  console.log(`   Expected keywords: ${keywords.length}`);
  console.log(`   Found keywords: ${foundKeywords.length}`);
  
  // Conclusion
  if (foundTimings.length === EXPECTED_TIMINGS.length) {
    console.log('\n✅ CONCLUSION: Tyler\'s speed run content IS in RxDB');
  } else {
    console.log('\n❌ CONCLUSION: Tyler\'s speed run content is NOT in RxDB');
    console.log('   This explains why the multi-agent system extracted wrong data');
  }
  
  return {
    totalExpected: EXPECTED_TIMINGS.length,
    foundTimings: foundTimings.length,
    missingTimings: EXPECTED_TIMINGS.filter(t => !foundTimings.includes(t)),
    foundKeywords: foundKeywords.length,
    contentExists: foundTimings.length === EXPECTED_TIMINGS.length
  };
}

// Auto-run when script loads
console.log('🚀 Tyler Content Test loaded. Running test...');
testTylerContent().then(result => {
  console.log('\n🎯 TEST COMPLETE:', result);
}).catch(error => {
  console.error('❌ Test failed:', error);
});

// Also make it available globally
window.testTylerContent = testTylerContent;