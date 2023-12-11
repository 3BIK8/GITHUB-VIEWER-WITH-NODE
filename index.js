// index.js

import axios from "axios";
import chalk from "chalk";
import { program } from "commander";

const getUser = async (username) => {
	try {
		const response = await axios.get(
			`https://api.github.com/users/${username}`
		);
		const userData = response.data;

		const filteredData = {
			htmlUrl: userData.html_url,
			avatarUrl: userData.avatar_url,
			login: userData.login,
			name: userData.name,
			bio: userData.bio,
			email: userData.email,
			twitter: userData.twitter_username,
			numRepos: userData.public_repos,
			repos: await getRepos(username),
		};

		return filteredData;
	} catch (error) {
		console.error(chalk.red("Error fetching user profile"));
		process.exit(1);
	}
};

const getRepos = async (username) => {
	try {
		const response = await axios.get(
			`https://api.github.com/users/${username}/repos`
		);
		const reposData = response.data;

		const repos = reposData.map((repo) => ({
			htmlUrl: repo.html_url,
		}));

		return repos;
	} catch (error) {
		console.error(chalk.red("Error fetching repositories"));
		process.exit(1);
	}
};

program.version("1.0.0").description("Git Profile Viewer");

program
	.command("view <username>")
	.alias("v")
	.description("View GitHub profile")
	.action(async (username) => {
		const user = await getUser(username);
		console.log(user);
	});

program
	.command("repos <username>")
	.alias("r")
	.description("View GitHub repositories")
	.action(async (username) => {
		const repos = await getRepos(username);
		console.log(repos);
	});

program
	.command("followers <username>")
	.alias("f")
	.description("View GitHub followers")
	.action(async (username) => {
		try {
			const response = await axios.get(
				`https://api.github.com/users/${username}/followers`
			);
			const followers = response.data.map((follower) => follower.login);
			console.log(`Followers for ${username}: ${followers.join(", ")}`);
		} catch (error) {
			console.error(chalk.red("Error fetching followers"));
			process.exit(1);
		}
	});

program
	.command("following <username>")
	.alias("g")
	.description("View GitHub following")
	.action(async (username) => {
		try {
			const response = await axios.get(
				`https://api.github.com/users/${username}/following`
			);
			const following = response.data.map((user) => user.login);
			console.log(`${username} is following: ${following.join(", ")}`);
		} catch (error) {
			console.error(chalk.red("Error fetching following"));
			process.exit(1);
		}
	});

program
	.command("starred <username>")
	.alias("s")
	.description("View starred repositories")
	.action(async (username) => {
		try {
			const response = await axios.get(
				`https://api.github.com/users/${username}/starred`
			);
			const starredRepos = response.data.map((repo) => repo.full_name);
			console.log(
				`${username}'s starred repositories: ${starredRepos.join(", ")}`
			);
		} catch (error) {
			console.error(chalk.red("Error fetching starred repositories"));
			process.exit(1);
		}
	});

program.parse(process.argv);
