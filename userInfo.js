// an object containing user information
window.userInfo = {
    username: "admin",
    password: "1234",
};
localStorage.setItem('userInfo', JSON.stringify(window.userInfo));