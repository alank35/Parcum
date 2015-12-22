
FROM centos:centos6

RUN yum install -y epel-release

RUN yum install -y nodejs npm

COPY . /src

RUN cd /src; npm install
RUN cd /src; npm install mysql

EXPOSE 8080

CMD ["node", "/src/index.js"]

