import { Button } from '@chakra-ui/button'

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({ 
  isCurrent = false, 
  onPageChange,
  number}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button 
        size="sm" 
        fontSize="xs"
        w="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bgColor: 'pink.500',
          cursor: 'default',
        }}
      >
        {number}
      </Button>
    )
  }
  return (
    <Button size="sm" 
      fontSize="xs"
      w="4"
      bgColor="gray.700"
      _hover={{
        bg: 'gray.500'
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}