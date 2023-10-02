import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Post(_props: { id: number; title: string; contents: string }) {
  const [count, setCount] = useState(0)

  function addCount(v: number) {
    setCount((count) => count + v)
  }

  const navigate = useNavigate()
  const handlePostClick = (id: number) => {
    navigate('/detail/' + id)
  }

  return (
    <Card className="m-3" style={{ width: '18rem' }} onClick={() => handlePostClick(_props.id)}>
      <Card.Img
        variant="top"
        src={'https://picsum.photos/seed/' + _props.id + '/200/200'}
        height={200}
      />
      <Card.Body>
        <Card.Title>{_props.title}</Card.Title>
        <Card.Text>{_props.contents}</Card.Text>
      </Card.Body>
      <Button
        className="border-0"
        variant="outline-primary"
        size="sm"
        onClick={(event) => {
          event.stopPropagation()
          addCount(1)
        }}
      >
        👍 {count}
      </Button>
    </Card>
  )
}

export default Post
