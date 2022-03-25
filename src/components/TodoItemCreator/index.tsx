import { Box, Button, TextField } from '@mui/material'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRecoilState } from 'recoil'
import { todoListAtom } from '../../context/atom/Todo'
import { generateUUID } from '../../utils/functions'

export const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('')
  const [, setTodoList] = useRecoilState(todoListAtom)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const addTodoItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (inputValue) {
      setTodoList(oldTodoList => [
        ...oldTodoList,
        {
          id: generateUUID(),
          text: inputValue,
          isComplete: false
        }
      ])
      setInputValue('')
    }
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}
      justifyContent="center"
      noValidate
      autoComplete="off"
      onSubmit={addTodoItem}
    >
      <TextField
        id="outlined-basic"
        label="Task"
        variant="outlined"
        value={inputValue}
        onChange={onChange}
      />
      <Button variant="contained" type="submit">
        Add Task
      </Button>
    </Box>
  )
}
