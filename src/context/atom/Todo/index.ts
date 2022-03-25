import { atom } from 'recoil'
import { ITodo } from '../../../models'

export const todoListAtom = atom<Array<ITodo>>({
  key: 'todoListState',
  default: []
})
