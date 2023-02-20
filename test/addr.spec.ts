import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { expect } from 'chai';
import { addrTestScenarios } from './scenarios/addr';
import { ZERO_ADDRESS } from '@frugalwizard/abi2ts-lib';

chai.use(chaiAsPromised);

describe('addr', () => {
    for (const scenario of addrTestScenarios) {
        scenario.describe(({ it }) => {
            it('should return expected value', async (test) => {
                const { state, id } = scenario;
                const expectedAccount = state.account(id);
                expect(await test.execute())
                    .to.be.equal(expectedAccount ? test[expectedAccount] : ZERO_ADDRESS);
            });
        });
    }
});
