import auth from '../../../../src/authService';

export async function get(req) {
    console.log(req);

    let webAuth = await auth.createWebClient();

    //@ts-ignore
    webAuth.popup.callback();

    // return {
    //     body: {
    //         message: 'hello',
    //         ss: req
    //     }
    // };
}

export async function post(req) {
    alert('ps');
    alert(req);
}
