'use client';

import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import BackgroundStars from '../../pratice/ParticleBackground';
import { User } from '@/types/user';
import { reqPost } from '@/api/user';


export default function RegisterForm() {


  const [form, setForm] = useState<User>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });




  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    if (form.name && form.email && form.password && form.confirmPassword  && form.password === form.confirmPassword) {
      try {
        const response = await reqPost(form, "users");
        console.log('Form Submitted:', response);
      } catch (error) {
        console.log('Error submitting form:', error);
      }
    } else {

      console.log('Form not submitted', form);
    }


  };

  return (

    <BackgroundStars>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >

        <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
          <Typography variant="h5" gutterBottom textAlign={'center'}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Nome"
                name="name"
                fullWidth
                required
                value={form.name}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                label="Senha"
                name="password"
                type="password"
                fullWidth
                required
                value={form.password}
                onChange={handleChange}
              />
              <TextField
                label="Confirme sua senha"
                name="confirmPassword"
                type="password"
                fullWidth
                required
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <Button onClick={handleSubmit}
                variant="outlined"
                size="large"
                color="primary"
                fullWidth>
                Criar conta
              </Button>

              <Button type="submit"
                variant="outlined"
                size="large"
                color="primary"
                href="/login"
                fullWidth>
                Voltar
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </BackgroundStars>
  );
}

