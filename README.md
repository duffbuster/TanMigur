# TanMigur

A quick and dirty Imgur gallery search using Tanstack router and query.

ShadCn Canary provides the ui components, with styling by Tailwind v4.

This was my first time diving into TanStack, so be gentle.

![](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGsyYnU3dTNmYnRiY3llY2Jzb2tnYXFub2ZwN21yOWN6ZHI1OThnYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ur8XCl98PfFqEmyNIE/giphy.gif)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

> **_NOTE:_** Imgur's api doesn't like to be called from `localhost`, use the network ip host instead.

https://stackoverflow.com/a/66209846

## ENV Variables

`VITE_IMGUR_CLIENT_ID`: Client ID for the Imgur API
