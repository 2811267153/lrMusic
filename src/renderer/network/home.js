import {request} from "@/network/axios";

export function getBanner(type) {
    return request({
        url: 'banner',
        params: {
            type
        }
    })
}
//加载推荐歌单
export function getResource(type) {
    return request({
        url: 'recommend/resource',
        params: {
            type
        }
    })
}
//加载 推荐歌单的详细数据
export function getResourceInfo(id) {
    return request({
        url: 'playlist/detail',
        params: {
            id
        }
    })
}
//获取歌单的所有歌曲
export function getResourceAll(id, limit , offset) {
    return request({
        url: '/playlist/track/all',
        params: {
            id, limit , offset
        }
    });
}
//获取精品歌单
export function getBoutique( limit) {
    return request({
        url: '/top/playlist/highquality',
        params: {
            limit
        }
    });
}

//获取推荐新音乐
export function getRecommendSong( limit) {
    return request({
        url: '/personalized/newsong',
        params: {
            limit
        }
    });
}
//获取推荐音乐人
export function getRecommendArtist( limit ) {
    return request({
        url: '/top/artists',
        params: {
            limit
        }
    });
}
//获取歌手部分信息和热门单曲
export function getRecommendArtistSong( id ) {
    return request({
        url: '/artists',
        params: {
            id
        }
    });
}
//获取歌手mv
export function getRecommendArtistMv( id ) {
    return request({
        url: '/artist/mv',
        params: {
            id
        }
    });
}

//获取歌手专辑
export function getRecommendArtistAlbum( id, limit, offset ) {
    return request({
        url: '/artist/album',
        params: {
            id, limit, offset
        }
    });
}
//获取歌单
export function getRecommendAlbum( id, limit, offset ) {
    return request({
        url: '/playlist/catlist',
        params: {
            id, limit, offset
        }
    });
}
//获取精品歌单分类
export function getRecommendAlbumSort() {
    return request({
        url: '/playlist/catlist',
    });
}
//获取歌单分类(常规)
export function getRecommendAlbums() {
    return request({
        url: '/playlist/hot',
    });
}
//获取歌单分类内容
export function getRecommendAlbumsContent(cat,limit, before) {
    console.log(cat, limit, before)
    return request({
        url: '/top/playlist/highquality',
        params: {
            cat, limit, before
        }
    });
}
//获取每日榜单
export function getDailyList() {
    return request({
        url: '/toplist/detail',
    });
}

//获取歌手分类
export function getSingerCategory(limit, offset, type, area, initial) {
    return request({
        url: '/artist/list',
        params: {
            limit, offset, type, area, initial
        }
    });
}
//新歌速递
export function getNewSong(type) {
    return request({
        url: '/top/song',
        params: {
            type
        }
    });
}

//获取歌词
export function getSongLyric(id) {
    return request({
        url: '/lyric',
        params: {
           id
        }
    });
}



export function getLogin(phone, password) {
    return request({
        url: 'login/cellphone',
        method: 'post',
        data: {
            phone, password
        }
    })
}
