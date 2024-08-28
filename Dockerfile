FROM e-g22bzo9-docker.pkg.coding.smartcitysz.work/p-8aqjba5/user-centre/nginx:1.22.1-arm
ENV TZ=Asia/Shanghai
WORKDIR /home/app

ENV APP_NAME=inside-portal-h5-web
ARG FINAL_NAME
ARG APP_NAME
ARG APP_VERSION
ARG BUILD_NUMBER
ARG GIT_COMMIT
RUN echo "APP_NAME: ${APP_NAME}" > build-info && \
    echo "APP_VERSION: ${APP_VERSION}" >> build-info && \
    echo "BUILD_NUMBER: ${BUILD_NUMBER}" >> build-info && \
    echo "BUILD_TIME: $(date +%F%n%T)" >> build-info && \
    echo "GIT_COMMIT: ${GIT_COMMIT}" >> build-info

COPY nginx.conf /etc/nginx/
COPY inside-portal-h5-web /home/app/inside-portal-h5-web/

EXPOSE 8087