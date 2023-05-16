import styled from "styled-components";

const Wrapper = styled.main`
  display: grid;
  .container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 35px;
    padding-bottom: 2rem;
  }
  h4 {
    font-weight: bold;
    color: var(--primary-50);
    font-size: 1.5rem;
  }

  .left-cont {
    display: flex;
    flex-direction: column;
    gap: 35px;
  }
  .desc-cont,
  .instructors-cont {
    h5 {
      font-size: 1.2rem;
    }
    display: flex;
    flex-direction: column;
    gap: 20px;
    p {
      font-size: 1rem;
    }
  }
  .instructors-list-cont {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    max-width: 600px;
  }
  .instructor-div {
    padding: 0.3rem 0.5rem;
    background-color: var(--primary-50);
    color: var(--primary-500);
    border-radius: var(--borderRadius);
  }
  .right-cont {
    padding: 1rem 1.5rem;
    background-color: var(--primary-50);
    border-radius: var(--borderRadius);
    display: flex;
    flex-direction: column;
    gap: 20px;
    h5 {
      color: white;
      font-weight: 600;
    }
    span {
      font-weight: 500;
    }
    ul {
      list-style: circle;
      margin: 5px 0 5px 35px;
    }
    ul li {
      color: white;
    }
  }
`;

export default Wrapper;
