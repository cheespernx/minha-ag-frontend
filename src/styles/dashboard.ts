import styled from 'styled-components'

export interface Props {
  active?: boolean;
  expanded?: boolean;
}

export const PageContainer = styled.div`
  background-color: #F3F4F6;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: #F3F4F6;
`

export const TopBar = styled.div`
  height: 64px;
  width: 100%;

  padding: 12px 32px;

  top: 0;

  background: #FFFFFF;

  border-bottom: 1px solid #E5E7EB;

  display: flex;
  justify-content: flex-end;
`

export const RoundedAvatar = styled.div`
  width: 40px;
  height: 40px;
  
  cursor: pointer;

  img {
    border-radius: 100%;
    width: 40px;
  }
`

export const SideBar = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 14px;

  width: 320px;
  height: 100vh;

  position: fixed;
  left: ${(props) => (props.expanded ? '0px' : '-320px')};

  z-index: 51;

  background: #FFFFFF;

  border-right: 1px solid #E5E7EB;

  box-shadow: 20px 4px 54px rgba(0, 0, 0, 0.06);

  transition: all 0.2s ease;
`

export const Divider = styled.div`
  width: 296px;
  height: 1px;
  background: #E5E7EB;
  margin: 14px 0;
`

export const TopSideBar = styled.div`
  padding: 22px;

  border-bottom: 1px solid #f60;

  margin-bottom: 24px;
`

export const SidebarOption = styled.div<Props>`
  display: flex;
  align-items: center;
  justiy-content: flex-start;

  gap: 14px;

  width: 100%;
  height: 36px;

  padding: 8px 14px;

  border-radius: 8px;

  cursor: pointer;

  transition: all 0.2s ease;

  background: ${(props) => (props.active ? '#f60' : '#fff')};


  img {
    filter: ${(props) => (props.active ? '#fff' : 'invert(46%) sepia(45%) saturate(3989%) hue-rotate(0deg) brightness(101%) contrast(107%);')};
  }

  span {
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;

    color: ${(props) => (props.active ? '#fff' : '#111827')};

  }

  &:hover {
    background-color: #f60;
    span {
      color: #fff;
    }
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(10deg) brightness(108%) contrast(105%) !important;
    }
  }
`

export const BetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  align-items: center;
  justify-content: flex-start;

  align-content: flex-start;

  padding: 24px;

  height: 100vh;
`

export const BetCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  margin-bottom: 24px;
  padding: 24px;

  line-height: 28px;

  background: #FFFFFF;

  border: 1px solid #D1D5DB;

  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.07);
  border-radius: 12px;
  
  h3 {
    font-family: 'DM Sans';
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    color: #111827;

    margin: 0;
  }

  
  &:not(:last-child) {
    margin-right: 10px;
  }

  small {
    font-size: 12px;
  }
`

export const PageTitle = styled.div`

`