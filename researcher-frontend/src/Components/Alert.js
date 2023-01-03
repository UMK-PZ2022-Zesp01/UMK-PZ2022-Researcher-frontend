import "./Alert.css"

function Alert(props){
    const alertType=props;
    const text=props;

    return(
        <div className={alertType}>
            <div className="sign"></div>
            <div>{text}</div>
        </div>
    )
}

export default Alert
