import React from 'react'
import {Button} from '@material-ui/core'
import {Alert, AlertTitle} from '@material-ui/lab'
import {useStyles} from './ResetPassStyled'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import history from '../../history'
const axios = require('axios')

const ResetPass = ({match}:any) => {

    const classes = useStyles()

    const [userEmail, setUserEmail] = React.useState("")
    const typedEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserEmail(event.target.value)
    }

    const userId = match.params.userId

    const [resetPassMessage, setResetPassMessage] = React.useState(false)
    const handleSubmit = () => {
        axios
            .put(`/users/user/reset/${userId}`, {
                email: userEmail
            })
            .then((res:any) => {
                if (res.data.status === 'Success') {
                    setResetPassMessage(true)
                } else if (res.data.status === 'Faild') {
                    return alert(res.data.errorText)
                }
            })
    }

    return (
        <div>
            {resetPassMessage ?
                <Alert onClose={() => {
                    history.push(`/users/logIn`)
                }} severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Mail with new password was sent to your email
                </Alert>
                : null
            }
            <h2>Reset password</h2>
            <ValidatorForm
                onSubmit={handleSubmit}
                onError={(errors: any) => console.log(errors)}
                className={classes.form}
                noValidate
                autoComplete="off"
            >
                <TextValidator
                    className={classes.input}
                    onChange={typedEmail}
                    id="outlined-basic"
                    label="Email"
                    name="email"
                    variant="outlined"
                    value={userEmail}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Reset password
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default ResetPass