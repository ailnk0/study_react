import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SendIcon from '@mui/icons-material/Send'
import { useAppSelector } from '../../../app/hook'
import AddWorkspace from './AddWorkspace'
import { Box } from '@mui/material'
import { selectAllWorkspace } from '../../workspaces/workspacesSlice'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {
  const navigate = useNavigate()
  const workspaces = useAppSelector(selectAllWorkspace)

  return (
    <Box>
      <AddWorkspace />
      <List
        sx={{ width: '100%', maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Workspaces
          </ListSubheader>
        }
      >
        {workspaces.map((ws) => (
          <ListItemButton
            key={ws.id}
            onClick={() => {
              navigate(`/workspaces/${ws.id}`)
            }}
          >
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary={ws.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}
