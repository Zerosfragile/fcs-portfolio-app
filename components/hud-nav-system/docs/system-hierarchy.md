# System Hierarchy Planning

THIS DOCUMENT SERVES TO OUTLINE THE COMPONENT ARCHITECTURE AND RESPONSIBILITY HIERARCHY OF THE SYSTEM.

## Using the System

Ensuring a user-friendly experience for developers while retaining comprehensive functionality is of utmost importance to me in designing this system. As the system serves as a part of my own component library (`000-HUD`), its styling is not customizable. However, the system's features can be tailored according to specific needs.

Throughout the development process, I invested significant effort in testing different APIs, including Higher-Order Components (HOCs) and a novel approach involving Modular Children as API arguments, with the container functioning as an API call. After thorough evaluation, I found that the cleanest implementation, both on the front-end and back-end, was as follows.

**Example:**

```tsx
<HUDN.container>
  <HUDN.btn
    labels={[{ breakpoint: 850, text: "About" }]}
    defaultLabel="About Me"
    route="/About"
    sites={[
      {
        title: "Blog Posts",
        route: "/blog",
      },
      {
        title: "Github",
        route: "https://github.com/Zerosfragile",
      },
      {
        title: "More",
        route: "/about",
      },
    ]}
  />
  <HUDN.btn
    defaultLabel="Projects"
    route="/Projects"
    sites={[
      {
        title: "Ascii-Hud",
        route: "https://fragileservices.com",
      },
      {
        title: "Playground",
        route: "/projects/playground",
      },
      {
        title: "More",
        route: "/projects",
      },
    ]}
  />
</HUDN.container>
```

## Components

The system consists of three main components, with the top two components being exposed to the user and the bottom component being internal:

1. Container (`HUDN.container`): This top-level component manages component boundaries, handles higher-level states, and modifies secondary-level props necessary for the system's functionality.

2. Buttons (`HUDN.Btns`): These components are contained within the container and have their own responsibilities. They act as triggers for animation events and also update the states declared at the higher level.

3. Background (`HN-Back`): This internal component handles the animated background. It is not directly accessible or interacted with by the developer using the system. Instead, it closely interacts with the higher-level components. The background component adapts to the dynamic behavior of the buttons, receives and displays changing props, and manages its own animation states.

### HUDN.btn

This component is used to create a button with multiple toggle-able links.
It takes in the following props:

```typescript
type Props = {
  prefix?: {
    // Optional prefix customization (generated if not provided)
    breakpoint: number;
    text: string;
  };
  labels?: {
    //An array of objects for defining custom label breakpoints
    breakpoint: number;
    text: string;
  }[];
  sites?: {
    //An array of objects representing different sites or routes associated with the button.
    title: string;
    route: string;
  }[];
  route: string; //Button Route
  defaultLabel: string; //Default Button Label
};
```

### HUDN.container

This component is used as a wrapper for the system and to manage top level component states.
It takes in the following props:

```typescript
type Props = {
  children?: React.ReactNode; //These would be the HUDN.btn components
};
```

### HN-Back

This is an internal component used to animate and display the nested sites, called within the HUDN.container component.
It takes in the following props:

```typescript
type Props = {
  selected: {
    // State for the current hovered button
    btn: HTMLDivElement | null;
    set: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>; //access to set the state to null onMouseLeave.
  };
  sites: { title: string; route: string }[] | null; // Dictionary state for sites of the current hovered button
  container: RefObject<HTMLDivElement>; // ref of HUDN.container for measurement.
  breakpoint: number; // Breakpoint for when to show no sites (for mobile to prevent overlap of buttons when expanded)
};
```

## Understanding the Hierarchy

Using the three levels we discussed before, lets map out where each feature of the system is handled in hierarchy.

### I. Container Level

At this level, modification for the children `HUDN.btn`'s is handled. This is to prevent the developer using the system from having to manage props which are essential to the component system functionality. The props are added to a wrapping div, and their responsibilities include:

- key: For indexed prefixing
- ref: for dynamic measuring, position, and other data needed by `HN-Back`
- onMouseEnter: for a handle hover event which sets the states for `selectedBtn` and `selectedSites`

### II. BTN Level

At this level the dynamic label breakpoints including the provided prefix are taken handled using an internal prop `useDynamicLabel`. There is also a typing affect which is handled using an internal component called `Typing Label`.

It's worth noting that ideally I want the hover and ref's to be handled on this level, though I'm unsure how to do so, while having access to them on the container level so they can be passed into the `HN-Back` component which needs them.

### III. Back Level

This component is the most complicated because it needs access to a lot of dynamic data for it to work. These include:

- Container Dimensions (ref? needs to update when btn dimensions change)
- `selectedBtn` + `setSelectedBtn` (ref? needs to update when btn dimensions change)
- `selectedSites`

Furthermore, this component has a complex animation sequence which needs to be executed. My old implementation used css modifiers and a series of timer delays to achieve this on the container level. However, as I attempt to refactor the system, and encapsulate logic, and use the framer motion animation library, I find myself surrounded by complexity.
