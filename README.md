# Angular Dynamic Module Federation - Demo Project

This project is based on my [Angular Boilerplate Project](https://github.com/sdielmann/angular-boilerplate). It shows how to utilize the Webpack 5 `ModuleFederationPlugin` in large, distributed Angular projects that follow a Microfrontend-based architecture approach.

In contrast to other open-source projects and blog posts I have found, I have implemented a solution for dynamically loading remote modules at runtime:

* Modules are loaded asynchronously only when needed
* The remote entry JavaScript file for the module is hashed in production environments for cache busting. The current `src` url is automatically resolved before loading.
* The remote modules can be used in Angular Routing using `RemoteModuleLoader.loadRemoteModule()`. Remote modules must define child routes for it to work.
* Remote modules can define new components that can be used and created at runtime using the `RemoteComponentRenderer` directive.

## Starting the project

### Locally (without Docker)
To start the demo, you need to run the shell application and the remote microfrontend in parallel. Therefore run both of these scripts in separate instances of your favorite terminal:

```shell
npm run start

// and 

npm run start:mf1
```

The main (shell) application will be started on [Port 4200](http://localhost:4200), the microfrontend at [Port 4300](http://localhost:4300).

> **Hint**: The remote entry will not be hashed in local development. Hashing is only enabled for production builds.

### Production (via Docker)

In production environments, Angular applications are usually bundled into a full-blown webserver like [nginx](https://www.nginx.com/). You can find more information how to configure Angular for production deployment on the [official Angular docs](https://angular.io/guide/deployment#fallback-configuration-examples).

This project defines multiple Dockerfiles that build the Angular applications in production mode and bundle them into a basic nginx Docker image. You can also find the required nginx configurations.

| App | Dockefile | nginx config |
| --- | --- | --- |
| Shell | [Dockerfile](./projects/mf-shell/Dockerfile) | [nginx.conf](./projects/mf-shell/nginx/nginx.conf) |
| Microfrontend | [Dockerfile](./projects/mf1/Dockerfile) | [nginx.conf](./projects/mf1/nginx/nginx.conf) |

To start the application, use docker-compose in the project root dir:

```shell
docker-compose up -d --build
```

The compose file will start 3 containers for 3 nginx servers in total:

1. Webserver for the shell application
1. Webserver for the microfrontend
1. Webserver as a reverse-proxy for the two above

When the file has been deployed, you can access the application at [localhost](http://localhost).

## Useful links

* [My Angular Boilerplate Project](https://github.com/sdielmann/angular-boilerplate)
* [Webpack ModuleFederation Docs](https://webpack.js.org/concepts/module-federation)
