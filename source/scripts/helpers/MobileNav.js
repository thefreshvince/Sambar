// Grab all the main togglers
let timeouta = null,
    timeoutb = null,
    open = false,
    menu_class_name = 'navigation-mobile';
  
// toggles the mobile menu
window.toggleMobileMenu = e => {
        
    // clear any leftover timeouts
    clearTimeout(timeouta);
    clearTimeout(timeoutb);

    // toggle the open state
    open = e.close_menu ? false : !open;

    // add the proper open class
    timeouta = setTimeout(() => 
        document.body.classList[
            open ? 'add' : 'remove'
        ](`${menu_class_name}--open`)
    , open ? 32 : 0 );

    // set a timeout to hide the main nav
    timeoutb = setTimeout(() => 
        document.body.classList[
            open ? 'add' : 'remove'
        ](`${menu_class_name}--visible`)
    , open ? 0 : 500 );

};

// tie it to a clicker event
window.clicker.addClickEvent(
    `.${menu_class_name}--toggle`, 
    window.toggleMobileMenu
);