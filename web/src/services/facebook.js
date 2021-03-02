FB.init({
    appId: '1826937380879748',
    cookie: true,
});

function callApi(endpoint, method, params) {
    return new Promise((resolve, reject) => {
        window.FB.api(endpoint, method, params, response => {
            response.error ?
                reject(response.error) :
                resolve(response)
        })
    }).then(response => response, error => error);
}

export const getUserData = (accessToken) => callApi(`/me?access_token=${accessToken}`, 'GET', {"fields": "id,name,email"});


