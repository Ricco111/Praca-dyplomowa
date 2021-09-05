import {API_BASE_URL, ACCESS_TOKEN} from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => {
                if (response.status === 401) {
                    if (window.location.href.indexOf('/login') < 0) {
                        window.location.href = "/login"
                    }
                }
                return response.json().then(json => {
                    if (!response.ok) {
                        return Promise.reject(json);
                    }
                    return json;
                }).catch(() => {
                })
            }
        );
};

export function updateyourdata(updateData) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const data = parseJwt(accessToken);
    return request({
        url: API_BASE_URL + `/user/${data.userId}`,
        method: 'PATCH',
        body: JSON.stringify(updateData)
    });
}

export function getAllUserReservations(userId = '') {
    // Jeżeli user id przekazywane do funkcji jest puste - userId pobierane jest z ACCESS_TOKEN
    if (!userId) {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const data = parseJwt(accessToken);
        return request({
            url: API_BASE_URL + `/user/${data.userId}/reservation`,
            method: 'GET'
        });
    } else {
        return request({
            url: API_BASE_URL + `/user/${userId}/reservation`,
            method: 'GET'
        });
    }
}

export function getAllRestaurantReservations(restaurantId = '') {
    // Jeżeli user id przekazywane do funkcji jest puste - userId pobierane jest z ACCESS_TOKEN
    if (!restaurantId) {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const data = parseJwt(accessToken);
        return request({
            url: API_BASE_URL + `/restaurant/${data.restaurantId}/reservation`,
            method: 'GET'
        });
    } else {
        return request({
            url: API_BASE_URL + `/restaurant/${restaurantId}/reservation`,
            method: 'GET'
        });
    }
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkLoginAvailability(login) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + login,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export function getCurrentUser(userId = '') {
    if (userId) {
        return request({
            url: API_BASE_URL + `/user/${userId}`,
            method: 'GET'
        });
    }
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken) {
        return Promise.reject("Brak dostępu.");
    }
    const data = parseJwt(accessToken);
    return request({
        url: API_BASE_URL + `/user/${data.userId}`,
        method: 'GET'
    });
}

export function getCurrentRestaurant(restaurantId = '') {
    if (restaurantId) {
        return request({
            url: API_BASE_URL + `/restaurant/${restaurantId}`,
            method: 'GET'
        });
    }
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken) {
        return Promise.reject("Brak dostępu.");
    }
    const data = parseJwt(accessToken);
    return request({
        url: API_BASE_URL + `/restaurant/${data.restaurantId}`,
        method: 'GET'
    });
}

export function GetUserFromToken() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
        return parseJwt(accessToken)
    } else {
        return {
            userId: -1,
        }
    }
}

export function GetRestaurantFromToken() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
        return parseJwt(accessToken)
    } else {
        return {
            restaurantId: -1,
        }
    }
}

export function RequestApi(url, method, body = null) {
    const params = {
        url: API_BASE_URL + url,
        method: method
    }
    if (body) {
        params.body = JSON.stringify(body);
    }
    return request(params);
}