import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useAuth } from '../../context/AuthContext'
import { calculateDaysLeft } from '../../utils/calcDaysLeft'
import { logoUrls } from '../../config/logoLinks'

const shakeAnimation = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
`

const shakeStyles = css`
  animation: ${shakeAnimation} 0.8s;
`

const StyledCard = styled.div<{ isDueDateNegative?: boolean }>`
  perspective: 1000px;
  width: 400px;
  height: 280px;
  margin-bottom: 20px;
  position: relative;

  &:hover .flip,
  &.hover .flip {
    transform: rotateY(180deg);
  }

  .flip {
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .front,
  .back {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    backface-visibility: hidden;
    position: absolute;
    color: #fff;
    font-family: Inconsolata;
    text-shadow: 0 1px 1px hsla(0, 0, 0, 0.3);
    box-shadow: 0 1px 6px hsla(0, 0, 0, 0.3);
    transform: rotateY(0deg);
  }

  .front {
    z-index: 2;
    transform: rotateY(0deg);
    background: linear-gradient(135deg, #bd6772, #53223f);
  }

  .card-type {
    position: absolute;
    top: 30px;
    right: 20px;
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    img {
      width: 80px;
    }
  }

  .back {
    transform: rotateY(180deg);
    background: linear-gradient(135deg, #53223f, #bd6772);
    ${(props) => props.isDueDateNegative && shakeStyles};
    border: none; // Removed the border
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .chip {
    position: absolute;
    width: 60px;
    height: 45px;
    top: 20px;
    left: 20px;
    background: linear-gradient(
      135deg,
      hsl(269, 54%, 87%) 0%,
      hsl(200, 64%, 89%) 44%,
      hsl(18, 55%, 94%) 100%
    );
    border-radius: 8px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      border: 4px solid hsla(0, 0, 50, 0.1);
      width: 80%;
      height: 70%;
      border-radius: 5px;
    }
  }

  .strip {
    background: linear-gradient(135deg, hsl(0, 0, 25%), hsl(0, 0, 10%));
    position: absolute;
    width: 100%;
    height: 50px;
    top: 30px;
    left: 0;
  }

  .number {
    position: absolute;
    margin: 0 auto;
    top: 103px;
    left: 19px;
    font-size: 38px;
  }

  .card-holder,
  .card-expiration-date,
  .ccv {
    position: absolute;
    margin: 0 auto;
    font-size: 22px;
    text-transform: capitalize;
    color: #fff;
  }

  .card-holder {
    top: 180px;
    left: 19px;
  }

  .card-expiration-date {
    text-align: right;
    left: auto;
    right: 20px;
    top: 180px;
  }

  .ccv {
    height: 36px;
    background: #fff;
    width: 91%;
    border-radius: 5px;
    top: 110px;
    left: 0;
    right: 0;
    position: absolute;
    margin: 0 auto;
    color: #000;
    text-align: right;
    padding: 10px;
  }
  .user-name {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 18px;
    font-family: 'Pacifico', cursive;
  }
  .days-left {
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 18px;
    font-family: 'Pacifico', cursive;
  }
`

interface CardProps {
  cardName: string
  cardNumber: string
  bankName: string
  amountDue: number
  dueDate: string
  billingCycle: string
  billingDate: string
  totalAmountDue: string
}

const Card: React.FC<CardProps> = ({
  cardName,
  cardNumber,
  bankName,
  amountDue,
  dueDate,
  billingCycle,
  billingDate,
  totalAmountDue,
}) => {
  const { user } = useAuth()

  const getCardType = (cardNumber: string): string => {
    let re = new RegExp('^4')
    if (cardNumber.match(re) !== null) return 'Visa'

    re = new RegExp('^(34|57)')
    if (cardNumber.match(re) !== null) return 'American Express'

    re = new RegExp('^5[1-5]')
    if (cardNumber.match(re) !== null) return 'Mastercard'

    re = new RegExp('^6011')
    if (cardNumber.match(re) !== null) return 'Discover'

    re = new RegExp('^9792')
    if (cardNumber.match(re) !== null) return 'Troy'

    return 'Visa' // default type
  }

  const daysLeft = calculateDaysLeft(dueDate)
  const isDueDateNegative = daysLeft <= 0

  // Determine the card type based on the last digit
  const cardType = getCardType(cardNumber)

  return (
    <StyledCard isDueDateNegative={isDueDateNegative}>
      <div className="flip">
        <div className="front">
          <div className="chip"></div>
          <div className="strip"></div>
          <div className="number">{cardNumber}</div>
          <div className="card-holder">{cardName}</div>
          <div className="card-expiration-date">$ {totalAmountDue}</div>
          {cardType && (
            <div className="card-type">
              {cardType === 'Visa' && <img src={logoUrls.visa} alt="Visa" />}
              {cardType === 'Mastercard' && (
                <img src={logoUrls.mastercard} alt="Mastercard" />
              )}
              {cardType === 'American Express' && (
                <img src={logoUrls.americanExpress} alt="American Express" />
              )}
              {cardType === 'Discover' && (
                <img src={logoUrls.discover} alt="Discover" />
              )}
              {cardType === 'Troy' && <img src={logoUrls.troy} alt="Troy" />}
              {cardType !== 'Visa' &&
                cardType !== 'Mastercard' &&
                cardType !== 'American Express' &&
                cardType !== 'Discover' &&
                cardType !== 'Troy' && <span>{cardType}</span>}
            </div>
          )}
        </div>
        <div className="back">
          <div className="user-name">{user?.name}</div>
          <div className="strip"></div>
          <div className="ccv">
            <label>CCV</label>
          </div>
          <div className="days-left">
            {isDueDateNegative ? (
              <>
                Card Expired!
                <br />
                Please make a payment.
              </>
            ) : (
              `${daysLeft} days left`
            )}
          </div>
        </div>
      </div>
    </StyledCard>
  )
}

export default Card
