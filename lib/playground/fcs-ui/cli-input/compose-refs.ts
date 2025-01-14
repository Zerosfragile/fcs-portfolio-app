// Compose Ref Functions from Radix UI

import React from "react";

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */ function setRef<T>(ref: PossibleRef<T>, value: T): void {
  if (typeof ref === "function") {
    // For callback refs
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    // For RefObject(s)
    (ref as React.MutableRefObject<T>).current = value;
  }
}

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */ export function composeRefs<T>(
  ...refs: PossibleRef<T>[]
): (node: T) => void {
  return (node) => refs.forEach((ref) => setRef(ref, node));
}

/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */ export function useComposedRefs<T>(
  ...refs: PossibleRef<T>[]
): (node: T) => void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs);
}
