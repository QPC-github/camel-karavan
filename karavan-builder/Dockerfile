FROM jbangdev/jbang-action:0.103.0

# Add Camel-JBang
RUN jbang trust add -o --fresh --quiet https://github.com/apache/camel/blob/HEAD/dsl/camel-jbang/camel-jbang-main/dist/CamelJBang.java

# Add Maven Daemon
ADD https://dist.apache.org/repos/dist/release/maven/mvnd/0.9.0/maven-mvnd-0.9.0-linux-amd64.zip .

RUN mkdir /opt/mvnd && \        
    apt-get update -y && apt-get install unzip git -y && apt-get clean && \                                
    unzip maven-mvnd-0.9.0-linux-amd64.zip && \                       
    mv maven-mvnd-0.9.0-linux-amd64/* /opt/mvnd  

WORKDIR /scripts
ENTRYPOINT ["entrypoint", "-Dcamel.jbang.version=3.20.2", "camel@apache/camel"]
