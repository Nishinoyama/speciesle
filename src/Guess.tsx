import {DistanceMarker} from "./Game";
import "./Guess.css"
import React from "react";

interface GuessState {
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
      distance: 255 * Math.sqrt(6)
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

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 20)
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
        {this.props.distanceForeach.map(distanceForeachIndicator)}
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
  }
}

function distanceIndicator(distance: Number) {
  if (distance === 0) {
    return <div className="GuessStat GuessStatCorrect">🎉Correct!!</div>
  } else {
    return <div className="GuessStat GuessStatWrong">{distance.toFixed(2)}</div>
  }
}