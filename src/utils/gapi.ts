export const initGAPI = (callback: (GoogleAuthClient: any) => void | any) => {
    const element = document.createElement('script');

    window['apiLoaded'] = () => {
        if (!window['gapi']) return console.warn("gapi doesn't exist yet i guess");
        const gapi = window['gapi'];
        gapi.load('auth2', async () => {
            let GoogleAuthClient =
                gapi.auth2.getAuthInstance() ||
                gapi.auth2.init({
                    client_id: '481928203178-8gbnbea8kad8e3rjm0l06ejafno82kl8.apps.googleusercontent.com'
                });

            GoogleAuthClient.then(() => callback(GoogleAuthClient), (e) => console.error(e));
        });
    };
    if (!document.getElementById('gapi-init-script')) {
        element.src = `https://apis.google.com/js/api:platform.js?onload=apiLoaded`;
        element.id = 'gapi-init-script';
        document.body.appendChild(element);
    } else {
        window['apiLoaded']();
    }
};
