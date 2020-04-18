import styled from 'styled-components'

export const PlayerDiv = styled.div`
  display: flex;
`
export const PlayerIcon = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 34px;
    height: 34px;
    background-color: white;
    border: 2px solid white;
    box-sizing: border-box;
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);
    border-radius: 48px;
  }

  .name {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }

  .role {
    margin-top: -5px;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
  }
`

export const PlayerCards = styled.div`
  flex: 4;
  display: flex;
  justify-content: center;

  img {
    flex: 1;
    max-width: 60px;
    height: auto;
  }
`
