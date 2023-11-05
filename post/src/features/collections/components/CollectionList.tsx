import * as React from 'react'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Box, IconButton, Link } from '@mui/material'
import { collectionItem } from '../collectionItem'
import { useNavigate, useParams } from 'react-router-dom'
import { selectWorkspaceById } from '../../workspaces/workspaceSlice'
import { deleteCollectionById, selectAllCollections } from '../collectionSlice'
import NewCollectionButton from './NewCollectionButton'

export default function CollectionList() {
  const navigate = useNavigate()
  const { workspaceId } = useParams()

  const dispatch = useAppDispatch()
  const collections = useAppSelector(selectAllCollections)
  const workspace = useAppSelector((state) => selectWorkspaceById(state, workspaceId ?? ''))

  const [cols, setCols] = React.useState([] as collectionItem[])

  const handleOpen = (_e: React.MouseEvent<HTMLElement, MouseEvent>, col: collectionItem) => {
    navigate(`/workspaces/${workspace.id}/collections/${col.id}`)
  }

  const handleDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>, col: collectionItem) => {
    e.stopPropagation()
    dispatch(deleteCollectionById(col.id))
  }

  React.useEffect(() => {
    if (workspace) {
      const cols = collections.filter((col) => col.parent === workspace.id)
      setCols(cols)
    }
  }, [collections, workspace])

  if (workspace) {
    return (
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                Collections of <Link href={`/workspaces/${workspace.id}`}>{workspace.title}</Link>
              </Box>
              <NewCollectionButton />
            </Box>
          </ListSubheader>
        }
      >
        {cols.map((col) => (
          <ListItemButton key={col.id} onClick={(e) => handleOpen(e, col)}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText
              primary={col.title}
              secondary={new Date(col.updated).toLocaleDateString()}
            />
            <IconButton aria-label="delete" onClick={(e) => handleDelete(e, col)}>
              <DeleteIcon />
            </IconButton>
          </ListItemButton>
        ))}
      </List>
    )
  } else {
    return <></>
  }
}
