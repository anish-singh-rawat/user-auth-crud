import React from 'react'
import UserExampleProvider from '@/components/UserDashboard/page'
import axiosInstance from '../../../axiosInstance/Instance';

const getAllUser = async () => {
  try {
    const res = await axiosInstance.get("/api/getUsers");
    const users = await res.data.users;
    return users;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const page = async () => {
  const  UserData = await getAllUser();
  const allUsers = UserData.filter((data : any) => data.role.toLowerCase() != 'admin');
  return (
    <UserExampleProvider allUsers={allUsers} />
  )
}

export default page