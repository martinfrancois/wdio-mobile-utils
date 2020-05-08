/**
 * Returns whether the test is currently running on an iOS Simulator or not.
 *
 * iOS Simulators have a UDID in the format of XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 * With X being a hexadecimal value.
 */
export function isIosSimulator() {
    const udid = browser.capabilities.udid;
    return (
        browser.isIOS &&
        udid &&
        udid.length === 36 &&
        udid.charAt(8) === '-' &&
        udid.charAt(13) === '-' &&
        udid.charAt(18) === '-' &&
        udid.charAt(23) === '-'
    );
}
