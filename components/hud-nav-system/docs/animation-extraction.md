# Extracting the HandleMouseEnter Animation Function

I want to extract this code, which currently lies in the container component, to a custom hook `useHandleHNA` which returns the handleMouseEnter and handleMouseLeave function. The hook should take an optional dictionary prop for the settings, defaulting to:

```js
const settings = {
  INITIAL_HEIGHT: "150%",
  ANIMATION_DELAY: 500, // milliseconds
  LINK_REVEAL_DELAY: 100, // milliseconds
  LINK_HEIGHT: 45, // pixels
  BTN_PADDING: 25, // pixels
};
```

```tsx
const resizeToBtn = (
  button: React.RefObject<HTMLButtonElement | null>,
  controls: AnimationControls,
  padding: number
) => {
  if (button.current) {
    controls.start({
      opacity: 100,
      width: button.current.offsetWidth + padding,
      left: button.current.offsetLeft - padding / 2,
    });
  }
};

const expandToContainer = (
  containerRef: React.RefObject<HTMLDivElement>,
  controls: AnimationControls
) => {
  if (containerRef.current) {
    controls.start({
      width: containerRef.current.offsetWidth,
      left: -0.5,
    });
  }
};

const expandToLinks = (
  sites: HNSite[],
  containerRef: React.RefObject<HTMLDivElement>,
  controls: AnimationControls
) => {
  let backHeight = INITIAL_HEIGHT;
  if (sites.length > 0) {
    backHeight = (sites.length + 1) * LINK_HEIGHT + `px`;
  }

  controls.start({
    bottom: containerRef.current
      ? containerRef.current.offsetHeight * -0.25
      : 0,
    height: backHeight,
  });
};

const handleMouseEnter = (
  btn: RefObject<HTMLButtonElement | null>,
  sites: HNSite[] | []
) => {
  console.log(btn);
  resizeToBtn(btn, controls, BTN_PADDING);
  setSiteLinks(sites);
  clearTimeout(timeout1);
  clearTimeout(timeout2);
  clearTimeout(timeout3);

  timeout1 = setTimeout(() => {
    expandToContainer(containerRef, controls);
    timeout2 = setTimeout(() => {
      expandToLinks(sites, containerRef, controls);
      timeout3 = setTimeout(() => {
        setIsVisible(true);
      }, LINK_REVEAL_DELAY);
    }, ANIMATION_DELAY);
  }, ANIMATION_DELAY);
};

const handleMouseLeave = () => {
  clearTimeout(timeout1);
  clearTimeout(timeout2);
  clearTimeout(timeout3);

  setIsVisible(false);
  controls.start({ opacity: 0, height: INITIAL_HEIGHT });
};
```
