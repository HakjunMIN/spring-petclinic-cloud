***REMOVED***
#
#  Work In Progress - File not currently used!!
#  Looking to remove the Post-Install scripting out of the react app, and to just call a bash file
#  This way, the UI and the github actions can call a common script for all the cluster post-install configuration
#
agw=""
vnet_opt=""
ingress=""
apisecurity=""
monitor=""
ingressEveryNode=""
dnsZoneId=""
denydefaultNetworkPolicy=""
certEmail=""

while getopts "p:g:n:r:" opt; do
  case ${opt***REMOVED*** in
    p )
        IFS=',' read -ra params <<< "$OPTARG"
        for i in "${params[@]***REMOVED***"; do
            if [[ $i =~ (agw|vnet_opt|ingress|apisecurity|monitor|ingressEveryNode|dnsZoneId|denydefaultNetworkPolicy|certEmail)=([^ ]*) ]]; then
                echo "set ${BASH_REMATCH[1]***REMOVED***=${BASH_REMATCH[2]***REMOVED***"
                declare ${BASH_REMATCH[1]***REMOVED***=${BASH_REMATCH[2]***REMOVED***
            else
                echo "Unknown paramter $i"
                show_usage=true
                break
            fi
        done
      ;;

    g )
     rg=$OPTARG
     ;;

    n )
     aks=$OPTARG
     ;;
    r )
     release_url=$OPTARG
     ;;
    \? )
      echo "Unknown arg"
      show_usage=true

      ;;
  esac
done

if [ "$dnsZoneId" ]; then
    if [[ $dnsZoneId =~ ^/subscriptions/([^/ ]+)/resourceGroups/([^/ ]+)/providers/Microsoft.Network/(dnszones|privateDnsZones)/([^/ ]+)$ ]]; then
        dnsZoneId_sub=${BASH_REMATCH[1]***REMOVED***
        dnsZoneId_rg=${BASH_REMATCH[2]***REMOVED***
        dnsZoneId_type=${BASH_REMATCH[3]***REMOVED***
        dnsZoneId_domain=${BASH_REMATCH[4]***REMOVED***
    else
        echo "dnsZoneId paramter needs to be a resourceId format for Azure DNS Zone"
        show_usage=true
    fi

fi

if [ "$ingressEveryNode" ] && [[ ! $ingressEveryNode = "true" ]]; then
 echo "supported ingressEveryNode paramter values (true)"
 show_usage=true
fi

if [ "$denydefaultNetworkPolicy" ] && [[ ! $denydefaultNetworkPolicy = "true" ]]; then
 echo "supported denydefaultNetworkPolicy paramter values (true)"
 show_usage=true
fi

if [ "$ingress" ] && [[ ! $ingress =~ (appgw|contour|nginx) ]]; then
 echo "supported ingress paramter values (appgw|contour|nginx)"
 show_usage=true
fi

if [ "$ingressEveryNode" ] && [[ $ingress = "appgw" ]]; then
 echo "ingressEveryNode only supported if ingress paramter is (nginx|contour)"
 show_usage=true
fi


if [ -z "$agw" ] && [ "$ingress" = "appgw" ]; then
 echo "If ingress=appgw, please provide a 'agw' parameter"
 show_usage=true
fi

if [  "$monitor" ] && [[ ! "$monitor" = "oss" ]]; then
 echo "supported monitor parameter values are (oss)"
 show_usage=true
fi

if [ -z "$rg" ] || [ -z "$aks" ] || [ "$show_usage" ]; then
    echo "Usage: $0"
    echo "args:"
    echo " < -g resource-group***REMOVED*** (required)"
    echo " < -n aks-name***REMOVED*** (required)"
    echo " [ -p: parameters] : Can provide one or multiple features:"
    echo "     agw=<name***REMOVED*** - Name of Application Gateway"
    echo "     vnet_opt=byo - Deployed AKS into BYO Vnet"
    echo "     ingress=<appgw|contour|nginx***REMOVED*** - Enable cluster AutoScaler with max nodes"
    echo "     apisecurity=<max***REMOVED*** - Enable cluster AutoScaler with max nodes"
    echo "     monitor=<oss***REMOVED*** - Enable cluster AutoScaler with max nodes"
    echo "     ingressEveryNode=<true***REMOVED*** - Enable cluster AutoScaler with max nodes"
    echo "     denydefaultNetworkPolicy=<true***REMOVED*** - Deploy deny all network police"
    echo "     dnsZoneId=<Azure DNS Zone resourceId***REMOVED*** - Enable cluster AutoScaler with max nodes"
    echo "     certEmail=<email for certman certificates***REMOVED*** - Enables cert-manager"
    exit 1
fi


EXTERNAL_DNS_REGISTRY = 'k8s.gcr.io'
EXTERNAL_DNS_REPO = 'external-dns/external-dns'
# appVersion :: https://raw.githubusercontent.com/kubernetes-sigs/external-dns/master/charts/external-dns/Chart.yaml
EXTERNAL_DNS_TAG = 'v0.10.2'


if [[ "$vnet_opt" = "byo" ]] && [[ "$ingress" = "appgw" ]]; then
    echo "# ------------------------------------------------"
    echo "#          Workaround to enable AGIC with BYO VNET"
    APPGW_RG_ID="$(az group show -n ${rg***REMOVED*** --query id -o tsv)"
    APPGW_ID="$(az network application-gateway show -g ${rg***REMOVED*** -n ${agw***REMOVED*** --query id -o tsv)"
    az aks enable-addons -n ${aks***REMOVED*** -g ${deploy.rg***REMOVED*** -a ingress-appgw --appgw-id $APPGW_ID

    AKS_AGIC_IDENTITY_ID="$(az aks show -g ${deploy.rg***REMOVED*** -n ${aks***REMOVED*** --query addonProfiles.ingressApplicationGateway.identity.objectId -o tsv)"
    az role assignment create --role "Contributor" --assignee-principal-type ServicePrincipal --assignee-object-id $AKS_AGIC_IDENTITY_ID --scope $APPGW_ID
    az role assignment create --role "Reader" --assignee-principal-type ServicePrincipal --assignee-object-id $AKS_AGIC_IDENTITY_ID --scope $APPGW_RG_ID

    #  additionally required if appgwKVIntegration (app gateway has assigned identity)
    if true; then

        APPGW_IDENTITY="$(az network application-gateway show -g ${deploy.rg***REMOVED*** -n ${agw***REMOVED*** --query 'keys(identity.userAssignedIdentities)[0]' -o tsv)"
        az role assignment create --role "Managed Identity Operator" --assignee-principal-type ServicePrincipal --assignee-object-id $AKS_AGIC_IDENTITY_ID --scope $APPGW_IDENTITY
    fi
fi

if [ -z "$dnsZoneId"  ] && [ -z "$ingress" ]; then

    KubeletId=$(az aks show -g ${deploy.rg***REMOVED*** -n ${aks***REMOVED*** --query identityProfile.kubeletidentity.clientId -o tsv)
    TenantId=$(az account show --query tenantId -o tsv)

        if [ "$apisecurity" = "private" ]; then
            # Import external-dns Image to ACR
            export ACRNAME=$(az acr list -g ${deploy.rg***REMOVED*** --query [0].name -o tsv)
            az acr import -n $ACRNAME --source ${EXTERNAL_DNS_REGISTRY***REMOVED***/${EXTERNAL_DNS_REPO***REMOVED***:${EXTERNAL_DNS_TAG***REMOVED*** --image ${EXTERNAL_DNS_REPO***REMOVED***:${EXTERNAL_DNS_TAG***REMOVED***
        fi
fi

prometheus_namespace = 'monitoring'
prometheus_helm_release_name = 'monitoring'

if [ "$monitor" = "oss" ]; then
    echo "# ------------------------------------------------"
    echo "#              Install kube-prometheus-stack chart"
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    ***REMOVED***
    kubectl create namespace ${prometheus_namespace***REMOVED***
    helm install ${prometheus_helm_release_name***REMOVED*** prometheus-community/kube-prometheus-stack --namespace ${prometheus_namespace***REMOVED***
fi


if [ "$denydefaultNetworkPolicy" ]; then
    echo "# ----------- Default Deny All Network Policy, east-west traffic in cluster"
    kubectl apply -f ${release_url:-.***REMOVED***/postdeploy/k8smanifests/networkpolicy-deny-all.yml
fi


ingress_controller_kind="deployment"
ingress_externalTrafficPolicy="cluster"
if [ "$ingressEveryNode" ]; then
    ingress_controller_kind="daemonset"
    ingress_externalTrafficPolicy="local"
fi
ingress_metrics_enabled=false
if [[ "$monitor" = "oss"]]; then
    ingress_metrics_enabled=true
fi

if [[ "$ingress" = "nginx" ]]; then

    nginx_namespace = 'ingress-basic'
    nginx_helm_release_name = 'nginx-ingress'

    echo "# ------------------------------------------------"
    echo "#                 Install Nginx Ingress Controller"
    kubectl create namespace ${nginx_namespace***REMOVED***
    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    helm install ${nginx_helm_release_name***REMOVED*** ingress-nginx/ingress-nginx \
        --set controller.publishService.enabled=true \
        --set controller.kind=${ingress_controller_kind***REMOVED*** \
        --set controller.service.externalTrafficPolicy=${ingress_externalTrafficPolicy***REMOVED*** \
        --set controller.metrics.enabled=${ingress_metrics_enabled***REMOVED*** \
        --set controller.metrics.serviceMonitor.enabled=${ingress_metrics_enabled***REMOVED*** \
        --set controller.metrics.serviceMonitor.namespace=${prometheus_namespace***REMOVED*** \
        --set controller.metrics.serviceMonitor.additionalLabels.release=${prometheus_helm_release_name***REMOVED*** \
        --namespace ${nginx_namespace***REMOVED***
fi

if [[ "$ingress" = "contour" ]]; then

    contour_namespace = 'ingress-basic'
    contour_helm_release_name = 'contour-ingress'
    # https://artifacthub.io/packages/helm/bitnami/contour
    echo "# ------------------------------------------------"
    echo "#               Install Contour Ingress Controller"
    ***REMOVED***
    helm install ${contour_helm_release_name***REMOVED*** bitnami/contour --namespace ${contour_namespace***REMOVED*** --create-namespace \
        --set envoy.kind=${ingress_controller_kind***REMOVED*** \
        --set contour.service.externalTrafficPolicy=${ingress_externalTrafficPolicy***REMOVED*** \
        --set metrics.serviceMonitor.enabled=${ingress_metrics_enabled***REMOVED*** \
        --set metrics.serviceMonitor.namespace=${prometheus_namespace***REMOVED***

fi


# External DNS
# external-dns needs permissions to make changes in the Azure DNS server.
# https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/azure.md#azure-managed-service-identity-msi
if [ "$dnsZoneId" ]; then

    echo "# ------------------------------------------------"
    echo "#                             Install external-dns"
    kubectl create secret generic aks-kube-msi --from-literal=azure.json="{
        userAssignedIdentityID: $KubeletId,
        tenantId: $TenantId,
        useManagedIdentityExtension: true,
        subscriptionId: ${dnsZoneId_sub***REMOVED***,
        resourceGroup: ${dnsZoneId_rg***REMOVED***
    ***REMOVED***"

    provider="azure"
    if [[ "$dnsZoneId_type" = "privateDnsZones"]]; then
        provider="azure-private-dns"
    fi

    dnsImageRepo= "${EXTERNAL_DNS_REGISTRY***REMOVED***/${EXTERNAL_DNS_REPO***REMOVED***:${EXTERNAL_DNS_TAG***REMOVED***"
    if [ "$apisecurity" = "private" ]; then
        dnsImageRepo = "${ACRNAME***REMOVED***.azurecr.io/${EXTERNAL_DNS_REPO***REMOVED***"
    fi

    helm upgrade --install externaldns https://github.com/kubernetes-sigs/external-dns/releases/download/external-dns-helm-chart-1.7.1/external-dns-1.7.1.tgz \
    --set domainFilters={"${dnsZoneId_domain***REMOVED***"***REMOVED*** \
    --set provider="${provider***REMOVED***" \
    --set extraVolumeMounts[0].name=aks-kube-msi,extraVolumeMounts[0].mountPath=/etc/kubernetes,extraVolumeMounts[0].readOnly=true \
    --set extraVolumes[0].name=aks-kube-msi,extraVolumes[0].secret.secretName=aks-kube-msi \ ##,extraVolumes[0].secret.items[0].key=externaldns-config.json,extraVolumes[0].secret.items[0].path=azure.json':''***REMOVED***
    --set image.repository=${dnsImageRepo***REMOVED***
    --set image.tag=${EXTERNAL_DNS_TAG***REMOVED***
fi



if [ "$certEmail"]; then

#    // Cert-Manager
#    // https://cert-manager.io/docs/installation/
#    // Cannot use 1.6.0 with AGIC https://github.com/jetstack/cert-manager/issues/4547
#    // cert-manager ACME ClusterIssuer Configuration (client owns the domain)
#    // Lets Encrypt production Issuer, using either HTTP01 for external services, or DNS01 for internal
#    // https://cert-manager.io/docs/configuration/acme/
#    - dns01:
#        # Add azureDNS resolver for Private endpoints, but this need to be fixed: https://github.com/cert-manager/website/issues/662
#        azureDNS:
#          subscriptionID: ${addons.dnsZoneId.split('/')[2]***REMOVED***
#          resourceGroupName: ${addons.dnsZoneId.split('/')[4]***REMOVED***
#          hostedZoneName: ${addons.dnsZoneId.split('/')[8]***REMOVED***
#          managedIdentity:
#            # client id of the node pool managed identity (can not be set at the same time as resourceID)
#            # https://github.com/tomasfreund/website/blob/ee75bf5685474c651d08750ecfe3a150de5eb586/content/en/docs/configuration/acme/dns01/azuredns.md
#            clientID: $(az aks show -g ${deploy.rg***REMOVED*** -n ${aks***REMOVED*** --query identityProfile.kubeletidentity.clientId -o tsv)


    echo "# ------------------------------------------------"
    echo "#                             Install cert-manager"

    ingressClass=$ingress
    certMan_Version="v1.6.0"
    if [[ "$ingress" = "appgw" ]]; then
        echo "Downgrading cert-manager for AppGateway IC"
        certMan_Version="v1.5.3"
        ingressClass="azure/application-gateway"
    fi

    kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/${certMan_Version***REMOVED***/cert-manager.yaml
    sleep 30s # wait for cert-manager webhook to install
    helm upgrade --install letsencrypt-issuer ${process.env.REACT_APP_BASE_URL || '.'***REMOVED***${cluster.apisecurity === "private" && !process.env.REACT_APP_BASE_URL ? '' : '/postdeploy/helm'***REMOVED***/Az-CertManagerIssuer-0.3.0.tgz \
        --set email=${certEmail***REMOVED***  \
        --set ingressClass=${ingressClass***REMOVED***
fi