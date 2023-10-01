import { Navbar, Container, Nav } from 'react-bootstrap'

function ActionBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Blog</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/About">About</Nav.Link>
          <Nav.Link href="/404">404</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default ActionBar
