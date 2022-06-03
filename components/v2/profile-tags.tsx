import { Flex, Tag, TagLabel, Text } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { X } from 'phosphor-react';
import { useState } from 'react';
import { tagsAtom } from '../../atoms/tags';

const ProfileTags: React.FC = () => {
  const [tags, setTags] = useAtom(tagsAtom);
  const [tagData, setTagData] = useState<string[]>([
    'Bug Bounties',
    'Front-end development',
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
  ]);
  const [activeTags, setActiveTags] = useState<string[]>([
    'Blockchain',
    'Back-end development',
    'Game Design',
  ]);

  const handleClick = (tag: string) => {
    tags[tag] = !tags[tag];
    setTags({ ...tags });
    if (!tags[tag]) {
      setActiveTags(activeTags.filter((t) => t !== tag));
      setTagData((s) => [...s, tag]);
    } else {
      setActiveTags((s) => [...s, tag]);
      setTagData(tagData.filter((t) => t !== tag));
    }
  };

  return (
    <>
      <Text>Active tags</Text>
      <Flex gap="10px" flexWrap="wrap" width="100%">
        {activeTags.map((tag) => (
          <Tag
            onClick={() => handleClick(tag)}
            _hover={{
              cursor: 'pointer',
            }}
            key={tag}
            pr="1"
          >
            <TagLabel mr="3px">{tag}</TagLabel>

            {tags[tag] && <X size="15" />}
          </Tag>
        ))}
      </Flex>
      <Text>All tags</Text>
      <Flex flexWrap="wrap" gap="10px" width="100%">
        {tagData.map((tag) => (
          <Tag
            key={tag}
            _hover={{
              cursor: 'pointer',
            }}
            onClick={() => handleClick(tag)}
          >
            {tag}
          </Tag>
        ))}
      </Flex>
    </>
  );
};
export default ProfileTags;
