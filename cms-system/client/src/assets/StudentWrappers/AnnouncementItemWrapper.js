import styled from "styled-components";

const Wrapper = styled.main`
  background-color: var(--primary-400);
  padding: 0.5rem 1rem;
  border-radius: var(--borderRadius);
  margin-top: 20px;

  .title-cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .description-cont {
    margin-top: 5px;
    width: 100%;
    font-size: 1rem;
    color: var(--grey-500);
  }
`;

export default Wrapper;
