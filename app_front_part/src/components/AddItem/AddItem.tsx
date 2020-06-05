import React from 'react'
import {Button, Icon, TextField} from "@material-ui/core"
import {Alert, AlertTitle} from '@material-ui/lab'
import {useStyles} from './AddItemStyled'
import { green } from '@material-ui/core/colors'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import history from '../../history'
const axios = require('axios')

const AddItem = ({match}:any) => {

    const classes = useStyles()
    const userId:any = match.params.userId

    const [itemName, setItemName] = React.useState('')
    const typedName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(event.target.value)
    }

    const [isIconClicked, setIsIconClicked] = React.useState(false)
    const addIconClicked = () => {
        setIsIconClicked(true)
    }

    const [groupName, setGroupName] = React.useState('')
    const typedGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(event.target.value)
    }

    const [groups, setGroups] = React.useState([])
    const addNewGroup = () => {
        // @ts-ignore
        setGroups([
            ...groups,
            groupName
        ])
        setIsIconClicked(false)
    }


    const [invalidValueMessage, setInvalidValueMessage] = React.useState(false)
    const addNewItem = () => {

        const groupsStr = groups.join()

        axios
            .post(`/items/addItem/${userId}`, {
                name: itemName,
                groups: groupsStr
            })
            .then((res: any) => {
                console.log("data from back", res);

                if (res.data.status === 'Success') {
                    history.goBack()
                } else if (res.data.status === 'Faild') {
                    setInvalidValueMessage(true)
                }
            })
    }

    // validation rule for item length
    ValidatorForm.addValidationRule('itemLength', (value) => {
        const regNumberValidation = /[0-9A-Za-z]{3}/gmi;
        if (!value.match(regNumberValidation)) {
            return false;
        }
        return true;
    });

    return (
        <ValidatorForm
            className={classes.pageWrapper}
            onSubmit={addNewItem}
            onError={(errors: any) => console.log(errors)}
        >
            {
                invalidValueMessage ?
                <Alert
                    onClose={() => {
                        setInvalidValueMessage(false)
                    }}
                    severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Item name can not be more than 35 symbols
                </Alert>
                    : null
            }

            <h2>Add item page</h2>
                <TextValidator
                    name="name"
                    value={itemName}
                    validators={['itemLength', 'required']}
                    errorMessages={['Item name can not be less 3 characters', 'this field is required']}
                    onChange={typedName}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                />
                    <div className={classes.groupesWrapper}>
                        {groups.map((group:any) => {
                            const groupName = group
                                console.log(groupName)
                            return (
                                <div className={classes.groupField}>{groupName}</div>
                            )
                        })}
                        { isIconClicked ?
                            <TextField
                                id="outlined-basic"
                                label="New group name"
                                variant="outlined"
                                onChange={typedGroupName}
                                InputProps={{
                                    endAdornment: (
                                        <Icon
                                            onClick={addNewGroup}
                                            style={{ cursor: "pointer" }}
                                            color="secondary">
                                            add_circle
                                        </Icon>
                                    ),
                                }} />
                                :
                            <Icon
                                onClick={addIconClicked}
                                style={{ color: green[500], cursor: "pointer" }}>
                                add_circle
                            </Icon>}
                    </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Add
                </Button>
        </ValidatorForm>
    )
}

export default AddItem