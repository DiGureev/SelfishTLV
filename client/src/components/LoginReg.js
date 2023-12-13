import Login from './Login.js';
import SignUp from './SignUp.js';

const LoginReg = (props) => {
    const title = props.title;

    if (title ==='Log In') {
        return (
        <div className='container'>
        <Login/>
        </div>
        )
    } else {
        return (
        <div className='container'>
        <SignUp/>
        </div>
        )
    };
};

export default LoginReg;
