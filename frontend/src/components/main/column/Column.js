import React from 'react';
import styled from 'styled-components';
import ColumnDeleteButton from './ColumnDeleteButton';
import ColumnPlusButton from './ColumnPlusButton';

const ColumnWrapper = styled.div`
    margin: 0 15px;
    padding: 0px 8px;
`;

const ColumnHeader = styled.div`
    width: 334px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .column--title,
    .column--count {
        display: inline-block;
    }
`;

const ColumnHeaderCount = styled.div`
    margin-left: 10px;

    background-color: #bdbdbd;
    color: #010101;
    font-size: 16px;

    border-radius: 20px;
    width: 26px;
    height: 26px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ColumnHeaderTitle = styled.div`
    font-family: Noto Sans KR;
    font-weight: 600;
    font-size: 16px;
    padding: 4px;
`;

const ColumnHeaderButtons = styled.div`
    margin-left: auto;
`;

const ColumnEditInput = styled.input`
    background: transparent;
    border: none;
    border-bottom: 1px solid #86c6ff;
    color: #888;
    padding: 6px 0;
`;

const Column = ({ title, cardList, isEditNow, onEvents }) => {
    const { plusEvent, deleteEvent, dbEvent, editInputEnterEvent, changeTitle } = onEvents;

    return (
        <ColumnWrapper>
            <ColumnHeader>
            {isEditNow
                ? (<ColumnEditInput type="text" onKeyDown={editInputEnterEvent} value={title} onChange={changeTitle} />) 
                : (
                    <ColumnHeaderTitle onDoubleClick={dbEvent}>
                        {title}
                    </ColumnHeaderTitle>
                )}
                <ColumnHeaderCount>{cardList?.length}</ColumnHeaderCount>
                <ColumnHeaderButtons>
                    <ColumnPlusButton onClick={plusEvent} />
                    <ColumnDeleteButton onClick={deleteEvent} />
                </ColumnHeaderButtons>
            </ColumnHeader>
            <ul>{cardList}</ul>
        </ColumnWrapper>
    );
};

export default Column;
