---
title: How I Git
date: 2021-02-12
tags: [git, toolbox]
description: My git workflow when working on a team
---

## Intro

Everyone has has their own way of using git. This is mine. It may not fit your workflow, and you might wholely disagree with the why's and how's of this post. However, my hope is that you can take away some tip or trick and weave it into your workflow.

This flow follows the open source (or fork/pr) model of collaborating in git. This model revolves around the idea that each collaborator to a project creates a personal fork of the repo and then makes pull request back to the main repo.

## The shell

I pretty much exclusively use a terminal ( [iTerm2](https://iterm2.com/) ) when interaction with git. While there is some value in GUI's, mainly around branch visualizations, IMO they all tend to be equivalent of only knowing how to ride a bike with training wheels on and someone holding on the back of the seat to keep you upright.

> Git GUIs make the easy things easy and the hard things impossible

Git was built for the command line, if you ignore that then you are ignoring 90% of its power.

## Global Config

Most people new to git know that there is a `.git` directory at the root of each project that has the project specific `config` file but are unaware (or ignore) the global config file located in their home directory (`~/.gitconfig`). This is where can can configure git across all projects.

The first thing we are going configure the `[push]` block of our `~/.gitconfig`:

```
[push]
  default = current
  followTags = true

```

The main thing to focus on here is the `default = current` entry. If you are not a fan of hand rolling your config file you can add this entry entering this into your terminal:

```bash
$ git config --global push.default current

```

This will allow us to create a local branch an then push our code up to a matching remote branch as we'll see in a bit.

## Alias

Git has it own alias mechanism. This is not to be confused with your `shells` (e.g. bash, zsh, fish) alias mechanism...although the two can be used together. Git aliases let you craft your own custom git commands that hang off the `git` command in your terminal.

#### Example

As stated earlier one thing Git GUIs do well is provide a nice visualization of the timeline of commits and how each branch diverts and merges back to the main line. This can be down just as well at the terminal with this command:

```bash
$ git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative
```

However that is **quite** a lot to type every time I want to view the logs...so I create an alias in my `~/.gitconfig`:

```text
[alias]
  lg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative
```

Now I can just type:

```bash
$ git lg
```

**NOTE:** While I used to write a lot of git aliases in the past I now lean on the ones supplied in the [oh-my-zsh](http://ohmyz.sh) [`git`](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git) plugin. But for the sake of this post I do use a handful of git alias:

```text
[alias]
    sync = pull --rebase upstream main
    f = checkout -b
    pf = push -u origin
    kf = !sh -c 'git branch -D $1 && git push origin --delete $1' -
    feature = checkout -b
    pushFeature = push -u origin
    killFeature = !sh -c 'git branch -D $1 && git push origin --delete $1' -
```

Here is what each one is used for

**sync**: pulls latest for our `main` (upstream) repos `main` branch

**feature / f**: creates a local feature branch with the name we provide checks it out for us.

**pushFeature / pf**: creates an remote branch based on our local branchs name and pushes the changes there.

**killFeature / kf**: takes a branch name and removes both the local and remote instances of it.

## Hub CLI

The (Hub CLI)[https://hub.github.com/] is a set up super handy commands to augment the base `git` commands. I mainly use this for it handy `pr` command

If you are on a **macOS** you can install with `homebrew`

```bash
$ brew install hub
```

## Shell Aliases

Now that we have our Git aliases set up and the Hub cli installed we can now add some aliases and functions to our shell. Everyone seems to set up there shell startup scrips and aliases a little different but usually you will be looking for a `.zshrc` or `.bash_profile` or `.bashrc` in your home directory.

Open up that file and add:

```bash
alias pr='hub pull-request -o'
alias pfpr="git pf && pr"

function copr() {
	echo "Checking out PR $1 to local branch"
	git fetch upstream pull/$1/head:pr-$1
	git co pr-$1
}
```

Just a quick note on each of these:

**pr**: creates a pull request from our latest commit and open it up in the default browser

**prpf**: uses the git alias `pf` (aka: push-feature) to push our local branch to a similarly named remote branch and then calls the `pr` alias listed above to create the PR.

**copr**: is used to **c**heck **o**ut **p**ull **r**equest. This function takes the PR number as an argument and checks it out in to a local branch for review.

## Actual Workflow

1. Fork the `main` repo into personal git.
1. Clone the repo from your personal git that you just forked to.
1. Set `upstream` remote repo to `main`
   ```bash
   $ git remote add upstream git@github.com:[org]/[repo].git
   ```
1. Create a local feature branch to work on.
   ```bash
   $ git f my_cool_new_feature
   ```
1. HACK AWAY
1. commit code to feature branch
1. Sync any upstream changes
   ```bash
   $ git sync
   ```
1. Resolve any conflicts
1. Create and push to remote brach AND cut a PR
   ```bash
   $ git pfpr
   ```
1. Once the PR has been thoroughly reviewed and approved merge it into the `main` branch.
1. Check out `main` branch

   ```bash
   $ git checkout main
   ```

1. Sync all changes from **upstream** `main` to your **local** `main` branch
   ```bash
   $ git sync
   ```
1. Clean up both local and remote branches

   ```bash
   $ git killFeature my_cool_new_feature
   ```

   Or

   ```bash
   $ git kf my_cool_new_feature
   ```

1. Lather-rinse-repeat
