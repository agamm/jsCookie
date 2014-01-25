/*
 * jsCookie
 * Version : 1.4
 * Author  : Agam More(Agam360)
 * http://codecanyon.net/item/jscookie-easy-to-use-javascript-cookie-library/308627
 */
function jsCookie() {}

/*
 *Get the value of cookie by name, and checks if exists.
 * @param {string} name - name of cookie to read, ***Required***
 * OnSuccess: {string}value of cookie, OnFailure: false
 */
jsCookie.prototype.read = function (name) {
    if (name) {
        var arr = document.cookie.split(";"),
            nameStr;
        nameStr = name + "=";
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].indexOf(nameStr) > -1) {
                return (arr[i].substring(arr[i].indexOf("=") + 1, arr[i].length));
            } else if (i === arr.length - 1) {
                return false;
            }
        }
    } else {
        return false;
    }
};

/*
 *Returns the cookie name by value
 * @param {string} value - value of cookie to read, ***Required***
 * OnSuccess: returns string, OnFailure: false
 */
jsCookie.prototype.readByValue = function (value) {
    if (value) {
        var arr = document.cookie.split(";"),
            valueStr;
        valueStr = "=" + value;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].indexOf(valueStr) > -1) {
                return (arr[i].substring(0, arr[i].lastIndexOf(valueStr)));
            } else if (i === arr.length - 1) {
                return false;
            }
        }
    } else {
        return false;
    }
};

/*
 *Create a new cookie
 * @param {string} name - name of cookie to create, ***Required***
 * @param {string/int} value - vame of cookie,[CAN NOT CONTAIN: ";"], ***Required***
 * @param {array/int} expire - expire times [days, hours, minutes, seconds]
 * @param {string} path - location of cookie on the server were the cookie is activated
 * @param {string} domain - domain connected to cookie
 * @param {string/bool} secure - the cookie will run only on SSL connections
 * @param {string/bool} updatable - makes the cookie updatable in runtime(keeping expire date)
 * OnSuccess: none, OnFailure: false
 */
jsCookie.prototype.create = function (name, value, expire, path, domain, secure, updatable) {
    if (name && value && value.indexOf(";") === -1) {
        var updateableVal = null;
        if (expire) {
            var ep, d;
            updateableVal = [];
            ep = (expire[0] * 86400000) + (expire[1] * 3600000) + (expire[2] * 60000) + (expire[3] * 1000);
            d = new Date();
            d.setTime(d.getTime() + (ep));
            updateableVal[0] = expire;
            expire = ";expires=" + d.toGMTString();
        } else {
            expire = "";
        }
        if (path) {
            updateableVal[1] = (updateableVal !== null) ? path : "";
            path = ";path=" + path;
        } else {
            path = "";
            updateableVal[1] = "";
        }
        if (domain) {
            updateableVal[2] = (updateableVal !== null) ? domain : "";
            domain = ";domain=" + domain;
        } else {
            domain = "";
            updateableVal[2] = "";
        }
        if (secure) {
            updateableVal[3] = (updateableVal !== null) ? "secure" : "";
            secure = ";secure;";
        } else {
            secure = ";";
            updateableVal[3] = "";
        }
        document.cookie = name + "=" + value + expire + path + domain + secure;
        if (updatable && updateableVal !== null) {
            document.cookie = name + "_jscUpt_" + "=" + updateableVal[0] + "*&*" + updateableVal[1] + "*&*" + updateableVal[2] + "*&*" + updateableVal[3] + expire + path + domain + secure;
        }
    } else {
        return false;
    }
};

/*
 *Delete a cookie by name, path and(or) domain.
 * @param {string} name - name of cookie to read, ***Required***
 * @param {string} path - location of cookie on the server were the cookie is activated
 * @param {string} domain - location of cookie on the server
 * OnSuccess: none, OnFailure: false
 */
jsCookie.prototype.remove = function (name, path, domain) {
    if (name) {
        this.create(name, "del", [0, -1, 0, 0], path, domain);
    }
};

/*
 *Delete a cookie by value, path and(or) domain.
 * @param {string} name - name of cookie to read, ***Required***
 * @param {string} path - location of cookie on the server
 * @param {string} domain - location of cookie on the server
 * OnSuccess: none, OnFailure: false
 */
jsCookie.prototype.removeByValue = function (name, path, domain) {
    if (name) {
        this.create(this.readByValue(name), "del", [0, -1, 0, 0], path, domain);
    }
};

/*
 *Get all cookies values's by name
 * (As requested by fdable)
 * @param {string} name - name of cookies, ***Required***
 * OnSuccess: array, OnFailure: false
 */
jsCookie.prototype.getValuesByName = function (name) {
    if (value) {
        var arr = this.getAsArray(true);
        var matchArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name === name) {
                matchArr.push(arr[i].value);
            }
        }
        return matchArr;
    } else {
        return false;
    }
};

/*
 *Grabs all document.cookie items and returnes as array splited.
 * @param {bool} returnObject - will return the new object literal array instead of splitted array
 * OnSuccess: returns array, OnFailure: false
 */
jsCookie.prototype.getAsArray = function (returnObject) {
    if (document.cookie.length > 0) {
        var arr = document.cookie.split(";");
        //Keep old version working
        if (typeof returnObject == "undefined") {
            return (arr.length == 0) ? false : arr;
        }
        var nArr = [];
        for (var i = arr.length - 1; i >= 0; i--) {
            var cname = arr[i].split("=")[0];
            var cvalue = arr[i].split("=")[1];
            nArr.push({
                name: cname,
                value: cvalue
            });
        }
        return (nArr.length === 0) ? false : nArr;
    } else {
        return false;
    }
};

/*
 *Outputs the names of cookies from the getAsArray funtion.
 * No @param
 * OnSuccess: returns array, OnFailure/No records: false
 */
jsCookie.prototype.getNames = function () {
    if (document.cookie.length > 0) {
        var arr = document.cookie.split(";");
        var arrNames = this.getAsArray();
        for (var i in arr) {
            if (arr.hasOwnProperty(i)) {
                arrNames[i] = arr[i].substring(0, arr[i].indexOf("="));
            }
        }
        return (arrNames.length > 0) ? arrNames : false;
    } else {
        return false;
    }
};

/*
 *Outputs the values of cookies from the read funtion.
 * No @param
 * OnSuccess: returns array, OnFailure/No records: false
 */
jsCookie.prototype.getValues = function () {
    if (document.cookie.length > 0) {
        var arr = document.cookie.split(";");
        var arrValues = this.getNames();
        for (var i in arr) {
            if (arr.hasOwnProperty(i)) {
                arrValues[i] = this.read(arr[i]);
            }
        }
        return (arrValues.length > 0) ? arrValues : false;
    }
};

/*
 *Removes all cookies on cuurent page.(No path/domain)
 * No @param
 * OnSuccess: returns array, OnFailure/No records: false
 */
jsCookie.prototype.removeAll = function () {
    if (document.cookie.length > 0) {
        var names = this.getNames();
        if (names.length > 0) {
            for (var i in names) {
                if (names.hasOwnProperty(i)) {
                    this.remove(names[i]);
                }
            }
            return (document.cookie.length === 0) ? true : false;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

/*
 *Checks if cookies are enabled.
 * No @param
 * OnSuccess: true, OnFailure: false
 */
jsCookie.prototype.enabled = function () {
    if (navigator.cookieEnabled) {
        this.create("test", "0ba4439ee9a46d9d9f14c60f88f45f87", [0, 0, 1, 0]);
        var found = this.read("test") === "0ba4439ee9a46d9d9f14c60f88f45f87";
        this.remove("test");
        return (found) ? true : false;
    } else {
        return false;
    }
};

/*
 *Creates a cookie with only value and name.
 * @param {string} name - name of cookie to read, ***Required***
 * @param {string} value - value of cookie on the server, ***Required***
 ** OnSuccess: none, OnFailure: none
 */
jsCookie.prototype.set = function (name, value) {
    if (name && value) {
        document.cookie = name + "=" + value;
    }
};

/*
 *Returns the number of cookies on the page
 * No @param
 * OnSuccess: int, OnFailure: none
 */
jsCookie.prototype.count = function () {
    if (document.cookie !== "") {
        var arr = document.cookie.split(";");
        return arr.length;
    } else {
        return 0;
    }
};

/*
 *Updates an already created cookie
 * Cookie name is presistant
 * @param {string} name - name of cookie to read, ***Required***
 * @param {string} newValue - value of cookie on the server, ***Required***
 * @param {string} newDate - update cookie with a new date of expiration, ***Required***
 * OR:
 * @param {string} keepDate - should we keep the current expiration date, ***Required***
 * OnSuccess: none, OnFailure: false
 */
jsCookie.prototype.update = function (name, newValue, newDate, keepDate) {
    var upt = this.getSettings(name);
    if (name && newValue && upt !== false) {
        if (upt[1] && upt[2]) {
            this.remove(name, upt[1], upt[2]);
        } else if (upt[1]) {
            this.remove(name, upt[1]);
        } else if (upt[2]) {
            this.remove(name, upt[2]);
        } else {
            this.remove(name);
        }
        if (newDate) {
            this.create(name, newValue, newDate, (upt[1] !== "") ? upt[1] : false, (upt[2] !== "") ? upt[2] : false, (upt[3] !== "") ? upt[3] : false, true);
        } else if (keepDate) {
            this.create(name, newValue, (upt[0] !== "") ? upt[0].split(",") : [0, 1, 0, 0], (upt[1] !== "") ? upt[1] : false, (upt[2] !== "") ? upt[2] : false, (upt[3] !== "") ? upt[3] : false, true);
        } else {
            return false;
        }
    } else {
        return false;
    }
};

/*
 *Appends a value to already existing cookie
 * @param {string} name - name of cookie to read, ***Required***
 * @param {string} addValue - appended value, ***Required***
 * @param {string} updatable - keep cookie settings (updatable cookie) ***Required***
 * Or:
 * @param {array/int} expire - optional - set expire date, if the cookie isn't updatable ***Required***
 * OnSuccess: none, OnFailure: false
 */
jsCookie.prototype.appendValue = function (name, addValue, updatable, expire) {
    if (name && addValue) {
        if (updatable) {
            var upt = this.getSettings(name);
            if (upt) {
                this.update(name, this.read(name) + addValue, upt[0], upt[1], upt[2], true);
            }
        } else {
            this.update(name, this.read(name) + addValue, expire);
        }
    } else {
        return false;
    }
};

/*
 *Get an updatable cookie parameters.
 * @param {string} name - name of cookie to read, ***Required***
 * Return values: array of strings - [0 = expire, 1 = path, 2 = domain, 3 = secure]
 * OnSuccess: {string/arr}, OnFailure: false
 */
jsCookie.prototype.getSettings = function (name) {
    if (name) {
        var upt = this.read(name + "_jscUpt_");
        if (upt !== false) {
            upt = upt.split('*&*');
            return upt;
        } else {
            return false;
        }
    } else {
        return false;
    }
};