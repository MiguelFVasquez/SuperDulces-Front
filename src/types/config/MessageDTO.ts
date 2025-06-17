export interface MessageDTO<T> { //Answer from the back
  error: boolean
  answer: T
}