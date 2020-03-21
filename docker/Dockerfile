FROM openjdk:8-jre-alpine
VOLUME /tmp

# Download dockerize and cache that layer
ARG DOCKERIZE_VERSION
RUN wget -O dockerize.tar.gz https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VERSION***REMOVED***/dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION***REMOVED***.tar.gz
RUN tar xzf dockerize.tar.gz
RUN chmod +x dockerize

# This is the first layer that won't be cached
ARG ARTIFACT_NAME
ADD ${ARTIFACT_NAME***REMOVED***.jar /app.jar

ARG EXPOSED_PORT
EXPOSE ${EXPOSED_PORT***REMOVED***

ENV SPRING_PROFILES_ACTIVE docker

ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap", "-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
