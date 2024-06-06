import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const CreatePost = (props) => {
  const cancelRef = React.useRef();
  const toast = useToast();
  const [isLoading , setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  async function onSubmit(values) {
    setIsLoading(true);
    values.user_id = props.userId;
    const bodyData = {
        data : values,
        url : '/posts'
      };
    const response = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify(bodyData),
      })
   
      const data = await response.json()
      
      if(data.id){
        toast({
            title: `Post created successfully`,
            status: 'success',
            isClosable: true,
          })
        props?.getUserPostById();
        setIsLoading(false);
        reset();
        props?.onClose()
      }else{
        setIsLoading(false);
      }
    }

    useEffect(() => {
        if(props.isOpen){
          reset()
        }
    },[props.isOpen, reset])

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
      isOpen={props.isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <AlertDialogContent>
          <AlertDialogHeader>Create Post</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormControl isInvalid={errors.title} marginBottom={2}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                placeholder="Enter Title"
                {...register("title", {
                  required: "Title is required",
                })}
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.body} marginBottom={2}>
              <FormLabel htmlFor="body">Content</FormLabel>
              <Textarea
                id="body"
                placeholder="Enter Content"
                rows={6}
                {...register("body", {
                  required: "Content is required",
                })}
              />
              <FormErrorMessage>
                {errors.body && errors.body.message}
              </FormErrorMessage>
            </FormControl>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button isLoading={isLoading}  type="submit">Save</Button>
            <Button
              disabled={isLoading}  
              colorScheme="red"
              ml={3}
              ref={cancelRef}
              onClick={props.onClose}
            >
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </form>
    </AlertDialog>
  );
};
export default CreatePost;
