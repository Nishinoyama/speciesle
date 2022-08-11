import {DistanceMarker} from "./Game";
import "./Guess.css"
import React from "react";

interface GuessState {
  distanceForeach: DistanceMarker[]
  distance: number
}

export interface GuessProps {
  speciesName: string
  distanceForeach: DistanceMarker[]
  distance: number
}

export default class Guess extends React.Component<GuessProps, GuessState> {
  private interval: any

  constructor(props: GuessProps) {
    super(props);
    this.state = {
      distance: 255 * Math.sqrt(6),
      distanceForeach: new Array(6).fill(DistanceMarker.None)
    }
  }

  tick() {
    const transRate = 8;
    const nextDistance = this.props.distance / transRate + this.state.distance * (transRate - 1) / transRate
    if (Math.abs(nextDistance - this.props.distance) < 1e-2) {
      this.setState({
        distance: this.props.distance
      })
      clearInterval(this.interval)
    } else {
      this.setState({
        distance: nextDistance
      })
    }
  }

  setDistanceMarker(index: number) {
    let distanceForeach = Array.from(this.state.distanceForeach)
    distanceForeach[index] = this.props.distanceForeach[index]
    this.setState({distanceForeach})
    if (index < this.state.distanceForeach.length) setTimeout(() => this.setDistanceMarker(index + 1), 250)
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 20)
    this.setDistanceMarker(0)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className="GuessRow">
        <div className="GuessName">
          {this.props.speciesName}
        </div>
        {this.state.distanceForeach.map(distanceForeachIndicator)}
        {distanceIndicator(this.state.distance)}
      </div>
    )
  }
}

function distanceForeachIndicator(marker: DistanceMarker, index: number) {
  switch (marker) {
    case DistanceMarker.Exact:
      return <div className="GuessEach GuessExact" key={index}></div>
    case DistanceMarker.Close:
      return <div className="GuessEach GuessClose" key={index}></div>
    case DistanceMarker.Far:
      return <div className="GuessEach GuessFar" key={index}></div>
    case DistanceMarker.None:
      return <div className="GuessEach" key={index}></div>
  }
}

function distanceIndicator(distance: Number) {
  if (distance === 0) {
    return <div className="GuessStat GuessStatCorrect">🎉Correct!!</div>
  } else {
    return <div className="GuessStat GuessStatWrong">{distance.toFixed(2)}</div>
  }
}