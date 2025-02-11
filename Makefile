BUILD := $(shell git rev-parse --short HEAD)
VERSION := $(shell git describe --tags)
BUILD_VERSION := ${VERSION}-${BUILD}
BUILDTIME := $(shell date "+%FT%T")
PROJECTNAME := $(shell basename "$(PWD)")
REGISTRY := $(CI_REGISTRY_IMAGE)

VFILE := .version.txt

.PHONY: all
all: dev

.PHONY: docker-package
docker-login:
	docker login -u "${CI_REGISTRY_USER}" -p "${CI_REGISTRY_PASSWORD}" "${CI_REGISTRY}"

.PHONY: docker-build
docker-build:
	echo ${BUILD_VERSION} > $(VFILE)
	docker build --build-arg BUILD_DATE='${BUILDTIME}' --build-arg VERSION='${BUILD_VERSION}' -t ${REGISTRY}:${BUILD_VERSION} -f Dockerfile .

.PHONY: docker-push
docker-push:
	docker push ${REGISTRY}:${BUILD_VERSION}

.PHONY: docker-push-latest
docker-push-latest:
	docker tag ${REGISTRY}:${BUILD_VERSION} ${REGISTRY}:latest
	docker tag ${REGISTRY}:${BUILD_VERSION} ${REGISTRY}:${VERSION}
	docker push ${REGISTRY}:${BUILD_VERSION}
	docker push ${REGISTRY}:latest
	docker push ${REGISTRY}:${VERSION}

.PHONY: dev
dev: 
	echo "Not implemented"

.PHONY: sview-tag
sview-tag:
	curl -s -XPUT \
		-H "Authorization: Bearer ${API_TOKEN}" \
		-H "Content-Type: application/json" \
		-d '{"parameters": [{"name": "sview.frontReact.image.tag","value": "${BUILD_VERSION}"},{"name": "gitlab.author","value": "${CI_COMMIT_AUTHOR}"}]}' \
		${API_URL}/applications/${APP_ID}/parameters