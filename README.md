### Simple Web Component with Properties

A barebones example of creating and rendering a web component and making use of the shadow DOM
 
The concept of adding an encapsulated DOM within an element in the main DOM.
The encapsulated DOM (shadow) does not reach out into the main DOM, and therefore any styles, classnames, or id's etc will not conflict with those in the external DOM.
A shadow DOM must be attached to an element on the main DOM.
Typically, in web components, the main element is the custom element to which the shadow DOM belongs.
So if we have a <my-element> tag in the main DOM, and that custom element requires a shadow DOM, we simply
attach it to that element on the main DOM.
The main element it is attached to becomes the "Shadow Host". The top element of the shadow DOM (the shadow
itself) becomes the "Shadow Root". The elements within the shadow root form the "Shadow Tree".
