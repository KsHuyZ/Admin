import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../lib/axios';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

const notifyError = (msg) => toast.error(msg);
const notifySuccess = (msg) => toast.success(msg);

function createData(name, price, quantity, id, byPoint) {
  return { name, price, quantity, id, byPoint };
}




const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const [orders, setOrders] = useState([])
  const handleGetAllCartWaiting = async () => {
    try {
      const res = await axios.get("/order/admin-getorder")
      console.log(res.data.orders)
      setOrders(res.data.orders)
    } catch (error) {
      console.log(error)
    }


  }

  const handleAcceptOrder = async (id) => {
    try {
      await axios.post("/order/accept-order", {
        id
      })
      notifySuccess("????n h??ng ???? ???????c x??c nh???n")
      handleGetAllCartWaiting()
    } catch (error) {
      notifyError("X??c nh???n ????n h??ng th???t b???i")
    }
  }

  const rows = orders.map((product) => (
    createData(product.idProduct.name, product.idProduct.price, product.quantity, product._id, product.byPoint)
  ))

  useEffect(() => {
    handleGetAllCartWaiting()
  }, [])

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <ToastContainer />
      <Header category="Trang Qu???n L??" title="Orders" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>T??n </StyledTableCell>
              <StyledTableCell align="right">Gi??</StyledTableCell>
              <StyledTableCell align="right">S??? l?????ng</StyledTableCell>
              <StyledTableCell align="right">H??nh ?????ng</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.price} {row.byPoint ? "??i???m" : "?????ng"}</StyledTableCell>
                <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                <StyledTableCell align="right" style={{ fontSize: 50 }}>
                  <DoneIcon style={{ color: 'blue', cursor: 'pointer', fontSize: 30 }} onClick={() => handleAcceptOrder(row.id)} />
                  <CloseIcon style={{ color: 'red', cursor: 'pointer', fontSize: 30 }} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Orders;