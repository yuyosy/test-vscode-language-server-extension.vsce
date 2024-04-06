import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver/node';

const maxNumberOfProblems = 1000;

export function validateTextDocument(textDocument: TextDocument): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const text = textDocument.getText();
  const pattern = /\bHello\b/g;
  let m: RegExpExecArray | null;

  let problems = 0;
  while ((m = pattern.exec(text)) && problems < maxNumberOfProblems) {
    problems++;
    const diagnostic: Diagnostic = {
      severity: DiagnosticSeverity.Warning,
      range: {
        start: textDocument.positionAt(m.index),
        end: textDocument.positionAt(m.index + m[0].length),
      },
      message: `${m[0]} world!`,
      source: 'sample',
    };
    diagnostics.push(diagnostic);
  }

  return diagnostics;
}
