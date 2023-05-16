import styled from "styled-components";

const Wrapper = styled.main`
  display: grid;

  .gpa-cont {
    display: flex;
    align-items: center;
    gap: 30px;
    justify-content: space-between;
  }
  .gpa-div,
  .cgpa-div {
    display: flex;
    padding: 1.5rem 4rem;
    background-color: var(--primary-400);
    border-radius: var(--borderRadius);
    align-items: center;
    gap: 20px;
  }

  .custom-tooltip {
    padding: 0.5rem 0.5rem;

    .desc {
      color: green;
      text-transform: capitalize;
      font-weight: 500;
    }
    .label {
      color: black;
    }
    .danger {
      color: #b82525;
    }
  }
  .circular-bar {
    width: 80px;
  }
  .attendence-cont,
  .notification-cont {
    background-color: var(--primary-400);
    margin-top: 35px;
    border-radius: var(--borderRadius);
    padding: 1rem 1rem;
    h5 {
      margin-left: 25px;
    }
    width: 100%;
  }
  .notification-cont {
    h5 {
      margin: 0;
    }
    max-height: 650px;
    overflow: auto;
  }
  .attendence-cont {
    padding: 1rem 1rem 1rem 0;
  }

  .right-cont {
    background-color: var(--primary-400);
    height: 100%;
  }
  .container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 35px;
    padding-bottom: 2rem;
  }

  .right-cont {
    border-radius: var(--borderRadius);
    .date-cont {
      padding: 1rem 1.5rem;
      border-top-right-radius: var(--borderRadius);
      border-top-left-radius: var(--borderRadius);
      background-color: var(--primary-50);

      p {
        color: white;
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: var(--letterSpacing);
      }
      .date {
        font-size: 1rem;
      }
    }

    .timetable-cont {
      padding: 1rem 1.5rem;

      .lec-cont {
        background-color: var(--primary-500);
        padding: 0.5rem 1rem;
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        border-radius: var(--borderRadius);
        p {
          font-size: 0.875rem;
        }
        .time {
          font-size: 1rem;
          font-weight: 500;
        }
        .sub_time_cont {
          width: 230px;
        }
      }
    }
    .announcements-cont {
      padding: 1rem 1.5rem 0 1.5rem;

      .single_announcement {
        background-color: var(--primary-500);
        padding: 0.5rem 1rem;
        margin-top: 15px;
        border-radius: var(--borderRadius);
      }
    }
    .view-all {
      padding-bottom: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 15px;
      a {
        text-decoration: underline;
        color: var(--primary-50);
        font-weight: 500;
      }
    }
  }
  .no-notifications {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 1rem;
    color: var(--primary-50);
  }
`;

export default Wrapper;
