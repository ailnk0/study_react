import * as React from 'react'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { deleteWorkspaceById, selectAllWorkspaces } from '../../workspaces/workspaceSlice'
import { IconButton } from '@mui/material'
import { workspace } from '../../workspaces/workspace'
import { useNavigate } from 'react-router-dom'

export default function WorkspaceList() {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const workspaces = useAppSelector(selectAllWorkspaces)

  const handleOpen = (_e: React.MouseEvent<HTMLElement, MouseEvent>, ws: workspace) => {
    navigate(`/workspaces/${ws.id}`)
  }

  const handleDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>, ws: workspace) => {
    e.stopPropagation()
    dispatch(deleteWorkspaceById(ws.id))
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Workspaces List
        </ListSubheader>
      }
    >
      {workspaces.map((workspace) => (
        <ListItemButton key={workspace.id} onClick={(e) => handleOpen(e, workspace)}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText
            primary={workspace.title}
            secondary={new Date(workspace.created).toLocaleDateString()}
          />
          <IconButton aria-label="delete" onClick={(e) => handleDelete(e, workspace)}>
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
      ))}
    </List>
  )
}
