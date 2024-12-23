# Use the latest Ubuntu LTS base image
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install required packages
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    nodejs \
    npm \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get update

# Install Hugo extended version 0.125.7 for arm64
ARG HUGO_VERSION=0.125.7
RUN wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-ARM64.deb \
    && dpkg -i hugo_extended_${HUGO_VERSION}_Linux-ARM64.deb \
    && rm hugo_extended_${HUGO_VERSION}_Linux-ARM64.deb

# Install live-server for static HTML development
RUN npm install -g live-server

# Set working directory
WORKDIR /workspace

# Expose port 8080
EXPOSE 8080

# Default command to keep the container running
CMD ["tail", "-f", "/dev/null"]