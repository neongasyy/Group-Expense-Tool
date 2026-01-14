import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import "./Login.scss";

const Login = ({width, height}) => {

    const ratio = ((height)*2/width)*5;
    const [key, setKey] = useState('Login');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();
 
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    /**
     * Attempts to log the user in using Firebase authentication.
     * On success, navigates to the home page and passes user details via state.
     * @param {Event} e - The event triggered by form submission.
     */
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home", { state: { username: user.displayName, userID: user.uid} })
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email') {
                setEmailError('Invalid email address');
            } else if (errorCode === 'auth/wrong-password') {
                setPasswordError('Incorrect password.');
            } else {
                console.error('Authentication Error:', errorCode, errorMessage);
                // Display a generic error message to the user
                setEmailError('An error occurred. Please try again later.');
            }
        });
    }
       
    /**
     * Handles the signup process for a new user.
     * Validates password and confirmPassword fields, then uses Firebase to create a new user.
     * Upon success, updates the user's profile with the entered username and reloads the page.
     * @param {Event} e - The event triggered by form submission.
     */
    const onSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword){
            console.log("Passwords do not match");
            return;
        }

        else{
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    // Signed in
                    const user = userCredential.user;

                    var newuser = auth.currentUser;

                    updateProfile( newuser, {
                        displayName: username,
                        //photoURL: "https://example.com/user/profile.jpg"
                    }).then(function() {
                        // Update successful.
                        console.log('User Profile Updated Successfully');
                    }).catch(function(error) {
                        // An error happened.
                    });

                    console.log(user);
                    // not recommended to use this method, but for now it's fine
                    // replace with react router later
                    window.location.reload(true);
                    // navigate("/")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    // ..
            });

        }
    }


    return <div className="maincontainer_login" style={{ width: `${width}px`, height:  `${height}px`, marginTop: `${(height/width)*45}px` }}>

        <div>
            <img src={logo} alt="logo" className="logo" style={{ width:  `${width/2}px`, height:  `auto`, marginBottom: `${(height/width)*15}px`}}/>
        </div>
        
        <div className="loginsignup" style={{ maxHeight:  `${height/2}px` }}>
            <Tabs 
                activeKey={key}
                className="logincontainer"
                onSelect={(k) => setKey(k)}
                justify
            >
                <Tab className="loginbody" eventKey="Login" title="Login" style={{background: `transparent`}}>

                    <Form className="main_form" style={{ gap:  `${ratio}px`, paddingTop: `${ratio}px`}}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control 
                                className="text_box" 
                                type="email" 
                                placeholder="EMAIL" 
                                style={{ minHeight:  `${height/15}px` }}
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text className="text-danger" style={{ fontWeight: 'bold', fontSize: '14px', marginTop: '5px' }}> {emailError} </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control 
                                className="text_box"
                                type="password" 
                                placeholder="PASSWORD" 
                                style={{ minHeight:  `${height/15}px` }}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Form.Text className="text-danger" style={{ fontWeight: 'bold', fontSize: '14px', marginTop: '5px' }}> {passwordError} </Form.Text>               
                        </Form.Group>
                    </Form>         
                    <Button className="submit_btn" variant="primary" type="submit" style={{minWidth: `${width/1.5}px`, marginTop:`${ratio}px` }} onClick={onLogin}>
                            SIGN IN
                    </Button>
                </Tab>

                <Tab className="loginbody" eventKey="SignUp" title="Sign Up">
                    <Form className="main_form">
                        <Form.Group className="mb-3" controlId="formBasicName" >
                                <Form.Control 
                                    className="text_box" 
                                    type="text" 
                                    placeholder="NAME" 
                                    style={{ minHeight:  `${height/20}px` }} 
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}  
                                    required  
                                />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Control 
                                className="text_box" 
                                type="email" 
                                placeholder="EMAIL" 
                                style={{ minHeight:  `${height/20}px` }} 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required  
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control 
                                className="text_box" 
                                type="password" 
                                placeholder="PASSWORD" 
                                style={{ minHeight:  `${height/20}px` }} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}  
                                required  
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCfmPassword">
                            <Form.Control 
                                className="text_box" 
                                type="password" 
                                placeholder="CONFIRM PASSWORD" 
                                style={{ minHeight:  `${height/20}px` }} 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}  
                                required  
                            />
                        </Form.Group>
                    </Form>    
                    <Button className="submit_btn" variant="primary" type="submit" style={{minWidth: `${width/1.5}px`, marginTop:`${ratio}px` }} onClick={onSubmit}>
                        BEGIN
                    </Button>
                </Tab>
            </Tabs>
        </div>
    </div>
};

export default Login;