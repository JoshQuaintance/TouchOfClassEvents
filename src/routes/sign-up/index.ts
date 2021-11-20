/**
 * File Location: src/routes/sign-up/index.ts
 * Description: Endpoint for user signup
 */


export async function post(req) {

}

/**
 * Checks if the user exists using email and username
 *
 * ```
 * Returns codes:
 * 0: User doesn't exist,
 * 1: User exist from email,
 * 2: user exist from username
 * ```
 *
 * Note: User exist from email code will always precede
 *      user exist form username code
 */
export async function checkIfUserExist(email: string, nickname: string): Promise<0 | 1 | 2>  {

    // using http again, hitting the auth endpoint
    // specifically to check if user exist
    // endpoint src file located: src/routes/auth/user-exist.ts
    const res = await fetch('/auth/user-exist', {
        method: 'POST',
        body: JSON.stringify({
            email,
            nickname
        })
    });

    const jsonRes = await res.json();

    if (jsonRes.code == 'user-not-exist') return 0;
    if (jsonRes.code == 'user-email-exist') return 1;
    if (jsonRes.code == 'user-nickname-exist') return 2;
}
