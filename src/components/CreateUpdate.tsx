import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import {useForm} from "react-hook-form"
import type { Users } from "../shared/models/User.model";
import { createUser, UpdateUser } from "../data/http.service";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const CreateUpdate = () =>{
    const{register,handleSubmit,reset,formState :{errors} }= useForm<Users>();

    const location = useLocation();
    const userData:Users = useSelector((state:any)=>state.User);

    useEffect(()=>{
          if(location.pathname === '/update'){
            reset(userData);
          }
    },[])
    

    const onSubmit =async (userData:Users) => {
      if(location.pathname === '/update'){
          await UpdateUser(userData) ;
          }else{
        await createUser(userData) ;
          }
    }
return(
    <>
    <section className="flex justify-center items-center">
        <form onSubmit = {handleSubmit(onSubmit)}className="border border-blue-400 rounded-md p-5 m-5 w-[90%]">
    <TableContainer component={Paper} className="border border-blue-400 rounded-md p-5 m-5 w-[60%]">
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableBody>
          <TableRow>
            <TableCell >Name</TableCell>
            <TableCell align="right">
            <TextField  {...register('name',{required:'Name is required',minLength:{
              value:5,
            message:"Name should be minimum of 5 characters"},
              maxLength:{
                value:20,
            message:"Name should be maximum of 20 characters"
}})} className="w-full" label="Name" variant="outlined" />
            <span className="text-red-500 italic">{errors.name && errors.name.message}</span>
            </TableCell>
          </TableRow>
           <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">
            <TextField {...register('email',{required:'email is required',pattern:{value :/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2 ,}$/,message:'Email is invalid'}})}className="w-full" label="Email" variant="outlined" />
            <span className="text-red-500 italic">{errors.email && errors.email.message}</span>
            </TableCell>
          </TableRow>
           <TableRow>
            <TableCell>Phone</TableCell>
            <TableCell align="right">
                <TextField {...register('phone',{required:'phone is required'})} className="w-full" label="Phone" variant="outlined" />
                <span className="text-red-500 italic">{errors.phone && errors.phone.message}</span>
                </TableCell>
          </TableRow>
           <TableRow>
            <TableCell>Website</TableCell>
            <TableCell align="right">
                <TextField {...register('website')} className="w-full" label="Website" variant="outlined" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} align="right"></TableCell>
                <Button className="mr-5" type = "button" variant="outlined" onClick = {()=>{reset()}}> Reset </Button>
            <Button type = "submit" variant="outlined" >{location.pathname === '/update'?'update':'create'} User </Button>
          </TableRow>
        </TableBody>
        </Table>
     </TableContainer>
     </form>
        </section>
    </>
)
};
export default CreateUpdate;







