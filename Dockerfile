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
    hugo \
    && rm -rf /var/lib/apt/lists/*

# Install Hugo extended version for M1 Mac
RUN wget https://github.com/gohugoio/hugo/releases/download/v0.121.1/hugo_extended_0.121.1_linux-arm64.deb \
    && dpkg -i hugo_extended_0.121.1_linux-arm64.deb \
    && rm hugo_extended_0.121.1_linux-arm64.deb

# Install live-server for static HTML development
RUN npm install -g live-server

WORKDIR /workspace

EXPOSE 8080

# Keep container running
CMD ["tail", "-f", "/dev/null"]