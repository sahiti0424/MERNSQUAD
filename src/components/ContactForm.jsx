import React from 'react';
import Header from './Header';

const ContactForm = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    backgroundImage: 'url("https://images.pexels.com/photos/17160688/pexels-photo-17160688/free-photo-of-emirates-stadium-in-london-england.jpeg?auto=compress&cs=tinysrgb&w=600")',
    backgroundSize: 'cover', // Ensure the background covers the entire container
    backgroundPosition: 'center', // Center the background image
    backgroundAttachment: 'fixed', // Keep the background fixed during scroll
    padding: '20px', // Optional padding around the container
  };

  const formContainerStyle = {
    width: '500px', // Increased width
    background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background to make the form readable
    border: '2px solid transparent',
    padding: '32px 24px',
    fontSize: '14px',
    fontFamily: 'inherit',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxSizing: 'border-box',
    borderRadius: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // Optional shadow for better visibility
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    color: 'white',
    fontWeight: '600',
    fontSize: '12px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    color: 'black',
    fontFamily: 'inherit',
    backgroundColor: 'white',
    border: '1px solid #414141',
  };

  const textareaStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    resize: 'none',
    color: 'black',
    height: '120px', // Increased height
    border: '1px solid #414141',
    backgroundColor: 'white',
    fontFamily: 'inherit',
  };

  const submitButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'inherit',
    color: 'white',
    fontWeight: '600',
    width: '40%',
    background: '#313131',
    border: '1px solid #414141',
    padding: '12px 16px',
    fontSize: 'inherit',
    gap: '8px',
    marginTop: '8px',
    cursor: 'pointer',
    borderRadius: '6px',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
    alert("Form submitted");
  };

  return (
  <div>
    <Header />
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="email">Email</label>
            <input style={inputStyle} type="text" id="email" name="email" required />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="textarea">How Can We Help You?</label>
            <textarea style={textareaStyle} name="textarea" id="textarea" rows="10" required></textarea>
          </div>
          <button style={submitButtonStyle} type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default ContactForm;
