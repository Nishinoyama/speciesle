import React from "react";

interface GameProps {
}

interface GameStatus {
  guessingList: string[],
  guessingString: string,
}

export default class Game extends React.Component<GameProps, GameStatus> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      guessingList: [],
      guessingString: "",
    }
    this.handleGuessingStringChange = this.handleGuessingStringChange.bind(this)
    this.sendSpecies = this.sendSpecies.bind(this)
  }

  sendSpecies(e: { key: string }) {
    if (this.state.guessingString.length === 0) {
      return
    }
    if (e.key === 'Enter') {
      const nextGuessingList = [...this.state.guessingList, this.state.guessingString];
      this.setState({
        guessingString: "",
        guessingList: nextGuessingList,
      })
    }
  }

  handleGuessingStringChange(e: { target: HTMLInputElement }) {
    this.setState({
      guessingString: e.target.value
    })
  }

  render() {
    return (
      <div className="Game">
        <div className="MissingNo">
          ?
        </div>
        <div className="GuessList">
          {this.state.guessingList.map(g => (
            <div className="GuessRow">
              {g}
            </div>
          ))}
        </div>
        <div className="GuessInput">
          <input
            value={this.state.guessingString}
            onChange={this.handleGuessingStringChange}
            onKeyDown={this.sendSpecies}
            placeholder="linoone"
          />
        </div>
      </div>
    )
  }
}