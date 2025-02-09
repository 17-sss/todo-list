import axios from "axios";

const calcPastTime = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금 전';
    if (betweenTime < 60) {
        return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
};

const fetchData = async ({method, url, data = null, config = null }) => {
    const res =
        (method === 'get' || method === 'delete')
            ? await axios[method](url, config)
            : await axios[method](url, data, config);

    if (method === 'get')
        return await res.data;
};

export { calcPastTime, fetchData };