# System Animation

## Current Issues

1. Not adaptable to the dynamically changing container dimensions
2. Doesn't handle sites or adapt to its height, it also reveals downwards instead of upwards.
3. OnMouseLeave doesn't work because the z index on the div is -10, below all the other elements. However, changing it to 0 doesn't work, as it goes above the buttons.

I'm currently unsure about what to do, or the general next steps.

## Resizing Problem

Let's understand the current resizing problem by demonstrating it on a simplified example:

Suppose we have a flex container, with an arbitrary amount of dynamic children elements.
On a state change, in this case: breakpoints, these dynamic elements trigger an animation which each take a "random" amount of time, making a hard coded solution unviable. We need to be constantly finding the dimensions on these elements, in order to keep the system updated with their dynamic nature. This is done using a custom hook `useComponentSize`, which sets up a ResizeObserver to monitor changes in the size of a component and updates the componentSize state with the latest dimensions. The componentSize can be accessed by the component using this hook.

However, if a dynamic element in the flex container has a shorter animation time than an element after, the later element after won't have the latest "left" value, as it will be pushed further by the previous elements who are still changing their dimensions.