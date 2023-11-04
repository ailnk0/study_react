import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { selectWorkspaceById, updateWorkspace } from './workspaceSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import React, { useEffect } from 'react'

export default function WorkspacePage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [title, setTitle] = React.useState('')
  const [desc, setDesc] = React.useState('')

  const dispatch = useAppDispatch()
  const ws = useAppSelector((state) => selectWorkspaceById(state, id ?? ''))

  const handleUpdate = () => {
    try {
      const newWorkspace = Object.assign({}, ws)
      newWorkspace.title = title
      newWorkspace.desc = desc
      newWorkspace.updated = Date.now()
      dispatch(updateWorkspace(newWorkspace))
      // TODO: show success message
    } catch (e) {
      console.log('failed to update workspace', e)
      // TODO: show error message
    }
  }

  useEffect(() => {
    setTitle(ws.title)
    setDesc(ws.desc)
  }, [ws])

  if (ws) {
    return (
      <Container>
        <Box mb={5}>
          <Typography variant="h4">Workspace</Typography>
        </Box>
        <Box mb={3}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            id="desc"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Box>
        <Button variant="outlined" onClick={handleUpdate}>
          Update
        </Button>
      </Container>
    )
  } else {
    return (
      <Container>
        <Box mb={2}>
          <Typography variant="h4">Workspace not found</Typography>
        </Box>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Container>
    )
  }
}
