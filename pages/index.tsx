import type { NextPage } from 'next'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  background: lime;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Board = styled.div`
  display: row;
`

const Board_up = styled.div`
  height: 19vh;
  width: 81vh;
  background: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Face = styled.div`
  height: 15vh;
  width: 15vh;
  background: yellow;
  border-radius: 50%;
`

const Board_under = styled.div`
  height: 81vh;
  width: 81vh;
  background: red;
  display: flex;
  flex: 0em;
  flex-wrap: wrap;
  flex-basis: 0px;
  gap: 0px;
`

const Box = styled.div`
  height: 9vh;
  width: 9vh;
  background: white;
  border: 1px solid;
  border-color: black;
  border-left: transparent;
  overflow: hidden;
`

const Home: NextPage = () => {
  return (
    <Container>
      <Board>
        <Board_up>
          <Face></Face>
        </Board_up>
        <Board_under>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
        </Board_under>
      </Board>
    </Container>
  )
}

export default Home
