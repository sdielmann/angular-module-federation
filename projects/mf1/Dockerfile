# ----------------------------------------------------------------------------------------------------------------------
# Stage 0, BUILD - Load dependencies and build/compile app from source files
# ----------------------------------------------------------------------------------------------------------------------
FROM trion/ng-cli:11.2.3 as build
ARG configuration=production

WORKDIR /app/

# Copy npm configuration into container
COPY package.json yarn.lock ./

# Install npm dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY ./ ./

# Build application
RUN ng build --project mf1 --output-path=dist --configuration $configuration

# ----------------------------------------------------------------------------------------------------------------------
# STAGE 2 Using nginx on alpine (reduced linux distro, optimized for container)
# ----------------------------------------------------------------------------------------------------------------------

FROM openresty/openresty:1.17.8.1-alpine

COPY ./projects/mf1/nginx /usr/local/openresty/nginx/conf

# Copy angular web files into the nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html
