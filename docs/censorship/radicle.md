---
sidebar_position: 2
---

# Radicle

[Radicle](https://radicle.xyz/) is a peer-to-peer (p2p) substitute for GitHub. [Git](https://git-scm.com/) is the defacto standard for software development. [GitHub](https://github.com) has become the worlds largest Git repository for code collaboration. GitHub was purchased by Microsoft in 2018, and since that time, censorship of code repositories has been steadily increasing. Cryptocurrency developers (such as myself) will most likely be censored on GitHub if cryptocurrency gains enough mainstream adoption to threaten the US dollar. Radicle is a solution to this future problem.

Any professional who works with Git, will be familiar with the `git` command line interface (CLI). Radicle recently released their own `radicle-cli` CLI that compliments the `git` CLI.

<iframe width="731" height="411" src="https://www.youtube.com/embed/9YWN5G_FwNU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Getting Started
Radicle has a [getting started guide](https://radicle.network/get-started.html) that introduces the radicle CLI and formaly documents the demo in the video above. The project is still very new and things are constantly changeing and breaking.

### Installing radicle-cli
Below is a summary of how I install [radicle-cli](https://github.com/radicle-dev/radicle-cli) on Ubuntu systems:

```bash
curl https://europe-west6-apt.pkg.dev/doc/repo-signing-key.gpg | sudo apt-key add -
echo deb https://europe-west6-apt.pkg.dev/projects/radicle-services radicle-cli main | sudo tee -a /etc/apt/sources.list.d/radicle-registry.list
sudo apt update
sudo apt install radicle-cli
```

### Stumbling Blocks
*These notes are primarily for posterity. Readers can safely skip this section.*

I hit a few snags trying to set up my own development environment. Here are links to the problems and solutions I faced:

#### Installing radicle-cli on Ubuntu
- [Error installing radicle-cli on Ubuntu](https://github.com/radicle-dev/radicle-cli/issues/64)

#### Upgrading Git
I also needed to upgrade the version of `git` that shipped with Ubuntu. Here's how I was able to do that ([source](https://unix.stackexchange.com/questions/33617/how-can-i-update-to-a-newer-version-of-git-using-apt-get)):

```bash
sudo apt remove git -y
sudo add-apt-repository ppa:git-core/ppa -y
sudo apt-get update
sudo apt-get install git -y
git --version
```

#### Upgrading OpenSSH
And to `commit` new code to a radicle repository, I had to upgrade openssh ([source](https://askubuntu.com/questions/1189747/is-possible-to-upgrade-openssh-server-openssh-7-6p1-to-openssh-8-0p1)). You can check your current version of openssh-server with `ssh -V`. It should be *8.2p1* or greater.

Here is how I upgraded my version of openssh-server.
```bash
ssh -V
sudo apt update
sudo apt install build-essential zlib1g-dev libssl-dev
sudo mkdir /var/lib/sshd
sudo chmod -R 700 /var/lib/sshd/
sudo chown -R root:sys /var/lib/sshd/
wget -c https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/openssh-8.9p1.tar.gz
tar -xzf openssh-8.9p1.tar.gz
cd openssh-8.9p1/
sudo apt install libpam0g-dev libselinux1-dev libkrb5-dev
./configure --with-kerberos5 --with-md5-passwords --with-pam --with-selinux --with-privsep-path=/var/lib/sshd/ --sysconfdir=/etc/ssh
make
sudo apt remove openssh-server
sudo make install
sudo apt install openssh-server
ssh -V
```

With that, the final version using `ssh -V` should report *8.9p1*.

#### SSH Agent
I would occasionally get this error:
- `Authentication failed could not lookup ssh key, is ssh-agent running?`

Here is how I fixed that error:

- `ssh-agent`

That would display the socket information. The output would look like this:

```
SSH_AUTH_SOCK=/tmp/ssh-XXXXXXMcYzjS/agent.3505; export SSH_AUTH_SOCK;
SSH_AGENT_PID=3506; export SSH_AGENT_PID;
echo Agent pid 3506;
```

I could then manually set the environment variable:
- `export SSH_AUTH_SOCK=/tmp/ssh-XXXXXXMcYzjS/agent.3505`

### Initializing Radicle
In order to initialize radicle-cli, you need to make sure you have `git` v2.34.0 or higher. See the *Stumbling Blocks* section above to install the latest version of `git`.

Initialize your radicle user:
- `rad auth --init`

Be sure to use the `--init` flag, as there is [currently a bug](https://github.com/radicle-dev/radicle-cli/issues/81) that will prevent you from being able to make commits it you don't.

## Seed Nodes
Seed nodes are *always-on* 'servers' that host git repositories. These replace the cloud hosting that GitHub provides. Docker containers for running a seed node are available in the radicle-client-services repo below:
 - [radicle-client-services on GitHub]( https://github.com/radicle-dev/radicle-client-services)
 - [radicle-client-services on Radicle](https://app.radicle.network/alt-clients.radicle.eth/rad:git:hnrkk9c4zt9thuxhwi1ukxqcrs5tmhbtcsony/tree/a19cdcb846a8360d8f55c10aac8175368881a6ee)

I've customized the repository and set up a seed node for the [Permissionless Software Foundation](https://psfoundation.cash). The goal of this seed node to act as a backup, in case our code is ever censored by GitHub.

- GitHub: https://github.com/christroutner/radicle-client-services
- Radicle: TBD

You can push code to our seed node with this url:

- radicle.fullstackcash.nl

## Create a New Repository
The workflow for creating a git repository does not change. If you, like me, work with GitHub primarily, create the new git repository the same way you've always done. After the git repository has been created and added to GitHub, you can then add the repository to Radicle.

- `rad init`

This will genderate a DID (decentralized ID) for your respository. This will be used to identify your repository on the radicle network. It will look like this:

- `rad:git:hnrkjsnux9ns5t4famcga7f4r64a1brh99y1o`

You can then push your repository with `rad push` to push it to one of the community nodes supplied by Radicle. The repository can be pushed to the PSF seed node like this:

- `rad push --seed radicle.fullstackcash.nl`

## Clone a Repository

- [Official Radicle Documentation](https://docs.radicle.xyz/using-radicle/clone)

Before cloning a repository on Radicle, it's a good idea to run the following commands first:

- `rad auth`
- `rad self`

With the DID of a repository, you can clone it like this:

- `rad clone rad:git:hnrkjsnux9ns5t4famcga7f4r64a1brh99y1o --seed radicle.fullstackcash.nl`

## Commiting a Change

- [Official Radicle Documentation](https://docs.radicle.xyz/using-radicle/push/)

After making a change to a cloned repository, the normal workflow with git is the same. However, when running `git commit` is when you'll see errors around authentication and OpenSSH. See the *Stumbling Blocks* section above.

```bash
git add -A
git commit -m "commit message"
```

Pushing the commit should work like this:
- `rad push --seed radicle.fullstackcash.nl`

If you did not initialize your user correctly, this is where you'll [see a bug](https://github.com/radicle-dev/radicle-cli/issues/81).

## Reviewing and Merging Changes

- [Radicle Documentation](https://docs.radicle.xyz/using-radicle/track-review-merge)

In order to pull changes from the radicle seed node, The URN of the user who pushed the change needs to be known. Changes can be pulled like this:

- `rad track hynfqs458c3whsyb9exnerg7w81hy9za4ogptntc9h84p1s5jfyix4 --seed radicle.fullstackcash.nl`

This will create a branch with the changes pushed by the other user, which can be seed by running `git branch`:

- `peer/trout/master`

Differences can be reviewed like this:

- `git diff master..peer/trout/master`

And the patch can be merged:

- `git merge peer/trout/master`

## Mirroring GitHub Repositories

The main way I'm using Radicle is to create mirrors of my GitHub repositories. This way, if GitHub ever decides to deplatform cryptocurrency developers, I'll already have work-ready repositories backed up on Radicle. Here is the typical workflow I use to add a repository to GitHub.

- `git clone gh-repo && cd gh-repo`
- `rad init`
- `rad push --seed radicle.fullstackcash.nl`
- `rad push --seed willow.radicle.garden`
