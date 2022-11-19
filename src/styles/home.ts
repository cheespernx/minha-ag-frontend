import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
`

export const InputModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  gap: 24px;

  width: 432px;
  height: 425px;

  background: rgba(255, 255, 255, 0.3);

  border: 1px solid #E5E7EB;
  box-shadow: 0px 24px 52px rgba(0, 0, 0, 0.12);
  border-radius: 16px;

  h3 {
    margin: 0;
  }

  @media (max-width: 768px) {
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    
    margin-top: 5rem;

    padding: 24px;

    box-shadow: none;

    border: none;
  }
`

export const TopInputModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    font-size: 15pt;
    margin: 5px 0;
  }
`

export const FormBody = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  gap: 24px;

  width: 100%;
`

export const InputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  width: 100%;

  span.danger {
    color: red;
  }

  label {
    margin-bottom: 6px;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;

    color: #374151;
  }

  input {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 9px 14px;
    gap: 10px;

    width: 368px;
    height: 42px;

    background: #FFFFFF;

    border: 1px solid #D1D5DB;

    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.07);
    border-radius: 8px;

    @media (max-width: 768px) {
      width: 100%;
    }

  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  width: 100%;
`