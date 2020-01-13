import * as AddressFormatter from '../../../lib/services/address-formatter';

const address = '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH';
const addressWithZeroX = '0x5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH';

test('Make address Shorter', async () => {
  const shortAddress = AddressFormatter.shortenAddress(address);
  expect(shortAddress).toBe('5DqgCh...cDsH');
});

test('add 0x to address', async () => {
  const newAddress = AddressFormatter.addZeroX(address);
  expect(newAddress).toBe(addressWithZeroX);
});

test('remove 0x to address', async () => {
  const addressWithoutZeroX = AddressFormatter.removeZeroX(addressWithZeroX);
  expect(addressWithoutZeroX).toBe(address);
});
