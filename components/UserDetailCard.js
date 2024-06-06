import {
  Center,
  Box,
  Avatar,
  Heading,
  Text,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";

const UserDetailCard = ({ userData , loading }) => {
  return !loading && userData !== null ? (
    <Center py={6} mt="5">
      <Box
        maxW={"320px"}
        w={"full"}
        boxShadow={"base"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          name={userData?.name}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: userData?.status === "active" ? "green.300" : "red.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {userData?.name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {userData?.email}
        </Text>
      </Box>
    </Center>
  ) : loading && userData === null && (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        boxShadow={"base"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <SkeletonCircle size="95" margin={"0px auto"} mb="10" />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          <Skeleton height="20px" />
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          <SkeletonText mt="4" noOfLines={2} spacing="2" skeletonHeight="2" />
        </Text>
      </Box>
    </Center>
  );
};
export default UserDetailCard;
