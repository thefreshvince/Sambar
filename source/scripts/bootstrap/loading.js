/**
 * The loading element
 * @var  {HTMLElement}
 */
const loading_element = document.querySelector('.loading');
loading_element.style.transitionDuration = 
    window.sambar.config.loading_transition_duration/1000 + 's';