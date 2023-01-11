import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" text-align="right">
          <Text>Sergio Felippe</Text>
          <Text color="gray.300" fontSize="small">
            smfelip@gmail.com
          </Text>
        </Box>
      )}

        <Avatar size="md" name="Sergio Felippe" src="https://github.com/smfelippe.png"/>
    </Flex>
  );
}