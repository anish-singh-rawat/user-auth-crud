import ExampleWithProviders from '@/components/AllUsersMRT/UsersData';
import axiosInstance from '../../../../axiosInstance/Instance';

const getAllUser = async () => {
  try {
    const res = await axiosInstance.get("/api/getUsers");
    const users = await res.data.users;
    return users;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const AllUsersData = async () => {
  const  UserData = await getAllUser();
  const allUsers = UserData.filter((data : any) => data.role.toLowerCase() != 'admin');
  
  return (
  <ExampleWithProviders allUsers={allUsers} />
  )
};

export default AllUsersData;