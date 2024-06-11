import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Define the validation schema
const validationSchema = Yup.object({
    fullName:Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
});

const RegisterForm = () => {
    const initialValues = {
        fullName:"",
        email: "",
        password: ""
    };

    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log("registeration values", values);

            console.log("registeration successful");
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user',JSON.stringify(values));
            navigate("/protected");
        } 

    return (
        <div>
            <Typography variant='h5' className='text-center text-black'>
                Register
            </Typography>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="fullName">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Full Name"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    error={touched.fullName && Boolean(errors.fullName)}
                                    helperText={touched.fullName && errors.fullName}
                                />
                            )}
                        </Field>

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

                        <Button sx={{ mt: 2, padding: "1rem", backgroundColor: "#2ecc71" }} type='submit' fullWidth variant='contained'>Register</Button>

                        <Typography variant='body1' align='center' sx={{ mt: 3, color: 'black' }}>Already have an account...
                            <Button onClick={() => navigate("/login")}>Login</Button>
                        </Typography>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;

