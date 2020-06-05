import React from 'react'
import {Button, Icon, TextField} from "@material-ui/core"
import {useStyles} from './UpdateItemStyled'
import {Alert, AlertTitle} from '@material-ui/lab'
import { green } from '@material-ui/core/colors'
import history from '../../history'
const axios = require('axios')

const UpdateItem = ({match}:any) => {
    const classes = useStyles()
    const itemId = match.params.itemId
    const itemName = match.params.itemName

    const [updatedItemName, setUpdatedItemName] = React.useState('')
    const typedName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedItemName(event.target.value)
    }

    const [isIconClicked, setIsIconClicked] = React.useState(false)
    const addIconClicked = () => {
        setIsIconClicked(true)
    }

    const [groupName, setGroupName] = React.useState('')
    const typedGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(event.target.value)
    }


    const [groups, setGroups]= React.useState([])
    const itemGetGroups = () => {
        axios
            .get(`/items/updateItem/${itemId}/${itemName}`)
            .then((res: any) => {
                console.log(res.data)
                setGroups(res.data)
            });
    }
    React.useEffect(itemGetGroups, [])


    const addNewGroup = () => {
        // @ts-ignore
        groups.push(groupName)
        setIsIconClicked(false)
    }


    const [invalidValueMessage, setInvalidValueMessage] = React.useState(false)
    const updateItem = () => {
        axios
            .put(`/items/updateItem/${itemId}/${itemName}`, {
                newName: updatedItemName,
                groups: groups
            })
            .then((res: any) => {
                if (res.data.status === 'Success') {
                    history.goBack()
                } else if (res.data.status === 'Faild') {
                    setInvalidValueMessage(true)
                }
            })
    }

    return (
        <div className={classes.pageWrapper}>
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
            <h2>Update item page</h2>
            <TextField
                defaultValue={itemName}
                name='updatedItemName'
                onChange={typedName}
                id="outlined-basic"
                label="New name"
                variant="outlined"
            />
            <div className={classes.groupesWrapper}>
                {groups.map((groupName:any) => {
                    return (
                        groupName.length !== 0 &&
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
                onClick={updateItem}
                variant="contained"
                color="primary"
            >
                Update
            </Button>
        </div>
    )
}

export default UpdateItem