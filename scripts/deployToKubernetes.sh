***REMOVED***

#Make sure you set REPOSITOR_PREFIX with double quote for each path route. For example - my-registry.com\\/demo
cat ./k8s/*.yaml | \
sed 's/\${REPOSITORY_PREFIX***REMOVED***'"/${REPOSITORY_PREFIX***REMOVED***/g" | \
kubectl apply -f -
