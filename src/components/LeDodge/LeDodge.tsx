import React, { useEffect, useState, useRef } from 'react'
import './style.css'

const ScoreDisplay: React.FC<{ score: number }> = ({ score }) => {
  return <div id="score-display">Score: {score}</div>
}

const LeDodge: React.FC = () => {
  const [score, setScore] = useState<number>(0)
  const gameContainerRef = useRef<HTMLDivElement>(null)
  let obstacleInterval: number
  let character: HTMLDivElement | null = null
  let dot: HTMLDivElement | null = null

  useEffect(() => {
    const gameContainer = gameContainerRef.current

    function handleMouseMove (event: MouseEvent): void {
      if ((character != null) && (gameContainer != null)) {
        const containerRect = gameContainer.getBoundingClientRect()
        const mouseX = event.clientX - containerRect.left
        const mouseY = event.clientY - containerRect.top
        const characterX = mouseX - character.clientWidth / 2
        const characterY = mouseY - character.clientHeight / 2
        character.style.left = `${characterX}px`
        character.style.top = `${characterY}px`
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    function checkCollision (): void {
      const characterRect = character.getBoundingClientRect()
      const characterLeft = characterRect.left
      const characterRight = characterRect.right
      const characterTop = characterRect.top
      const characterBottom = characterRect.bottom

      let obstacleLeft, obstacleRight, obstacleTop, obstacleBottom
      let dotLeft, dotRight, dotTop, dotBottom

      for (const child of gameContainer.children) {
        const childElement = child as HTMLElement

        if (childElement.classList.contains('obstacle')) {
          const obstacleRect = childElement.getBoundingClientRect()
          obstacleLeft = obstacleRect.left
          obstacleRight = obstacleRect.right
          obstacleTop = obstacleRect.top
          obstacleBottom = obstacleRect.bottom

          if (
            characterBottom >= obstacleTop &&
            characterTop <= obstacleBottom &&
            characterRight >= obstacleLeft &&
            characterLeft <= obstacleRight
          ) {
            restartGame()
            // break
          }
        } else if (childElement.classList.contains('dot')) {
          const dotRect = childElement.getBoundingClientRect()
          dotLeft = dotRect.left
          dotRight = dotRect.right
          dotTop = dotRect.top
          dotBottom = dotRect.bottom

          if (
            characterBottom >= dotTop &&
            characterTop <= dotBottom &&
            characterRight >= dotLeft &&
            characterLeft <= dotRight
          ) {
            childElement.remove()
            incrementScore()
            createDot()
            break
          }
        }
      }
    }

    function createObstacle (): void {
      const obstacle = document.createElement('div')
      obstacle.className = 'obstacle'
      const obstacleTop = Math.random() * (gameContainer.clientHeight - 100)
      const speed = Math.random() * 8 + 4
      obstacle.style.top = `${obstacleTop}px`
      obstacle.style.animationDuration = `${speed}s`
      gameContainer.appendChild(obstacle)
    }

    function createDot (): void {
      if (gameContainer != null) {
        const existingDot = gameContainer.querySelector('.dot')
        if (existingDot != null) {
          return
        }
        dot = document.createElement('div')
        dot.className = 'dot'
        const dotTop = Math.random() * (gameContainer.clientHeight - 20)
        const dotLeft = Math.random() * (gameContainer.clientWidth - 70) + 25
        dot.style.top = `${dotTop}px`
        dot.style.left = `${dotLeft}px`
        gameContainer.appendChild(dot)
        dot.style.display = 'block'
      }
    }

    function incrementScore (): void {
      setScore((prevScore) => prevScore + 1)
    }

    function restartGame (): void {
      if ((gameContainer != null) && (character != null)) {
        const obstacles = gameContainer.getElementsByClassName('obstacle')
        while (obstacles.length > 0) {
          obstacles[0].remove()
        }

        clearInterval(obstacleInterval)
        obstacleInterval = 0

        setScore(0) // Reset the score to 0
        // createDot()

        // character = document.createElement('div')
        // character.id = 'character'
        // gameContainer.appendChild(character)
        obstacleInterval = setInterval(createObstacle, 2000)
      }
    }

    function startGame (): void {
      createDot()

      character = document.getElementById('character')

      // character.id = 'character'
      // gameContainer.appendChild(character)

      obstacleInterval = setInterval(createObstacle, 2000)
    }
    startGame()

    const collisionInterval = setInterval(checkCollision, 10)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearInterval(collisionInterval)
      clearInterval(obstacleInterval)
    }
  }, [])

  return (
    <div ref={gameContainerRef} id="game-container">
      <ScoreDisplay score={score} />
      <div id='character'></div>
    </div>
  )
}

export default LeDodge
