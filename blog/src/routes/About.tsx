import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './About.css'
import { Container } from 'react-bootstrap'

function About() {
  return (
    <>
      <Container
        style={{
          height: '75vh'
        }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" style={{ width: '100px' }} />
          </a>
          <a href="https://react.dev" target="_blank">
            <img
              src={reactLogo}
              className="logo react"
              alt="React logo"
              style={{ width: '100px' }}
            />
          </a>
        </div>
        <h1>Vite + React</h1>
        <p>Click on the Vite and React logos to learn more</p>
      </Container>
    </>
  )
}

export default About
