import {request} from "@/network/axios";

//获取搜索歌曲
export function getSearch(keywords, limit, type){
    return request({
        url: '/search',
        params: {
            keywords, limit, type
        }
    })
}

//获取搜索歌曲的url
export function getSearchUrl(id, br){
    return request({
        url: '/song/url',
        params: {
            id, br
        }
    })
}
