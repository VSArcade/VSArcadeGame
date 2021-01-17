
export const createScoreCounter = () => {

  var root = document.getElementsByTagName('body')[0];  

  var ui = document.createElement('div');
  ui.id = 'score-board';
  ui.setAttribute('style', 'color: white; position: absolute; top: 0; left: 0');
  ui.innerHTML = 'score: 0';

  root.appendChild(ui);

}