# System Design Document for InteractiveButton System

## BtnContainer

Mainly used for layout and positioning purposes, and it has some responsibility in calculating the total width of the system.

### Props

1. **`direction`**: While your use case has all buttons in a line (presumably horizontally), other developers might want a different direction. This prop could accept values like `"horizontal"` or `"vertical"`.

```jsx
<BtnContainer direction="horizontal">
  <BtnExpandable/>
  <BtnExpandable/>
  <BtnExpandable>
    <BtnExpandableItem/>
    <BtnExpandableItem/>
    <BtnExpandableItem/>
  </BtnExpandable>
</BtnContainer>
```

## BtnExpandable

### Functionality

- A prefix that disappears at a customizable threshold.
- A label that changes based on specified breakpoints.
- A typing-style transition whenever the label or prefix changes.
- Triggers the `BTN-BACK` component on hover.

### Props

1. **`prefix`**: An optional prefix string. If provided, the component will prepend this to the button text.
2. **`threshold`**: A threshold for hiding the prefix. The prefix will disappear when the viewport width is below this threshold.
3. **`labels`**: An array of label objects. Each object would have a `breakpoint` and `text` property, similar to your existing setup.
4. **`defaultLabel`**: The label text to use when the viewport width is below the lowest breakpoint. If not provided, it could default to the first label in the `labels` array.
5. **`onHover`**: A callback function that triggers the `BTN-BACK` component when the button is hovered over.

Here is an example of how these props could be used:

```jsx
<BtnExpandable 
  prefix="01 //" 
  threshold={1100} 
  labels={[
    { breakpoint: 480, text: 'Mobile' },
    { breakpoint: 768, text: 'Tablet' },
    { breakpoint: 1024, text: 'Desktop' },
  ]} 
  defaultLabel="Default" 
/>
```

## BtnBack

An animated backdrop that appears when a `BTN-EXPANDABLE` button is hovered, then disappears when the hover ends. It also displays a set of `BTN-EXPANDABLE-ITEM`s at a certain stage of its animation sequence, and these are hidden if the screen size is below a certain breakpoint. 

### Props

1. **`isTriggered`**: A Boolean indicating whether the component is currently triggered. This prop could be controlled by the parent component or the state of a parent component.

2. **`items`**: An array of `BTN-EXPANDABLE-ITEM` data. This could be an array of objects, where each object represents a `BTN-EXPANDABLE-ITEM` and its properties.

3. **`breakpoint`**: The screen width below which the `BTN-EXPANDABLE-ITEM`s should not be rendered.

Here's how these props might be used in JSX:

```jsx
<BtnBack 
  isTriggered={isHoveringBtnExpandable} 
  items={expandableItems} 
  breakpoint={480}
/>
```

## BtnExpandableItem
### Props

1. **`label`**: The label text for the button.
2. **`event`**: An optional event callback function to be triggered when the button is clicked.
3. **`link`**: An optional link URL. If provided, the button will act as a link.

### Custom Hooks

1. **Route Handling Hook**: You can create a custom hook to handle the routing logic. This hook would check if the button has an event callback or a link URL and handle the appropriate routing behavior based on that. It can utilize Next.js routing features for internal routes and use the `window.open()` function for external links.

### Example

Here's an example implementation of the `BTN-EXPANDABLE-ITEM` component, following the plan mentioned above:

```jsx
import Link from 'next/link';

const BtnExpandableItem = ({ label, event, link }) => {
  const handleClick = () => {
    if (event) {
      event();
    } else if (link) {
      if (route.startsWith("http://") || route.startsWith("https://")) {
        window.open(link, '_blank');
 
        Router.push(link);
      }
    }
  };

  return (
    <button onClick={handleClick}>
      {label}
    </button>
  );
};

export default BtnExpandableItem;
```