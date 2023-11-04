import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { createWorkspace } from '../workspaceSlice'
import { useAppDispatch } from '../../../app/hooks'
import { workspace } from '../workspace'

export default function NewWorkspaceDlg() {
  const dispatch = useAppDispatch()

  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [desc, setDesc] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreate = () => {
    try {
      const ws = new workspace()
      ws.title = title
      ws.desc = desc
      dispatch(createWorkspace(ws))
      setOpen(false)
    } catch (e) {
      console.log('failed to create workspace', e)
      // TODO: show error message
    }
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Workspace
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Workspace</DialogTitle>
        <DialogContent>
          <DialogContentText>New workspace makes happy you.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextField
            autoFocus
            margin="dense"
            id="desc"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
