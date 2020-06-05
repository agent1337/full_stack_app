import React from 'react'
import {Button, Checkbox, FormControlLabel} from '@material-ui/core'
import {useStyles} from './LoginStyled'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import history from '../../history'
const axios = require('axios')


const Login = () => {

    const classes = useStyles()

    const [checked, setChecked] = React.useState(false)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    }

    const [userEmail, setUserEmail] = React.useState("")
    const typedEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserEmail(event.target.value)
    }

    const [password, setPassword] = React.useState('')
    const passwordChanging = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        setPassword(password);
    }


    const handleSubmit = () => {
        axios
            .post("/users/logIn", {
                email: userEmail,
                password: password,
                remember: checked
            })
            .then((res: any) => {
                localStorage.setItem('token', res.data.token);
                const userId = res.data.userId
                if (res.data.status === 'Success') {
                    history.push(`/users/user/data/${userId}`)
                } else if (res.data.status === 'Faild') {
                    return alert(res.data.errorText)
                }
            })
    }


    // validation rule for password length
    ValidatorForm.addValidationRule('passwordLength', (value) => {
        const regNumberValidation = /[0-9A-Za-z]{6}/gmi;
        if (!value.match(regNumberValidation)) {
            return false;
        }
        return true;
    });

    return (
        <div>
            <h2>Please log in</h2>
                <ValidatorForm
                    className={classes.form}
                    onSubmit={handleSubmit}
                    onError={(errors: any) => console.log(errors)}
                    autoComplete="off"
                >
                <TextValidator
                    onChange={typedEmail}
                    id="outlined-basic"
                    label="Email"
                    name="email"
                    variant="outlined"
                    value={userEmail}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <TextValidator
                    className={classes.input}
                    onChange={passwordChanging}
                    id="outlined-password-input"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    value={password}
                    validators={['passwordLength', 'required']}
                    errorMessages={['password can not be less 6 characters', 'this field is required']}
                />
                <FormControlLabel
                    value="end"
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{'aria-label': 'primary checkbox'}}
                        />
                    }
                    label="Remember me"
                    labelPlacement="end"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default Login