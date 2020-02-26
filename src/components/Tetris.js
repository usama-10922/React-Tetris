import React, { useState } from "react";

// Import Components
import StartButton from "./StartButton";
import Display from "./Display";
import Stage from "./Stage";

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// Custom Hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

import { createStage } from "../gameHelpers";

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	const [player, updatePlayerPos, resetPlayer] = usePlayer();
	const [stage, setStage] = useStage(player, resetPlayer);

	const movePlayer = direction => {
		updatePlayerPos({ x: direction, y: 0 });
	};

	const startGame = () => {
		// Reset Everything
		setStage(createStage());
		resetPlayer();
	};

	const drop = () => {
		updatePlayerPos({ x: 0, y: 1, collided: false });
	};

	const dropPlayer = () => {
		drop();
	};

	const move = ({ keyCode }) => {
		if (!gameOver) {
			if (keyCode === 37) {
				// Left Pressed
				movePlayer(-1);
			} else if (keyCode === 39) {
				// Right Pressed
				movePlayer(1);
			}
		}
	};

	console.log("re-rendered");

	return (
		<StyledTetrisWrapper
			role='button'
			tabIndex='0'
			onKeyDown={event => move(event)}>
			<StyledTetris>
				<Stage stage={stage} />
				<aside>
					{gameOver ? (
						<Display gameOver={gameOver} text='Game Over' />
					) : (
						<div>
							<Display text='Score' />
							<Display text='Rows' />
							<Display text='Level' />
						</div>
					)}

					<StartButton handlerClick={startGame} />
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	);
};

export default Tetris;
