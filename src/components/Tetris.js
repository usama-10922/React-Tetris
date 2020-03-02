import React, { useState } from "react";

// Import Components
import StartButton from "./StartButton";
import Display from "./Display";
import Stage from "./Stage";

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

import { createStage, checkCollision } from "../gameHelpers";

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

	const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
		rowsCleared
	);

	const movePlayer = direction => {
		if (!checkCollision(player, stage, { x: direction, y: 0 }))
			updatePlayerPos({ x: direction, y: 0 });
	};

	const startGame = () => {
		// Reset Everything
		setStage(createStage());
		resetPlayer();
		setGameOver(false);
		setDropTime(1000); // 1 second
		setScore(0);
		setRows(0);
		setLevel(0);
	};

	const drop = () => {
		// Increase level when player has cleared 10 rows
		if (rows > (level + 1) * 10) {
			setLevel(prevLevel => prevLevel + 1);

			// Increase Speed
			setDropTime(1000 / (level + 1) + 200);
		}

		if (!checkCollision(player, stage, { x: 0, y: 1 })) {
			updatePlayerPos({ x: 0, y: 1, collided: false });
		} else {
			// Game Over
			if (player.pos.y < 1) {
				console.log("GAME OVER !!!");
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPos({ x: 0, y: 0, collided: true });
		}
	};

	const keyUp = ({ keyCode }) => {
		if (!gameOver) {
			if (keyCode === 40) {
				setDropTime(1000 / (level + 1) + 200);
			}
		}
	};

	const dropPlayer = () => {
		setDropTime(null);
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
			} else if (keyCode === 40) {
				// Down Pressed
				dropPlayer();
			} else if (keyCode === 38) {
				// Up Pressed
				playerRotate(stage, 1);
			}
		}
	};

	// console.log("re-rendered");

	useInterval(() => {
		drop();
	}, dropTime);

	return (
		<StyledTetrisWrapper
			role='button'
			tabIndex='0'
			onKeyDown={event => move(event)}
			onKeyUp={keyUp}>
			<StyledTetris>
				<Stage stage={stage} />
				<aside>
					{gameOver ? (
						<Display gameOver={gameOver} text='Game Over' />
					) : (
						<div>
							<Display text={`Score: ${score}`} />
							<Display text={`Rows: ${rows}`} />
							<Display text={`Level: ${level}`} />
						</div>
					)}

					<StartButton handlerClick={startGame} />
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	);
};

export default Tetris;
