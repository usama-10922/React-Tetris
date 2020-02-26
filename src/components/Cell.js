import React from "react";

import { StyledCell } from "./styles/StyledCell";
import { TETROMINOS } from "../tetrominos";

const Cell = ({ type }) => {
	console.log(`Type: ${type}`);
	return <StyledCell type={type} color={TETROMINOS[type].color} />;
};

export default Cell;
