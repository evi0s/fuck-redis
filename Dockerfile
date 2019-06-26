FROM node
MAINTAINER evi0s <wc810267705@163.com>

RUN apt update -y && \
    apt install redis-server -y

WORKDIR /app

ADD . /app

RUN useradd -d /app www && \
    chown -R www.www /app

RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT /app/entrypoint.sh
