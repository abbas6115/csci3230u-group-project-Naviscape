import { useState } from 'react';
import { MOCK_USERS } from './mockUsers';
import '../../styles/LoginForm.css'

export function LoginForm({ onLoginSuccess, onCancel }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const matchedUser = MOCK_USERS.find(
            (user) =>
                user.username.toLowerCase() === username.trim().toLowerCase() &&
                user.password === password
        );

        if (matchedUser) {
            setErrorMessage('');
            onLoginSuccess(matchedUser);
        } else {
            setErrorMessage('Invalid username or password.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='auth-form'>
            <h2>Log In</h2>
            {errorMessage && <p classname='error-text'>{errorMessage}</p>}

            <label>
                Username
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required/>
            </label>

            <label>
                Password
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='' required/>
            </label>

            <div className='auth-actions'>
                <button type='submit'>Log In</button>
                {onCancel && (
                    <button type='button' onClick={onCancel} className='secondary'>Cancel</button>
                )}
            </div>
        </form>
    );
}