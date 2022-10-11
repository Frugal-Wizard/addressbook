import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { expect } from 'chai';
import { describeError } from '@frugal-wizard/contract-test-helper';
import { Registered } from '../dist/AddressBook';
import { deployTestScenarios } from './scenarios/deployTestScenarios';
import { registerTestScenarios } from './scenarios/registerTestScenarios';
import { idTestScenarios } from './scenarios/idTestScenarios';
import { addrTestScenarios } from './scenarios/addrTestScenarios';
import { ZERO_ADDRESS } from '@frugal-wizard/abi2ts-lib';

chai.use(chaiAsPromised);

describe('AddressBook', () => {
    describe('deploy', () => {
        for (const scenario of deployTestScenarios) {
            scenario.describe(({ it }) => {
                if (scenario.expectedError) {
                    it('should fail', async (test) => {
                        await expect(test.execute())
                            .to.be.rejected;
                    });

                    it(`should fail with ${describeError(scenario.expectedError)}`, async (test) => {
                        await expect(test.executeStatic())
                            .to.be.rejectedWith(scenario.expectedError as typeof Error);
                    });

                } else {
                    it('should deploy with last id at zero', async (test) => {
                        const addressBook = await test.execute();
                        expect(await addressBook.lastId())
                            .to.be.equal(0n);
                    });
                }
            });
        }
    });

    describe('register', () => {
        for (const scenario of registerTestScenarios) {
            scenario.describe(({ it }) => {
                if (scenario.expectedError) {
                    it('should fail', async (test) => {
                        await expect(test.execute())
                            .to.be.rejected;
                    });

                    it(`should fail with ${describeError(scenario.expectedError)}`, async (test) => {
                        await expect(test.executeStatic())
                            .to.be.rejectedWith(scenario.expectedError as typeof Error);
                    });

                } else {
                    it('should increase the id of the last registered address', async (test) => {
                        const id = await test.addressBook.lastId() + 1n;
                        await test.execute();
                        expect(await test.addressBook.lastId())
                            .to.be.equal(id);
                    });

                    it('should return the new id', async ({ executeStatic, addressBook }) => {
                        const id = await addressBook.lastId() + 1n;
                        expect(await executeStatic())
                            .to.be.equal(id);
                    });

                    it('should assign the registered address to the new id', async (test) => {
                        await test.execute();
                        const id = await test.addressBook.lastId();
                        expect(await test.addressBook.id(test.account))
                            .to.be.equal(id);
                    });

                    it('should assign the new id to the registered address', async (test) => {
                        await test.execute();
                        const id = await test.addressBook.lastId();
                        expect(await test.addressBook.addr(id))
                            .to.be.equal(test.account);
                    });

                    it('should emit Registered', async (test) => {
                        const { events } = await test.execute();
                        const addressBookEvents = events.filter(({ address }) => address == test.addressBook.address);
                        expect(addressBookEvents)
                            .to.have.length(1);
                        expect(addressBookEvents[0])
                            .to.be.instanceOf(Registered)
                            .to.include({
                                addr: test.account,
                                id: await test.addressBook.lastId()
                            });
                    });
                }
            });
        }
    });

    describe('id', () => {
        for (const scenario of idTestScenarios) {
            scenario.describe(({ it }) => {
                if (scenario.expectedError) {
                    it('should fail', async (test) => {
                        await expect(test.execute())
                            .to.be.rejected;
                    });

                    it(`should fail with ${describeError(scenario.expectedError)}`, async (test) => {
                        await expect(test.executeStatic())
                            .to.be.rejectedWith(scenario.expectedError as typeof Error);
                    });

                } else {
                    it('should return expected value', async (test) => {
                        const { stateAfterSetup, accountIndex } = scenario;
                        expect(await test.execute())
                            .to.be.equal(stateAfterSetup.id(accountIndex) ?? 0n);
                    });
                }
            });
        }
    });

    describe('addr', () => {
        for (const scenario of addrTestScenarios) {
            scenario.describe(({ it }) => {
                if (scenario.expectedError) {
                    it('should fail', async (test) => {
                        await expect(test.execute())
                            .to.be.rejected;
                    });

                    it(`should fail with ${describeError(scenario.expectedError)}`, async (test) => {
                        await expect(test.executeStatic())
                            .to.be.rejectedWith(scenario.expectedError as typeof Error);
                    });

                } else {
                    it('should return expected value', async (test) => {
                        const { stateAfterSetup, id } = scenario;
                        const expectedAccountIndex = stateAfterSetup.accountIndex(id);
                        expect(await test.execute())
                            .to.be.equal(expectedAccountIndex !== undefined ? test.accounts[expectedAccountIndex] : ZERO_ADDRESS);
                    });
                }
            });
        }
    });
});
