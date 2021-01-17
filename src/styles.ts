
export interface VSStyle {
  backgroundColor: string,
  foregroundColor: string,
  fontSize: string,
  fontFamily: string,
}

export const grabStyles = () => {
  const root = getComputedStyle(document.getElementsByTagName("html")[0]);

  var style: VSStyle = {
    backgroundColor: root.getPropertyValue('--vscode-editor-background'),
    foregroundColor: root.getPropertyValue('--vscode-foreground'),
    fontSize: root.getPropertyValue('--vscode-font-size'),
    fontFamily: root.getPropertyValue('--vscode-font-family'),
  }

  return style;
}