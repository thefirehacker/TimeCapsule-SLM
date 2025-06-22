// 1. Init Editor (Monaco shown)
require(['vs/editor/editor.main'], () => {
  window.editor = monaco.editor.create(document.getElementById('editor'), {
    language: 'javascript',
    theme: 'vs-dark'
  });
});

// 2. Run button handler
document.getElementById('runBtn').onclick = () => {
  const code = editor.getValue();
  runSketch(code);
};

// 3. Fix button handler
document.getElementById('fixBtn').onclick = async () => {
  const fixed = await fixCode(editor.getValue());
  editor.setValue(fixed);
};

// 4. runSketch: teardown + instantiate p5
function runSketch(code) {
  // Remove existing canvas & script
  document.getElementById('canvas').innerHTML = '';
  const sketch = new Function('p', code);
  new p5(sketch, 'canvas');
}

// 5. fixCode: uses your chosen LM runtime
async function fixCode(src) { /* see above */ }
