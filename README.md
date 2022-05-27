<p align="center">
    <img src="https://github.com/bretheskevin/theladswebsite/blob/main/static/logo.png" alt="logo" width="200"/>
</p>

# The Lads Website

This website related to Geometry Dash was made for the members of the discord  "The Lads Private Server". 
It's not intended to be useful for the community.

- [The Lads Website](#the-lads-website)
    * [Todo](#todo)
    * [To Fix](#to-fix)
    * [Build Setup](#build-setup)
        + [Install dependencies](#install-dependencies)
        + [Generate the database](#generate-the-database)
        + [Configure the domains](#configure-the-domains)
            - [store/store.js](#store-storejs)
            - [nuxt.config.js](#nuxtconfigjs)
        + [Configure the .env](#configure-the-env)
        + [Launch the server in development mode](#launch-the-server-in-development-mode)
        + [Build for production and launch server](#build-for-production-and-launch-server)
- [API](#api)
- [Admin Dashboard](#admin-dashboard)
- [Special Directories](#special-directories)
  + [`assets`](#-assets-)
  + [`components`](#-components-)
  + [`layouts`](#-layouts-)
  + [`pages`](#-pages-)
  + [`plugins`](#-plugins-)
  + [`static`](#-static-)
  + [`store`](#-store-)

## Todo

- Service that save the data to the database instead of making a request to the external pointercrate API.
- Refractor the code of the API
- Password reset
- Make the admin able to change the avatars of the users.
- Delete users from the dashboard

## To Fix

- Leaderboard doesn't load when running the project in production mode
- Can't login on mobile
- Can register on mobile but show an error like it didn't work

## Build Setup

### Install dependencies
```bash
npm install
```

### Generate the database
```bash
npx prisma db push
```


### Configure the domains
You will have to change this only if you want to upload the 
project on your own server. Change the domains with the IP of 
your server or your domain name.

#### store/store.js
```js
export const state = () => ({
  config: {
    // 'domain': "theladsofficial.com",
    'domain': "localhost:3000"
  }
})
```

#### nuxt.config.js
```js
axios: {
    // baseURL: "https://theladsofficial.com",
    baseURL: "http://localhost:3000",
}
```

### Configure the .env

Rename the .env.example to .env

Here is the content of the .env

```mk
DOMAIN="example.com"
SECRET_DB="your_secret_string"
TWITCH_ID="Your twitch id"
TWITCH_SECRET="Your twitch secret"
```

- Domain is the IP/domain of your server. Set it to localhost:3000 when you work on your local machine
- SECRET_DB is the string used to encrypt the passwords
- TWITCH_ID and TWITCH_SECRET are used to show when a streamer of the discord is streaming.

Refer to the [Twitch Documentation](https://dev.twitch.tv/docs/authentication/register-app) to generate your Client ID and your Client Secret.

### Launch the server in development mode
```bash
npm run dev
```

### Build for production and launch server
```bash
npm run build
npm run start
```


For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## API

Check this [documentation](https://documenter.getpostman.com/view/13748740/Uz5AtKgG) to see how to use the API.

## Admin dashboard

First, you have to manually edit the database to make your account admin.

![img.png](readme/img1.png)

The default value is 0. Just change it to 1 like the pic above.
Now, when you'll login to your account, you'll see the admin field in the navbar.

![img.png](readme/img2.png)

This dashboard give you access to every user registered and allows you to edit their data.

![img.png](readme/img3.png)
![img.png](readme/img4.png)

This is the same page that the one that users can access by going to /profile to edit their profile. 

In addition, you have 3 new fields available since you're an admin.

- **Admin** - Set it to 0 or 1 to make the user an admin or not. You don't have to go to the database anymore to make users admin.
- **Verified** - Set it to 1 to make the user a member of the team, he will now appear in the leaderboard.
- **Pointercrate ID** - Put the pointercrate ID of the user their, it will be used to fetch the data for the leaderboard.

Here is an example of how to get the pointercrate ID of an user.
Ask the member of your team what is his pointercrate username.

For the example, the username is **Hikudo**

To get it, got to [https://pointercrate.com/api/v1/players?name_contains=hikudo](https://pointercrate.com/api/v1/players?name_contains=hikudo)

Here is the response :

![img.png](readme/img5.png)

The first field "id" is the pointercrate ID that you have to use.

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
