import { Container, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function WorkspaceLayout() {
  return (
    <Container>
      <Typography variant="h4">Workspace</Typography>
      <Outlet />
    </Container>
  )
}
