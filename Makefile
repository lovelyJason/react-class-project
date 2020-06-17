VERSION = "v1.0.0"

.PHONY: dev
dev:
	docker build -t reg.miz.hk/openmng/web-operator-help:${VERSION} .
	docker push reg.miz.hk/openmng/web-operator-help:${VERSION}
	# kubectl config set-context dmz-dev --namespace=sdyxinnovation
	# kubectl config use-context dmz-dev --namespace=sdyxinnovation
	# kubectl delete -f k8s/dev/deployment.yaml
	kubectl apply -f  k8s/dev/deployment.yaml
