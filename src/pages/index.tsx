import { InputModal, TopInputModal, FormBody, InputContainer, ButtonContainer, Container } from '../styles/home';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { parseCookies } from 'nookies';

export interface FormInterface {
  email: string;
  password: string;
}

const Login: React.FC = ({redirect}: any) => {

  const { signIn } = useAuth();

  const handleSignIn = useCallback(async (form: any) => {
    const e = await signIn(form, redirect || '/dashboard')

    if (e.status > 204) {
      alert('Os dados informados são inválidos, por favor, tente novamente')
    }
  }, [redirect, signIn])

  const { register, handleSubmit } = useForm();

  return (
    <>
      <Container>
        <InputModal>
          <TopInputModal>
            <p>Minha</p> <img src="https://www.apostaganha.bet/assets/img/new-images/logo.svg" width={150} alt="logo"/>
          </TopInputModal>

          <h3>Login</h3>

          <FormBody onSubmit={handleSubmit(handleSignIn)}>
            <InputContainer>
              <label htmlFor='email'>E-mail <span className='danger'>*</span></label>
              <input type='email' id='email' {...register('user_email')}/>
            </InputContainer>
            <InputContainer>
              <label htmlFor='senha'>Senha <span className='danger'>*</span></label>
              <input type='password' id='senha' {...register('user_password')}/>
            </InputContainer>
            <ButtonContainer>
              <Button type='submit' expand>
                Login
              </Button>
            </ButtonContainer>
          </FormBody>
        </InputModal>
      </Container>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const {redirect} = context.query

  const { ['@ag:accessToken']: accessToken } = parseCookies(context)

  if (accessToken) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  if (!redirect) return {props: {}}

  return {
    props: {
      redirect,
    },
  }
}

export default Login;
