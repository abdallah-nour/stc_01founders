require.config({
  paths: { vs: "https://unpkg.com/monaco-editor@latest/min/vs" },
});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(
  new Blob(
    [
      `
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
`,
    ],
    { type: "text/javascript" }
  )
);

require(["vs/editor/editor.main"], function () {
  let editor = monaco.editor.create(document.getElementById("codeEditor"), {
    value: "",
    language: "javascript",
    theme: "vs-dark",
    minimap: { enabled: false },
    autoIndent: true,
    formatOnPaste: true,
    formatOnType: true,
    fontSize: "16px",
    scrollbar: {
      vertical: "hidden",
      horizontal: "hidden",
      handleMouseWheel: false,
    },
  });

  editor.setSelection({
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: 1,
    endColumn: 5,
  });
});
