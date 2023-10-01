import { Container } from 'react-bootstrap'

function Error() {
  return (
    <Container
      style={{
        height: '75vh'
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h1>404 Error: Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </Container>
  )
}

export default Error
