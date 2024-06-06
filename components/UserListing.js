import { useRouter } from "next/router";

const { Stack, Skeleton, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Avatar, Badge, Button, Flex } = require("@chakra-ui/react")

const UserListing = ({loading , userList, handlePageChange, page}) => {
    const router = useRouter();
    
    return (
        loading ? (
            <Stack>
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
            </Stack>
          ) : (
            <>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Gender</Th>
                      <Th>Email</Th>
                      <Th>Status</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {userList.length > 0 ? (
                      userList.map((item, i) => (
                        <Tr key={"tr-" + i}>
                          <Td>
                            <Avatar size="xs" marginEnd={3} name={item.name} />
                            {item.name}
                          </Td>
                          <Td>{item.gender}</Td>
                          <Td>{item.email}</Td>
                          <Td>
                            {item.status === "active" ? (
                              <Badge variant="solid" colorScheme="green">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="solid" colorScheme="red">
                                Inactive
                              </Badge>
                            )}
                          </Td>
                          <Td>
                            <Button
                              size={"sm"}
                              onClick={() => {
                                router.push(`/${item.id}`)
                              }}
                              variant="outline"
                              colorScheme="Teal"
                              color="Teal"
                            >
                              {" "}
                              View{" "}
                            </Button>
                          </Td>
                        </Tr>
                      ))
                    ) : (
                      <Tr>
                        <Td colSpan={5} textAlign={"center"} fontSize={16}>No data found</Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
              {userList.length > 0 && (
                <Flex py="5" justifyContent={"center"} gap={2}>
                  <Button
                    onClick={() =>
                      page !== 1 ? handlePageChange(page - 1) : null
                    }
                    marginEnd={10}
                    size={"md"}
                    colorScheme="teal"
                    variant="solid"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => handlePageChange(page + 1)}
                    colorScheme="teal"
                    size={"md"}
                    px="8"
                    variant="solid"
                  >
                    Next
                  </Button>
                </Flex>
              )}
              </>
            )
    )
}
export default UserListing;