import styled from "styled-components";

const Wrapper = styled.main`
  .subjects-cont {
    display: flex;
    gap: 35px;
    flex-wrap: wrap;
    max-width: 900px;
  }
  .subject-div {
    display: flex;
    padding: 0.2rem 0.5rem;
    background-color: var(--primary-50);
    cursor: pointer;
    .title {
      color: var(--primary-500);
    }

    gap: 35px;
  }
  .marks-cont {
    margin-top: 35px;
    gap: 20px;
    display: flex;
    flex-direction: column;
    .assessment-cont {
      display: flex;
    }
    .assessment-div {
      padding: 0.5rem 2rem;
      border-bottom: 2px solid white;
      color: var(--grey-500);
      font-size: 0.875rem;
      cursor: pointer;
    }
    .selected {
      color: var(--primary-50);
      border-bottom: 2px solid var(--primary-50);
    }
    .header {
      display: flex;
      background-color: var(--primary-50);
      padding: 0.5rem 0;

      th {
        color: var(--primary-500);
        width: 25%;
        text-align: center;
        font-weight: 500;
      }
    }
    width: 100%;
    table {
      width: 100%;
    }

    tbody {
      display: flex;
      flex-direction: column;
      tr {
        display: flex;
        padding: 0.5rem 0;
        background-color: white;
      }
      td {
        width: 25%;
        text-align: center;
        font-size: 0.875rem;
      }
    }
  }
  .no-marks {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 1.2rem;
    color: var(--primary-50);
  }
  .title {
    text-transform: capitalize;
  }
`;

export default Wrapper;
