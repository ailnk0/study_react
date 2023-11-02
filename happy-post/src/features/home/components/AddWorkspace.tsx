import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useAppDispatch } from '../../../app/hook'
import { Workspace } from '../../workspaces/repo'
import { create } from '../../workspaces/workspacesSlice'

export default function AddWorkspace() {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')

  const dispatch = useAppDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const addWorkspace = () => {
    const workspace: Workspace = {
      id: 0,
      title: title,
      collections: []
    }

    dispatch(create(workspace))
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Workspace
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Workspace</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addWorkspace}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
