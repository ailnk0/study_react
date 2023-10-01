import { useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'

function Home() {
  const [title] = useState('Title')
  const [contents] = useState('Contents')
  const [count, setCount] = useState(0)

  function addCount(v: number) {
    setCount((count) => count + v)
  }

  return (
    <>
      <Container>
        <Card className="m-3" style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://picsum.photos/200/200" height={200} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{contents}</Card.Text>
          </Card.Body>
          <Button
            className="border-0"
            variant="outline-primary"
            size="sm"
            onClick={() => addCount(1)}
          >
            👍 {count}
          </Button>
        </Card>
      </Container>
    </>
  )
}

export default Home
