export enum Os {
    IOS = 'IOS',
    ANDROID = 'ANDROID',
}

/**
 * Verifies the appId (Android) or bundleId (iOS) was defined or else throws an OS-specific error message.
 * @param id appId (Android) or bundleId (iOS)
 * @param os operating system under test
 */
export function assertIdDefined(id: string | undefined, os: Os) {
    if (!id) {
        if (os === Os.IOS) {
            throw new Error('No bundleId was specified for iOS');
        } else if (os === Os.ANDROID) {
            throw new Error('No appId was specified for Android');
        }
    }
}
