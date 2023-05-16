import styled from "styled-components";

const Wrapper = styled.main`
  .search-cont {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .input-cont {
    width: 300px;
    height: 2rem;
    position: relative;
  }
  .search-input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: var(--borderRadius);
    font-size: 0.875rem;
  }
  .search-icon {
    position: absolute;
    top: 8px;
    right: 15px;
    cursor: pointer;
  }
  .btn-cont {
    display: flex;
    align-items: center;
    position: relative;
  }
  .btn-search {
    padding: 0.5rem 1.5rem 0.5rem 0.8rem;
    font-weight: 300;
    font-size: 0.875rem;
    position: relative;
  }
  .down-btn {
    position: absolute;
    top: 10px;
    right: 8px;
  }
  .items-cont {
    margin-top: 20px;
    height: 700px;
    overflow: auto;
  }
  .container {
    padding-bottom: 2rem;
  }
  .form-row {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .show-sort-btn {
    display: block;
  }
  .select {
    height: 2rem;
    padding: 0 1rem;
  }
  .no-announcements {
    color: var(--primary-50);
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
  }
`;

export default Wrapper;
