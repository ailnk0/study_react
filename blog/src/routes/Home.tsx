import { Col, Container, Row } from 'react-bootstrap'
import Post from '../components/Post'
import { useSelector } from 'react-redux'
import WritePost from '../components/WritePost'

function Home() {
  const postData: {
    index: number
    data: {
      id: number
      title: string
      content: string
    }[]
  } = useSelector((state: { postData: typeof postData }) => {
    return state.postData
  })

  return (
    <>
      <Container>
        <WritePost />
        <Row>
          {postData.data
            .slice()
            .reverse()
            .map((d) => (
              <Col key={d.id}>
                <Post id={d.id} title={d.title} contents={d.content} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  )
}

export default Home
