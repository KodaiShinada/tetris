import type { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'
const FONT_COLORS = ['blue', 'green', 'red', 'purple', 'brown', 'yellow', 'orange', 'pink']

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
  line-height: 7vh;
  font-size: 50px;
  font-weight: bold;
`
const Colors = (props: { numColor: number }) => {
  switch (props.numColor) {
    case 1:
      return <OneImg />
    case 2:
      return <TwoImg />
    case 3:
      return <ThreeImg />
    case 4:
      return <FourImg />
    case 5:
      return <FiveImg />
    case 6:
      return <SixImg />
    case 7:
      return <SevenImg />
    case 8:
      return <EightImg />
    default:
      return null
  }
}

const OneImg = styled.div`
  height: 30px;
  width: 30px;
  background-image: url(/img.png);
  background-position: 0px 0px;
  background-repeat: no-repeat;
  display: inline-block;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  text-indent: 100%;
  overflow: hidden;
`

const TwoImg = styled.div`
  height: 30px;
  width: 30px;
  background-image: url(/img.png);
  background-position: -30px 0px;
  background-repeat: no-repeat;
  display: inline-block;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  text-indent: 100%;
  overflow: hidden;
`

const ThreeImg = styled.div`
  height: 30px;
  width: 30px;
  background-image: url(/img.png);
  background-position: -60px 0px;
  background-repeat: no-repeat;
  display: inline-block;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  text-indent: 100%;
  overflow: hidden;
`

const FourImg = styled.div`
  height: 30px;
  width: 30px;
  background-image: url(/img.png);
  background-position: -90px 0px;
  background-repeat: no-repeat;
  display: inline-block;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  text-indent: 100%;
  overflow: hidden;
`

const FiveImg = styled.div`
  height: 30px;
  width: 30px;
  background-image: url(/img.png);
  background-position: -120px 0px;
  background-repeat: no-repeat;
  display: inline-block;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  text-indent: 100%;
  overflow: hidden;
`

const SixImg = styled.div`
  height: 30px;
  width: 30px;
  background-image: url(/img.png);
  background-position: -150px 0px;
  background-repeat: no-repeat;
  display: inline-block;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  text-indent: 100%;
  overflow: hidden;
`

const SevenImg = styled.div`
  height: 30px;
  width: 30px;
  background-image: url(/img.png);
  background-position: -180px 0px;
  background-repeat: no-repeat;
  display: inline-block;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  text-indent: 100%;
  overflow: hidden;
`

const EightImg = styled.div`
  height: 30px;
  width: 30px;
  background-image: url(/img.png);
  background-position: -210px 0px;
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
  //10個重複なし
  while (tmpBombs.length < 10) {
    const a = Math.floor(Math.random() * 9)
    const b = Math.floor(Math.random() * 9)
    if (!tmpBombs.some((bomb) => bomb.x === a && bomb.y === b)) {
      tmpBombs.push({ x: a, y: b })
    }
  }
  const [bombs, setBombs] = useState(tmpBombs)
  const onClick = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
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
                  <Colors numColor={num} />
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
