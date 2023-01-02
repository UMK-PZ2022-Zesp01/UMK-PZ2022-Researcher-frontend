import "./LoginRegisterPage.css"
import BannerWhite from "./BannerWhite";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function LoginRegisterPage(){
    return(
        <div className="loginRegisterPage">
            <div className="loginRegisterPanel">
                <div className="header">
                    <BannerWhite/>
                </div>
                <div className="main">
                    <LoginForm/>
                    <div className="separator"/>
                    <RegisterForm/>
                </div>
            </div>
        </div>
    );
}

export default LoginRegisterPage;