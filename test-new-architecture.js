/**
 * Test New Intelligent Agent Architecture
 * 
 * Tests the redesigned flow:
 * DataInspector (magic filtering) → PlanningAgent → PatternGenerator → Extractor → WebSearchAgent → Synthesizer
 */

// Simple test to verify imports work
console.log('🧪 Testing new architecture imports...');

try {
  // Test that we can import the new agents
  const { createMultiAgentSystem } = require('./src/lib/multi-agent');
  console.log('✅ Multi-agent system import successful');
  
  // Mock LLM for testing
  const mockLLM = async (prompt) => {
    console.log('🤖 LLM called with prompt length:', prompt.length);
    
    // Simulate Master LLM decisions for testing
    if (prompt.includes('TOOL_NAME:')) {
      if (prompt.includes('DataInspector') && !prompt.includes('ALREADY CALLED')) {
        return 'ACTION: CALL_TOOL\nTOOL_NAME: DataInspector\nREASONING: Need to analyze document structure first\nNEXT_GOAL: Understand document types and filter relevant ones';
      } else if (prompt.includes('PlanningAgent') && !prompt.includes('ALREADY CALLED')) {
        return 'ACTION: CALL_TOOL\nTOOL_NAME: PlanningAgent\nREASONING: Need intelligent execution strategy\nNEXT_GOAL: Create plan based on document analysis';
      } else if (prompt.includes('PatternGenerator') && !prompt.includes('ALREADY CALLED')) {
        return 'ACTION: CALL_TOOL\nTOOL_NAME: PatternGenerator\nREASONING: Create regex patterns for extraction\nNEXT_GOAL: Generate patterns for structured data';
      } else if (prompt.includes('Extractor') && !prompt.includes('ALREADY CALLED')) {
        return 'ACTION: CALL_TOOL\nTOOL_NAME: Extractor\nREASONING: Extract data using generated patterns\nNEXT_GOAL: Get structured information';
      } else if (prompt.includes('Synthesizer') && !prompt.includes('ALREADY CALLED')) {
        return 'ACTION: CALL_TOOL\nTOOL_NAME: Synthesizer\nREASONING: Create final answer from extracted data\nNEXT_GOAL: Provide user with comprehensive response';
      } else {
        return 'ACTION: COMPLETE\nREASONING: All necessary agents have been called\nNEXT_GOAL: Return final answer';
      }
    }
    
    // Mock responses for individual agents
    if (prompt.includes('analyze this multi-document scenario')) {
      return 'Document 1 (Rutwik_resume.pdf): This is a professional resume containing projects and skills. Document 2 (Tyler blog): This contains speedrun information, not relevant for Rutwik query.';
    }
    
    if (prompt.includes('Create an intelligent execution plan')) {
      return '{"strategy": "regex-extraction-focused", "steps": [{"agent": "PatternGenerator", "action": "create project patterns", "reasoning": "need structured extraction", "expectedOutput": "regex patterns", "priority": "high"}], "fallbackOptions": ["web-search-expansion"], "expectedDataSources": ["local documents"], "confidenceLevel": 0.8}';
    }
    
    if (prompt.includes('create extraction patterns')) {
      return 'PATTERNS:\n/Project\\s*:?\\s*([^\\n.]+)/gi\n/Built\\s+([^\\n.]+)/gi\n/Achievement\\s*:?\\s*([^\\n.]+)/gi';
    }
    
    if (prompt.includes('extract information using patterns')) {
      return 'EXTRACTED ITEMS:\n- Project: Advanced AI Chat System\n- Achievement: Increased user engagement by 40%\n- Technology: React, Node.js, OpenAI API';
    }
    
    return 'Mock LLM response for testing';
  };
  
  // Test creating the system
  const orchestrator = createMultiAgentSystem(mockLLM);
  console.log('✅ Orchestrator created successfully');
  
  // Test mock data
  const testSources = [
    {
      id: 'test1',
      source: 'Rutwik_resume.pdf',
      excerpt: 'Rutwik Shinde - Software Developer. Projects: Advanced AI Chat System built with React and Node.js.',
      fullContent: 'Rutwik Shinde - Software Developer based in Pune. Experience with Full Stack Development. Projects: Advanced AI Chat System - Built a comprehensive chat application using React, Node.js, and OpenAI API. Achievement: Increased user engagement by 40% through intelligent conversation flows.',
      similarity: 0.95,
      metadata: { source: 'local', type: 'resume' }
    },
    {
      id: 'test2', 
      source: 'Tyler_blog.pdf',
      excerpt: 'Tyler discusses speedrunning techniques and optimization strategies.',
      fullContent: 'Speedrunning optimization techniques by Tyler. Various strategies for improving performance in competitive gaming.',
      similarity: 0.25,
      metadata: { source: 'local', type: 'blog' }
    }
  ];
  
  console.log('🚀 Testing new architecture with query: "tell me the best project by Rutwik"');
  
  // Test the orchestrator (this will test the new flow)
  const result = await orchestrator.research('tell me the best project by Rutwik', testSources);
  
  console.log('✅ Architecture test completed successfully!');
  console.log('📝 Result:', result.substring(0, 200) + '...');
  
} catch (error) {
  console.error('❌ Architecture test failed:', error.message);
  console.error('Stack:', error.stack);
}