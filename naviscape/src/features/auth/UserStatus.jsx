export function UserStatus({ currentUser, onLogout, onRequestLogin }) {
    if (!currentUser) { // if no user has logged in, return a log in prompt
        return (
            <div className='user-status'>
                <button onClick={onRequestLogin} className='button-login'>Log In</button>
            </div>
        );
    }

    return ( // if a user is logged in, return user account info and log out prompt
        <div className='user-status'>
            <img src={currentUser.avatar} alt={currentUser.username} className='avatar'/>
            <span>Hi, {currentUser.username}</span>
            <button onClick={onLogout} className='button-login'>Log Out</button>
        </div>
    );
}