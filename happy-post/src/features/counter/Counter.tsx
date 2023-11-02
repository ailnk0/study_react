import { Box, Button, Container, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../app/hook'
import { decrement1, increment1 } from './counter1Slice'
import { decrement2, increment2 } from './counter2Slice'
import { createAsyncThunk } from '@reduxjs/toolkit'

export function Counter() {
  const count = useAppSelector((state) => state.counter1.value)
  const count2 = useAppSelector((state) => state.counter2.value)
  const dispatch = useAppDispatch()

  const fetchIncrement = createAsyncThunk('async/fetchIncrement', async () => {
    dispatch(increment1())
    dispatch(increment2())
  })

  const fetchDecrement = createAsyncThunk('async/fetchDecrement', async () => {
    dispatch(decrement1())
    dispatch(decrement2())
  })

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 20 }}>
        <Typography variant="h2" gutterBottom>
          Counter 1
        </Typography>
        <Typography variant="h3" gutterBottom>
          {count}
        </Typography>
        <Box>
          <Button variant="contained" color="success" onClick={() => dispatch(increment1())}>
            +
          </Button>
          <Button variant="contained" color="error" onClick={() => dispatch(decrement1())}>
            -
          </Button>
        </Box>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 15 }}>
        <Typography variant="h5" gutterBottom>
          Fetch to update both counters
        </Typography>
        <Typography variant="h2" gutterBottom>
          Counter 2 - Thunk
        </Typography>
        <Typography variant="h3" gutterBottom>
          {count2}
        </Typography>
        <Box>
          <Button variant="contained" color="success" onClick={() => dispatch(fetchIncrement())}>
            +
          </Button>
          <Button variant="contained" color="error" onClick={() => dispatch(fetchDecrement())}>
            -
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
