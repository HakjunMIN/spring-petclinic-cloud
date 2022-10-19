# This will create a regcreds file to apply to the spring-petclinic namespace 

# kubectl create secret docker-registry regcred -n spring-petclinic --docker-server=<REGISTRY***REMOVED*** --docker-username=<USERNAME***REMOVED*** --docker-password=<PASSWORD***REMOVED*** --docker-email=<EMAIL_ADDRESS***REMOVED*** --dry-run=client -o yaml ***REMOVED*** ./k8s/init-namespace/02-regcreds.yaml


kubectl create ns spring-petclinic 

kubectl create secret docker-registry regcred\
    --namespace spring-petclinic \
    --docker-server=azurespringacr.azurecr.io \
    --docker-username=azurespringacr \
    --docker-password=Fqcmr9na0ielmNo/Xm9WknOfRHpHwJEq \
    --dry-run=client -o yaml ***REMOVED*** ./k8s/init-namespace/02-regcreds.yaml