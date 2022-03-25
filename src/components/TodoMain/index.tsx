import { Divider, List, Typography } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { todoListAtom } from '../../context/atom/Todo'
import { TodoItem } from '../TodoItem'
import { TodoItemCreator } from '../TodoItemCreator'

export const TodoMain = () => {
  const todoList = useRecoilValue(todoListAtom)

  return (
    <div className="parent-container">
      <div>
        <Typography
          variant="h2"
          gutterBottom
          component="div"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          Todo List
        </Typography>

        <TodoItemCreator />

        <Divider variant="middle" style={{ marginTop: '20px' }} />

        {todoList.length > 0 && (
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper'
            }}
          >
            {todoList.map(todoItem => (
              <TodoItem key={todoItem.id} item={todoItem} />
            ))}
          </List>
        )}
      </div>
    </div>
  )
}
