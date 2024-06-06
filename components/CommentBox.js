import {
  Avatar,
  Box,
  CircularProgress,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CommentBox = ({ postId, commentData, isLoading, userData , getCommentsByPostId }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [commentLoading , setCommentLoading] = useState(false);
  const toast = useToast();

  async function onSubmit(values) {
    values.post_id = postId;
    values.name = userData.name;
    values.email = userData.email;
    setCommentLoading(true);
    const bodyData = {
      data : values,
      url : '/comments'
    };
    const response = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify(bodyData)
      })

      const data = await response.json()

      if(data.id){
        toast({
            title: `Comment created successfully`,
            status: 'success',
            isClosable: true,
          })
        setCommentLoading(false);
        getCommentsByPostId(postId);
        reset();
      }else{
        setCommentLoading(false);
      }
  }

  return (
    <Stack>
      {isLoading ? (
        <Flex
          p={4}
          gap="5"
          borderTop={"1px"}
          color="black"
          alignItems="center"
          justifyContent={"center"}
        >
          <CircularProgress isIndeterminate color="teal" />
        </Flex>
      ) : (
        <div>
          {commentData?.map((item) => (
            <Flex
              key={`comment-${item.id}`}
              p={4}
              gap="5"
              borderTop={"1px"}
              color="black"
              alignItems="center"
            >
              <Avatar name={item.name} size="md" />
              <Box>
                <Text fontSize={14} fontWeight={600}>
                  {item.name}
                </Text>
                <Text fontSize={14}>{item.body}</Text>
              </Box>
            </Flex>
          ))}
        </div>
      )}
      <Flex p={4} gap="5" borderTop={"1px"} color="black" alignItems="center">
        <Avatar name="Test User" size="md" />
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.body}>
            <Input
              id="body"
              borderRadius={50}
              placeholder="Enter Comment"
              {...register("body", {
                required: "Comment is required",
              })}
            />
            <FormErrorMessage>
              {errors.body && errors.body.message}
            </FormErrorMessage>
          </FormControl>
        </form>
      </Flex>
    </Stack>
  );
};
export default CommentBox;
