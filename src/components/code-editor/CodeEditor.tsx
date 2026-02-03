import Editor, { OnMount } from '@monaco-editor/react';
import { useRef } from 'react';
import type { editor } from 'monaco-editor';

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  height?: string;
};

export function CodeEditor({ 
  value, 
  onChange, 
  language = 'python',
  readOnly = false,
  height = '100%'
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Define custom theme matching our design system
    monaco.editor.defineTheme('aiCodeLab', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '00D4FF' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'variable', foreground: '9CDCFE' },
        { token: 'operator', foreground: 'D4D4D4' },
      ],
      colors: {
        'editor.background': '#0a0f1a',
        'editor.foreground': '#D4D4D4',
        'editor.lineHighlightBackground': '#1a2332',
        'editor.selectionBackground': '#00D4FF26',
        'editor.inactiveSelectionBackground': '#00D4FF15',
        'editorCursor.foreground': '#00D4FF',
        'editorLineNumber.foreground': '#4b5563',
        'editorLineNumber.activeForeground': '#9ca3af',
        'editor.selectionHighlightBackground': '#00D4FF15',
        'editorIndentGuide.background': '#1f2937',
        'editorIndentGuide.activeBackground': '#374151',
        'editorWidget.background': '#0f172a',
        'editorWidget.border': '#1e293b',
        'editorSuggestWidget.background': '#0f172a',
        'editorSuggestWidget.border': '#1e293b',
        'editorSuggestWidget.selectedBackground': '#1e3a5f',
        'scrollbar.shadow': '#00000000',
        'scrollbarSlider.background': '#374151aa',
        'scrollbarSlider.hoverBackground': '#4b5563aa',
        'scrollbarSlider.activeBackground': '#6b7280aa',
      },
    });

    monaco.editor.setTheme('aiCodeLab');
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-border bg-editor-background">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
        theme="aiCodeLab"
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          lineNumbers: 'on',
          renderLineHighlight: 'line',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
          readOnly,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
        }}
        loading={
          <div className="flex items-center justify-center h-full bg-editor-background">
            <div className="animate-pulse text-muted-foreground">Loading editor...</div>
          </div>
        }
      />
    </div>
  );
}
