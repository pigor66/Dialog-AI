'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
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


export default function RegisterForm() {

    
    const [form, setForm] = useState<User>({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form Submitted:', form);
        // Aqui você pode adicionar lógica de autenticação
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
                                value={form.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                fullWidth
                                value={form.email}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Senha"
                                name="password"
                                type="password"
                                fullWidth
                                value={form.password}
                                onChange={handleChange}
                            />
                            <Button type="submit"
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

