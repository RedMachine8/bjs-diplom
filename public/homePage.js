"use strict"

const logOut = new LogoutButton();
logOut.action = () => {
    ApiConnector.logout((response) => {
        if(response.success) {
            location.reload();
        } else {
            loginErrorMessageBox();
        }
    });
};

ApiConnector.current((response) => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();
let requestCourse = () => {
    ApiConnector.getStocks((response) => {
        if(response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
};

requestCourse();
setInterval(requestCourse, 6000);

const money = new MoneyManager();

function Message(response) {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
        money.setMessage(true, String("Операция выполнена успешно!"));
    } else {
        money.setMessage(false, String(response.error));
    }
}

money.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        Message(response);
    });
};

money.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        Message(response);
    });
};

money.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        Message(response);
    });
};

const favorites = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if(response.success) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        money.updateUsersList(response.data);
    }
});

favorites.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if(response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data);
            favorites.setMessage(true, String("Операция выполнена успешно!"));
        } else {
            favorites.setMessage(false, String(response.error));
        }
    });
};

favorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if(response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data);
            favorites.setMessage(true, String("Операция выполнена успешно!"));
        } else {
            favorites.setMessage(false, String(response.error));
        }
    });
};