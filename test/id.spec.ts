import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { expect } from 'chai';
import { idTestScenarios } from './scenarios/id';

chai.use(chaiAsPromised);

describe('id', () => {
    for (const scenario of idTestScenarios) {
        scenario.describe(({ it }) => {
            it('should return expected value', async (test) => {
                const { state, account } = scenario;
                expect(await test.execute())
                    .to.be.equal(state.id(account) ?? 0n);
            });
        });
    }
});
