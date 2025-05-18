import { Register } from "@/types/auth";
import { Stack, TextField, Button} from "@mui/material"
import { ChangeEvent } from "react";

interface RegisterFormProps {
    form: Register;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (form: Register) => Promise<void>;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ form, handleChange, handleSubmit }) => {

    return (
        <>
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
                <Button onClick={() => handleSubmit(form)}
                    variant="outlined"
                    size="large"
                    color="primary"
                    fullWidth>
                    Registrar
                </Button>
            </Stack>
        </>
    )
}

export default RegisterForm