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
