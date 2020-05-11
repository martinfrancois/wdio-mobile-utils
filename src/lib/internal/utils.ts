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

/**
 * Represents an error implying the iOS selector was accessed while being null.
 * This is used in cases where the selector was not defined, yet it was still accessed.
 * @internal
 */
export const IOS_SELECTOR_NULL_ERROR =
    'iOS selector is null, but an attempt was made to access it on iOS. Please define a selector if you want to use it on iOS.';

/**
 * Represents an error implying the Android selector was accessed while being null.
 * This is used in cases where the selector was not defined, yet it was still accessed.
 * @internal
 */
export const ANDROID_SELECTOR_NULL_ERROR =
    'Android selector is null, but an attempt was made to access it on Android. Please define a selector if you want to use it on Android.';

/**
 * Represents an error implying both Android and iOS Selectors used to create a selector were null.
 * Since it doesn't make sense to not specify any selectors, this should prevent user errors.
 * @internal
 */
export const SELECTOR_NULL_ERROR =
    'Both Android and iOS Selectors are null, please define at least a selector for one platform.';

/**
 * Represents an error implying an Selector with null as its AndroidSelector was combined with a Selector with null as IosSelector.
 * Since this would result in a selector with null on both platforms, it wouldn't be usable on either Android or iOS.
 * @internal
 */
export const COMBINATION_SELECTOR_NULL_ERROR =
    'A selector with an Android selector of null cannot be combined with an iOS selector of null, as the resulting selector would be null on both platforms.';
