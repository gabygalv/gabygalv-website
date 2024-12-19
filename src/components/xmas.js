import React, { useState } from 'react';
import { Table, Button, Input, Dropdown, Segment, Grid, Tab } from 'semantic-ui-react';
// import '../index.css';

const Scorekeeper = () => {
  const predefinedGames = [
    "Streamers",
    "Stack and Float",
    "Reindeer Hooves",
    "Flip-Tac-Toe",
    "Candy Cane Fishing",
    "Snatch the Cup",
    "Santa's Breath",
    "Snow Shovel",
    "Santa's Sled",
    "Cookie Face Race",
  ];
  const gameInstructions = {
    "Streamers": `🎁 Unroll the streamer as fast as you can. \n ⭐ Winner: Person who finishes unrolling first`,
    "Stack and Float": `🎁 Build a pyramid using cups, while using 1 hand to keep a ballon in the air. \n ⭐ Winner: Person who finishes building their pyramid first wins`,
    "Reindeer Hooves": `🎁 With cups on your hands, put as many cotton balls into your bowl as you can in 1 minute. \n ⭐ Winner: Person with the most cotton balls in their bowl wins.`,
    "Flip-Tac-Toe": `🎁 TEAM GAME! Flip your cup, then place it on the tic-tac-toe board. Cups CAN stack on opponents cups. \n ⭐ Winner: FIrst team to get tic-tac-toe`,
    "Candy Cane Fishing": `🎁 Hook candy canes from a bowl with another cane in 1 minute. ⭐ Winner: Person who fished the most candy canes`,
    "Snatch the Candy Cane": `🎁 Grab the candy cane when the music stops. \n ⭐ Winner: Last person standing wins!`,
    "Santa's Breath": `🎁 Blow out as many candles as possible while saying HO HO HO. \n ⭐ Winner: Person who blows out the most candles.`,
    "Snow Shovel": `🎁 Move cotton balls into a bowl using a spatula, blindfolded + 1 minute. \n ⭐ Winner: Person with the most cotton balls wins!`,
    "Santa's Sled": `🎁 Pull your toilet paper roll accross the table as quickly as possible. \n BE CAREFUL, if the water spills your sled might rip and you'll have to start again.. \n ⭐ Winner: Person who crosses the finish line first`,
    "Cookie Face Race": `🎁 Slide a cookie from your forehead to your mouth, with your hands behind your back! If the cookie falls you can pick it up.\n⭐ Winner: Person who gets the cookie in their mouth first`
  };
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]); // List of players
  const [pastGameResults, setPastGameResults] = useState([]); // Results history
  const [newGame, setNewGame] = useState(''); // Temporary state for adding a game
  const [newPlayer, setNewPlayer] = useState(''); // Temporary state for adding a player
  const [selectedGame, setSelectedGame] = useState(null); // Randomly selected game
  const [winnerSelections, setWinnerSelections] = useState([]); // Temporary state for winner dropdowns


  // Handlers
  const handleAddGame = () => {
    if (newGame && !games.includes(newGame)) {
      setGames([...games, newGame]);
      setNewGame('');
    }
  };

  const handleAddPredefinedGames = () => {
    const newGames = predefinedGames.filter((game) => !games.includes(game));
    setGames([...games, ...newGames]);
  };

  const handleAddPlayer = () => {
    if (newPlayer && !players.includes(newPlayer)) {
      setPlayers([...players, newPlayer]);
      setNewPlayer('');
    }
  };

  const handleRemoveGame = (game) => {
    setGames(games.filter((g) => g !== game));
  };

  const handleRemovePlayer = (player) => {
    setPlayers(players.filter((p) => p !== player));
  };

  const handleSetWinner = (players, game) => {
    players.forEach((player) => {
      const result = { player, game, date: new Date().toISOString() };
      setPastGameResults((prevResults) => [...prevResults, result]);
    });
  };

  const handleSelectWinners = (selectedPlayers, game) => {
    setWinnerSelections((prev) =>
      prev.map((entry) =>
        entry.game === game ? { ...entry, players: selectedPlayers } : entry
      )
    );
  };

  const handleAddResultRow = (game) => {
    setWinnerSelections([...winnerSelections, { game, players: [] }]);
  };

  const handleSaveResults = () => {
    winnerSelections.forEach((selection) => {
      if (selection.players.length > 0) {
        handleSetWinner(selection.players, selection.game);
      }
    });
    setWinnerSelections([]); // Clear the temporary selections
  };

  const handleClearAll = () => {
    setGames([]);
    setPlayers([]);
    setPastGameResults([]);
    setWinnerSelections([]);
  };


  // Calculate total wins for each player
  const calculateWins = (player) => {
    return pastGameResults.filter((result) => result.player === player).length;
  };

  const getTopPlayer = () => {
    const winCounts = players.map(player => ({
      player,
      wins: calculateWins(player)
    }));
    const maxWins = Math.max(...winCounts.map(w => w.wins), 0);
    return winCounts.filter(w => w.wins === maxWins).map(w => w.player);
  };

  const topPlayers = getTopPlayer();

  // Random game picker
  const pickRandomGame = () => {
    if (games.length > 0) {
      const randomGame = games[Math.floor(Math.random() * games.length)];
      setSelectedGame(randomGame);
      handleAddResultRow(randomGame);
    }
  };

  const panes = [
    {menuItem: 'Players',
      render: () => 
        <>
       <h3 className="xmas-header">Players</h3>
        <Input
                placeholder="Player name"
                value={newPlayer}
                onChange={(e) => setNewPlayer(e.target.value)}
                action={{ icon: 'add', onClick: handleAddPlayer }}
                className="xmas-input"
              />
             <Table celled className="xmas-table">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Player</Table.HeaderCell>
                    <Table.HeaderCell>Total Wins</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {players.map((player) => (
                    <Table.Row key={player}>
                      <Table.Cell style={{ color: '#006400' }}>
                        {player} {topPlayers.includes(player) && '👑'}
                      </Table.Cell>
                      <Table.Cell style={{ color: '#006400' }}>{calculateWins(player)}</Table.Cell>
                      <Table.Cell>
                        <button onClick={() => handleRemovePlayer(player)} className="xmas-button">X</button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              </>
      },
    { menuItem: 'Games', render: () => <>
    <h3 className="xmas-header">Games</h3>
              <button onClick={handleAddPredefinedGames} style={{ marginTop: '10px' }} className="xmas-button">
                Add Xmas Games
              </button>
              <Input
                placeholder="Game name"
                value={newGame}
                onChange={(e) => setNewGame(e.target.value)}
                action={{ icon: 'add', onClick: handleAddGame }}
                className="xmas-input"
              />
              <Table celled className="xmas-table">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Game</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {games.map((game) => (
                    <Table.Row key={game}>
                      <Table.Cell style={{ color: '#006400' }}>{game}</Table.Cell>
                      <Table.Cell style={{ color: '#006400' }}>
                        <button  onClick={() => handleRemoveGame(game)} className="xmas-button">X</button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              </> },
    { menuItem: 'Scores', render: () => <>
    <h3 className="xmas-header">Game Results</h3>
              <Table celled className="xmas-table">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Game</Table.HeaderCell>
                    <Table.HeaderCell>Winners</Table.HeaderCell>
                    <Table.HeaderCell>Save</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {pastGameResults.map((result, index) => (
                    <Table.Row key={index}>
                      <Table.Cell style={{ color: '#006400' }}>{result.game}</Table.Cell>
                      <Table.Cell style={{ color: '#006400' }}>{result.player}</Table.Cell>
                      <Table.Cell style={{ color: '#006400' }}>
                        <Button disabled>Edit</Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                  {winnerSelections.map((selection, index) => (
                    <Table.Row key={`new-${index}`}>
                      <Table.Cell style={{ color: '#006400' }}>{selection.game}</Table.Cell>
                      <Table.Cell style={{ color: '#006400' }}>
                        <Dropdown
                          placeholder="Select Winners"
                          fluid
                          multiple
                          selection
                          options={players.map((player) => ({ key: player, text: player, value: player }))}
                          onChange={(e, { value }) => handleSelectWinners(value, selection.game)}
                        />
                      </Table.Cell>
                      <Table.Cell style={{ color: '#006400' }}>
                        <button color="green" onClick={handleSaveResults} className="xmas-button">
                          Save
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <button onClick={pickRandomGame} className="xmas-button">
                Pick a random game
              </button>
              <button color="red" onClick={handleClearAll} className="xmas-button">
                Clear All
              </button>
            </Grid.Column>
          </Grid.Row>
    </> },
    { menuItem: 'Play', render: () => 
      <>
      <button onClick={pickRandomGame} className="xmas-button-play">
      Let's go!
      </button>
      {selectedGame && (
        <div>
          <h4 className="xmas-subheader">{selectedGame}</h4>
          <p className="xmas-subheader" style={{color: '#003e1f'}}>{gameInstructions[selectedGame]
        .split('\n')
        .map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}</p>
        </div>
      )}
    </>
   }
  ]

  return (
    <div className="xmas-body snow">
      <Segment className="xmas-container">
        <h2 textAlign="center" className="xmas-header">
          🎄 2nd Annual Xmas Games 🎄
        </h2>
        <h4 textAlign="center" className="xmas-subheader">
          May the odds be ever in your favor 👹
        </h4>
      <Tab panes={panes} />
      </Segment>
    </div>
  );
};

export default Scorekeeper;
