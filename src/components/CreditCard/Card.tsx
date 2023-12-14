import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  width: 300px;
  height: 180px;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  cursor: pointer;
  margin: 0 auto; /* Center the card horizontally */

  &:hover {
    transform: rotateY(180deg);
  }
`

const getRandomColor = () => {
  const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'] // Add more colors if needed
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

const StyledCardFace = styled.div<{ backgroundColor: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.backgroundColor};
`

const FrontFace = styled(StyledCardFace)`
  background-color: ${(props) => props.backgroundColor};
`

const BackFace = styled(StyledCardFace)`
  background-color: ${(props) => props.backgroundColor};
  transform: rotateY(180deg);
`

interface CardProps {
  title: string
  dueDate: string
  amountDue: number
}

const Card: React.FC<CardProps> = ({ title, dueDate, amountDue }) => {
  const randomColor = getRandomColor()

  return (
    <StyledCard>
      <FrontFace backgroundColor={randomColor}>
        <div>
          <p>{title}</p>
          <p>Due Date: {dueDate}</p>
          <p>Amount Due: ${amountDue}</p>
        </div>
      </FrontFace>
      <BackFace backgroundColor={randomColor}>Card Back</BackFace>
    </StyledCard>
  )
}

export default Card
