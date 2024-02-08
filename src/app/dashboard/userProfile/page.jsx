import React from 'react';
import './UserProfile.css';
import { cookies } from 'next/headers';
import { jwtDecode } from "jwt-decode";
import axiosInstance from '../../../../axiosInstance/Instance';

const UserProfile = async () => {
  const tokenValues = cookies()
  const userData = tokenValues.get('authToken')
  const data =  jwtDecode(userData.value)
  const {_id, name, email, role} = data.existUser

const fetchImages = async () => {
  try {
    const response = await axiosInstance.get('/api/GetProfile');
    const data = response.data;
    const profileImg = data.images.filter(img => img.name === `${email}.jpg`);
    return profileImg;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

const img = await fetchImages();
const profileImg = img[0]?.url

  return (
    <>
    <div className='profile-responsive'>
      <div className='header'>
        <div className='top-left-header flex'>
          <div className='sub-pic'>
            <img src={profileImg} alt='Loading....' className='sub-pic' />
          </div>
          <div className='top-sub-header mt-2 mx-3'>
            <div className="name">Employee Name : {name}</div>
            <div className='id mt-2'>Employee ID : {_id}</div>
          </div>
        </div>
        <div className='top-right-header'>
          <div className="name">Employee email : {email} </div>
          <div className='work mt-2'>Designation : React JS Developer {role}</div>
        </div>
      </div>
        <div className='mt-4 text-4xl flex justify-center'>
          As a React developer, you have to follow some steps :
          </div>
      <div id='about' className=' mt-12 container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='about-card'>
            <img
              src='http://res.cloudinary.com/dfqddpjfl/image/upload/v1498777628/quality_q31k6u.png'
              alt='High Quality Lectures'
              className='aboutImage'
            />
            <div className='text-3xl font-bold mt-4'>High Quality Code</div>
            <div className='text-lg mt-5'>
              A quality code is one that is clear, simple, well-tested, bug-free, refactored, documented, and performant. Lorem  ipsum dolor sit amet consectetur adipisicing.
            </div>
          </div>
          <div className='about-card'>
            <img
              src='http://res.cloudinary.com/dfqddpjfl/image/upload/v1498777629/tools_yorndk.png'
              alt='+80H of Rich Content'
              className='aboutImage'
            />
            <div className='text-3xl mt-4 font-bold'>Implementing App Modifications</div>
            <div className='text-lg mt-5'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium aliquid fuga atque veniam quae voluptatibus  minima ducimus nostrum saepe suscipit.
            </div>
          </div>
          <div className='about-card'>
            <img src='http://res.cloudinary.com/dfqddpjfl/image/upload/v1498777627/help_dfec8u.png' alt='Get Help Anytime!' className='aboutImage' />
            <div className='text-3xl font-bold mt-4'>Ability to Find and Correct Errors Effectively</div>
            <div className='text-lg mt-5'> 
              Error recognition refers to the ability to recognize or detect the presence of an error; recognition may happen as Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfile;
