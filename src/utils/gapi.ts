/**
 * File Location: src/utils/gapi.ts
 * Description: Initializer for the Google API script
 */

/**
 * Takes in a callback to run after GAPI is initialized
 * Since the callback will change every time this function is run
 * gapi will only run whatever callback was given last. 
 * 
 * ? NOTE:
 * ? This approach can be dangerous, but because our script source is
 * ? a predetermined link, we know exactly what's going to be served,
 * ? but if one doesn't know what script is being served, we recommend
 * ? NOT to use this approach
 */
export const initGAPI = (callback: (GoogleAuthClient: any) => void | any) => {
    const element = document.createElement('script');

    // Create a global function that can be ran by gapi later
    window['apiLoaded'] = () => {
        if (!window['gapi']) return console.warn('gapi is not initialized yet!');

        const gapi = window['gapi'];

        gapi.load('auth2', async () => {
            // Check if we have an auth instance yet, otherwise create one
            let GoogleAuthClient =
                gapi.auth2.getAuthInstance() ||
                gapi.auth2.init({
                    client_id: '481928203178-8gbnbea8kad8e3rjm0l06ejafno82kl8.apps.googleusercontent.com'
                });

            // Run the callback after gapi has initialized
            GoogleAuthClient.then(
                () => callback(GoogleAuthClient),
                (e) => console.error(e)
            );
        });
    };

    // If the gapi script element doesn't exist, then we'll create one and append it to the DOM
    if (!document.getElementById('gapi-init-script')) {
        element.src = `https://apis.google.com/js/api:platform.js?onload=apiLoaded`;
        element.id = 'gapi-init-script';
        document.body.appendChild(element);
    } else {
        // If we already have one, then just run the global function
        window['apiLoaded']();
    }
};
