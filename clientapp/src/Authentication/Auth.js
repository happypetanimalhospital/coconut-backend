const getToken = () => { 
    return localStorage.getItem('token');
}

const getUserLevel = () => {
    if (isAuthenticated()) {
        const user = parseJwt(getToken());
        return user.type;
    }
}

const isAuthenticated = () => {
    if (getToken() == null) {
        return false;
    } else {
        return true;
    }
}

const getUserId = () => {
    let uId=null;
    const user = parseJwt(getToken());
   
    uId =user.id;
    
    return uId;
}

const getUserName = () => {
    let uId=null;
    const user = parseJwt(getToken());
   
    if(user)
    uId =user.name;
    
    return uId;
}

const parseJwt = (token)=> {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

const logout = (callback) => {
    if (isAuthenticated()) {
        localStorage.removeItem('token');
        console.log("User Logged Out")
        callback(true) ;
    }else {
        callback(false) ;}
}
module.exports = {
    getToken,
    getUserLevel,
    getUserName,
    isAuthenticated,
    getUserId,
    logout
}