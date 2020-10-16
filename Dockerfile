FROM node:14-alpine
MAINTAINER chenxiaodan <952678948@qq.com>
RUN mkdir /app
ADD . /app
WORKDIR /app
EXPOSE 8081
CMD ["npm", "run", "dev"]