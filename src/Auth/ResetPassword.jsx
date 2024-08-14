import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
   
    const [password, setPassword] = useState('');
   const {token} = useParams()
    const navigate = useNavigate
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/user/reset-password/'+token, {password})
            .then(response => {
              if(response.data.status){
                navigate('/login')
              }
              
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className='signup-container'>
            <form className='signup-form' onSubmit={handleSubmit}>
               
                <label htmlFor='password'>Create an new password:</label>
                <input type='password'  placeholder='*****' onChange={(e) => setPassword(e.target.value)} />
               
                <button type='submit'>Send</button>
               
            </form>
        </div>
    );
};

export default ResetPassword;