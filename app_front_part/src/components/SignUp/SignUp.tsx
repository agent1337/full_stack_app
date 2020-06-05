import React from 'react'
import {Button} from '@material-ui/core'
import {useStyles} from './SignUpStyled'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import history from "../../history"

const axios = require("axios");


const SignUp = () => {

    const classes = useStyles()

    const [email, setEmail] = React.useState('')
    const emailChanging = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        setEmail(email);
    }

    const [password, setPassword] = React.useState('')
    const passwordChanging = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        setPassword(password);
    }

    const [repeatPassword, setRepeatPassword] = React.useState('')
    const repeatPasswordChanging = (event: React.ChangeEvent<HTMLInputElement>) => {
        const repeatPassword = event.target.value;
        setRepeatPassword(repeatPassword);
    }

    const handleSubmit = () => {

        axios
            .post("/users/signUp", {
                email: email,
                password: password
            })
            .then((res: any) => {

                console.log("data from back", res);
                console.log(res.data.successText)

                if (res.data.status === 'Success') {
                    history.push(`/users/logIn`)
                } else if (res.data.status === 'Faild') {
                    return alert(res.data.errorText)
                }

            })
    }

    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== password) {
            return false;
        }
        return true;
    });

    ValidatorForm.addValidationRule('passwordLength', (value) => {
        const regNumberValidation = /[0-9A-Za-z]{6}/gmi;
        if (!value.match(regNumberValidation)) {
            return false;
        }
        return true;
    });

    return (
        <ValidatorForm
            autoComplete="off"
            className={classes.form}
            onSubmit={handleSubmit}
            onError={(errors: any) => console.log(errors)}
        >
            <h2>Please sign up</h2>
            <TextValidator
                className={classes.input}
                id="outlined-basic"
                variant="outlined"
                label="Email"
                onChange={emailChanging}
                name="email"
                value={email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
            />
            <TextValidator
                id="outlined-password-input"
                variant="outlined"
                label="Password"
                onChange={passwordChanging}
                name="password"
                type="password"
                value={password}
                validators={['passwordLength', 'required']}
                errorMessages={['password can not be less 6 characters', 'this field is required']}
            />
            <TextValidator
                className={classes.input}
                id="outlined-password-input"
                variant="outlined"
                label="Repeat password"
                onChange={repeatPasswordChanging}
                name="repeatPassword"
                type="password"
                validators={['isPasswordMatch', 'required']}
                errorMessages={['password mismatch', 'this field is required']}
                value={repeatPassword}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Sign Up
            </Button>
        </ValidatorForm>
    )
}

export default SignUp