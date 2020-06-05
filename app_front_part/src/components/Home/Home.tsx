import history from "../../history";
import React, {useEffect} from 'react'
import {Button} from '@material-ui/core'
import {useStyles} from './HomeStyled'
import api from "../../api/api";


const Home = () => {
    const classes = useStyles()

    // test
    useEffect(() => {
        console.log('rendered');
        const fetchUsers = async () => {
            const users = await api.getUsers();
            // @ts-ignore
            return users.data
        };
        fetchUsers()
            .then((res) => {
                console.log(res)
            })

    }, []);


    return (
        <div className={classes.wrapper}>

            <Button
                data-testid="button-login"
                onClick={() => {
                    history.push('/users/login')
                }}
                variant="contained"
                color="secondary"
            >
                Login
            </Button>

            <Button
                data-testid="button-signUp"
                onClick={() => {
                history.push('/users/signUp')
            }}
                variant="contained"
                color="secondary"
            >
                Sign Up
            </Button>

        </div>
    )
}

export default Home