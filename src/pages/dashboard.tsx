import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import { useAuth, withPageAuth } from '../hooks/useAuth';
import { getApiClient } from '../services/api';
import { Container, TopBar, RoundedAvatar, SideBar, Divider, TopSideBar, SidebarOption, BetCard, BetContainer, PageContainer, PageTitle } from '../styles/dashboard';
import Image from 'next/image'
import { useRouter } from 'next/router';

interface Bet {
  betId: string;
  betCotation: string;
  betValue: string;
  betGames: string;
  betUpdatedAt: string;
  betCreatedAt: string;
  betDeletedAt: string;
}

export default function Dashboard() {

  const { getUser } = useAuth();
  const user = getUser();
  const router = useRouter();

  const [ bets, setBets ] = useState<Bet[]>();
  const [ sidebarExpanded, setSidebarExpanded ] = useState(true);

  useEffect(() => {
    setBets(user.bets)
    console.log(bets);
  }, [])

  const navigateTo = (route: string) => {
    router.push(route)
  }

  const alternateSidebarExpansion = () => {
    const handleSidebar = !sidebarExpanded
    setSidebarExpanded(handleSidebar);
  }
  
  return (
    <>
      <PageContainer>
        <SideBar expanded={sidebarExpanded}>
          <TopSideBar>
            <img src="https://www.apostaganha.bet/assets/img/new-images/logo.svg" width={150} alt="logo"/>
          </TopSideBar>

          <h4>Olá, {user?.userName}</h4>

          <SidebarOption active>
            <Image src="/svg/home.svg" height={16} width={16} alt={'home'} />
            <span>Dashboard</span>
          </SidebarOption>

          <Divider />

          <SidebarOption onClick={() => navigateTo('/logout')}>
            <Image src="/svg/logout.svg" height={16} width={16} alt={'logout'} />
            <span>Logout</span>
          </SidebarOption>
        </SideBar>
        <Container>
          <TopBar>
            <RoundedAvatar onClick={alternateSidebarExpansion}>
              <img src="https://pbs.twimg.com/profile_images/1491554416780058624/yTmV_HYG_400x400.jpg" width={40} height={40} alt="Avatar" />
            </RoundedAvatar>
          </TopBar>

          <PageTitle>
            <h2>Suas apostas</h2>
          </PageTitle>

          <Divider />

          <BetContainer>
            {bets?.map(bet => (
              <BetCard key={bet.betId}>
                <h3>Aposta - <b>{bet.betId.split('-').pop()?.toUpperCase()}</b></h3>
                <Divider />
                <span>Valor da Aposta: <b>R$ {bet.betValue}</b></span> 
                <span>Cotação: <b>{bet.betCotation}</b></span> 
                <span>Jogo: <b>{bet.betGames}</b></span>
              </BetCard>
            ))}
          </BetContainer>
        </Container>
      </PageContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx) => {
    try {
      const { ['@ag:accessToken']: accessToken } = parseCookies(ctx)

      if (!accessToken) {
        return {
          redirect: {
            destination: '/?redirect=/dashboard',
            permanent: false,
          },
        }
      }
      const { data } = await getApiClient(ctx).get(`/user`)
      return {
        props: {
          data,
        },
      }
    } catch (err) {
      return {
        props: {
          data: {},
        },
      }
    }
  },
)