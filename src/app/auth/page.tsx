'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  IconButton,
  Paper,
} from '@mui/material';
import BackgroundStars from '../pratice/ParticleBackground';
import { FormType, Login, Register } from '@/types/auth';
import { reqLogin, reqRegister } from '@/api/user';
import RegisterForm from '@/app/components/auth/registerForm';
import { useRouter } from 'next/navigation';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LoginForm from '../components/auth/loginForm';

function isRegister(form: FormType | null): form is Register {
  return form !== null && 'name' in form && 'confirmPassword' in form;
}

function isLogin(form: FormType | null): form is Login {
  return form !== null && !('name' in form) && !('confirmPassword' in form);
}

export default function Auth() {
  const router = useRouter();
  const [auth, setAuth] = useState<string>('login');

  const [form, setForm] = useState<FormType>(
    auth === 'login'
      ? { email: '', password: '' }
      : { name: '', email: '', password: '', confirmPassword: '' }
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (form: Register | Login) => {
    if ('name' in form) {
      try {
        const response = await reqRegister(form, 'users');
        console.log('Usuário cadastrado:', response);
      } catch (error) {
        console.log('Erro ao cadastrar:', error);
      }
    } else {
      try {
        const response = await reqLogin(form, 'auth/login');
        console.log('Login efetuado:', response);
      } catch (error) {
        console.log('Erro ao logar:', error);
      }
    }
  };

  useEffect(() => {
    if (auth === 'login') {
      setForm({ email: '', password: '' });
    } else {
      setForm({ name: '', email: '', password: '', confirmPassword: '' });
    }
  }, [auth]);

  return (
    <BackgroundStars>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={3} sx={{ padding: 4, width: 400, height: 500, borderRadius: 4 }}>
          <IconButton onClick={() => router.back()}>
            <KeyboardBackspaceIcon />
          </IconButton>

          <Box mb={2}>
            <BottomNavigation
              showLabels
              value={auth}
              onChange={(event, newValue) => {
                setAuth(newValue);
              }}
            >
              <BottomNavigationAction label="Login" value="login" />
              <BottomNavigationAction label="Sign-up" value="register" />
            </BottomNavigation>
          </Box>

          {auth === 'register' && isRegister(form) && (
            <RegisterForm
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          )}

          {auth === 'login' && isLogin(form) && (
            <LoginForm
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          )}
        </Paper>
      </Box>
    </BackgroundStars>
  );
}