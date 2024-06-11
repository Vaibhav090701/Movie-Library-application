import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Define the validation schema
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
});

const LoginForm = () => {
    const initialValues = {
        email: "",
        password: ""
    };

    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log("login values", values);

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === values.email && storedUser.password === values.password) {
            console.log("Login successful");
            localStorage.setItem('isAuthenticated', 'true');
            navigate("/protected");
        } else {
            alert("Invalid credentials")
            console.log("Invalid credentials");
        }
    };

    return (
        <div>
            <Typography variant='h5' className='text-center text-black'>
                Login
            </Typography>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="email">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            )}
                        </Field>

                        <Field name="password">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                            )}
                        </Field>

                        <Button sx={{ mt: 2, padding: "1rem", backgroundColor: "#2ecc71" }} type='submit' fullWidth variant='contained'>Login</Button>

                        <Typography variant='body1' align='center' sx={{ mt: 3, color: 'black' }}>Don't have an account?
                            <Button onClick={() => navigate("/register")}>Register</Button>
                        </Typography>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;
