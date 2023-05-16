import styled from "styled-components";

const Wrapper = styled.aside`
  background-color: var(--primary-50);
  padding: 2rem 1rem;
  min-height: 100vh;
  .welcome-img {
    width: 40px;
    border-radius: 50%;
  }
  .welcome-cont {
    display: flex;
    background-color: #174875;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    border-radius: var(--borderRadius);
    p {
      margin: 0;
      font-size: 0.875rem;
      color: var(--grey-300);
    }
  }
  h5 {
    margin: 0;
    font-weight: 300;
    font-size: 1rem;
    color: white;
  }
  .sidebar_link_cont {
    display: flex;
    padding: 0.5rem;
    margin-top: 20px;
    align-items: center;
    cursor: pointer;
    h5 {
      margin-left: 10px;
      font-size: 0.875rem;
    }

    border-radius: var(--borderRadius);
  }
  .selected {
    background-color: #174875;
  }
  .courses-expand-cont {
    padding: 0 1rem;
    transition: height 0.5s ease-in-out;
    overflow: hidden;
  }
  .course-div {
    padding: 0.5rem 0;
    color: var(--primary-500);
    font-size: 0.875rem;
    cursor: pointer;
    transition: margin-left 0.25s ease;
  }
  .course-div:hover {
    margin-left: 10px;
  }
`;

export default Wrapper;
