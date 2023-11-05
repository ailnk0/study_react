import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { createCollection } from '../collectionSlice'
import { collectionItem } from '../collectionItem'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { IconButton } from '@mui/material'
import { useParams } from 'react-router-dom'
import { selectWorkspaceById, updateWorkspace } from '../../workspaces/workspaceSlice'

export default function NewCollectionDlg() {
  const { workspaceId } = useParams()
  const dispatch = useAppDispatch()
  const ws = useAppSelector((state) => selectWorkspaceById(state, workspaceId ?? ''))

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
      const newCol = new collectionItem()
      newCol.title = title
      newCol.desc = desc
      newCol.parent = workspaceId ?? ''
      dispatch(createCollection(newCol))

      const newWs = JSON.parse(JSON.stringify(ws))
      newWs.updated = Date.now()
      newWs.collections.push(newCol.id)
      dispatch(updateWorkspace(newWs))
    } catch (e) {
      console.log('failed to create collection', e)
      // TODO: show error message
    }
    setOpen(false)
  }

  if (ws) {
    return (
      <React.Fragment>
        <IconButton onClick={handleClickOpen}>
          <AddCircleIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New Collection</DialogTitle>
          <DialogContent>
            <DialogContentText>New collection makes happy you.</DialogContentText>
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
  } else {
    return <></>
  }
}
