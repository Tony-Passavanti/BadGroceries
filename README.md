
# BadGroceries.report <!-- omit in toc -->
BadGroceries.report is a web platform for exploring corporate ownership and subsidiary relationships. It compiles data from multiple public and commercial sources to show how companies are connected, who owns whom, and how those structures change over time. Users can search for companies, view interactive ownership graphs, and review or publish verified records for public access. The goal is to make corporate transparency easier to understand and navigate for researchers, journalists, and the general public.


## Table of Contents <!-- omit in toc -->
- [Setup](#setup)
  - [Install Node.js](#install-nodejs)
    - [Windows](#windows)
    - [WSL/Ubuntu](#wslubuntu)
  - [Install dependencies](#install-dependencies)
- [Run Development Server](#run-development-server)
  - [Build for Production](#build-for-production)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)


## Setup

Follow these steps to get the project running locally.

### Install Node.js

This project requires Node.js and npm.

#### Windows

Download and install from https://nodejs.org.  
Make sure to restart your terminal afterward.

#### WSL/Ubuntu

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install curl -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
source ~/.bashrc
nvm install --lts
```

Verify install:

```bash
node -v
npm -v
```

### Install dependencies

Use the existing `package-lock.json` for consistent builds:
```sh
npm ci
```

Or download dependencies from `package.json` (which will generate a `package-lock.json` file):

```sh
npm install
```


## Run Development Server

```sh
npm run dev
```

Then open your browser to:
> [http://localhost:3000](http://localhost:3000)


>NOTE: The app will hot-reload automatically when you edit files inside `app/`.

### Build for Production

```sh
npm run build
npm start
```
>Runs the optimized production build on port 3000.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
