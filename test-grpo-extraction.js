const { ResearchOrchestrator } = require('./dist/lib/ResearchOrchestrator.js');

async function testGRPOExtraction() {
  console.log('🧪 Testing GRPO extraction with enhanced DataInspector...');
  
  const orchestrator = new ResearchOrchestrator(
    null, // contentGenerator - will use default
    null, // vectorStore - will use file-based research
    null, // webSearchService
    {
      maxSteps: 3,
      timeoutMs: 300000,
      enableWebSearch: false,
      enableRAGSearch: true,
      requireVerification: false,
      adaptiveStrategy: true
    }
  );

  try {
    const result = await orchestrator.executeResearch("give me the best RL method");
    
    console.log('\n📊 Research Results:');
    console.log('Final Answer:', result.finalAnswer.substring(0, 200) + '...');
    console.log('Steps executed:', result.metadata?.stepsExecuted);
    console.log('Sources found:', result.metadata?.sourcesFound);
    
    // Check if GRPO was specifically mentioned
    const hasGRPO = result.finalAnswer.toLowerCase().includes('grpo');
    const hasReinforcementLearning = result.finalAnswer.toLowerCase().includes('reinforcement learning');
    
    console.log('\n🔍 Extraction Analysis:');
    console.log('✅ Contains GRPO:', hasGRPO);
    console.log('⚠️  Contains generic "reinforcement learning":', hasReinforcementLearning);
    
    if (hasGRPO) {
      console.log('\n🎉 SUCCESS: DataInspector successfully extracted specific method "GRPO"');
    } else {
      console.log('\n❌ ISSUE: DataInspector still not extracting specific method names');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

testGRPOExtraction();