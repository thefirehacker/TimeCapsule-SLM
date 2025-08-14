/*
  Regex Extraction Worker
  - Offloads regex scanning from the main thread
  - Performs pattern sanitization, batching, and normalized matching
*/

self.onmessage = async (event) => {
  const data = event.data || {};
  const type = data.type;
  const payload = data.payload || {};
  if (type !== 'run') return;

  try {
    const patterns = Array.isArray(payload.patterns) ? payload.patterns : [];
    const chunks = Array.isArray(payload.chunks) ? payload.chunks : [];
    const caps = Object.assign({ maxPatterns: 64, maxMatchesPerChunk: 200, batchSize: 2 }, payload.caps || {});

    const start = Date.now();

    // 1) Sanitize patterns
    const sanitized = sanitizePatterns(patterns).slice(0, caps.maxPatterns);

    // 2) Compile once
    const compiled = [];
    for (let i = 0; i < sanitized.length; i++) {
      const p = sanitized[i];
      try {
        const m = String(p.regexPattern).match(/^\/(.*)\/([gimuy]*)$/);
        const body = m ? m[1] : String(p.regexPattern);
        const flags = (m ? m[2] : 'gi') || 'gi';
        if (body.length > 200 || /(\([^)]*\+\))+/.test(body)) continue;
        const f = flags.includes('g') ? flags : flags + 'g';
        compiled.push({ description: String(p.description || ''), src: String(p.regexPattern), re: new RegExp(body, f) });
      } catch (e) {
        // skip bad patterns
      }
    }

    const results = [];

    // 3) Process in batches to keep the worker responsive
    for (let i = 0; i < compiled.length; i += caps.batchSize) {
      const batch = compiled.slice(i, i + caps.batchSize);

      for (let j = 0; j < batch.length; j++) {
        const { re, src, description } = batch[j];
        for (let c = 0; c < chunks.length; c++) {
          const chunk = chunks[c];
          let matches = 0;

          re.lastIndex = 0;
          let m;
           while ((m = re.exec(chunk.text)) !== null) {
            const originalFull = (m[0] || '').toString();
            const captured = (m[1] || originalFull).toString();
            results.push(toItem(captured.trim(), originalFull, chunk, src, description, false));
            matches++;
            if (matches >= caps.maxMatchesPerChunk) break;
          }
          re.lastIndex = 0;
          if (matches >= caps.maxMatchesPerChunk) continue;

           const norm = String(chunk.text || '')
            .toLowerCase()
            .replace(/[._-]/g, ' ')
            .replace(/\s+/g, ' ');

          while ((m = re.exec(norm)) !== null) {
            const normalizedFull = (m[0] || '').toString();
            const normalizedCaptured = (m[1] || normalizedFull).toString();
            results.push(toItem(normalizedCaptured.trim(), normalizedFull, chunk, src, description, true));
            matches++;
            if (matches >= caps.maxMatchesPerChunk) break;
          }
          re.lastIndex = 0;
        }
      }

      self.postMessage({ type: 'progress', payload: { processed: Math.min(i + caps.batchSize, compiled.length), total: compiled.length } });
      await sleep(1);
    }

    self.postMessage({ type: 'done', payload: { items: results, tookMs: Date.now() - start } });
  } catch (err) {
    self.postMessage({ type: 'error', payload: { message: String((err && err.message) || err) } });
  }
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function sanitizePatterns(patterns) {
  const seen = new Set();
  const out = [];
  for (let i = 0; i < patterns.length; i++) {
    const p = patterns[i] || {};
    const pat = String(p.regexPattern || '').trim();
    if (!pat || pat.length < 4) continue;
    const key = pat + '::' + String(p.description || '');
    if (seen.has(key)) continue;
    seen.add(key);
    if (/^\/pattern\d+\/[gimuy]*$/.test(pat)) continue;
    if (/\(definition\|definition\|usage\|usage\)/i.test(pat)) continue;
    out.push({ description: String(p.description || ''), regexPattern: pat });
  }
  return out;
}

function toItem(value, fullMatch, chunk, src, description, normalized) {
  // Try to extract numeric value and unit from the match
  let extractedValue = value;
  let extractedUnit = '';
  
  // Pattern to extract number and unit (e.g., "4.26 hours", "216k tokens/s")
  const valueUnitMatch = value.match(/^([\d.,]+[kKmMbB]?)\s*(.*)$/);
  if (valueUnitMatch) {
    extractedValue = valueUnitMatch[1];
    extractedUnit = valueUnitMatch[2] || '';
  }
  
  // Store original context for better evidence preservation
  const originalContext = normalized ? undefined : fullMatch;
  const normalizedContext = normalized ? fullMatch : undefined;
  
  return {
    content: value,
    value: extractedValue,
    unit: extractedUnit,
    context: fullMatch,
    confidence: normalized ? 0.88 : 0.95,
    sourceChunkId: chunk.id,
    sourceDocument: chunk.sourceDocument,
    metadata: {
      extractionMethod: normalized ? 'regex_pattern_normalized' : 'regex_pattern',
      regexPattern: src,
      patternDescription: description,
      normalized: !!normalized,
      originalText: originalContext,
      normalizedText: normalizedContext,
      originalContext: originalContext || normalizedContext,
      fullMatch: fullMatch
    }
  };
}
