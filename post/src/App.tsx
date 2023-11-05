import { Route, Routes } from 'react-router-dom'
import HomeLayout from './features/home/HomeLayout'
import HomePage from './features/home/HomePage'
import WorkspaceLayout from './features/workspaces/WorkspaceLayout'
import WorkspacePage from './features/workspaces/WorkspacePage'
import { Box } from '@mui/material'
import CollectionLayout from './features/collections/CollectionLayout'
import CollectionPage from './features/collections/CollectionPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="workspaces/:workspaceId" element={<WorkspaceLayout />}>
          <Route index element={<WorkspacePage />} />
          <Route path="collections/:collectionId" element={<CollectionLayout />}>
            <Route index element={<CollectionPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Box>404 Not Found Page</Box>} />
    </Routes>
  )
}

export default App
