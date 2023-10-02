import { Container } from 'react-bootstrap'
import { Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Detail() {
  const { id } = useParams()
  const parsedId = id ? parseInt(id) : -1

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

  const item = postData.data.find((item) => item.id === parsedId)
  if (item === undefined) {
    return <Navigate to="/404" />
  }

  return (
    <Container
      style={{
        height: '75vh'
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <img src={'https://picsum.photos/seed/' + id + '/500/500'} alt="random" />
      <h1>{item.title}</h1>
      <p>{item.content}</p>
    </Container>
  )
}

export default Detail
