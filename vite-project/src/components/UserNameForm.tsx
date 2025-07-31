import React, {useState} from 'react';

type Props = {
    onSubmit: (username: string) => void
}

function UserNameForm({onSubmit}: Props){
    const [userName, setUserName] = useState('');
    
    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        alert(`Hello ${userName}`);
        setUserName('');

        if(userName.trim()){
            onSubmit(userName.trim());
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit} className='userNameForm'>
                <h2>Create a Username</h2>
                <input type="text" placeholder='Enter your Username' className='userText'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                />
                <button type='submit' >Submit</button>
            </form>
        </>
    )
}
export default UserNameForm