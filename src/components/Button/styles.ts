import styled from "styled-components";
export interface Props {
  expand?: boolean;
}

export const Container = styled.button<Props>`
  width: 100%;
  max-width: ${(props) => (props.expand ? '100%' : '327px')};
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 6px;

  height: 36px;

  background: #f60;

  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
  border-radius: 8px;

  border: none;

  font-size: 16px;
  font-weight: 600;

  color: #fff;

  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};;
`