import ExampleWithProviders from '@/components/AllUsersMRT/UsersData';
import axiosInstance from '../../../../axiosInstance/Instance';

const getAllUser = async () => {
  try {
    const res = await axiosInstance.get("/api/getUsers");
    const users = await res.data.users;
    return users;
    return ;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const AllUsersData = async () => {
  const allUsers = await getAllUser();
  return (
  <ExampleWithProviders allUsers={allUsers} />
  )
};

export default AllUsersData;