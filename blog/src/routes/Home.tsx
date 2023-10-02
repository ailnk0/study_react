import { Container } from 'react-bootstrap'
import Post from '../components/Post'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
  const navigate = useNavigate()
  const handlePostClick = (id: number) => {
    navigate('/detail/' + id)
  }

  const postData: {
    id: number
    title: string
    content: string
  }[] = useSelector((state: { postData: typeof postData }) => {
    return state.postData
  })

  return (
    <>
      <Container>
        {postData.map((d) => (
          <div key={d.id} onClick={() => handlePostClick(d.id)}>
            <Post id={d.id} title={d.title} contents={d.content} />
          </div>
        ))}
      </Container>
    </>
  )
}

export default Home
