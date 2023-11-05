import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { selectCollectionById, updateCollection } from './collectionSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import React, { useEffect } from 'react'

export default function CollectionPage() {
  const navigate = useNavigate()
  const { collectionId } = useParams()
  const [title, setTitle] = React.useState('')
  const [desc, setDesc] = React.useState('')

  const dispatch = useAppDispatch()
  const collection = useAppSelector((state) => selectCollectionById(state, collectionId ?? ''))

  const handleUpdate = () => {
    try {
      const newCollection = Object.assign({}, collection)
      newCollection.title = title
      newCollection.desc = desc
      newCollection.updated = Date.now()
      dispatch(updateCollection(newCollection))
      // TODO: show success message
    } catch (e) {
      console.log('failed to update workspace', e)
      // TODO: show error message
    }
  }

  useEffect(() => {
    setTitle(collection.title)
    setDesc(collection.desc)
  }, [collection])

  if (collection) {
    return (
      <Container>
        <Box mb={5}>
          <Typography variant="h4">Collection</Typography>
        </Box>
        <Box mb={3}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            id="desc"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Box>
        <Button variant="outlined" onClick={handleUpdate}>
          Update
        </Button>
      </Container>
    )
  } else {
    return (
      <Container>
        <Box mb={2}>
          <Typography variant="h4">Collection not found</Typography>
        </Box>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Container>
    )
  }
}
