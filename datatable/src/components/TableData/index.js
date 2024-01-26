import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import './index.css';


const TableData = () => {

    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [tableData, setData] = useState([]);

    const getLocalStorageData = () => {
        let stringfiedData = localStorage.getItem("TableData");
        let parsedData = JSON.parse(stringfiedData);
        if (parsedData === null) {
            return []
        }
        return parsedData
    }

    let data = getLocalStorageData();
    let idCount = data.length;
    // localStorage.removeItem("TableData")

    const onChangeFName = (e) => {
        setFName(e.target.value);
    }

    const onClickDelete = (deleteId) => {
        let deleteIndex = data.findIndex(item => item.id === deleteId);
        console.log(deleteIndex)
        if (deleteIndex > -1) {
            data.splice(deleteIndex,1);
            setData(data)
        }
        localStorage.setItem("TableData", JSON.stringify(data));
    }

    const AddDatatToTable = (e) => {
        e.preventDefault();
        idCount = idCount + 1
        let newData = {
            id: idCount,
            firstName: fname,
            lastName: lname,
            personMail: email,
            phoneNumber: phoneNo
        }
        setFName('');
        setLName('');
        setEmail('');
        setPhoneNo('');
        data.push(newData);
        localStorage.setItem("TableData", JSON.stringify(data))
        console.log(data)
    }

    return (
        <div className='display-container'>
            <div className='add-container'>
                <form className='form-container'>
                    <div className='input-element'>
                        <label>First Name</label>
                        <TextField
                            required
                            label="Required"
                            value={fname}
                            placeholder='Enter First Name'
                            onChange={onChangeFName}
                        />
                    </div>
                    <div className='input-element'>
                        <label>Last Name</label>
                        <TextField
                            required
                            label="Required"
                            value={lname}
                            placeholder='Enter Last Name'
                            onChange={e => { setLName(e.target.value) }}
                        />
                    </div>
                    <div className='input-element'>
                        <label>Email</label>
                        <TextField
                            required
                            label="Required"
                            value={email}
                            placeholder='Enter Email'
                            onChange={e => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className='input-element'>
                        <label>Phone Number</label>
                        <TextField
                            required
                            label="Required"
                            value={phoneNo}
                            placeholder='Enter Phone Number'
                            onChange={e => { setPhoneNo(e.target.value) }}
                        />
                    </div>
                    <Button type='submit' variant="contained" onClick={AddDatatToTable}>
                        Add
                    </Button>
                    {/* <button type='submit' onClick={AddDatatToTable}>Add</button> */}
                </form>
            </div>
            <div className='table-conatiner'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 900 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Id</TableCell>
                                <TableCell align='center'>First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone Number</TableCell>
                                <TableCell align='center'>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align='center'>{row.id}</TableCell>
                                    <TableCell align='center'>
                                        {row.firstName}
                                    </TableCell>
                                    <TableCell align="center">{row.lastName}</TableCell>
                                    <TableCell align="center">{row.personMail}</TableCell>
                                    <TableCell align="center">{row.phoneNumber}</TableCell>
                                    <TableCell align='center' onClick={()=>onClickDelete(row.id)}>
                                        <Button><DeleteIcon/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    )
}

export default TableData;

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function TableData() {
//     fu
//     let data = localStorage.setItem("setData", JSON.stringify(setData))
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }