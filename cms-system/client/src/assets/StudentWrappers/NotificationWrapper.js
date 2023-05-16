import styled from "styled-components";

const Wrapper = styled.main`
  background-color: var(--primary-500);
  padding: 1rem 1.5rem;
  border-radius: var(--borderRadius);
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .title-cont {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export default Wrapper;
