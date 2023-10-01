import { Container } from 'react-bootstrap'
import Post from '../components/Post'
import Datas from '../utils/Datas.tsx'

function Home() {
  return (
    <>
      <Container>
        {Datas.map((d) => (
          <Post key={d.id} id={d.id} title={d.title} contents={d.content} />
        ))}
      </Container>
    </>
  )
}

export default Home
