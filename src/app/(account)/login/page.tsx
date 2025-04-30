'use client';

import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Stack,
} from '@mui/material';
import BackgroundStars from '../../pratice/ParticleBackground';


export default function LoginForm() {

    
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event: any) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event: any) => {
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
                                Entrar
                            </Button>

                            <Button type="submit"
                                variant="outlined"
                                size="large"
                                color="primary"
                                href="/register"
                                fullWidth>
                                Registrar-se
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Box>
        </BackgroundStars>
    );
}

