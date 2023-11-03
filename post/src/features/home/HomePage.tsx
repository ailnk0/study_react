import {
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useAppSelector } from '../../app/hooks'

export default function HomePage() {
  const workspaces = useAppSelector((state) => state.workspaces.displayed.col)

  return (
    <Container>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Workspace
          </ListSubheader>
        }
      >
        {workspaces.map((workspace) => (
          <ListItemButton key={workspace.id}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary={workspace.name} />
          </ListItemButton>
        ))}
      </List>
    </Container>
  )
}
