import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
	const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
	const [{ data, fetching }] = useMeQuery();
	let body = null;

	if (fetching) {
	} else if (!data?.me) {
		body = (
			<>
				<NextLink href='/login'>
					<Link mr={2}>Login</Link>
				</NextLink>
				<NextLink href='/register'>
					<Link>Register</Link>
				</NextLink>
			</>
		);
	} else {
		body = (
			<Flex>
				<Box mr={2}>{data.me.username}</Box>
				<Button
					isLoading={logoutFetching}
					onClick={() => logout()}
					variant='link'>
					logout
				</Button>
			</Flex>
		);
	}
	return (
		<Flex bg='tomato' p={4}>
			<Box ml={"auto"}>{body}</Box>
		</Flex>
	);
};
