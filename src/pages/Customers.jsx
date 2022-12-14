import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { customersData, customersGrid, userGrid } from '../data/dummy';
import { Header } from '../components';
import TextField from '@mui/material/TextField';
import axios from "../lib/axios"
import { useState } from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './Row';
import { styled } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function createData(name, avatar, email, point, id) {
  return { name, avatar, email, point, id, };
}

const Customers = () => {
  const [user, setUser] = useState([])
  const [users, setUsers] = useState([])


  const handleGetUser = async () => {
    try {
      const res = await axios.get("/users/admin-get-user")
      setUsers(res.data.users)
      setUser(res.data.users)
    } catch (error) {
      console.log(error);
    }
  }

  const rows = user.map((product) => (
    createData(`${product.firstName} ${product.lastName}`, <img src={product.avatar} style={{ width: 70, height: 70, marginLeft: 'auto' }} />, product.email, product.point, product._id,)
  ))


  useEffect(() => {
    handleGetUser()
  }, [])



  const handleSearchUser = (e) => {
    let hi = []
    if (e.target.value === "") {
      hi = []
      return setUser(users)
    }

    users.map((u, i) => {
      if (`${u.firstName} ${u.lastName}`.includes(e.target.value)) {
        hi.push(u)
        setUser(hi)
      }

    })
  }


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Trang Qu???n L??" title="Kh??ch h??ng" />
      <TextField id="outlined-basic" label="Type name" variant="outlined" onChange={handleSearchUser} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>T??n</StyledTableCell>
              <StyledTableCell align="right">H??nh ???nh</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">??i???m</StyledTableCell>
              <StyledTableCell align="right">H??nh ?????ng</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.image}</StyledTableCell>
                <StyledTableCell align="right" >{row.email}</StyledTableCell>
                <StyledTableCell align="right" >{row.point} </StyledTableCell>
                <StyledTableCell align="right" ><ClearIcon style={{ color: 'red', cursor: 'pointer' }} /></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Customers;