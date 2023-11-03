import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { save, showCreate } from '../Slice'
import { Workspace } from '../Workspace'
import React from 'react'

export default function Create() {
  const dispatch = useAppDispatch()
  const workspaces = useAppSelector((state) => state.workspaces)
  const [title, setTitle] = React.useState('')
  const [desc, setDesc] = React.useState('')

  const handleClose = () => {
    dispatch(showCreate(false))
  }
  const handleOk = () => {
    const workspace: Workspace = {
      id: 0,
      name: title,
      desc: desc,
      sequence: 0,
      collections: []
    }
    dispatch(save(workspace))
    dispatch(showCreate(false))
  }

  return (
    <div>
      <Dialog open={workspaces.isCreate} onClose={handleClose}>
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
          <TextField
            autoFocus
            margin="dense"
            id="desc"
            label="Description"
            type="text"
            fullWidth
            multiline
            variant="standard"
            onChange={(e) => setDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
