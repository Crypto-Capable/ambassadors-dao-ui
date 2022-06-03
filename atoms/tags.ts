import { atom } from 'jotai';

export const tagsAtom = atom<Record<string, boolean>>({
  'Bug Bounties': false,
  'Game Design': true,
  'Front-end development': false,
  'Back-end development': true,
  Blockchain: true,
  'Smart Contracts': false,
  DBMS: false,
  Python: false,
  CSS: false,
  Rust: false,
  'React.js': false,
  'Node.js': false,
  'Vue.js': false,
  JavaScript: false,
  'Angular.js': false,
  AssemblyScript: false,
  Solidity: false,
});
