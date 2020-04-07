import { Observable, fromEvent, merge } from 'rxjs';

/** Creates a stream of all the events that are provided */
export function createEvents(
  element: Window | Element,
  events: string[],
): Observable<TouchEvent | MouseEvent> {
  const streams$ = events.map(event =>
    fromEvent<MouseEvent>(element, event, {
      passive: true,
    }),
  );

  return merge(...streams$);
}

/**
 * Returns the value that is represented by a coordinate on the slider.
 * This calculation needs all the values on the config parameter in order to work properly.
 */
export function getSliderValueForCoordinate(config: {
  coordinate: number;
  width: number;
  offset: number;
  max: number;
  min: number;
  step?: number;
  roundShift?: number;
}): number {
  const { min, max, width, coordinate, offset } = config;
  const calculatedValue = max - ((coordinate - offset) / width) * (max - min);
  const snapped = roundToSnap(calculatedValue, config.step || 1, min, max);

  return roundToDecimal(snapped, config.roundShift || 0);
}

/**
 * If we already have a value for the slider, this function is able to provide
 * the position of the knob for that value.
 */
export function getSliderPositionBasedOnValue(
  value: number,
  min: number,
  max: number,
): number {
  return (value - min) / (max - min);
}

/**
 * The function calculates the proper value on the slider. It adds the
 * snapping behavior by rounding the value. It also clamps the value between min and max.
 */
export function roundToSnap(
  inputValue: number,
  step: number,
  min: number,
  max: number,
): number {
  return clamp(Math.round(inputValue / step) * step, min, max);
}

export function clamp(v: number, min: number = 0, max: number = 100): number {
  return Math.max(min, Math.min(max, v));
}

export function roundToDecimal(toRound: number, decimals: number = 5): number {
  return (
    Math.round((toRound + Number.EPSILON) * 10 ** decimals) / 10 ** decimals
  );
}
