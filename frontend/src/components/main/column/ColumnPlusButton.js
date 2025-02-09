import React from 'react';
import styled from 'styled-components';
import { TranslateBtn } from "../../common/CommonStyledComponent";

const StyledColumnPlusButton = styled(TranslateBtn)`
    svg {
        fill: #bdbdbd;
        &:hover {
            fill: #0075de;
        }
    }
`;

const ColumnPlusButton = ({onClick}) => {
    return (
        <StyledColumnPlusButton onClick={onClick && onClick}>
            <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M0.105709 7.53033L0.105709 6.46967H6.46967V0.105713H7.53033V6.46967H13.8943V7.53033H7.53033V13.8943H6.46967V7.53033H0.105709Z" />
            </svg>
        </StyledColumnPlusButton>
    );
};

export default ColumnPlusButton;