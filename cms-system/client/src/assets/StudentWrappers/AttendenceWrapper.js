import styled from "styled-components";

const Wrapper = styled.main`
  .no-attendance {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 1.2rem;
    color: var(--primary-50);
  }
  .attendence-div {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0.5rem;
    background-color: var(--primary-50);
    cursor: pointer;
    .title {
      color: var(--primary-500);
    }
    .percentage {
      color: var(--primary-500);
      font-weight: 600;
    }
    gap: 35px;
  }
  .attendence-cont {
    display: flex;
    gap: 35px;
    flex-wrap: wrap;
  }
  .subject-attendence-cont {
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .table-cont {
  }
  .header {
    display: flex;
    background-color: var(--primary-50);
    padding: 0.5rem 0;
    width: 100%;

    justify-content: space-between;
    p {
      color: var(--primary-500);
      width: 25%;
      text-align: center;
    }
  }

  .attendence-item {
    p {
      color: black;
    }
    background-color: white;
    display: flex;
    padding: 0.5rem 0;
  }
  .lec-no,
  .date,
  .duration,
  .status {
    font-size: 0.875rem;
    width: 25%;
    text-align: center;
  }
  .attendence-list {
    height: 200px;
    overflow: auto;
  }
  .absent {
    background-color: #b82525;

    div {
      color: var(--primary-500);
    }
  }
`;

export default Wrapper;
