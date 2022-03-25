import React, { ChangeEvent } from 'react'
import { IconButton, ListItem, Switch, TextField } from '@mui/material'
import RemoveIcon from '@mui/icons-material/DeleteForever'
import { useRecoilState } from 'recoil'
import { todoListAtom } from '../../context/atom/Todo'
import { ITodo } from '../../models'
import {
  findIndex,
  removeItemAtIndex,
  replaceItemAtIndex
} from '../../utils/functions'

interface IProps {
  item: ITodo
}

export const TodoItem = ({ item }: IProps) => {
  const [todoList, setTodoList] = useRecoilState(todoListAtom)
  const index = findIndex(todoList, item)

  const editItemText = (event: ChangeEvent<HTMLInputElement>) => {
    const newList = replaceItemAtIndex<ITodo>(todoList, index, {
      ...item,
      text: event.target.value
    })

    setTodoList(newList)
  }

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex<ITodo>(todoList, index, {
      ...item,
      isComplete: !item.isComplete
    })

    setTodoList(newList)
  }

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index)

    setTodoList(newList)
  }

  return (
    <ListItem
      divider
      style={{ gap: '20px', display: 'flex', flexFlow: 'row wrap' }}
    >
      <TextField
        id="outlined-basic"
        label={`Task ${item.isComplete ? 'Complete' : ''}`}
        variant="filled"
        disabled={item.isComplete}
        value={item.text}
        onChange={editItemText}
      />
      <Switch
        checked={item.isComplete}
        onChange={toggleItemCompletion}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <IconButton aria-label="delete" color="error" onClick={deleteItem}>
        <RemoveIcon />
      </IconButton>
    </ListItem>
  )
}
