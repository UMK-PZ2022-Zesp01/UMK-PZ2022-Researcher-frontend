export default function getHeader(){
    const host = window.location.hostname;

    return "Access-Control-Allow-Origin: http://" + host + ":8080/"
}