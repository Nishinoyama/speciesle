import React from "react";
import {defaultDistanceSpecies, DistanceSpecies, randomSpecies, Species, speciesByName} from "./Species";

interface GameProps {
}

interface GameStatus {
  guessingList: string[],
  guessingString: string,
  answerSpecies: Species
  distanceType: DistanceSpecies<Species>,
  distanceMarker: (n: number) => string
}

export default class Game extends React.Component<GameProps, GameStatus> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      guessingList: [],
      guessingString: "",
      answerSpecies: randomSpecies(),
      distanceType: defaultDistanceSpecies,
      distanceMarker(n: number): string {
        if (n === 0) {
          return "🟩"
        } else if (n <= 10) {
          return "🟨"
        } else {
          return "⬛"
        }
      },
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
      const distance = this.state.distanceType.distanceNorm(guessingSpecies, this.state.answerSpecies)
      const distanceForeach = this.state.distanceType.distanceForeach(guessingSpecies, this.state.answerSpecies).map(this.state.distanceMarker)
      if (distance === 0) {
        const nextGuessingList = [...this.state.guessingList, guessingSpecies.name() + " " + distanceForeach.join("") + " Correct!!🎉"]
        this.setState({
          guessingString: "",
          guessingList: nextGuessingList,
        })
      } else {
        const nextGuessingList = [...this.state.guessingList, guessingSpecies.name() + " " + distanceForeach.join("") + " " + distance.toFixed(2)]
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
            placeholder="ニドランオス(赤/緑のみ)"
          />
        </div>
      </div>
    )
  }
}