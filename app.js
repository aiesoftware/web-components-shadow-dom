class ShadowDom extends HTMLElement {
  constructor() {
    super();

    /**
     * Step 1: Create a shadow DOM and attach it to an element on the main DOM
     *
     * Given that the shadow DOM is for a custom element, it makes sense that the element in the
     * main DOM we want to attach it to is this very custom element.
     *
     * We create and attach (and return it), in a one liner:
     */
    let shadow = this.attachShadow({mode: 'open'});

    /**
     * Having now attached a shadow DOM to our <aie-shadow-dom> element, the element is now a
     * "Shadow Host". The shadow var above is the "Shadow Root" (confirmed by viewing the html in chrome).
     *
     * We can now use our shadow root as if it were the main DOM
     */
    let para = document.createElement('p');
    para.innerText = "I'm in the shadows!";

    shadow.appendChild(para);

    /**
     * We have now rendered the paragraph in the browser. Looking in debug tools reveals that the <p>
     * tag is within:
     * <aie-shadow-dom>
     *   #shadow-root
     *      <p>I'm in the shadows!</p>
     * </aie-shadow-dom>
     */

    /**
     * Now to prove that styles etc are encapsulated
     */
    let styledPara = document.createElement('p');
    styledPara.setAttribute('class', 'large');
    styledPara.innerText = "I'm styled independently";

    let style = document.createElement('style');
    style.textContent = `
    .large {
      font-size: 25px;
    }
    `;

    shadow.appendChild(style);
    shadow.appendChild(styledPara);

    /**
     * The <p class="large"> tag in the main DOM is styled separately, and therefore does not clash.
     * In fact, the p tag within this shadow DOM ONLY knows about styles created within it, it does not
     * even have visibility of those in the main DOM.
     *
     * So it does not act as an override - if I remove the style above, it does not fallback to the
     * styling of .large in the main DOM, because it can't see it, so it simply has no styling.
     */
  }

}

/**
 * Define the component name for the HTML tag, and attach it to it's class.
 */
customElements.define('aie-shadow-dom', ShadowDom);


// A html tag in main html of <random-tag> will still render to the DOM, even it is isn't registered
// as a custom element through javascript. That is, any recognised HTML tags within it, e.g <p>Hello</p>
// will still render to the page, and in the DOM will be inside the <random-tag> just like any other

// The fact that it's not registered as a component simply means that no JS will be invoked that can
// manage how the element should behave - such as rendering a cloned template, accepting attributes,
// working with slots etc. Without the JS, it's just a dumb tag doing nothing but rendering to the DOM.

// Using a shadow DOM
// The concept off adding an encapsulated DOM within an element in the main DOM
// The encapsulated DOM (shadow) does not reach out into the main DOM, and therefore any styles, classnames,
// or id's etc will not conflict with those in the external DOM.
// A shadow DOM must be attached to an element on the main DOM.
// Typically, in web components, the main element is the custom element to which the shadow DOM belongs
// So if we have a <my-element> tag in the main DOM, and that custom element requires a shadow DOM, we simply
// attach it to that element on the main DOM.
// The main element it is attached to becomes the "Shadow Host". The top element of the shadow DOM (the shadow
// itself) becomes the "Shadow Root". The elements within the shadow root form the "Shadow Tree"


