
/**
用于Javascript Date类型的扩展
@author Elvis
@exports oc.date

* @example
* // returns 2015年01月01日
* oc.date.format('2015-01-01', 'yyyy年mm月dd日')
* @example
* // returns 一天的毫秒数（24 * 60 * 60000）
* oc.date.compare('2015-01-02', '2015-01-01')
*/
var ZDate = {};

/**
* 根据传入格式，格式化输出时间字符串
* @param {date} date 时间值 - 可以为Timespane，或者'2015/01/01'、'2015-01-01'或其他可new Date()的时间字符串
* @param {string} format 格式化输出方式 - yyyy年，mm月，dd天，hh小时，MM分钟，ss秒，ms，分秒
* @returns {string} 格式化后的字符串
*/
ZDate.format = function(date, format){
	if(date.toString().indexOf('-') > 0){
        date = date.toString().replace(/-/g, '/');
    }

    var reg = {
        yyyy: 'year',
        hh: 'hours',
        mm: 'month',
        dd: 'date',
        hh: 'hours',
        MM: 'minites',
        ss: 'seconds',
        ms: 'millSeconds'
    }
    
    var date = new Date(date);
    var model = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        hours: date.getHours(),
        minites: date.getMinutes(),
        seconds: date.getSeconds(),
        millSeconds: date.getMilliseconds()
    }

    if(!format){
        return model.year + '-' + model.month + '-' + model.date;
    }

    for(var key in reg){
        var param = reg[key];
        var val = model[param];
        if(val.toString().length < 2){
        	val = '0' + val.toString();
        }
        format = format.replace(key, val);
    }

    return format;
}

/**
* 比较时间大小，返回date1 - date2得到的timespane
* @param {date} date1 - 时间被减数: 可以为Timespane，或者'2015/01/01'、'2015-01-01'或其他可new Date()的时间字符串
* @param {date}  date2 - 时间减数: 可以为Timespane，或者'2015/01/01'、'2015-01-01'或其他可new Date()的时间字符串
* @returns {number} date1 - date2得到的timespane
*/
ZDate.compare = function(date1, date2){
    if(typeof date1 == "string"){
        date1 = date1.replace(/-/g, '/');
    }
    if(typeof date2 == "string"){
        date2 = date2.replace(/-/g, '/');
    }

    var date1 = new Date(date1).getTime();
    var date2 = new Date(date2).getTime();

    return date1 - date2;
}   


module.exports = ZDate;