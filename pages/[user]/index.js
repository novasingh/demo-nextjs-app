import CreatePost from "@/components/CreatePost";
import Post from "@/components/Post";
import UserDetailCard from "@/components/UserDetailCard";
import { Button, Container, Flex, Text, useDisclosure } from "@chakra-ui/react";
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoChevronBackCircleSharp } from "react-icons/io5";

const UserDetails = () => {
  const data = useParams();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUsersPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // GET USER DATA BY ID
  const getUserDataById = useCallback(async () => {
    if (data?.user !== "" && data?.user !== undefined) {
      setLoading(true);
      const res = await fetch(`/api/get?url=/users/${data?.user}`);
      const newData = await res.json();
      setUserData(newData);
      setLoading(false);
    }
  }, [data?.user]);

  // GET USER POST BY USER ID
  const getUserPostById = useCallback(async () => {
    if (data?.user !== "" && data?.user !== undefined) {
      setLoading(true);
      const res = await fetch(`/api/get?url=/users/${data?.user}/posts`);
      const newData = await res.json();
      setUsersPosts(newData);
      setLoading(false);
    }
  }, [data?.user]);

  useEffect(() => {
        getUserDataById();
        getUserPostById();
  }, [ getUserDataById, getUserPostById]);

  return (
    <Container
      maxW="container.xl"
      bg="white"
      mt={10}
      borderRadius={10}
      boxShadow={"lg"}
    >
      <Link mt="5"  position="absolute" as={NextLink} href="/"><IoChevronBackCircleSharp fontSize={40} color="teal" /></Link>
      <CreatePost
        isOpen={isOpen}
        onClose={onClose}
        userId={userData?.id}
        getUserPostById={getUserPostById}
      />
      <UserDetailCard userData={userData} loading={loading} />
      <Flex px={5} justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize={22} fontWeight={600}>
          Posts
        </Text>
        <Button
          my={4}
          onClick={() => onOpen()}
          colorScheme="teal"
          variant="solid"
        >
          Create Post
        </Button>
      </Flex>
      <Post postList={userPosts} loading={loading} userData={userData} />
    </Container>
  );
};
export default UserDetails;
