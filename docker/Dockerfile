FROM amazonlinux:2

# mecab stand by
RUN set -x \
 && rpm -ivh http://packages.groonga.org/centos/groonga-release-1.1.0-1.noarch.rpm \
 && cp /etc/yum.repos.d/groonga.repo /etc/yum.repos.d/groonga.repo.bak \
 && cat /etc/yum.repos.d/groonga.repo | sed -e "s/centos\/\$releasever\//centos\/7\//" > /etc/yum.repos.d/groonga.repo.sed \
 && cp -f /etc/yum.repos.d/groonga.repo.sed /etc/yum.repos.d/groonga.repo \
 && mkdir -p -m 777 /home/work

# install
RUN yum -y install git make curl xz gcc-c++ patch findutils.x86_64 file tar openssl which mecab mecab-devel mecab-ipadic \
 && curl -sL https://rpm.nodesource.com/setup_11.x | bash - \
 && yum -y install nodejs

# mecab-neologd
WORKDIR /home/work
RUN git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git \
 && yes yes | /home/work/mecab-ipadic-neologd/bin/install-mecab-ipadic-neologd -n \
 && git clone https://github.com/saken649/yumegen.git

# build
WORKDIR /home/work/yumegen/
ENV PORT=$PORT
RUN npm install \
 && npm run build

# after build
CMD nohup npm start &