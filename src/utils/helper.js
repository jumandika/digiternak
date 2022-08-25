import { PixelRatio, Dimensions, Platform, NativeModules } from 'react-native';
import moment from "moment";
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const { width, height } = Dimensions.get('window');

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const scale = screenWidth / 320;
// const scale = screenWidth / 640;

const helpers = {
    normalize: function (size) {

        // const newSize = size * PixelRatio.get();
        const newSize = size * scale;
        // if (Platform.OS == 'ios') {
        //     return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4;
        // } else {
        // }
        return Math.round(PixelRatio.roundToNearestPixel(newSize) - 4);

        // const guidelineBaseWidth = 350;
        // const guidelineBaseHeight = 680;

        // const scale =  width / guidelineBaseWidth * size;
        // const verticalScale =  height / guidelineBaseHeight * size;
        // const moderateScale =  size + (scale - size) * 0.5;
        // return moderateScale;

        // if (PixelRatio.get() >= 2 && PixelRatio < 3) {
        //     // iphone 5s and older Androids
        //     if (screenWidth < 360) {
        //         return size * 0.95;
        //     }

        //     // iphone 5
        //     if (screenHeight < 667) {
        //         return size;
        //         // iphone 6-6s
        //     }

        //     if (screenHeight >= 667 && deviceHeight <= 735) {
        //         return size * 1.15;
        //     }
        //     // older phablets
        //     return size * 1.25;
        // }

        // if (PixelRatio.get() >= 3 && PixelRatio.get() < 3.5) {
        //     // catch Android font scaling on small machines
        //     // where pixel ratio / font scale ratio => 3:3
        //     if (screenWidth <= 360) {
        //         return size;
        //     }

        //     // Catch other weird android width sizings
        //     if (screenHeight < 667) {
        //         return size * 1.15;
        //         // catch in-between size Androids and scale font up
        //         // a tad but not too much
        //     }

        //     if (screenHeight >= 667 && deviceHeight <= 735) {
        //         return size * 1.2;
        //     }

        //     // catch larger devices
        //     // ie iphone 6s plus / 7 plus / mi note 等等
        //     return size * 1.27;
        // }

        // if (PixelRatio.get() >= 3.5) {
        //     // catch Android font scaling on small machines
        //     // where pixel ratio / font scale ratio => 3:3
        //     if (screenWidth <= 360) {
        //         return size;
        //         // Catch other smaller android height sizings
        //     }

        //     if (screenHeight < 667) {
        //         return size * 1.2;
        //         // catch in-between size Androids and scale font up
        //         // a tad but not too much
        //     }

        //     if (screenHeight >= 667 && screenHeight <= 735) {
        //         return size * 1.25;
        //     }

        //     // catch larger phablet devices
        //     return size * 1.4;
        // }

        // return size;
    },
    capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    capitalizeAll: function (str) {
        return str.toUpperCase();
    },
    replaceStripToSlash: function (str) {
        return str.replace(/-/g, "/");
    },
    handleBR: function (str) {
        const regex = /(<([^>]+)>)/ig;
        return str.replace(regex, '\n')
    },
    formatMoney: function (number, prefix) {
        let number_string = number.toString().replace(/[^,\d]/g, '').toString(),
            split = number_string.split(','),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
    },
    validURL: function (str) {
        let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    },
    dateCoversion: function (date, withClock) {
        let day = moment(date).format("dddd");
        let month = moment(date).format("MMMM");
        if (day == "Monday") {
            day = "Senin"
        }
        if (day == "Tuesday") {
            day = "Selasa"
        }
        if (day == "Wednesday") {
            day = "Rabu"
        }
        if (day == "Thursday") {
            day = "Kamis"
        }
        if (day == "Friday") {
            day = "Jum'at"
        }
        if (day == "Saturday") {
            day = "Sabtu"
        }
        if (day == "Sunday") {
            day = "Minggu"
        }
        if (month == "January") {
            month = "Januari"
        }
        if (month == "February") {
            month = "Februari"
        }
        if (month == "March") {
            month = "Maret"
        }
        if (month == "April") {
            month = "April"
        }
        if (month == "May") {
            month = "Mei"
        }
        if (month == "June") {
            month = "Juni"
        }
        if (month == "July") {
            month = "Juli"
        }
        if (month == "August") {
            month = "Agustus"
        }
        if (month == "September") {
            month = "September"
        }
        if (month == "October") {
            month = "Oktober"
        }
        if (month == "November") {
            month = "November"
        }
        if (month == "December") {
            month = "Desember"
        }
        let clock = moment(date).format("HH:mm") == '00:00' ? '' : " - " + moment(date).format("HH:mm");
        let finalDate = null;
        if (withClock == true) {
            finalDate = day + ", " + moment(date).format("DD") + " " + month + " " + moment(date).format("yyyy") + clock;
        } else {
            finalDate = day + ", " + moment(date).format("DD") + " " + month + " " + moment(date).format("yyyy");

        }
        return finalDate;
    },
    checkVersion: function (a, b) {
        let x = a.split('.').map(e => parseInt(e));
        let y = b.split('.').map(e => parseInt(e));
        let z = "";

        for (let i = 0; i < x.length; i++) {
            if (x[i] === y[i]) {
                z += "e";
            } else
                if (x[i] > y[i]) {
                    z += "m";
                } else {
                    z += "l";
                }
        }
        if (!z.match(/[l|m]/g)) {
            return 0;
        } else if (z.split('e').join('')[0] == "m") {
            return 1;
        } else {
            return -1;
        }
    },
    validatePhoneNumber: function (input_str) {
        let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        return re.test(input_str);
    },
    validateEmail: function (email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    kFormatter: function (num) {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
    },
    rotate_left: function (n, s) {
        var t4 = (n << s) | (n >>> (32 - s));
        return t4;
    },
    lsb_hex: function (val) {
        var str = "";
        var i;
        var vh;
        var vl;

        for (i = 0; i <= 6; i += 2) {
            vh = (val >>> (i * 4 + 4)) & 0x0f;
            vl = (val >>> (i * 4)) & 0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    },
    cvt_hex: function (val) {
        var str = "";
        var i;
        var v;

        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    },
    Utf8Encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },
    sha1Generator: function (msg) {


        var blockstart;
        var i, j;
        var W = new Array(80);
        var H0 = 0x67452301;
        var H1 = 0xEFCDAB89;
        var H2 = 0x98BADCFE;
        var H3 = 0x10325476;
        var H4 = 0xC3D2E1F0;
        var A, B, C, D, E;
        var temp;

        msg = this.Utf8Encode(msg);

        var msg_len = msg.length;

        var word_array = new Array();
        for (i = 0; i < msg_len - 3; i += 4) {
            j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
                msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
            word_array.push(j);
        }

        switch (msg_len % 4) {
            case 0:
                i = 0x080000000;
                break;
            case 1:
                i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
                break;

            case 2:
                i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
                break;

            case 3:
                i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
                break;
        }

        word_array.push(i);

        while ((word_array.length % 16) != 14) word_array.push(0);

        word_array.push(msg_len >>> 29);
        word_array.push((msg_len << 3) & 0x0ffffffff);


        for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {

            for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
            for (i = 16; i <= 79; i++) W[i] = this.rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

            A = H0;
            B = H1;
            C = H2;
            D = H3;
            E = H4;

            for (i = 0; i <= 19; i++) {
                temp = (this.rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                E = D;
                D = C;
                C = this.rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 20; i <= 39; i++) {
                temp = (this.rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                E = D;
                D = C;
                C = this.rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 40; i <= 59; i++) {
                temp = (this.rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                E = D;
                D = C;
                C = this.rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 60; i <= 79; i++) {
                temp = (this.rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                E = D;
                D = C;
                C = this.rotate_left(B, 30);
                B = A;
                A = temp;
            }

            H0 = (H0 + A) & 0x0ffffffff;
            H1 = (H1 + B) & 0x0ffffffff;
            H2 = (H2 + C) & 0x0ffffffff;
            H3 = (H3 + D) & 0x0ffffffff;
            H4 = (H4 + E) & 0x0ffffffff;

        }

        var temp = this.cvt_hex(H0) + this.cvt_hex(H1) + this.cvt_hex(H2) + this.cvt_hex(H3) + this.cvt_hex(H4);

        return temp.toLowerCase();

    },
    logSha1: async function (str) {
        const buffer = new TextEncoder('utf-8').encode(str);
        const digest = await crypto.subtle.digest('SHA-1', buffer);

        // Convert digest to hex string
        const result = Array.from(new Uint8Array(digest)).map(x => x.toString(16).padStart(2, '0')).join('');

        // console.log(result);
        return result;
    },
    objectToString: function (o) {
        Object.keys(o).forEach(k => {
            if (typeof o[k] === 'object') {
                return toString(o[k]);
            }

            o[k] = '' + o[k];
        });

        return o;
    },
    statusBarHeight: function () {
        return STATUSBAR_HEIGHT
    },
    dateToYYYYMMdd: function (date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    },



}

export default helpers;