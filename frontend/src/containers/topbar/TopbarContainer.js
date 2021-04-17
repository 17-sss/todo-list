import React, { useEffect, useState, useContext } from 'react';
import { TodoContext } from '../../lib/utility/TodoStore';
import { calcPastTime, fetchData } from '../../lib/utility/util';
import TopbarTemplate from '../../components/topbar/TopbarTemplate';

const TopbarContainer = () => {
    const { isDataUpdate, setIsDataUpdate } = useContext(TodoContext);

    const [activityHide, setActivityHide] = useState(true);
    const [activityDatas, setActivityDatas] = useState(null);
    // const [activityDatasTemp, setActivityDatasTemp] = useState(null);
    // const [runningTime, setRunningTime] = useState(0);

    const getActivityData = () =>
        fetchData({
            url: '/api/activities',
            method: 'get'
        }).then((data) => {
            if (!data || !data.activities) return;
            setActivityDatas(
                data.activities.map((activitieData) => {
                    const convertTime = new Date(activitieData.actionTime);
                    convertTime.setHours(convertTime.getHours() + 9);

                    return {
                        ...activitieData,
                        convertTime: calcPastTime(convertTime),
                    }
                }),
            );
            // return data.activities;
        })
        // .then((arrActivities) => setActivityDatasTemp(arrActivities));

    // 1) 초기 렌더링 시
    useEffect(() => getActivityData(), []);
    // 2) TodoStore(context)에 있는 isDataUpdate가 변경될 시 다시 데이터 가져옴
    useEffect(() => {
        if (isDataUpdate) {
            getActivityData();
            setIsDataUpdate(false);
        }
    }, [isDataUpdate, setIsDataUpdate]);
    /*
    // 3) 1초마다 재업뎃(render only, no getData) (~분 전, ~ 시간 전)
    useEffect(() => {
        const timer = () => setTimeout(() => {
            setRunningTime(runningTime + 1);
            if (activityDatas !== activityDatasTemp) return;
            if (!activityDatasTemp || (activityDatasTemp.length <= 0) ) return;
            setActivityDatas(
                activityDatasTemp.map((activitieData) => {
                    const convertTime = new Date(activitieData.actionTime);
                    convertTime.setHours(convertTime.getHours() + 9);

                    return {
                        ...activitieData,
                        convertTime: calcPastTime(convertTime),
                    }
                }),
            );
        }, 1000);
        timer();
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [runningTime]);
    */


    const onClickForLogVisible = ({ target }) => {
        const closestMenuBtn = target.closest('button');
        if (!closestMenuBtn) return;
        setActivityHide(!activityHide);
    };

    return (
        <TopbarTemplate
            title={'TO-DO LIST'}
            onClickForLogVisible={onClickForLogVisible}
            activityHide={activityHide}
            activityDatas={activityDatas && activityDatas}
        />
    );
};

export default TopbarContainer;
