# Enzyme

Enzyme is a wallet for for [Polkadot blockchain.](https://polkadot.network/)

Enzyme is currently a work in progress, so changes will occur.


## Prerequisites

- NodeJS >= v11
- Yarn latest

## Get It

Once published Enzyme will be installable from the Chrome Web Store. Until then, it can be run via yarn by cloning this repo. Unpacked builds will be made available at [https://github.com/blockxlabs/enzyme](https://github.com/blockxlabs/enzyme) shortly.

### Installation

Execute the following to clone, install dependencies, and run a development server:

    git clone https://github.com/blockxlabs/enzyme.git
    cd enzyme
    yarn install
    yarn run dev

Once running:

- Go to chrome://extensions
- Enable 'Developer Mode' (top right corner of window)
- Click "Load Unpacked" and select the enzyme/dev/ directory

The Enzyme icon should show up in your Chrome toolbar.

## Getting Started

### Initial Setup

Choose a strong password. This is used to encrypt your data so that other Chrome extensions can't read it.
![password screenshot](./docs/images/password.png)

If you want to start fresh, use the newly-generated account. Copy the seed phrase and save it somewhere safe (as it is required to send DOTs and sign transactions).
![generate account screenshot](./docs/images/generate.png)

If you have an existing account you want to use, click the Import tab and paste your existing seed phrase in.
![import account screenshot](./docs/images/import.png)

### FAQ

See faq.md.


### Send DOTs

Coming soon.

### Receive DOTs

Coming soon.

## Links

License: [AGPL v3](https://github.com/blockxlabs/enzyme/blob/master/LICENSE.md)
