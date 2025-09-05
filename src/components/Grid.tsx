import { useEffect, useState } from "react";
import { getUsers } from "../data/http.service";
import type { Users } from "../shared/models/User.model";
import{TableContainer,Paper,Table,TableHead,TableRow,TableCell,TableBody,Button} from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import{setUserData}from'../shared/slicers/UserSlice';


const Grid =()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[usersData,setUsersData]= useState<Users[]>([]);
     useEffect(()=>{
      getUsers().then(data =>setUsersData(data));
     },[])

     const onViewClick = (user:Users)=>{
      dispatch(setUserData(user))
      navigate('/view');
     }
    return(
        <>
        <section className="flex justify-center items-center">
         <TableContainer component={Paper} className="border border-blue-400 rounded-md p-5 m-5 w-[90%]">
            <Table>
                <TableHead>
                <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        usersData.map((data,index) =>(
                            <TableRow key={index}>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.phone}</TableCell>
                                <TableCell>{data.website}</TableCell>
                                 <TableCell className = "flex flex-row justify-items-center gap-5 ">
                    <Button variant="outlined">UPDATE</Button>
                    <Button variant="outlined">DELETE</Button>
                    <Button variant="outlined" onClick={()=>onViewClick(data)}>VIEW</Button>
                </TableCell>
                </TableRow>))
}
                </TableBody>
            </Table>
         </TableContainer>
         </section>
        </>
    )
};
export default Grid;