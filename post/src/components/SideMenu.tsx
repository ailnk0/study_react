import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SendIcon from '@mui/icons-material/Send'
import { Box, Button, ButtonGroup, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useAppDispatch, useAppSelector } from '../hooks'
import { HWorkspace } from '../repositories/HWorkspacesRepo'
import { save } from '../features/workspaces/workspaceSlice'

const buttons = [
  <Button key="new">New</Button>,
  <Button key="import">Import</Button>,
  <Button key="export">Export</Button>
]

export default function NestedList() {
  const dispatch = useAppDispatch()
  const repo = useAppSelector((state) => state.workspaces.repo)

  const addWorkspace = () => {
    const workspace: HWorkspace = {
      id: 0,
      name: 'My workspace',
      desc: 'My workspace description',
      sequence: 0,
      collections: []
    }
    dispatch(save(workspace))
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton aria-label="delete" onClick={addWorkspace}>
          <AddIcon />
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1
            }
          }}
        >
          <ButtonGroup size="small" aria-label="small button group">
            {buttons}
          </ButtonGroup>
        </Box>
      </Box>
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
        {repo.workspaces.map((workspace) => (
          <ListItemButton key={workspace.id}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary={workspace.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}
