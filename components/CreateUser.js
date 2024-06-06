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
  Select,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const CreateUser = (props) => {
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
    const bodyData = {
      data : values,
      url : '/users'
    };
    const response = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify(bodyData)
      })
   
      const data = await response.json()

      if(data.id){
        toast({
            title: `User created successfully`,
            status: 'success',
            isClosable: true,
          })
        props?.getUsersListing();
        setIsLoading(false);  
        reset();
        props.onClose()
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
          <AlertDialogHeader>Create User</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormControl isInvalid={errors.name} marginBottom={2}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                placeholder="Enter Name"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 25,
                    message: 'Maximum length is 25 characters'
                  }
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email} marginBottom={2}>
              <FormLabel htmlFor="email">Email Id</FormLabel>
              <Input
                id="email"
                placeholder="Enter Email Id"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.gender} marginBottom={2}>
              <FormLabel htmlFor="gender">Gender</FormLabel>
              <Select
                id="gender"
                placeholder="Select Gender"
                {...register("gender", {
                  required: "Gender is required",
                })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
              <FormErrorMessage>
                {errors.gender && errors.gender.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.status} marginBottom={2}>
              <FormLabel htmlFor="status">Status</FormLabel>
              <Select
                id="status"
                placeholder="Select Status"
                {...register("status", {
                  required: "Status is required",
                })}
              >
                <option value="active">Active</option>
                <option value="inactive">inactive</option>
              </Select>
              <FormErrorMessage>
                {errors.status && errors.status.message}
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
export default CreateUser;
