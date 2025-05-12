'use client';

import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
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

    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
    const [prepareToSend, setPrepareToSend] = useState<boolean>(true);


    useEffect(() => {
        form.password === form.confirmPassword ? setPasswordMatch(true) : setPasswordMatch(false);
        if (form.name && form.email && form.password && form.confirmPassword && passwordMatch) {
            setPrepareToSend(true);
        }else {
            setPrepareToSend(false);
        }
        console.log(form);
    }, [form]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async () => {
        if (prepareToSend) {
            
            
            const response = await reqPost(form, "users");
            console.log('Form Submitted:', response);
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
                                error={!passwordMatch}
                                value={form.password}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Confirme sua senha"
                                name="confirmPassword"
                                type="password"
                                fullWidth
                                required
                                error={!passwordMatch}
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

