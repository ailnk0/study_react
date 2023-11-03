import { Box, Button, ButtonGroup } from '@mui/material'
import { useAppDispatch } from '../../../app/hooks'
import { showCreate } from '../../workspaces/Slice'
import CreateDlg from '../../workspaces/components/NewWorkspaceDlg'

export default function NestedList() {
  const dispatch = useAppDispatch()

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
    </Box>
  )
}
