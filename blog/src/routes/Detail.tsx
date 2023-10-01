import { Container } from 'react-bootstrap'
import { Navigate, useParams } from 'react-router-dom'
import Datas from '../utils/Datas.tsx'

function Detail() {
  const { id } = useParams()
  const parsedId = id ? parseInt(id) : -1
  const item = Datas.find((data) => data.id === parsedId)
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
      <h1>{item?.title}</h1>
      <p>{item?.content}</p>
    </Container>
  )
}

export default Detail
