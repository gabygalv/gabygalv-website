import React, { useState } from 'react';
import { Table, Button, Input, Dropdown, Segment, Header, Grid, Modal } from 'semantic-ui-react';

const Scorekeeper = () => {
  const predefinedGames = 
  [ "Streamers" ,"Stack and Float","Reindeer Hooves", "Flip-Tac-Toe", "Candy Cane Fishing", "Snatch the Cup", "Santa's Breath", "Snow Shovel", "Santa's Sled", "Cookie Face Race"];
  const [games, setGames] = useState([]); // List of games
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

  const handleSetWinner = (player, game) => {
    const result = { player, game, date: new Date().toISOString() };
    setPastGameResults([...pastGameResults, result]);
  };

  const handleSelectWinner = (player, game) => {
    setWinnerSelections((prev) =>
      prev.map((entry) =>
        entry.game === game ? { ...entry, player } : entry
      )
    );
  };

  const handleAddResultRow = (game) => {
    setWinnerSelections([...winnerSelections, { game, player: '' }]);
  };

  const handleSaveResults = () => {
    const updatedResults = winnerSelections.filter(selection => selection.player);
    setPastGameResults([...pastGameResults, ...updatedResults]);
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
    <Segment>
      <Header as="h2">Holiday Scorekeeper</Header>

      <Modal open={modalOpen} onClose={closeModal} size="small">
        <Modal.Header>{modalContent.title}</Modal.Header>
        <Modal.Content>
          <p>{modalContent.instructions}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal} color="green">
            Close
          </Button>
        </Modal.Actions>
      </Modal>
      
      <Grid divided="vertically">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3">Add Players</Header>
            <Input
              placeholder="Player name"
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
              action={{ icon: 'add', onClick: handleAddPlayer }}
            />
            <Table celled>
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
                    <Table.Cell>
                      {player} {topPlayers.includes(player) && '👑'}
                    </Table.Cell>
                    <Table.Cell>{calculateWins(player)}</Table.Cell>
                    <Table.Cell>
                      <Button color="red" icon="trash" onClick={() => handleRemovePlayer(player)} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h3">Add Games</Header>
            <Input
              placeholder="Game name"
              value={newGame}
              onChange={(e) => setNewGame(e.target.value)}
              action={{ icon: 'add', onClick: handleAddGame }}
            />
            <Button color="blue" onClick={handleAddPredefinedGames} style={{ marginTop: '10px' }}>
              Add Xmas Games
            </Button>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Game</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {games.map((game) => (
                  <Table.Row key={game}>
                    <Table.Cell>{game}</Table.Cell>
                    <Table.Cell>
                      <Button color="green" onClick={() => openGameModal(game)}>
                        Info
                      </Button>
                      <Button color="red" icon="trash" onClick={() => handleRemoveGame(game)} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h3">Game Results</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Game</Table.HeaderCell>
                  <Table.HeaderCell>Winner</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {pastGameResults.map((result, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{result.game}</Table.Cell>
                    <Table.Cell>{result.player}</Table.Cell>
                    <Table.Cell>
                      <Button disabled>Edit</Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
                {winnerSelections.map((selection, index) => (
                  <Table.Row key={`new-${index}`}>
                    <Table.Cell>{selection.game}</Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder="Select Winner"
                        fluid
                        selection
                        options={players.map((player) => ({ key: player, text: player, value: player }))}
                        onChange={(e, { value }) => handleSelectWinner(value, selection.game)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Button color="green" onClick={handleSaveResults}>Save</Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Button primary onClick={pickRandomGame}>
              Pick a Random Game
            </Button>
            <Button color="red" onClick={handleClearAll}>
              Clear All
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Scorekeeper;
