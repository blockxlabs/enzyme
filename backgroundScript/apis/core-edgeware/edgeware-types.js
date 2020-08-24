//Original Source: https://www.npmjs.com/package/edgeware-node-types
//Original Author: Jake Naviasky (Commonwealth)

import * as edgewareDefinitions from 'edgeware-node-types/interfaces/definitions';

const types = Object.values(edgewareDefinitions).reduce(
  (res, { types }) => ({ ...res, ...types }),
  {},
);

// override duplicate type name
export const typesAlias = { voting: { Tally: 'VotingTally' } };

export const edgeWareTypes = {
  ...types,
  // aliases that don't do well as part of interfaces
  'voting::VoteType': 'VoteType',
  'voting::TallyType': 'TallyType',
  // chain-specific overrides
  Address: 'GenericAddress',
  Keys: 'SessionKeys4',
  StakingLedger: 'StakingLedgerTo223',
  Votes: 'VotesTo230',
  ReferendumInfo: 'ReferendumInfoTo239',
};
