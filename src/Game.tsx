import React from "react";
import {DistanceSpecies, randomSpecies, Species, speciesByName} from "./Species";
import Guess, {GuessProps} from "./Guess";
import "./Game.css"

interface GameProps {
  distanceMarker: (n: number) => DistanceMarker
  distanceType: DistanceSpecies<Species>
}

interface GameStatus {
  guessingList: GuessProps[]
  guessingString: string
  answerSpecies: Species
  revealed: boolean[]
}

export enum DistanceMarker {
  Exact,
  Close,
  Far,
  None,
}

export default class Game extends React.Component<GameProps, GameStatus> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      guessingList: [],
      guessingString: "",
      answerSpecies: randomSpecies(),
      revealed: new Array(6).fill(false)
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
      if (guessingSpecies === undefined) return
      const distance = this.props.distanceType.distanceNorm(guessingSpecies, this.state.answerSpecies)
      const distanceForeachNumber = this.props.distanceType.distanceForeach(guessingSpecies, this.state.answerSpecies)
      const distanceForeach = distanceForeachNumber.map(this.props.distanceMarker)
      const nextGuessingList = this.state.guessingList.concat([{
        species: guessingSpecies,
        distanceForeach,
        distance,
      }])
      this.setState({
        guessingString: "",
        guessingList: nextGuessingList,
        revealed: this.state.revealed.map((b, i) => b || distanceForeach[i] === DistanceMarker.Exact)
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
          <div className="MissingName">
            ???
          </div>
          {this.state.answerSpecies.stats().map((t, i) => (
              this.state.revealed[i] ?
                <div className="MissingEach MissingEachRevealed" key={i}>{t}</div> :
                <div className="MissingEach" key={i}>{"HABCDS"[i]}</div>
            )
          )}
          <div className="MissingStat">
            {`(${this.state.answerSpecies.statsSum()})`}
          </div>
        </div>
        <div className="GuessList">
          {this.state.guessingList.map((g, i) => (
            <Guess
              species={g.species}
              distanceForeach={g.distanceForeach}
              distance={g.distance}
              key={i}
            />
          ))}
        </div>
        <div className="GuessInput">
          <input
            value={this.state.guessingString}
            onChange={this.handleGuessingStringChange}
            onKeyDown={this.sendSpecies}
            placeholder="????????????(4??????)??????"
          />
        </div>
      </div>
    )
  }
}