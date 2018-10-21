FROM mongo:latest
ENV NODE_ENV production
ENV PORT 80
ADD . /home
RUN apt-get update && apt-get install curl -y && apt-get install rc-service -y \
&& curl -sL https://deb.nodesource.com/setup_8.x | bash - && sudo apt-get install -y nodejs
