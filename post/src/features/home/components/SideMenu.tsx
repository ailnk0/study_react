import { Box, Button, ButtonGroup, Divider } from '@mui/material'
import NewWorkspaceButton from '../../workspaces/components/NewWorkspaceButton'
import CollectionList from '../../collections/components/CollectionList'

export default function NestedList() {
  const buttons = [
    <NewWorkspaceButton key="new" />,
    <Button key="import">Import</Button>,
    <Button key="export">Export</Button>
  ]

  return (
    <Box sx={{ mr: 1 }}>
      <Box sx={{ mb: 1 }}>
        <ButtonGroup size="small" aria-label="small button group">
          {buttons}
        </ButtonGroup>
      </Box>
      <Divider />
      <Box sx={{ mt: 2 }}>
        <CollectionList />
      </Box>
    </Box>
  )
}
