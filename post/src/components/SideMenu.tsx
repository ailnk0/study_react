import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SendIcon from '@mui/icons-material/Send'
import { Box, Button, ButtonGroup } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { showCreate } from '../features/workspaces/Slice'
import CreateDlg from '../features/workspaces/components/CreateDlg'

export default function NestedList() {
  const dispatch = useAppDispatch()
  const workspaces = useAppSelector((state) => state.workspaces.displayed.col)

  const handleAdd = () => {
    dispatch(showCreate(true))
  }

  const buttons = [
    <Button key="new" onClick={handleAdd}>
      New
    </Button>,
    <Button key="import">Import</Button>,
    <Button key="export">Export</Button>
  ]

  return (
    <Box>
      <Box>
        <CreateDlg />
      </Box>
      <Box>
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
        {workspaces.map((workspace) => (
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
