import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { expect } from 'chai';
import { Registered } from '../src/AddressBook';
import { registerTestScenarios } from './scenarios/register';

chai.use(chaiAsPromised);

describe('register', () => {
    for (const scenario of registerTestScenarios) {
        scenario.describe(({ it }) => {
            if (scenario.expectedError) {
                it('should fail', async (test) => {
                    await expect(test.execute())
                        .to.be.rejected;
                });

                it(`should fail with ${scenario.expectedError.name}`, async (test) => {
                    await expect(test.executeStatic())
                        .to.be.rejected.and.eventually.be.deep.equal(scenario.expectedError);
                });

            } else {
                it('should increase the id of the last registered address', async (test) => {
                    const id = await test.addressBook.lastId() + 1n;
                    await test.execute();
                    expect(await test.addressBook.lastId())
                        .to.be.equal(id);
                });

                it('should return the new id', async (test) => {
                    const id = await test.addressBook.lastId() + 1n;
                    expect(await test.executeStatic())
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
                    const expectedId = await test.addressBook.lastId();
                    expect(events)
                        .to.have.length(1);
                    expect(events[0])
                        .to.be.instanceOf(Registered)
                        .that.satisfies((event: Registered) => {
                            expect(event.address)
                                .to.be.equal(test.addressBook.address);
                            expect(event.addr)
                                .to.be.equal(test.account);
                            expect(event.id)
                                .to.be.equal(expectedId);
                            return true;
                        });
                });
            }
        });
    }
});
