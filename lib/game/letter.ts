export interface Letter {
  value: string,
  state: 'correct' | 'partially-correct' | 'incorrect' | 'keyboard-default' | 'default'
}