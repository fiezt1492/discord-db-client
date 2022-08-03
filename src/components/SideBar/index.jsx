import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Spacer,
  Icon,
  useColorMode,
  useColorModeValue,
  Link,
  LinkOverlay,
  Drawer,
  Button,
  DrawerContent,
  Text,
  useDisclosure,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Switch,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { logout } from "../../utils/api";
// import { BsSun, BsMoonStarsFill } from "react-icons/bs";

const defaultItems = [{ name: "Guilds", icon: FiHome }];

export default function SidebarWithHeader({ LinkItems, children, user }) {
  if (!user)
    user = {
      empty: true,
    };
  else user["empty"] = false;

  if (!LinkItems) LinkItems = [...defaultItems];
  else LinkItems = [...defaultItems, ...LinkItems];

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        user={user}
        LinkItems={LinkItems}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} user={user} LinkItems={LinkItems} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}

      <MobileNav onOpen={onOpen} user={user} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ LinkItems, onClose, user, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href="/">
          <Avatar src={require("../../assets/images/recard.png")} />
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          user={user}
          link={`/${link.name.toLowerCase()}`}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ link, icon, children, user, ...rest }) => {
  return (
    <Link
      href={`${link}`}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, user, ...rest }) => {
  const navigate = useNavigate();

  const login = () =>
    (window.location.href = "http://localhost:3001/api/auth/discord");

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Avatar src={require("../../assets/images/recard.png")} />
      </Text>
      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              px={2}
              py={2}
              borderRadius="md"
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
              _hover={{ bg: "cyan.400", color: "white" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="medium">
                    {user.empty ? `Click here` : user.discordTag}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              {/* <MenuItem>Profile</MenuItem> */}
              <MenuItem
                as={Switch}
                closeOnSelect={false}
                onChange={() => {
                  toggleColorMode();
                }}
                isChecked={colorMode !== "light"}
              >
                <span>Darkmode</span>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  user.empty
                    ? login()
                    : logout().then(() => {
                        navigate("/");
                      });
                }}
              >
                {user.empty ? "Log in" : "Log out"}
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
