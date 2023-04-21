export interface Letter {
  value: string,
  state: 'correct' | 'partially-correct' | 'incorrect' | 'default'
}