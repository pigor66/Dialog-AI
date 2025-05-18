import { Login } from "@/types/auth"
import { Stack, TextField, Button} from "@mui/material"
import { ChangeEvent } from "react";

interface LoginFormProps {
    form: Login;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (form: Login) => Promise<void>;
};

const LoginForm: React.FC<LoginFormProps> = ({ form, handleChange, handleSubmit }) => {
    return (
        <>
            <Stack spacing={2}>
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
                <Button onClick={() => handleSubmit(form)}
                    variant="outlined"
                    size="large"
                    color="primary"
                    fullWidth>
                    Entrar
                </Button>
            </Stack>
        </>
    )
}

export default LoginForm