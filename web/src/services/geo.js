function ptInSect(x, a, b) {
    return (x - a) * (x - b) <= 0;
}

function ptInRect(pt, rect) {
    return ptInSect(pt.location.lat, rect[0], rect[2]) && ptInSect(pt.location.lng, rect[1], rect[3]);
}

// use rbush https://github.com/mourner/rbush if you have really big amount of points
export const calculateVisibleMarkers = function (data, marginBounds) {
    return data.filter(m => ptInRect(m, marginBounds));
}


