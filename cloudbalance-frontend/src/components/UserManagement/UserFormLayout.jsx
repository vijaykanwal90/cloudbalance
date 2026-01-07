import React from 'react'
import { useParams } from "react-router-dom";
import UserForm from './UserForm';
const UserFormLayout = () => {
    const {id} = useParams();
    const isEditMode = Boolean(id);

  return (
     <UserForm id={id} isEditMode={isEditMode}/>
  )
}

export default UserFormLayout