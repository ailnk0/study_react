import { Button, Card } from 'react-bootstrap'

function App() {
  return (
    <>
      <div className="bg-black text-white p-3">
        <h1>Blog</h1>
      </div>
      <div className="p-3">
        <Card className="m-3" style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://picsum.photos/200/200" height={200} />
          <Card.Body>
            <Card.Title>Title</Card.Title>
            <Card.Text>contents</Card.Text>
          </Card.Body>
          <Button className="border-0" variant="outline-primary" size="sm">
            👍 0
          </Button>
        </Card>
      </div>
    </>
  )
}

export default App
