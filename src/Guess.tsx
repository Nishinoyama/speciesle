import {DistanceMarker} from "./Game";
import "./Guess.css"

export interface GuessInterface {
  speciesName: string
  distanceForeach: DistanceMarker[]
  distance: number
}

export default function Guess(guess: GuessInterface) {
  return (
    <div className="GuessRow">
      <div className="GuessName">
        {guess.speciesName}
      </div>
      {guess.distanceForeach.map(distanceForeachIndicator)}
      {distanceIndicator(guess.distance)}
    </div>
  )
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