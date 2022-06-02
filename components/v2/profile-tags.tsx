import { Flex, Tag, TagLabel, Text } from '@chakra-ui/react';
import { useAtom, useAtomValue } from 'jotai';
import { X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { tagsAtom } from '../../atoms/tags';

export type TagItemProps = {
  label: string;
};
// export const TagItem: React.FC<TagItemProps> = ({ label }) => {
//   const [tags, setTags] = useAtom(tagsAtom);
//   tags[label] = !tags[label];

//   return (
//     <Tag
//       _hover={{
//         cursor: 'pointer',
//       }}
//       onClick={handleClick}
//     >
//       <TagLabel>{label}</TagLabel>
//       <X size="20" />
//     </Tag>
//   );
// };

const tagData: string[] = [
  'Bug Bounties',
  'Game Design',
  'Front-end development',
  'Back-end development',
  'Blockchain',
  'Smart Contracts',
  'DBMS',
  'Python',
  'CSS',
  'Rust',
  'React.js',
  'Node.js',
  'Vue.js',
  'JavaScript',
  'Angular.js',
  'AssemblyScript',
  'Solidity',
];

const ProfileTags: React.FC = () => {
  const [tags, setTags] = useAtom(tagsAtom);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const handleClick = (tag: string) => {
    tags[tag] = !tags[tag];
    setTags(tags);
    if (tags[tag] === false) {
      setActiveTags(activeTags.filter((t) => t !== tag));
    } else {
      setActiveTags((s) => [...s, tag]);
    }
  };

  return (
    <>
      <Text> Active tags</Text>
      <Flex gap="10px" flexWrap="wrap" width="100%">
        {activeTags.map((tag) => (
          <Tag
            key={tag}
            _hover={{
              cursor: 'pointer',
            }}
            onClick={() => handleClick(tag)}
          >
            <TagLabel>{tag}</TagLabel>
            <X size="20" />
          </Tag>
        ))}
      </Flex>
      <Text> All tags</Text>
      <Flex flexWrap="wrap" gap="10px" width="100%">
        {tagData.map((tag) => (
          <Tag
            key={tag}
            _hover={{
              cursor: 'pointer',
            }}
            onClick={() => handleClick(tag)}
          >
            <TagLabel>{tag}</TagLabel>
            <X size="20" />
          </Tag>
        ))}
      </Flex>
    </>
  );
};
export default ProfileTags;
