import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { selectWorkspaceById, update } from './workspacesSlice'
import { Box, Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { DEFAULT_WORKSPACE } from './repo'

export default function WorkspacePage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const workspace = useAppSelector((state) => selectWorkspaceById(state, parseInt(id ?? '')))
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const handleUpdate = () => {
    const clone = { ...(workspace ?? DEFAULT_WORKSPACE) }
    clone.title = title
    clone.desc = desc
    dispatch(update(clone))
  }

  useEffect(() => {
    if (!workspace) {
      navigate('/404')
      return
    }
    setTitle(workspace.title)
    setDesc(workspace.desc)
  }, [navigate, workspace])

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
