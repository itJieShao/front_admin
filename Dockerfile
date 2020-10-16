FROM nginx:1.13
MAINTAINER chenxiaodan <952678948@qq.com>
ADD dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]