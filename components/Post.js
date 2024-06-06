import {
  Stack,
  Box,
  Heading,
  HStack,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import CommentBox from "./CommentBox";

const Post = ({ postList, loading, userData }) => {
  const [commentShow, setCommentShow] = useState(false);
  const [activeCommentBox, setActiveCommentBox] = useState("6949836");
  const [isLoading, setIsLoading] = useState(true);
  const [commentData, setCommentData] = useState();

  // GET POST COMMENT BY POST ID
  const getCommentsByPostId = async (id) => {
    setIsLoading(true);
    const res = await fetch(`/api/get?url=/posts/${id}/comments`);
    const newData = await res.json();
    setCommentData(newData);
    setIsLoading(false);
  };

  const openComments = (post) => {
    if (commentShow && activeCommentBox === post.id) {
      setCommentShow(false);
      setActiveCommentBox("");
    } else {
      setCommentShow(true);
      setActiveCommentBox(post.id);
      getCommentsByPostId(post.id);
    }
  };

  return !loading ? (
    <Stack>
      {postList.length > 0 ? (
        postList.map((post, index) => (
          <Box
            key={`post-listing-` + index}
            rounded={"md"}
            my={5}
            mx={[0, 5]}
            overflow={"hidden"}
            bg="white"
            border={"1px"}
            borderColor="grey"
            boxShadow="base"
          >
            <Box p={4}>
              <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
                {post.title}
              </Heading>
              <Text color={"gray.500"} noOfLines={2}>
                {post.body}
              </Text>
            </Box>
            <HStack borderTop={"1px"} color="black">
              <Flex
                p={4}
                alignItems="center"
                justifyContent={"space-between"}
                roundedBottom={"sm"}
                cursor={"pointer"}
                w="full"
              >
                <Text fontSize={"md"} fontWeight={"semibold"}>
                  Comments
                </Text>
              </Flex>
              <Flex
                p={4}
                alignItems="center"
                justifyContent={"space-between"}
                roundedBottom={"sm"}
                borderLeft={"1px"}
                cursor="pointer"
                onClick={() => openComments(post)}
              >
                {commentShow && activeCommentBox === post.id ? (
                  <FaComment fontSize={"24px"} />
                ) : (
                  <FaRegComment fontSize={"24px"} />
                )}
              </Flex>
            </HStack>

            {activeCommentBox === post.id && commentShow && (
              <CommentBox
                postId={activeCommentBox}
                commentData={commentData}
                isLoading={isLoading}
                userData={userData}
                getCommentsByPostId={(e) => getCommentsByPostId(e)}
              />
            )}
          </Box>
        ))
      ) : (
        <Text fontSize={16} my="5" textAlign="center">
          No post found
        </Text>
      )}
    </Stack>
  ) : (
    loading && (
      <Box
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="grey"
        boxShadow="base"
      >
        <Box p={4}>
          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            <Skeleton height="15px" />
          </Heading>
          <Text color={"gray.500"} noOfLines={2}>
            <SkeletonText mt="2" noOfLines={2} spacing="3" skeletonHeight="2" />
          </Text>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              Comments
            </Text>
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            cursor="pointer"
            onClick={() => setLiked(!liked)}
          >
            <FaRegComment fontSize={"24px"} />
          </Flex>
        </HStack>
      </Box>
    )
  );
};
export default Post;
