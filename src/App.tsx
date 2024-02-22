import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard';

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players" >
          <Player name="Player 1" symbol="X" />
          <Player name="Player 2" symbol="O" />
        </ol>
        <GameBoard />
      </div>
    </main>
  );
}

export default App
