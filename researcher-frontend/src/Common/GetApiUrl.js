function getApiUrl() {
    const host = window.location.hostname;
    return "http://" + host + ":8080/"
}

export default getApiUrl()