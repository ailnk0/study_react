import { Box, Button, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../app/hook'
import { decrement, increment } from './counterSlice'

export function Counter() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" gutterBottom>
          {count}
        </Typography>
        <Box>
          <Button variant="contained" color="success" onClick={() => dispatch(increment())}>
            +
          </Button>
          <Button variant="contained" color="error" onClick={() => dispatch(decrement())}>
            -
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
