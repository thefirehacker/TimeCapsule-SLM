# Dynamic Tool-Call Multi-Agent Architecture Plan

## 🎯 CORE DESIGN: LLM Orchestrates Agent Tools (Not Sequential Pipeline)

**Problem**: Rigid DataInspector → ChunkSelector → ExtractionAgent sequence fails to adapt
**Solution**: DataInspector once → LLM orchestrates agent tool-calls based on findings

## 🚨 KEY REQUIREMENTS
- ✅ **Qwen3 0.6b compatibility** (`<think>` tokens expected, not contamination)
- ✅ **No hardcoding** (universal patterns only)
- ✅ **Communication preserved** (shared context across tool calls)
- ✅ **Tool-call understanding** (small models decide when to call agents)

## 🔧 ARCHITECTURE

### **Phase 1: Initial Analysis (Fixed)**
`DataInspector.analyze()` → Creates BaseContext (preserved throughout)

### **Phase 2: Dynamic Tool Orchestration (Adaptive)**
```
LLM Orchestrator Loop:
1. Evaluate current context + query
2. Decide what tool to call next
3. Execute agent tool-call
4. Update shared context  
5. Repeat until query satisfied
```

**Available Agent Tools:**
- `ChunkSelector.search(patterns)` - Find chunks with LLM-generated patterns
- `ExtractionAgent.extract(chunks)` - Extract data from found chunks
- `DataInspector.analyzeSpecific(focus)` - Deep dive analysis
- `PatternGenerator.generate(context)` - Create new search patterns

## 📋 SPEED RUN EXAMPLE FLOW
1. **DataInspector**: "Found blog content about training"
2. **LLM**: "Need timing data → ChunkSelector.search('hours minutes timing')"
3. **ChunkSelector**: Finds "4.53 hours" chunk
4. **LLM**: "Found timing → PatternGenerator.generate('more timing patterns')"
5. **PatternGenerator**: Creates "baseline changes optimization hours"
6. **LLM**: "New patterns → ChunkSelector.search(new_patterns)"
7. **ChunkSelector**: Finds table structure + more timing entries
8. **LLM**: "Complete data → ExtractionAgent.extract(all_chunks)"
9. **ExtractionAgent**: Extracts all 6 speed run entries ✅

## 🚀 CRITICAL FIXES
1. **Agent Communication**: Shared DynamicContext prevents information loss
2. **Iterative Discovery**: Find partial → generate patterns → find complete
3. **Universal Intelligence**: LLM generates patterns (no hardcoding)
4. **Small Model Friendly**: Simple tool-call decision prompts
5. **Qwen Compatibility**: Accept `<think>` tokens as normal behavior

## 📊 EXPECTED RESULTS
- **Complete Data**: All 6 timing values (8.13h, 7.51h, 4.53h, 4.26h, 4.01h, 2.55h)
- **Universal**: Works with any document type (recipes, CVs, blogs, papers)  
- **Efficient**: 3-8 adaptive tool calls vs 5-6 rigid calls
- **Self-Correcting**: Can recover from partial results

---
**Next**: Implement core tool infrastructure + LLM orchestrator