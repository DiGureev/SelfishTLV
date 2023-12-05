import Login from './Login.js'
import SignUp from './SignUp.js'

const LoginReg = (props) => {
    const title = props.title;

    if (title ==='Log In'){
        return <Login/>
    } else {
        return <SignUp/>
    }
}

export default LoginReg
