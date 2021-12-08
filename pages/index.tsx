import type { NextPage } from 'next'
import { useState } from 'react'
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
`

const Box = styled.div`
  height: 9vh;
  width: 9vh;
  background: white;
  border: 1px solid;
  border-color: black;
  border-left: transparent;
  display: inline-block;
  vertical-align: bottom;
`

const Home: NextPage = () => {
  // prettier-ignore
  const [board, setBoard] = useState([
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9]
  ])
  const onClick = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    newBoard[y][x] = 1
    setBoard(newBoard)
  }
  return (
    <Container>
      <Board>
        <Board_up>
          <Face></Face>
        </Board_up>
        <Board_under>
          {board.map((row, y) =>
            row.map((num, x) => (
              <Box key={`${x}-${y}`} onClick={() => onClick(x, y)}>
                {num < 9 && num}
              </Box>
            ))
          )}
        </Board_under>
      </Board>
    </Container>
  )
}

export default Home
