import React, { useState } from 'react';
import { Table, Button, Input, Dropdown, Segment, Header, Grid, Modal } from 'semantic-ui-react';
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
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]); // List of players
  const [pastGameResults, setPastGameResults] = useState([]); // Results history
  const [newGame, setNewGame] = useState(''); // Temporary state for adding a game
  const [newPlayer, setNewPlayer] = useState(''); // Temporary state for adding a player
  const [selectedGame, setSelectedGame] = useState(null); // Randomly selected game
  const [winnerSelections, setWinnerSelections] = useState([]); // Temporary state for winner dropdowns
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', instructions: '' });

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

  const openGameModal = (game) => {
    const instructions = `Instructions for ${game}. Here you can add more detailed instructions.`; // Replace with detailed instructions
    setModalContent({ title: game, instructions });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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

  return (
    <div className="xmas-body">
      <Segment className="xmas-container">
        <h2 textAlign="center" className="xmas-header">
          🎄 2nd Annual Xmas Games 🎄
        </h2>
        <h4 textAlign="center" className="xmas-subheader">
          May the odds be ever in your favor 👹
        </h4>

        <Modal open={modalOpen} onClose={closeModal} size="small">
          <Modal.Header className="xmas-modal-header">{modalContent.title}</Modal.Header>
          <Modal.Content>
            <p>{modalContent.instructions}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={closeModal} className="xmas-modal-close">
              Close
            </Button>
          </Modal.Actions>
        </Modal>

        <Grid divided="vertically">
          <Grid.Row>
            <Grid.Column width={8}>
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
            </Grid.Column>
            <Grid.Column width={8}>
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
                      <Table.Cell style={{ background: '#333', color: '#fff' }}>{game}</Table.Cell>
                      <Table.Cell style={{ background: '#333', color: '#fff' }}>
                        <button onClick={() => openGameModal(game)} className="xmas-button"> ? </button>
                        <button  onClick={() => handleRemoveGame(game)} className="xmas-button">X</button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
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
                      <Table.Cell style={{ background: '#333', color: '#fff' }}>{result.game}</Table.Cell>
                      <Table.Cell style={{ background: '#333', color: '#fff' }}>{result.player}</Table.Cell>
                      <Table.Cell style={{ background: '#333', color: '#fff' }}>
                        <Button disabled>Edit</Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                  {winnerSelections.map((selection, index) => (
                    <Table.Row key={`new-${index}`}>
                      <Table.Cell style={{ background: '#333', color: '#fff' }}>{selection.game}</Table.Cell>
                      <Table.Cell style={{ background: '#333', color: '#fff' }}>
                        <Dropdown
                          placeholder="Select Winners"
                          fluid
                          multiple
                          selection
                          options={players.map((player) => ({ key: player, text: player, value: player }))}
                          onChange={(e, { value }) => handleSelectWinners(value, selection.game)}
                        />
                      </Table.Cell>
                      <Table.Cell style={{ background: '#333', color: '#fff' }}>
                        <button color="green" onClick={handleSaveResults} className="xmas-button">
                          Save
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <button onClick={pickRandomGame} className="xmas-button">
                Pick a Random Game
              </button>
              <button color="red" onClick={handleClearAll} className="xmas-button">
                Clear All
              </button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default Scorekeeper;
