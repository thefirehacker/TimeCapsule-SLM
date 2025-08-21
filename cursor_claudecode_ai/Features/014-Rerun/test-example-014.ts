/**
 * Test Example: Agent Rerun with User Feedback
 * 
 * This example demonstrates how the rerun functionality works
 * with user feedback to correct misclassifications.
 */

import { ResearchContext } from '@/lib/multi-agent/interfaces/Context';
import { UserFeedback } from '@/lib/multi-agent/interfaces/Feedback';
import { DataInspectorAgent } from '@/lib/multi-agent/agents/DataInspectorAgent';
import { Orchestrator } from '@/lib/multi-agent/core/Orchestrator';

/**
 * Example scenario: CV misclassification correction
 */
async function testCVMisclassificationCorrection() {
  console.log('🧪 Testing CV Misclassification Correction');
  
  // 1. Create mock context with misclassified CV
  const mockContext: ResearchContext = {
    query: "improvements in a language model",
    understanding: {
      intent: "Find information about language model improvements",
      domain: "AI/ML",
      requirements: ["technical improvements", "model enhancements"],
      queryType: "information"
    },
    ragResults: {
      chunks: [
        {
          id: "doc_cv_john_doe",
          text: "John Doe - Software Engineer with experience in Python and machine learning",
          source: "john_doe_cv.pdf",
          sourceDocument: "john_doe_cv.pdf",
          sourceType: "document" as const
        },
        {
          id: "doc_research_paper_1",
          text: "Recent improvements in transformer architectures for language models",
          source: "research_paper.pdf",
          sourceDocument: "research_paper.pdf",
          sourceType: "document" as const
        }
      ],
      summary: "Found documents related to language models"
    },
    documentAnalysis: {
      documentType: "Mixed",
      structure: ["CV", "Research Paper"],
      contentAreas: ["Personal Information", "Technical Research"],
      queryIntent: "Find language model improvements",
      extractionStrategy: "Extract technical information",
      expectedOutputFormat: "Technical summary",
      documents: [
        {
          documentId: "doc_cv_john_doe",
          documentName: "john_doe_cv.pdf",
          documentType: "CV",
          primaryEntity: "John Doe",
          structure: ["Personal Info", "Experience", "Skills"],
          contentAreas: ["Software Engineering", "Machine Learning"],
          keyEntities: [
            {
              name: "John Doe",
              type: "person" as const,
              context: "CV owner",
              isOwner: true
            }
          ],
          role: "source" as const // INCORRECTLY CLASSIFIED AS RELEVANT
        },
        {
          documentId: "doc_research_paper_1",
          documentName: "research_paper.pdf",
          documentType: "Research Paper",
          structure: ["Abstract", "Introduction", "Methods", "Results"],
          contentAreas: ["Language Models", "Transformers", "AI Research"],
          keyEntities: [],
          role: "source" as const
        }
      ]
    },
    patterns: [],
    extractedData: {
      raw: [],
      structured: []
    },
    synthesis: {
      answer: "",
      confidence: 0,
      reasoning: "",
      structure: "paragraph" as const
    },
    messages: [],
    sharedKnowledge: {
      documentInsights: {},
      extractionStrategies: {},
      discoveredPatterns: {},
      agentFindings: {}
    },
    metadata: {
      startTime: Date.now(),
      agentsInvolved: ["DataInspector"],
      totalChunksProcessed: 2,
      searchApproach: "claude_code_style" as const,
      chunksFromStorage: 2
    }
  };
  
  // 2. Create user feedback for the misclassification
  const userFeedback: UserFeedback = {
    issue: "Step 11 incorrectly classified a CV as relevant to language model improvements",
    correction: "This CV should be marked as irrelevant - only technical documents about language models should be considered relevant",
    specificInstructions: "Focus only on research papers, technical documentation, and articles specifically about language model improvements. Exclude personal documents like CVs unless they contain specific research contributions.",
    affectedItems: ["doc_cv_john_doe", "john_doe_cv.pdf"],
    severity: "major" as const,
    correctionType: "classification" as const,
    additionalContext: "The CV belongs to a person and doesn't contain information about language model improvements"
  };
  
  // 3. Initialize agent and orchestrator
  const llmFunction = async (prompt: string) => {
    // Mock LLM response for testing
    return JSON.stringify({
      analysis: "Corrected analysis excluding CV",
      relevantDocuments: ["doc_research_paper_1"],
      excludedDocuments: ["doc_cv_john_doe"]
    });
  };
  
  const dataInspectorAgent = new DataInspectorAgent(llmFunction);
  
  // 4. Test the feedback processing
  console.log('\n📝 Original Context:');
  console.log('- Documents analyzed:', mockContext.documentAnalysis?.documents?.length);
  console.log('- CV classification:', mockContext.documentAnalysis?.documents?.[0].role);
  
  console.log('\n🔄 Applying User Feedback:');
  console.log('- Issue:', userFeedback.issue);
  console.log('- Correction:', userFeedback.correction);
  console.log('- Affected items:', userFeedback.affectedItems);
  
  // 5. Process with feedback
  const correctedContext = await dataInspectorAgent.processWithFeedback(
    mockContext,
    userFeedback
  );
  
  console.log('\n✅ Corrected Context:');
  console.log('- Chunks after filtering:', correctedContext.ragResults.chunks.length);
  console.log('- CV classification after correction:', 
    correctedContext.documentAnalysis?.documents?.find(d => d.documentId === 'doc_cv_john_doe')?.role
  );
  console.log('- Reasoning includes feedback:', correctedContext.rerunMetadata?.userFeedback ? 'Yes' : 'No');
  
  // 6. Verify corrections were applied
  const assertions = {
    chunksFiltered: correctedContext.ragResults.chunks.length < mockContext.ragResults.chunks.length,
    cvMarkedAsReference: correctedContext.documentAnalysis?.documents?.find(
      d => d.documentId === 'doc_cv_john_doe'
    )?.role === 'reference',
    feedbackInContext: !!correctedContext.rerunMetadata?.userFeedback,
    excludedItemsTracked: correctedContext.rerunMetadata?.excludedResults?.includes('doc_cv_john_doe')
  };
  
  console.log('\n🧪 Test Results:');
  Object.entries(assertions).forEach(([test, passed]) => {
    console.log(`  ${passed ? '✅' : '❌'} ${test}: ${passed}`);
  });
  
  const allTestsPassed = Object.values(assertions).every(v => v);
  console.log(`\n${allTestsPassed ? '🎉 All tests passed!' : '⚠️ Some tests failed'}`);
  
  return allTestsPassed;
}

/**
 * Example: Using Orchestrator with feedback
 */
async function testOrchestratorWithFeedback() {
  console.log('\n🧪 Testing Orchestrator Rerun with Feedback');
  
  // Mock setup
  const mockContext: ResearchContext = createMockContext();
  const userFeedback: UserFeedback = createMockFeedback();
  
  // Initialize orchestrator
  const orchestrator = new Orchestrator(
    async (prompt: string) => "Mock LLM response",
    undefined // progress callback
  );
  
  // Preserve previous agent results
  const preservedResults = new Map<string, any>();
  preservedResults.set('QueryPlanner', { /* previous results */ });
  
  // Rerun DataInspector with feedback
  const correctedContext = await orchestrator.rerunAgent(
    'DataInspector',
    mockContext,
    preservedResults,
    userFeedback // Pass user feedback
  );
  
  console.log('✅ Agent rerun with feedback completed');
  console.log('- Feedback applied:', !!correctedContext.rerunMetadata?.userFeedback);
  console.log('- Attempt number:', correctedContext.rerunMetadata?.attemptNumber);
  
  return correctedContext;
}

// Helper functions
function createMockContext(): ResearchContext {
  // Return a simplified mock context
  return {} as ResearchContext;
}

function createMockFeedback(): UserFeedback {
  return {
    issue: "Test issue",
    correction: "Test correction",
    severity: "minor" as const
  };
}

// Run tests if this file is executed directly
if (require.main === module) {
  (async () => {
    console.log('🚀 Running Agent Rerun Tests\n');
    
    try {
      await testCVMisclassificationCorrection();
      // await testOrchestratorWithFeedback(); // Uncomment when ready to test
      
      console.log('\n✅ All tests completed');
    } catch (error) {
      console.error('\n❌ Test failed:', error);
      process.exit(1);
    }
  })();
}

export {
  testCVMisclassificationCorrection,
  testOrchestratorWithFeedback
};