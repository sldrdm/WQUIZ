// an object containing user information
const userInfo = {
    username: "admin",
    password: "1234",
};

localStorage.setItem('userInfo', JSON.stringify(userInfo));

// export user information
export default userInfo;