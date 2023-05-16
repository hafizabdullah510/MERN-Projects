import styled from "styled-components";

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 250px 1fr;
  .outlet-cont {
    background-color: var(--primary-500);
    height: 100%;
  }
`;

export default Wrapper;
