
export interface VSStyle {
  backgroundColor: string,
  foregroundColor: string,
  fontSize: string,
  fontFamily: string,
  containerPadding: string
}

const getStyle = (root: CSSStyleDeclaration, prop: string, def: string): string => {
  var styleProp = root.getPropertyValue(prop);
  if (styleProp == "") return def;
  return styleProp;
}

export const grabStyles = () => {
  const root = getComputedStyle(document.getElementsByTagName("html")[0]);

  var style: VSStyle = {
    backgroundColor: getStyle(root, '--vscode-editor-background', '#000000'),
    foregroundColor: getStyle(root, '--vscode-foreground', '#FFFFFF'),
    // fontSize: getStyle(root, '--vscode-font-size', '15'),
    // fontFamily: getStyle(root, '--vscode-font-family', 'Courier New'),
    fontSize: '15',
    fontFamily: 'Courier New',
    containerPadding: '80'
  }

  return style;
}