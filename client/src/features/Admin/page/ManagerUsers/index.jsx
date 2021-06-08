import React, { useEffect, useState } from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import userApi from 'api/useAPI';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


function ManagerUsers(props) {
    const classes = useStyles();
    const [users, setUsers] = useState([])
    const history = useHistory();
    async function getAllUser() {
        const allUser = await userApi.getAllUser()
        setUsers(allUser)
    }
    useEffect(() => {
        getAllUser();
    }, [])
    const handleEdit = (id) => {
        history.push("/addeditUser/" + id);
    }
    const handleRemove = (id) => {
        console.log("hekki");
    }
    return (
        <TableContainer component={Paper}>
            { users.length !== 0 && (
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Quyền </TableCell>
                            <TableCell align="left">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">
                                    {row.role == 0 && (
                                        <p>Admin</p>
                                    )}
                                    {row.role == 1 && (
                                        <p>Super Admin</p>
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    <Button
                                        onClick={handleEdit(row._id)}
                                    ><EditOutlined /></Button>
                                    <Button
                                        onClick={handleRemove}
                                    // loading={loading2}
                                    ><DeleteOutlined /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

        </TableContainer>
    );
}

export default ManagerUsers;