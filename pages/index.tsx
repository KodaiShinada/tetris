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
  height: 95vh;
  width: 80vh;
  background: black;
  display: row;
  position: relative;
`
const GameWrapper = styled.div`
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`

const BoardUp = styled.div`
  height: 17vh;
  width: 72vh;
  background: white;
  display: flex;
  position: relative;
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
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`

const BoardUnder = styled.div`
  height: 72vh;
  width: 72vh;
  background: white;
`

const Box = styled.div<{ isOpen: boolean }>`
  height: 8vh;
  width: 8vh;
  background: ${(props) => (props.isOpen ? 'white' : 'gray')};
  color: 'black';
  border: 1px solid black;
  box-sizing: border-box;
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

const Flags = styled.div<{ numColor: number }>`
  height: 30px;
  width: 30px;
  background-image: url(/img.png);
  background-position: ${(props) => (props.numColor - 3) * -30}px 0px;
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
    if (newBoard[y][x] === 9) setBoard(open(x, y, newBoard))
    console.log(open(x, y, newBoard))
  }

  const open = (x: number, y: number, newBoard: number[][]) => {
    //newBoard[y][x] = 1
    for (let i = 0; i < bombs.length; i++) {
      if (bombs[i].x === x && bombs[i].y === y) {
        return gameOver(x, y, newBoard)
      }
    }

    const num = compare(x, y)
    newBoard[y][x] = num
    const compareList: number[] = [-1, 0, 1]
    if (num === 0) {
      //console.log(0)
      for (let i = 0; i < bombs.length; i++) {
        for (const boardY of compareList) {
          for (const boardX of compareList) {
            if (
              newBoard[y + boardY] !== undefined &&
              newBoard[x + boardX] !== undefined &&
              newBoard[y + boardY][x + boardX] === 9 &&
              !(bombs[i].x === x + boardX && bombs[i].y === y + boardY)
            ) {
              newBoard = open(x + boardX, y + boardY, newBoard)
            }
          }
        }
      }
    }
    return newBoard
  }

  const compare = (x: number, y: number) => {
    for (let i = 0; i < bombs.length; i++) {
      if (bombs[i].x === x && bombs[i].y === y) {
        return 10
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
    return num
  }

  const flag = (x: number, y: number, e: React.MouseEvent) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    if (newBoard[y][x] === 9) {
      newBoard[y][x] = 12
    } else if (newBoard[y][x] === 12) {
      newBoard[y][x] = 11
    } else if (newBoard[y][x] === 11) {
      newBoard[y][x] = 9
    }
    e.preventDefault()
    setBoard(newBoard)
  }

  const gameOver = (x: number, y: number, newBoard: number[][]) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        //console.log(i, j)
        newBoard[i][j] = compare(i, j)
      }
    }
    //newBoard[y][x] = 10
    return newBoard
  }

  return (
    <Container>
      <Board>
        <GameWrapper>
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
                  <Box
                    key={`${x}-${y}`}
                    isOpen={num < 9}
                    onClick={() => onClick(x, y)}
                    onContextMenu={(e) => flag(x, y, e)}
                  >
                    {num < 9 ? <Colors numColor={num} /> : num !== 9 && <Flags numColor={num} />}
                  </Box>
                )
              )
            )}
          </BoardUnder>
        </GameWrapper>
      </Board>
    </Container>
  )
}

export default Home
