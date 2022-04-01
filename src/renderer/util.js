export function formatDate(time) {
    let date = new Date(time);

    let YY = date.getFullYear();
    let MM = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    // 这里修改返回时间的格式
    return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
}
export function roundingData(data){
     if(data > 10000){
        return  parseInt(data / 10000) + '万'
    }else {
        return data
    }
}
export function formatTime(msTime) {
    let time = msTime / 1000;

    let minute = Math.floor(time / 60) % 60;

    minute = minute.toString().padStart(2, "0");

    let second = Math.floor(time) % 60;

    second = second.toString().padStart(2, "0");

    return `${minute}:${second}`;
}
