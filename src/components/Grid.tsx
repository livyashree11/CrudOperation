//import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../data/http.service";
import type { Users } from "../shared/models/User.model";
import{TableContainer,Paper,Table,TableHead,TableRow,TableCell,TableBody,Button} from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import{setUserData}from'../shared/slicers/UserSlice';
import { useQuery } from "@tanstack/react-query";


const Grid =()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const[usersData,setUsersData]= useState<Users[]>([]);

    const {data} =useQuery(
        {
            queryKey:['users'],
            queryFn:getUsers,
            retry:3,
            refetchInterval:600000,
            staleTime:600000
        }   
);

     //useEffect(()=>{
      //getUsers().then(data =>setUsersData(data));
     //},[])

     const onViewClick = (user:Users)=>{
      dispatch(setUserData(user))
      navigate('/view');
     }

       const onDeleteClick = async (user:Users)=>{
        await deleteUser(user.id);
     }

       const onUpdateClick = (user:Users)=>{
        dispatch(setUserData(user))
          navigate('/update');
     }
    return(
        <>
        <section className="flex flex-col justify-center items-start p-10">
            <Button variant = "outlined" onClick={()=>navigate('/create')} >Create User</Button>
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
                       data && data.map((userData:Users,index:number) =>{
                        return(
                            <TableRow key={index}>
                                <TableCell align ="center">{userData.name}</TableCell>
                                <TableCell align ="center">{userData.email}</TableCell>
                                <TableCell align ="center">{userData.phone}</TableCell>
                                <TableCell align ="center">{userData.website}</TableCell>
                                 <TableCell className = "flex flex-row justify-items-center gap-5 ">
                    <Button variant="outlined" onClick={()=>onUpdateClick(data)}>UPDATE</Button>
                    <Button variant="outlined" onClick={()=>onDeleteClick(data)}>DELETE</Button>
                    <Button variant="outlined" onClick={()=>onViewClick(data)}>VIEW</Button>
                </TableCell>
                </TableRow>)
})
}

                </TableBody>
            </Table>
         </TableContainer>
         </section>
        </>
    )
};
export default Grid;


