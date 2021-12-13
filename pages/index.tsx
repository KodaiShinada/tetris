import type { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'
const FONT_COLORS = ['blue', 'green', 'red', 'purple', 'brown', 'yellow', 'orange', 'pink']

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

const BoardUp = styled.div`
  height: 19vh;
  width: 81vh;
  background: blue;
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

const BoardUnder = styled.div`
  height: 81vh;
  width: 81vh;
  background: red;
`

const Box = styled.div<{ isOpen: boolean; numColor: number }>`
  height: 9vh;
  width: 9vh;
  background: ${(props) => (props.isOpen ? 'white' : 'gray')};
  color: ${(props) =>
    0 < props.numColor && props.numColor <= 9 ? FONT_COLORS[props.numColor - 1] : 'black'};
  border: 1px solid;
  border-color: black;
  border-left: transparent;
  display: inline-block;
  vertical-align: bottom;
  text-align: center;
  line-height: 8.5vh;
  font-size: 30px;
  font-weight: bold;
`

const BombBlock = styled.div`
  height: 9vh;
  width: 9vh;
  color: red;
  background: white;
  border: 1px solid;
  border-color: black;
  border-left: transparent;
  display: inline-block;
  vertical-align: bottom;
  text-align: center;
  line-height: 8.5vh;
  font-size: 30px;
  font-weight: bold;
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
  const [bombs, setBombs] = useState([{ x: 0, y: 0 }])
  const onClick = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    //newBoard[y][x] = 1
    let existBomb = false
    for (let i = 0; i < bombs.length; i++) {
      if (bombs[i].x === x && bombs[i].y === y) {
        existBomb = true
      }
    }
    newBoard[y][x] = existBomb ? 10 : 1
    setBoard(newBoard)
  }

  return (
    <Container>
      <Board>
        <BoardUp>
          <Face></Face>
        </BoardUp>
        <BoardUnder>
          {board.map((row, y) =>
            row.map((num, x) =>
              num === 10 ? (
                <BombBlock key={`${x}-${y}`}>●</BombBlock>
              ) : (
                <Box
                  key={`${x}-${y}`}
                  isOpen={num < 9}
                  numColor={num}
                  onClick={() => onClick(x, y)}
                >
                  {0 < num && num < 9 && num}
                </Box>
              )
            )
          )}
        </BoardUnder>
      </Board>
    </Container>
  )
}

export default Home
