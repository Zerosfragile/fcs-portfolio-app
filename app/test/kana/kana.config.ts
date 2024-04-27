type TypingActions =
  | "tap"
  | "flick_up"
  | "flick_down"
  | "flick_left"
  | "flick_right";

// if kana == わ then there is no "flip_down"

/**
  based on these actions we want to generate the keyboard config in local storage which maps the 10 base kana to it's child characters
  This will look like a json with the TypingActions as keys and the kana as values, with an additional key for "tap_order"

  To generate the config we will need to take the user through an onboarding process where they will be asked to perform each action on the keyboard
  

 */
