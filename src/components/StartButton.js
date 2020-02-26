import React from "react";

import { StyledStartButton } from "./styles/StyledStartButton";

const StartButton = ({ handlerClick }) => {
	return (
		<StyledStartButton onClick={() => handlerClick()}>
			Start Game
		</StyledStartButton>
	);
};

export default StartButton;
