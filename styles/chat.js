import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  color: #ffffff;
`;

export const BoxMessageList = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  margin-bottom: 16px;

  ::-webkit-scrollbar {
    background: #52667A;
    border-radius: 1rem;
    
  }

  ::-webkit-scrollbar-thumb  {
    background: #212931;
    border-radius: 1rem;
  }
`;
