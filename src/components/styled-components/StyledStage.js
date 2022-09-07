import styled from 'styled-components';

const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    calc(18vw / ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  margin-left:200px;
  width: 100%;
  max-width: 18vw;
  background: #111;
`;

export default StyledStage;