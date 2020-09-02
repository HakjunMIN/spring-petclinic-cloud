***REMOVED***

if [ -z "${REPOSITORY_PREFIX***REMOVED***" ]
then 
    echo "Please set the REPOSITORY_PREFIX"
else 
    cat ./k8s/*.yaml | \
    sed 's#\${REPOSITORY_PREFIX***REMOVED***'"#${REPOSITORY_PREFIX***REMOVED***#g" | \
    kubectl apply -f -
fi
