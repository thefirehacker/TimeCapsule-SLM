# DataAnalyzer Context Sync Investigation

## 🔍 **ROOT CAUSE: DataAnalyzer Missing PlanningAgent Context**

### **Current Issue:**
DataAnalyzer filters out GRPO content (30% relevance) even though:
- DataInspector extracts GRPO ✅ 
- PlanningAgent identifies mainContribution: GRPO ✅
- PatternGenerator creates GRPO patterns ✅
- **DataAnalyzer ignores all upstream context** ❌

### **Missing Sync Points:**

#### **1. Hardcoded Query Analysis (Same as old PlanningAgent)**
```typescript
// DataAnalyzer Line 384-390 - HARDCODED!
if (q.includes('best') || q.includes('top')) return 'performance_ranking';
if (q.includes('method') || q.includes('approach')) return 'methodology';
```
**Problem**: We fixed this in PlanningAgent but DataAnalyzer still has it!

#### **2. Missing Document Context**
DataAnalyzer should receive:
- `documentContext.mainContribution = "Group Relative Policy Optimization (GRPO)"`  
- `documentContext.isMethodPaper = true`
- `intelligentExpectations.shouldInferFromContribution = true`

**Currently**: DataAnalyzer has none of this context!

#### **3. Wrong Relevance Logic**
**Query**: "what is the best RL method"
**GRPO Content**: "introduce Group Relative Policy Optimization (GRPO)"

**Current Scoring**:
- Content relevance: 0 (no word "method")
- Intent relevance: 0 (no performance/benchmark terms)
- **Result**: 30% → filtered out!

**Should Score High Because**:
- mainContribution = GRPO → highly relevant
- Method paper + "best method" query = extract main method
- GRPO introduction = the answer!

### **Fix Strategy:**
1. **Remove hardcoded patterns** from DataAnalyzer
2. **Sync with PlanningAgent context** - use documentContext and intelligentExpectations  
3. **Content-aware relevance** - GRPO = main contribution = max relevance
4. **Zero hardcoding** - work with any document/query type

## Expected Result: GRPO content scores 95%+ relevance ✅