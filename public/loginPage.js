
const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        console.log(response);
        if(response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(String(response.error));
        }
    });
};

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        console.log(response);
        if(response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(String(response.error));
        }
    });
};