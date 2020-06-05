import {makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: 15
    },
    button: {
        marginRight: 10
    },
    header__title: {
        margin: 0
    },
    table: {
        minWidth: 900,
    },
    formControl: {
        width: 100,
    },
    buttons: {
        margin: 15
    },
    header_checkbox: {
        paddingLeft: 10,
        paddingRight: 10,
        minWidth: 110
    },
    tableIdCell: {
        paddingLeft: 50,
        paddingRight: 50
    },
    root: {
        flexShrink: 0,
        marginLeft: 20,
    }
})