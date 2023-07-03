# System Design Document for InteractiveButton System

## I. Overview

The InteractiveButton System is a sophisticated, flexible system built for the creation and manipulation of buttons within web applications. It introduces a new structure for button components, which can facilitate navigation (routing), trigger custom events, and produce dynamic pop-up menus for more advanced navigation options.

### System Components

This system is responsible for creating a container of expandable buttons called `BTN-EXPANDABLE`.

### The `BTN-CONTAINER` Component

The container is used to place all its children buttons on the same line, and to calculate the total width of the system.

### The `BTN-EXPANDABLE` Component

Has the majority of the system's complexity. The component represents a button, that have automatic prefixes in this format:
  `["01 //", "02 //"]`
These prefixes disappear at a customizable threshold which defaults to `1100px`
Each `BTN-EXPANDABLE` component also has a label, and at specified breakpoints, that label can change based on a user prop. Whenever the label changes, or the prefix, a typing style transition is employed.

This label behavior can be done using 

```jsx
import React from 'react';
import { useMediaQuery } from 'react-responsive';

const DynamicLabel = ({ labels }) => {
  const matches = useMediaQuery({ minWidth: labels[0].breakpoint });

  const getLabelText = () => {
    for (let i = 0; i < labels.length; i++) {
      if (matches && i === labels.length - 1) {
        return labels[i].text; // Use the last label if all breakpoints are matched
      }
      if (matches && window.innerWidth < labels[i + 1].breakpoint) {
        return labels[i].text; // Use the label with the matched breakpoint
      }
    }
    return ''; // Return empty string if no matching breakpoints found
  };

  return <div>{getLabelText()}</div>;
};

export default DynamicLabel;

}
```

```jsx
import React from 'react';
import DynamicLabel from './DynamicLabel';

const App = () => {
  const labels = [
    { breakpoint: 480, text: 'Mobile' },
    { breakpoint: 768, text: 'Tablet' },
    { breakpoint: 1024, text: 'Desktop' },
  ];

  return (
    <div>
      <DynamicLabel labels={labels} />
    </div>
  );
};

export default App;
```

When one of the `BTN-EXPANDABLE` components are hovered, it triggers the `BTN-BACK` component.

### The `BTN-BACK` Component

Serves as a backdrop or background layer for the buttons. It gets triggered when one of the `BTN-EXPANDABLE` components are hovered, and only disappears once the mouse fully leaves it's bounds or a different `BTN-EXPANDABLE` component is hovered. If the screen size is smaller than a certain breakpoint, it shouldn't render any of the `BTN-EXPANDABLE-ITEM`'s

#### Triggering Animation

  1. The animation sequence begins when a mouse enter event is triggered on a button (`BTN-EXPANDABLE`). This initiates a chain of animations affecting the `BTN-BACK` component, which is a background div linked to the button.

  2. As part of the initial animation, the opacity of `BTN-BACK` is set to 100, making it fully visible. Additionally, the `BTN-BACK` width is set to the button's (`BTN-EXPANDABLE`) offset width plus an extra 25 pixels, and its position is adjusted to center it under the `BTN-EXPANDABLE`.

  3. After this, three timeouts are cleared to ensure there are no ongoing animations before starting new ones.

  4. **Timeout 1** (500ms delay): After an initial pause of half a second, the width of `BTN-BACK` is expanded to match the width of the `BTN-CONTAINER`, and its left position is adjusted to -0.5 pixels.

  5. **Timeout 2** (500ms delay): After another pause of 500ms, the `BTN-BACK` inner HTML is set to contain the clickable links (`BTN-EXPANDABLE-ITEM`), which are part of the `BTN-EXPANDABLE` that was triggered.

    5.1. The height of the `BTN-BACK` is adjusted to accommodate the new `BTN-EXPANDABLE-ITEM`s. If there are sites passed, the height is set to (`sites.length + 1`) times 45 pixels.

    5.2. In this stage, a click event is also set on the `BTN-EXPANDABLE-ITEM` within the `BTN-BACK`. When a link is clicked, the `handleLinkClick` function will be executed with the event and the sites data as arguments.

  6. **Timeout 3** (100ms delay): A final pause of 100ms is played before the links inside `BTN-BACK` are made fully visible by setting their opacity to 100%.

  The transitions you mentioned are likely set in the CSS for the elements involved, allowing for smooth animations:

    ```css
    transition: all cubic-bezier(.4, 0, .2, 1) .5s;
    ```

#### On Leave

Timeouts are reset and `BTN-BACK` is reset to its initial state of:
  opacity: 0 
  height: 150%
  Clear `BTN-EXPANDABLE-ITEM`s

### The `BTN-EXPANDABLE-ITEM` Component

This component is essentially just a button, it either triggers an event or opens a link. It also has a label.

## Route Handling

If the Button doesn't have an event, then the route is handled.
If the route is an external site, it opens it in a new tab, else it's an internal route and is handled using Next.js routing


Help me plan out all the props, custom hooks and additional components I'll need for this system, following SOLID principles and other NEXT.js best practices.