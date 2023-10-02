import { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addPost } from '../app/store'

function WritePost() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleContentsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value)
  }

  const isPostButtonDisabled = !title || !contents

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(addPost({ title: title, content: contents }))
  }

  return (
    <>
      <Form className="m-3" onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingTitle" label="Title" className="mb-1">
          <Form.Control type="text" value={title} onChange={handleTitleChange} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingContents" label="Contents" className="mb-1">
          <Form.Control as="textarea" value={contents} onChange={handleContentsChange} />
        </FloatingLabel>
        <Button variant="primary" type="submit" disabled={isPostButtonDisabled}>
          Post
        </Button>
      </Form>
    </>
  )
}

export default WritePost
