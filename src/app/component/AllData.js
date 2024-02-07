import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import axiosInstance from '../../../axiosInstance/Instance';

const deleteCookie = async ()=>{
 const res =  await axiosInstance.post("/api/adminAuth/LogOut")
  if(res.status == 200){
    window.location.href = '/'; 
  }
}

export const allFilesData = [
  { fileName: 'Profile', icon: <AccountCircleIcon />, path: '/dashboard/userProfile' },

  { fileName: 'All Users', icon: <StackedBarChartIcon />, path: '/dashboard' },
  
  { fileName: 'Add User', icon: <PersonAddAltIcon />, path: '/dashboard/AddUser' },

  { fileName: 'LogOut', icon: <PowerSettingsNewIcon onClick={()=>deleteCookie()} 
 />, path: '/'},
]