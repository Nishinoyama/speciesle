import React from "react";
import {DistanceSpecies, randomSpecies, Species, speciesByName} from "./Species";

interface GameProps {
}

interface GameStatus {
  guessingList: string[],
  guessingString: string,
  answerSpecies: Species
  distanceType: DistanceSpecies<Species>,
}

export default class Game extends React.Component<GameProps, GameStatus> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      guessingList: [],
      guessingString: "",
      answerSpecies: randomSpecies(),
      distanceType: {
        distance: (lhd, rhd) => {
          return Math.sqrt(
            lhd.stats().map((le, i) => Math.pow(le - rhd.stats()[i], 2)).reduce((l, r) => l + r, 0)
          )
        }
      }
    }
    this.handleGuessingStringChange = this.handleGuessingStringChange.bind(this)
    this.sendSpecies = this.sendSpecies.bind(this)
  }

  sendSpecies(e: { key: string }) {
    if (this.state.guessingString.length === 0) {
      return
    }
    if (e.key === 'Enter') {
      const guessingSpecies = speciesByName(this.state.guessingString.trim())
      if (guessingSpecies.stats().reduce((l, r) => l + r, 0) === 0) {
        return
      }
      const distance = this.state.distanceType.distance(guessingSpecies, this.state.answerSpecies)
      if (distance === 0) {
        const nextGuessingList = [...this.state.guessingList, this.state.guessingString + " -> Correct!!🎉"]
        this.setState({
          guessingString: "",
          guessingList: nextGuessingList,
        })
      } else {
        const nextGuessingList = [...this.state.guessingList, this.state.guessingString + " -> " + Math.round(distance)]
        this.setState({
          guessingString: "",
          guessingList: nextGuessingList,
        })
      }
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
          {`${this.state.answerSpecies.statsString()} (${this.state.answerSpecies.stats().reduce((l, r) => l + r, 0)})`}
        </div>
        <div className="GuessList">
          {this.state.guessingList.map((g, i) => (
            <div className="GuessRow" key={i}>
              {g}
            </div>
          ))}
        </div>
        <div className="GuessInput">
          <input
            value={this.state.guessingString}
            onChange={this.handleGuessingStringChange}
            onKeyDown={this.sendSpecies}
            placeholder="フシギダネ"
          />
        </div>
      </div>
    )
  }
}