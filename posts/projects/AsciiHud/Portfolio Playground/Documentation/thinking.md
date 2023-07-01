## Button Hover Functionality

When a button with class `BTN-CONTAINER` is hovered, the following actions are performed:

1. The corresponding `btnBack` element is selected.
2. The width of the `btn` element is calculated by adding its `width` to a padding value of 25 pixels.
3. The position of the `btnBack` element is set to appear below the hovered `btn`, with its width set to the same as the `btn` and centered horizontally.

```js
btnBack.style.left = (btn.offsetLeft + (btn.offsetWidth - width) / 2) + 'px';
```

4. The `btnBack` element is filled with links from the corresponding dropdown list and positioned below the `btn` element. The height of the `btnBack` element is calculated based on the number of links in the dropdown list and the height of the `btn` container element.
```js
"contact-btn": [
        {
          title: "Email",
          event: "showEmail()",
        },
        {
          title: "Github",
          route: "https://github.com/Zerosfragile",
        },
        {
          title: "Linkedin",
          route: "https://www.linkedin.com/in/marcus-lim-b6a721260/",
        },
        {
          title: "More",
          route: "/Contact",
        },
      ]
```
```jsx
<BtnContainer backId="btn-back-002">
    <button id="contact-btn" label="Contact" route="/contact" sites={btnDropdownList["contact-btn"]}/>
    <button id="replay-btn" label="Replay" route="/replay" sites={btnDropdownList["replay-btn"]}/>
</BtnContainer>
```
5. The `currentBtn` variable is set to the hovered `btn` element.

When the mouse leaves the hovered `btn`, the `btnBack` element is reset to its default state.

When the mouse leaves the `btnBack` element, the `btnBack` element is reset to its default state, if no other `btn` is currently being hovered.
