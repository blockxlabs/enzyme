import { migration1to2 } from './002';
import { migration2to3 } from './003';
import { migration3to4 } from './004';
import { migration4to5 } from './005';

const Migrations = jest.genMockFromModule('./');

Migrations.migration1to2 = migration1to2;
Migrations.migration2to3 = migration2to3;
Migrations.migration3to4 = migration3to4;
Migrations.migration4to5 = migration4to5;

export default Migrations;
