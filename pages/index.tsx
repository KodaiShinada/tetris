import type { NextPage } from 'next'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import styled from 'styled-components'

const COLORS = ['blue', 'red']

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: white;
`

const Board = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  width: 80vh;
  height: 95vh;
  background-color: gray;
`
const GameBoard = styled.div`
  display: row;
  width: 40vh;
  height: 80vh;
  margin: 0 auto;
  text-align: center;
  vertical-align: center;
  background: silver;
`

const Box = styled.div`
  display: inline-block;
  width: 4vh;
  height: 4vh;
  vertical-align: bottom;
  background: black;
  border: 1px solid silver;
`

const Home: NextPage = () => {
  // prettier-ignore
  const initialBoard = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ])
  const initialMino = {
    left: 1,
    top: 1,
    block: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  }
  const [board, setBoard] = useState(initialBoard)
  const [mino, setMino] = useState(initialMino)
  const [isPlaying, setIsPlaying] = useState(false)

  const displayBoard = useMemo(() => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    for (let i = 0; i < mino.block.length; i++) {
      for (let j = 0; j < mino.block[i].length; j++) {
        newBoard[i + mino.top][j + mino.left] = mino.block[i][j]
      }
    }
    return newBoard
  }, [])

  /*
  const countup = () => {
    setCount((count) => count + 1)
  }


  useEffect(() => {
    if (isPlaying) {
      const isPlayingId = setInterval(countup, 1000)
      return () => clearInterval(isPlayingId)
    }
  }, [isPlaying])
  */

  return (
    <>
      <Head>
        <title>Kodai&apos;s Tetris</title>
        <link
          rel="icon"
          href="https://emojipedia-us.s3.amazonaws.com/source/skype/289/grinning-cat_1f63a.png"
        />
      </Head>
      <Container>
        <Board>
          <GameBoard>
            {displayBoard.map((row, y) => row.map((num, x) => <Box key={`${x}-${y}`}></Box>))}
          </GameBoard>
        </Board>
      </Container>
    </>
  )
}

export default Home
