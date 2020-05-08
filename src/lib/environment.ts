/**
 * Returns whether the test is currently running on an iOS Simulator or not.
 */
export function isIosSimulator(): boolean {
    /**
     *  iOS Simulators have a UDID in the format of XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     *  With X being a hexadecimal value.
     */
    const udid = browser.capabilities.udid;
    return (
        browser.isIOS &&
        !!udid &&
        udid.length === 36 &&
        udid.charAt(8) === '-' &&
        udid.charAt(13) === '-' &&
        udid.charAt(18) === '-' &&
        udid.charAt(23) === '-'
    );
}
