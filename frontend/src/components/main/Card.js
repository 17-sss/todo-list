import axios from 'axios';
import React from 'react';
import styled, { css } from 'styled-components';
import ColumnDeleteButton from './partial/ColumnDeleteButton'

const CardWrapper = styled.div`
    --background-color: #fff;
    --boxShadow-color: rgba(224, 224, 224, 0.3);

    width: 300px;
    padding: 16px;
    background-color: var(--background-color);
    border-radius: 8px;
    box-shadow: 0px 1px 30px var(--boxShadow-color);
    margin: 10px 0;
`;

// CardTitle, CardContent, CardAuthor --> p 태그
const CSSCardCommonStyle = css`
    font-family: Noto Sans KR;
    margin-bottom: 10px;
`;


const CardTitle = styled.p`
    display: flex;

    span.title {
        ${CSSCardCommonStyle}
        margin-right: auto;
        font-weight: 600;
        font-size: 16px;
    }
`;

const CardContent = styled.p`
    ${CSSCardCommonStyle}
    font-weight: normal;
    font-size: 14px;
`;

const CardAuthor = styled.p`
    ${CSSCardCommonStyle}
    --author-text-color: #bdbdbd;
    font-weight: normal;
    font-size: 12px;

    color: var(--author-text-color);
`;
//prettier-ignore
const Card = ({ title, body, index, setCardList, columnId, cardId, previousCardId }) => {
    const deleteCard = () => {
        setCardList((cardList) => cardList.filter((_, i) => i !== index))
        axios.delete(`api/columns/${columnId}/cards/${cardId}`)
    }

    const editCard = () => {
        setCardList((cardList) => {
            const left = cardList.slice(0, index);
            const right = cardList.slice(index + 1);
            return left.concat({ title, body, isInput: true, previousCardId, cardId, columnId }, right);
        });
    };

    return (
        <CardWrapper onDoubleClick={editCard}>
            <CardTitle>
                <span className="title">{title}</span>
                <ColumnDeleteButton onClick={deleteCard} />
            </CardTitle>
            <CardContent>{body}</CardContent>
            <CardAuthor>author by web</CardAuthor>
        </CardWrapper>
    );
};

export default Card;
