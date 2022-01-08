import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
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

const Face = styled.div<{ faceState: number }>`
  height: 90px;
  width: 90px;
  background-image: url(/img.png);
  background-size: cover;
  //background-position: -990px 0px;
  background-position: ${(props) => (props.faceState + 11) * -90}px 0px;
  background-repeat: no-repeat;
  display: inline-block;
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

const CounterLWrapper = styled.div`
  height: 90px;
  width: 150px;
  display: flex;
  position: relative;
  text-align: center;
  left: -20px;
  margin: auto;
`

const CounterRWrapper = styled.div`
  height: 90px;
  width: 150px;
  background: black;
  display: flex;
  position: relative;
  right: -20px;
  margin: auto;
`

const Counter = styled.div`
  height: 90px;
  width: 50px;
  position: relative;
  background: black;
`

const Count = styled.div`
  height: 90px;
  width: 50px;
  color: red;
  position: relative;
  font-size: 90px;
  top: -17px;
`

const BoardUnder = styled.div`
  height: 72vh;
  width: 72vh;
  background: white;
`

const Box = styled.div<{ backColor: string }>`
  height: 8vh;
  width: 8vh;
  background: ${(props) => props.backColor};
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
  background-position: ${(props) => (props.numColor - 4) * -30}px 0px;
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
  const [isPlaying, setIsPlaying] = useState(false)
  const tmpBombs: { y: number; x: number }[] = []
  //爆弾数
  const numberOfBombs = 20
  const [bombs, setBombs] = useState(tmpBombs)
  const [playable, setPlayable] = useState(true)
  //console.log(bombs)
  const [bombCount, setBombCount] = useState(numberOfBombs)

  const [face, setFace] = useState(0)

  const [count, setCount] = useState(0)

  const countup = () => {
    setCount((count) => count + 1)
  }

  useEffect(() => {
    if (isPlaying) {
      const isPlayingId = setInterval(countup, 1000)
      return () => clearInterval(isPlayingId)
    }
  }, [isPlaying])

  const onClick = (y: number, x: number) => {
    if (!isPlaying && playable) {
      setIsPlaying(true)
      settingBombs(y, x)
    } else if (isPlaying) {
      update(y, x)
    }
  }

  const update = (y: number, x: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    if (newBoard[y][x] === 9) {
      const result: number[][] = open(y, x, newBoard)
      setBoard(result)
      let BoxCount = 81 - numberOfBombs
      for (let i = 0; i < 9; i++) {
        BoxCount -= result[i].filter(function (a: number) {
          return a < 9
        }).length
      }
      if (BoxCount === 0) gameClear()
    }
  }

  const settingBombs = (y2: number, x2: number) => {
    const bombsList: { y: number; x: number }[] = []
    while (bombsList.length < numberOfBombs) {
      const a = Math.floor(Math.random() * 9)
      const b = Math.floor(Math.random() * 9)
      if (!bombsList.some((bomb) => bomb.y === a && bomb.x === b) && !(y2 === a && x2 === b)) {
        bombsList.push({ y: a, x: b })
      }
    }
    setBombs(bombsList)
    update(y2, x2)
  }

  const open = (y: number, x: number, newBoard: number[][]) => {
    for (let i = 0; i < bombs.length; i++) {
      if (bombs[i].x === x && bombs[i].y === y) {
        return gameOver(y, x, newBoard)
      }
    }

    const num = compare(y, x)
    newBoard[y][x] = num
    const compareList: number[] = [-1, 0, 1]
    if (num === 0) {
      for (let i = 0; i < bombs.length; i++) {
        for (const boardY of compareList) {
          for (const boardX of compareList) {
            if (
              newBoard[y + boardY] !== undefined &&
              newBoard[x + boardX] !== undefined &&
              newBoard[y + boardY][x + boardX] === 9 &&
              !(bombs[i].x === x + boardX && bombs[i].y === y + boardY)
            ) {
              newBoard = open(y + boardY, x + boardX, newBoard)
            }
          }
        }
      }
    }
    return newBoard
  }

  const compare = (y: number, x: number) => {
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

  const gameClear = () => {
    setIsPlaying(false)
    setFace(1)
    setBombCount(0)
    setPlayable(false)
  }

  const gameOver = (y: number, x: number, newBoard: number[][]) => {
    setIsPlaying(false)
    setFace(2)
    setPlayable(false)
    for (let i = 0; i < bombs.length; i++) {
      //console.log(i, j)
      newBoard[bombs[i].y][bombs[i].x] = compare(bombs[i].y, bombs[i].x)
    }
    newBoard[y][x] = 11
    return newBoard
  }

  const reset = () => {
    setIsPlaying(false)
    setCount(0)
    setFace(0)
    setBombCount(numberOfBombs)
    setPlayable(true)
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        newBoard[i][j] = 9
      }
    }
    setBoard(newBoard)
  }

  const flag = (y: number, x: number, e: React.MouseEvent) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    if (isPlaying) {
      if (newBoard[y][x] === 9) {
        newBoard[y][x] = 13
      } else if (newBoard[y][x] === 13) {
        newBoard[y][x] = 12
      } else if (newBoard[y][x] === 12) {
        newBoard[y][x] = 9
      }
    }
    let flagCount = 0
    for (let i = 0; i < 9; i++) {
      flagCount += newBoard[i].filter(function (b: number) {
        return b === 13
      }).length
    }
    setBombCount(numberOfBombs - flagCount)
    console.log(bombCount)

    e.preventDefault()
    setBoard(newBoard)
  }

  return (
    <Container>
      <Board>
        <GameWrapper>
          <BoardUp>
            <CounterLWrapper>
              <Counter>
                <Count>{bombCount < -9 ? '-' : 0}</Count>
              </Counter>
              <Counter>
                <Count>
                  {bombCount < -9
                    ? Math.abs(bombCount - (bombCount % 10))
                    : bombCount < 0
                    ? '-'
                    : bombCount - (bombCount % 10)}
                </Count>
              </Counter>
              <Counter>
                <Count>{bombCount < 0 ? Math.abs(bombCount % 10) : bombCount % 10}</Count>
              </Counter>
            </CounterLWrapper>
            <Face faceState={face} onClick={() => reset()} />
            <CounterRWrapper>
              <Counter>
                <Count>{(count % 1000) - (count % 100)}</Count>
              </Counter>
              <Counter>
                <Count>{(count % 100) - (count % 10)}</Count>
              </Counter>
              <Counter>
                <Count>{count % 10}</Count>
              </Counter>
            </CounterRWrapper>
          </BoardUp>
          <BoardUnder>
            {board.map((row, y) =>
              row.map((num, x) =>
                num === 10 || num === 11 ? (
                  <Box backColor={num === 10 ? 'white' : 'red'} key={`${x}-${y}`}>
                    <BombBlock />
                  </Box>
                ) : (
                  <Box
                    key={`${x}-${y}`}
                    backColor={num < 9 ? 'white' : 'gray'}
                    onClick={() => onClick(y, x)}
                    onContextMenu={(e) => flag(y, x, e)}
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
