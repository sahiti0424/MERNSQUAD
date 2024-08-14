import React, { useState } from 'react';
import axios from 'axios';



const ForgotPassword = () => {
   
    const [email, setEmail] = useState('');
   
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/user/forgot-password', { email})
            .then(response => {
              if(response.data.status){
              alert("check your email for reset password link")
              }
              
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className='signup-container'>
            <form className='signup-form' onSubmit={handleSubmit}>
               <h2>Let's reset your password..</h2>
                <label htmlFor='email'>Email:</label>
                <input type='email' autoComplete='off' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
               
                <button type='submit'>Send</button>
               
            </form>
        </div>
    );
};

export default ForgotPassword;