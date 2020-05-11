export enum Os {
    IOS = 'IOS',
    ANDROID = 'ANDROID',
}

/**
 * Verifies the appId (Android) or bundleId (iOS) was defined or else throws an OS-specific error message.
 * @param id appId (Android) or bundleId (iOS)
 * @param os operating system under test
 * @internal
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

/**
 * Checks whether the supplied argument is of type string or not.
 * @param maybeString argument to check if it's a string
 * @returns true if it's a string, false in all other cases
 * @internal
 */
export function isString<T>(maybeString: T): boolean {
    return typeof maybeString === 'string';
}

/**
 * Represents an error implying the platform used is not supported.
 * This is used in cases where the platform is neither Android nor iOS.
 * @internal
 */
export const UNSUPPORTED_PLATFORM_ERROR =
    'You are using an unsupported platform, only Android and iOS are supported!';
