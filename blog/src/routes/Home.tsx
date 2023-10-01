import { Container } from 'react-bootstrap'
import Post from '../components/Post'
import Datas from '../utils/Datas.tsx'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  const handlePostClick = (id: number) => {
    navigate('/detail/' + id)
  }

  return (
    <>
      <Container>
        {Datas.map((d) => (
          <div key={d.id} onClick={() => handlePostClick(d.id)}>
            <Post id={d.id} title={d.title} contents={d.content} />
          </div>
        ))}
      </Container>
    </>
  )
}

export default Home
