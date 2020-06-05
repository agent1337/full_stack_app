import React from 'react'
import {makeStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles'
import {useStyles} from './ItemsListStyled'
import {
    Checkbox,
    FormControlLabel,
    TableCell,
    Paper,
    InputLabel,
    Select,
    Button,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    FormControl,
    MenuItem,
    TableFooter,
    TablePagination,
    IconButton,

} from '@material-ui/core'
import {Alert, AlertTitle} from '@material-ui/lab'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'
import {KeyboardArrowRight, KeyboardArrowLeft} from '@material-ui/icons'
import history from '../../history'

const axios = require("axios")


const ItemsList = ({match}: any) => {

    const [items, setItems] = React.useState([])

    let userId: any = null
    match !== undefined ? userId = match.params.userId : userId = null

    console.log(match)
    console.log(items)
    const usersGetData = () => {
        axios
            .get(`/users/user/data/${userId}`)
            .then((res: any) => {
                setItems(res.data)
            });
    }
    React.useEffect(usersGetData, [])


    const classes = useStyles()

    // ACTIONS (UPDATE/DELETE)
    const updateAction = (event: React.MouseEvent<HTMLButtonElement>) => {
        const itemId = event.currentTarget.getAttribute("id")
        const itemName = event.currentTarget.getAttribute("name")
        history.push(`/items/updateItem/${itemId}/${itemName}`)
    }

    const [deleteItemMessage, setDeleteItemMessage] = React.useState(false)
    const deleteAction = (event: React.MouseEvent<HTMLButtonElement>) => {
        axios
            .delete(`/users/user/data/${userId}`, {
                data: {
                    itemId: event.currentTarget.getAttribute("id")
                }
            })
            .then(() => {
                usersGetData()
                setDeleteItemMessage(true)
            })
    }

    // SELECTED ITEMS
    const [selected, setSelected] = React.useState<string[]>([])

    const [deleteSelectedItemsMessage, setDeleteSelectedItemsMessage] = React.useState(false)
    const deleteSelected = () => {
        axios
            .post(`/users/user/data/${userId}`, {
                itemsIdArr: selected
            })
            .then((res: any) => {
                usersGetData()
                setDeleteSelectedItemsMessage(true)
            })
    }

    const isSelected = (name: string) => selected.indexOf(name) !== -1

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = items.map((item: any) => item.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    interface EnhancedTableProps {
        numSelected: number;
        onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
        rowCount: number;
    }

    function EnhancedTableHead(props: EnhancedTableProps) {
        const {rowCount, onSelectAllClick, numSelected} = props;
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <FormControlLabel className={classes.header_checkbox}
                                          control={
                                              <Checkbox
                                                  indeterminate={numSelected > 0 && numSelected < rowCount}
                                                  checked={rowCount > 0 && numSelected === rowCount}
                                                  onChange={onSelectAllClick}
                                                  inputProps={{'aria-label': 'select all desserts'}}
                                              />
                                          }
                                          label="Select all"
                                          labelPlacement="end"
                        />

                    </TableCell>

                    <TableCell className={classes.tableIdCell}>Id</TableCell>
                    <TableCell align={"center"}>Name</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
        )
    }


    // pagination
    interface TablePaginationActionsProps {
        count: number;
        page: number;
        rowsPerPage: number;
        onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
    }

    const useStyles1 = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexShrink: 0,
                marginLeft: theme.spacing(2.5),
            },
        }),
    )

    function TablePaginationActions(props: TablePaginationActionsProps) {
        const classes = useStyles1();
        const theme = useTheme();
        const {count, page, rowsPerPage, onChangePage} = props;

        const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onChangePage(event, 0);
        };

        const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onChangePage(event, page - 1);
        };

        const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onChangePage(event, page + 1);
        };

        const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
                </IconButton>
            </div>
        );
    }

    const [page, setPage] = React.useState(0)
    const rowsPerPage = 4

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage)

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage)
    }

    // LOGOUT
    const [logoutMessage, setLogoutMessage] = React.useState(false)
    const logout = () => {
        localStorage.removeItem('token');
        setLogoutMessage(true)

        setTimeout(() => {
            // @ts-ignore
            window.location = '/'
        }, 1000)
    }

    return (

        <div data-testid='resolved'>
            {deleteItemMessage ?
                <Alert onClose={() => {
                    setDeleteItemMessage(false)
                }} severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Item was deleted
                </Alert>
                : null
            }
            {deleteSelectedItemsMessage ?
                <Alert onClose={() => {
                    setDeleteSelectedItemsMessage(false)
                }} severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Selected items were deleted
                </Alert>
                : null
            }
            {logoutMessage ?
                <Alert variant="outlined" severity="info">
                    <strong>You have logged out!</strong>
                </Alert>
                : null
            }

            <div className={classes.header}>
                <h1 className={classes.header__title}>
                    Items List
                </h1>
                <div>
                    <Button className={classes.button} onClick={() => {
                        history.push(`/users/user/reset/${userId}`)
                    }} variant="outlined">
                        Reset password
                    </Button>
                    <Button onClick={logout} variant="outlined">
                        Logout
                    </Button>
                </div>
            </div>

            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={items.length}
                        />
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : items
                            ).map((item: any, index: any) => {

                                const isItemSelected = isSelected(item.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        key={item.id}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        selected={isItemSelected}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event) => handleClick(event, item.id)}
                                                checked={isItemSelected}
                                                inputProps={{'aria-labelledby': labelId}}
                                            />
                                        </TableCell>
                                        <TableCell className={classes.tableIdCell}>
                                            {item.id}
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            {item.name}
                                        </TableCell>
                                        <TableCell align={"right"}>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel>Actions</InputLabel>
                                                <Select
                                                    label="Action"
                                                >
                                                    <MenuItem
                                                        id={item.id}
                                                        name={item.name}
                                                        value={"Update"}
                                                        //@ts-ignore
                                                        onClick={updateAction}
                                                    >
                                                        Update
                                                    </MenuItem>

                                                    <MenuItem
                                                        id={item.id}
                                                        value={"Delete"}
                                                        //@ts-ignore
                                                        onClick={deleteAction}
                                                    >
                                                        Delete
                                                    </MenuItem>

                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 53 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    colSpan={3}
                                    count={items.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>

            <div>

                <Button
                    onClick={() => {
                        history.push(`/users/addItem/${userId}`)
                    }}
                    className={classes.buttons}
                    variant="outlined"
                    color="primary"
                >
                    Add New Item
                </Button>

                <Button
                    onClick={deleteSelected}
                    variant="outlined"
                    color="secondary"
                >
                    Delete selected items
                </Button>
            </div>
        </div>
    )
}

export default ItemsList