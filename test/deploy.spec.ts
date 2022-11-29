import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { expect } from 'chai';
import { deployTestScenarios } from './scenarios/deploy';

chai.use(chaiAsPromised);

describe('deploy', () => {
    for (const scenario of deployTestScenarios) {
        scenario.describe(({ it }) => {
            it('should deploy with last id at zero', async (test) => {
                const addressBook = await test.execute();
                expect(await addressBook.lastId())
                    .to.be.equal(0n);
            });
        });
    }
});
