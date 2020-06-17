VERSION = "v1.0.0"

.PHONY: pre210
pre210:
	docker build -t reg.miz.so/jike/web-operator-help:${VERSION} .
	docker push reg.miz.so/jike/web-operator-help:${VERSION}
	# kubectl config set-context dmz-dev --namespace=sdyxinnovation
	# kubectl config use-context dmz-dev --namespace=sdyxinnovation
	kubectl delete -f k8s/210/deployment.yaml
	kubectl apply -f  k8s/210/deployment.yaml
