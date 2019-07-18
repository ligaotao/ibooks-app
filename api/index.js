import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://ibooks.ligaotao.cn/'
})

export const getClassify = function () {
    return instance.get('/cats/lv2/statistics')
}

export const getLevel2Classify = function () {
    return instance.get('/cats/lv2')
}

export const getBooks = function (params) {
    return instance.get('/book/by-categories', {
        params
    })
}

export const getBookText = function (params) {
    var url = '/atoc'
    if ('bookId' in params) {
        url += '/' + params.bookId
        delete params.bookId
    }
    return instance.get(url, {params})
}

export const getChapterText = function (url) {
    return instance.get(`/chapter/${url}`)
}

// 获取盗版源
export const getAtoc = function (params) {
    return instance.get('/atoc', {params})
}

// 获取排行榜分类

export const getRanking = function () {
    return instance.get('/ranking/gender')
}

// 获取排行Top
export const getRankingList= function (id) {
    return instance.get(`/ranking/${id}`)
}

// 匹配输入关键字
export const getKeyWords = function (params) {
    return instance.get('/book/auto-complete', {params})
}

// 搜素关键字

export const getSearchBooks = function (params) {
    return instance.get('/book/fuzzy-search', {params})
}