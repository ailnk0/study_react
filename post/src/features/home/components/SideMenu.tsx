import { Box, Button, ButtonGroup } from '@mui/material'
import NewWorkspaceButton from '../../workspaces/components/NewWorkspaceButton'

export default function NestedList() {
  const buttons = [
    <NewWorkspaceButton key="new" />,
    <Button key="import">Import</Button>,
    <Button key="export">Export</Button>
  ]

  return (
    <Box>
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
    </Box>
  )
}
