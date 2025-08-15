/*
  Pattern Tester Worker
  - Receives: { type: 'run', patterns: string[], chunks: Array<{id, content, source, documentId}>, docNameMap?: Record<string,string> }
  - Sends progress: { type: 'progress', data: { patternIndex, patternsTotal, patternMatches, totalMatches } }
  - Sends result: { type: 'result', data: { patterns, totalMatches, documentsCovered } }
  - Sends error: { type: 'error', error }
*/

self.onmessage = (e) => {
  try {
    const msg = e.data || {};
    if (msg.type !== "run") return;

    const patterns = Array.isArray(msg.patterns) ? msg.patterns : [];
    const chunks = Array.isArray(msg.chunks) ? msg.chunks : [];
    const docNameMap = msg.docNameMap || {};

    const results = [];
    let totalMatches = 0;
    const documentsCoveredSet = new Set();

    for (let i = 0; i < patterns.length; i++) {
      const patternStr = (patterns[i] || "").toString();
      let description = `Pattern ${i + 1}`;
      let regexStr = patternStr;

      try {
        if (patternStr.includes(":")) {
          const parts = patternStr.split(":");
          if (parts.length >= 2) {
            description = parts[0].trim();
            regexStr = parts.slice(1).join(":").trim();
          }
        }

        const m = regexStr.match(/^\/(.+)\/([gimuy]*)$/);
        const body = m ? m[1] : regexStr;
        const flags = (m ? m[2] : "gi") || "gi";
        const uniqFlags = Array.from(new Set((flags + "g").split(""))).join("");
        const re = new RegExp(body, uniqFlags);

        const matches = [];
        let patternMatches = 0;

        for (let c = 0; c < chunks.length; c++) {
          const chunk = chunks[c];
          const text = chunk.text || chunk.content || "";
          let mres;
          re.lastIndex = 0;
          while ((mres = re.exec(text)) !== null) {
            const extracted = (mres[1] || mres[0] || "").toString();
            const startIdx = Math.max(0, (mres.index || 0) - 50);
            const endIdx = Math.min(
              text.length,
              (mres.index || 0) + (mres[0] || "").length + 50
            );
            const context = text.substring(startIdx, endIdx);

            matches.push({
              content: extracted.trim(),
              source: chunk.source || docNameMap[chunk.documentId] || "Unknown",
              chunkId: chunk.id,
              documentId: chunk.documentId,
              confidence: 0.95,
              context: `...${context}...`,
            });

            documentsCoveredSet.add(chunk.documentId);
            patternMatches++;
            // prevent potential infinite loop on zero-length matches
            if (re.lastIndex === mres.index) re.lastIndex++;
          }
        }

        totalMatches += matches.length;
        results.push({ pattern: regexStr, description, matches });

        self.postMessage({
          type: "progress",
          data: {
            patternIndex: i + 1,
            patternsTotal: patterns.length,
            patternMatches,
            totalMatches,
          },
        });
      } catch (err) {
        results.push({
          pattern: patternStr,
          description: `Invalid Pattern ${i + 1}`,
          matches: [],
        });
      }
    }

    const finalResult = {
      patterns: results,
      totalMatches,
      documentsCovered: Array.from(documentsCoveredSet),
    };

    self.postMessage({ type: "result", data: finalResult });
  } catch (error) {
    self.postMessage({
      type: "error",
      error: (error && error.message) || "Unknown worker error",
    });
  }
};
