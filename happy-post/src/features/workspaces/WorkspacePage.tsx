import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { selectWorkspaceById, update } from './workspacesSlice'
import { Box, Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { DEFAULT_WORKSPACE } from './repo'

export default function WorkspacePage() {
  const { id } = useParams()
  const wsId = parseInt(id ?? '-1')
  const workspace = useAppSelector((state) => selectWorkspaceById(state, wsId)) ?? DEFAULT_WORKSPACE
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const handleUpdate = () => {
    const copiedWorkspace = { ...workspace }
    copiedWorkspace.title = title
    copiedWorkspace.desc = desc
    dispatch(update(copiedWorkspace))
  }

  useEffect(() => {
    setTitle(workspace?.title ?? '')
    setDesc(workspace?.desc ?? '')
  }, [workspace])

  return (
    <Box>
      <Box sx={{ mt: 3 }}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <TextField
          id="desc"
          label="Description"
          multiline
          rows={4}
          fullWidth
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleUpdate}>
          Update
        </Button>
      </Box>
    </Box>
  )
}
