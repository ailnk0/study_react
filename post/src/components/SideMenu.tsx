import * as React from 'react'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import { Box, Button, ButtonGroup, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const buttons = [
  <Button key="new">New</Button>,
  <Button key="import">Import</Button>,
  <Button key="export">Export</Button>
]

export default function NestedList() {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton aria-label="delete">
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
        <ListItemButton>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Workspace 1" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Workspace 2" />
        </ListItemButton>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  )
}
