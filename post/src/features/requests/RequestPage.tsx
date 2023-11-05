import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { selectRequestById, updateRequest } from './requestSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import React, { useEffect } from 'react'

export default function RequestPage() {
  const navigate = useNavigate()
  const { workspaceId } = useParams()
  const [title, setTitle] = React.useState('')
  const [desc, setDesc] = React.useState('')

  const dispatch = useAppDispatch()
  const req = useAppSelector((state) => selectRequestById(state, workspaceId ?? ''))

  if (req) {
    return (
      <Container>
        <Box mb={5}>
          <Typography variant="h4">Request</Typography>
        </Box>
      </Container>
    )
  } else {
    return (
      <Container>
        <Box mb={2}>
          <Typography variant="h4">Request not found</Typography>
        </Box>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Container>
    )
  }
}
