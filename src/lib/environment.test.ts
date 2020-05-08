import { isIosSimulator } from './environment';

describe('isIosSimulator', function () {
    const udidReal1 = '12345678-901A234B567C890D';
    const udidReal2 = '123ab45c6d78e9fab0123b456cd78e90f1abc234';

    // same length, no dashes
    const udidReal0d1 = '123ab45c6d78e9fab0123b456cd78e90f1ab';
    // 1 dash
    const udidReal1d1 = '123ab45c-d78e9fab0123b456cd78e90f1ab';
    const udidReal1d2 = '123ab45c6d78e-fab0123b456cd78e90f1ab';
    const udidReal1d3 = '123ab45c6d78e9fab0-23b456cd78e90f1ab';
    const udidReal1d4 = '123ab45c6d78e9fab0123b4-6cd78e90f1ab';
    // 2 dashes
    const udidReal2d1 = '123ab45c-d78e-fab0123b456cd78e90f1ab';
    const udidReal2d2 = '123ab45c6d78e-fab0-23b456cd78e90f1ab';
    const udidReal2d3 = '123ab45c6d78e9fab0-23b4-6cd78e90f1ab';
    const udidReal2d4 = '123ab45c-d78e9fab0-23b456cd78e90f1ab';
    const udidReal2d5 = '123ab45c-d78e9fab0123b4-6cd78e90f1ab';
    const udidReal2d6 = '123ab45c6d78e-fab0123b4-6cd78e90f1ab';
    // 3 dashes
    const udidReal3d1 = '123ab45c-d78e-fab0-23b456cd78e90f1ab';
    const udidReal3d2 = '123ab45c6d78e-fab0-23b4-6cd78e90f1ab';

    const udidSim1 = '123A4BC5-D6E7-8901-F2A3-B45CD678E9F0';
    const udidSim2 = 'BF579136-7492-4890-B916-40BF4BE80B8A';

    it.each`
        isIOS    | udid           | result
        ${true}  | ${udidReal1}   | ${false}
        ${true}  | ${udidReal2}   | ${false}
        ${true}  | ${udidReal0d1} | ${false}
        ${true}  | ${udidReal1d1} | ${false}
        ${true}  | ${udidReal1d2} | ${false}
        ${true}  | ${udidReal1d3} | ${false}
        ${true}  | ${udidReal1d4} | ${false}
        ${true}  | ${udidReal2d1} | ${false}
        ${true}  | ${udidReal2d2} | ${false}
        ${true}  | ${udidReal2d3} | ${false}
        ${true}  | ${udidReal2d4} | ${false}
        ${true}  | ${udidReal2d5} | ${false}
        ${true}  | ${udidReal2d6} | ${false}
        ${true}  | ${udidReal3d1} | ${false}
        ${true}  | ${udidReal3d2} | ${false}
        ${true}  | ${udidSim1}    | ${true}
        ${true}  | ${udidSim2}    | ${true}
        ${false} | ${udidReal1}   | ${false}
        ${false} | ${udidReal2}   | ${false}
        ${false} | ${udidReal0d1} | ${false}
        ${false} | ${udidReal1d1} | ${false}
        ${false} | ${udidReal1d2} | ${false}
        ${false} | ${udidReal1d3} | ${false}
        ${false} | ${udidReal1d4} | ${false}
        ${false} | ${udidReal2d1} | ${false}
        ${false} | ${udidReal2d2} | ${false}
        ${false} | ${udidReal2d3} | ${false}
        ${false} | ${udidReal2d4} | ${false}
        ${false} | ${udidReal2d5} | ${false}
        ${false} | ${udidReal2d6} | ${false}
        ${false} | ${udidReal3d1} | ${false}
        ${false} | ${udidReal3d2} | ${false}
        ${false} | ${udidSim1}    | ${false}
        ${false} | ${udidSim2}    | ${false}
    `(
        'should return "$expectedOutput" when providing "$input"',
        ({ isIOS, udid, result }) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore mock browser for testing
            global.browser = {
                capabilities: {
                    udid: udid,
                },
                isIOS: isIOS,
            };

            // then
            expect(isIosSimulator()).toEqual(result);
        }
    );
});
