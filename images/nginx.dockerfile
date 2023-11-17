# Use the nginx base image
# FROM nginx:latest as base

FROM ubuntu:18.04 as base


# install nginx
RUN apt-get update -y
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:nginx/stable
RUN apt-get update -y
RUN apt-get install -y nginx

# install certbot
RUN add-apt-repository ppa:certbot/certbot
RUN apt-get update -y
RUN apt-get install -y certbot python-certbot-nginx

# deamon mode off
RUN chown -R www-data:www-data /var/lib/nginx

# expose ports
EXPOSE 80 443

# # add nginx staging conf
ADD images/configs/nginx/backup.linkcollect.io /etc/nginx/sites-available/backup.linkcollect.io
ADD images/configs/nginx/dev.linkcollect.io /etc/nginx/sites-available/dev.linkcollect.io
ADD images/configs/nginx/api.linkcollect.io /etc/nginx/sites-available/api.linkcollect.io

# # create symlinks
RUN ln -s /etc/nginx/sites-available/backup.linkcollect.io /etc/nginx/sites-enabled/backup.linkcollect.io
RUN ln -s /etc/nginx/sites-available/dev.linkcollect.io /etc/nginx/sites-enabled/dev.linkcollect.io
RUN ln -s /etc/nginx/sites-available/api.linkcollect.io /etc/nginx/sites-enabled/api.linkcollect.io

RUN mkdir my-scripts
# # copy the sendInNgnix.sh script
COPY images/certinitInContainer.sh /my-scripts/certinitInContainer.sh

RUN chmod +x /my-scripts/certinitInContainer.sh

# # run the script

# RUN  /my-scripts/./certinitInContainer.sh

RUN chmod -R o+rw /etc/nginx

# work dir
WORKDIR /etc/nginx


# Copy the nginx configuration file to the container
# COPY images/configs/nginx.conf /etc/nginx/nginx.conf

# Start nginx
# CMD ["nginx", "-g", "daemon off;"]


