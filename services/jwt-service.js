global.atob = require("atob");

const jwtDecode = (jwt) => {
    return parseJwt(jwt)
}

function parseJwt (token) {
    var payload = token.split('.')[1];
    var payloadReplaced = payload.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(payloadReplaced).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

module.exports = {
    jwtDecode
}
