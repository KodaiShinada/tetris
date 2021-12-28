import type { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  background: royalblue;
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
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Face = styled.div`
  height: 90px;
  width: 90px;
  background-image: url(/img.png);
  background-size: cover;
  background-position: -990px 0px;
  background-repeat: no-repeat;
  display: inline-block;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  text-indent: 100%;
  overflow: hidden;
`

const BoardUnder = styled.div`
  height: 81vh;
  width: 81vh;
  background: white;
`

const Box = styled.div<{ isOpen: boolean }>`
  height: 9vh;
  width: 9vh;
  background: ${(props) => (props.isOpen ? 'white' : 'gray')};
  color: 'black';
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
  height: 30px;
  width: 30px;
  background-image: url(/img.png);
  background-position: -300px 0px;
  background-repeat: no-repeat;
  display: inline-block;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  text-indent: 100%;
  overflow: hidden;
`

const Colors = styled.div<{ numColor: number }>`
  height: 30px;
  width: 30px;
  background-image: url(/img.png);
  background-position: ${(props) => (props.numColor - 1) * -30}px 0px;
  background-repeat: no-repeat;
  display: inline-block;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  text-indent: 100%;
  overflow: hidden;
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
  const tmpBombs: { x: number; y: number }[] = []
  //爆弾数
  const numberOfBombs = 10
  while (tmpBombs.length < numberOfBombs) {
    const a = Math.floor(Math.random() * 9)
    const b = Math.floor(Math.random() * 9)
    if (!tmpBombs.some((bomb) => bomb.x === a && bomb.y === b)) {
      tmpBombs.push({ x: a, y: b })
    }
  }
  const [bombs, setBombs] = useState(tmpBombs)
  const onClick = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    setBoard(chain(x, y, newBoard))
  }
  const chain = (x: number, y: number, board: number[][]) => {
    let newBoard: number[][] = board
    //newBoard[y][x] = 1
    let existBomb = false
    for (let i = 0; i < bombs.length; i++) {
      if (bombs[i].x === x && bombs[i].y === y) {
        existBomb = true
      }
    }

    let num = 0
    const compareList: number[] = [-1, 0, 1]
    for (let i = 0; i < bombs.length; i++) {
      for (const compareY of compareList) {
        for (const compareX of compareList) {
          if (bombs[i].x === x + compareX && bombs[i].y === y + compareY) {
            num++
          }
        }
      }
    }
    newBoard[y][x] = existBomb ? 10 : num
    if (num === 0) {
      console.log(0)
      for (let i = 0; i < bombs.length; i++) {
        for (const boardY of compareList) {
          for (const boardX of compareList) {
            if (
              //Math.abs(boardY + boardX) === 1 &&
              newBoard[y + boardY] !== undefined &&
              newBoard[x + boardX] !== undefined &&
              newBoard[y + boardY][x + boardX] === 9 &&
              !(bombs[i].x === x + boardX && bombs[i].y === y + boardY)
            ) {
              newBoard = chain(x + boardX, y + boardY, newBoard)
            }
          }
        }
      }
    }
    return newBoard
  }

  return (
    <Container>
      <Board>
        <BoardUp>
          <Face />
        </BoardUp>
        <BoardUnder>
          {board.map((row, y) =>
            row.map((num, x) =>
              num === 10 ? (
                <Box isOpen={true} key={`${x}-${y}`}>
                  <BombBlock />
                </Box>
              ) : (
                <Box key={`${x}-${y}`} isOpen={num < 9} onClick={() => onClick(x, y)}>
                  {num !== 9 && <Colors numColor={num} />}
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
