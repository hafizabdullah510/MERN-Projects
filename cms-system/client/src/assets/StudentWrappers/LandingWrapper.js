import styled from "styled-components";

const Wrapper = styled.main`
  background-color: var(--primary-400);
  height: 100vh;

  display: grid;
  grid-template-columns: 1fr 1fr;
  p a {
    color: white;
  }
  p {
    color: white;
  }
  .login-container {
    background-color: var(--primary-50);
    padding: 2.5rem;
    height: 100%;
  }
  .form-label {
    color: white;
  }

  .login-form {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .svg-cont {
    padding: 2.5rem;

    p {
      color: var(--primary-50);
      margin: 0;
    }
  }
`;

export default Wrapper;
