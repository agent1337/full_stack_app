import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    pageWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    groupesWrapper: {
        display: 'flex',
        alignItems: 'center',
        margin:'15px 0px',
        padding: '13px 10px 11px',
        borderRadius: 4,
        border: '1px solid #c4c4c4',
    },
    groupField: {
        marginRight: 8,
        border: '1px solid #827f7f',
        padding: '4px 7px',
        borderRadius: 6,
    },

});
