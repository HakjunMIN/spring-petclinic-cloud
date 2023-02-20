[![Board Status](https://dev.azure.com/andrewmin0240/55eaed97-7a39-446b-ae69-a71fadbe967c/99a994a1-5f16-4765-9d94-b9cda87c83dd/_apis/work/boardbadge/e72ba0cb-465a-49fc-b7c6-3842cfb713ed)](https://dev.azure.com/andrewmin0240/55eaed97-7a39-446b-ae69-a71fadbe967c/_boards/board/t/99a994a1-5f16-4765-9d94-b9cda87c83dd/Microsoft.RequirementCategory)
# Spring Microservice Petclinic on AKS

## 필요도구

* Github 계정 (or Azure DevOps 계정)
* Azure 계정 및 구독

* [Git client](https://git-scm.com/downloads)
* [Azure Cli](https://docs.microsoft.com/ko-kr/cli/azure/install-azure-cli) 2.3 이상
* [kubectl](https://kubernetes.io/ko/docs/tasks/tools/install-kubectl-linux/)
* [Helm](https://helm.sh/ko/docs/intro/install/)
* [Maven](https://maven.apache.org/install.html)
* [JDK](https://learn.microsoft.com/en-us/java/openjdk/download)
* [Docker](https://www.docker.com/products/docker-desktop/)
* IDE (VS Code, IntelliJ .. )
* OSX, WSL, Linux
* bash 설정
  
  ```bash
  alias k='kubectl'
  alias ns='kubectl config set-context $(kubectl config current-context) --namespace'
  alias nsv='kubectl config view | grep namespace:'
  ```

## 목표 아키텍처

![architecture](./docs/targetarchitecture.png)

* 본 프로젝트의 목표는 마이크로서비스로 구성된 Spring Petclinic 앱을 배포하기 위해 Non-prod 클러스터 환경을 구성하는 것임.
* Non-prod 환경은 개발계과 스테이지계로 구성되어 있으며 개발계는 Kubernetes Object를 최대한 활용하고 스테이지계는 Azure PaaS를 최대한 활용함.

| 구분    | 개발계                         | 스테이지계 |
| ---------- | ------------------------------- | ----|
| Endpoint | Load Balancer | Application Gateway |
| Persistence  | K8S Statefulset | Azure Database for MySQL |
| 구성정보  | K8S ConfigMap | Azure App Configuration |
| 기밀정보  | K8S secret | Azure KeyVault |
| Monitoring | 없음 | Application Insight |
| Namespace | spring-petclinic | spring-petclinic-stage |

## Infrastructure Provisioning

* 본 실습은 설정을 쉽게 확인하고 쉬운 사용성을 확인하기 위해 **Azure Portal** 에서 작업수행

* Azure Kubernetes Service 생성
  * Dev/Test
  * ACR 생성 후 Attach가능

    ```bash
      az aks update -n <your-cluster> -g <your-resource-group> --attach-acr <acr-name>
    ```

> [!NOTE]
>
> 실제 구축 시 [`bicap`](./bicep) 디렉토리의 IaC코드 활용
> 혹은
> AKS Constructor Helper로 Provisioning 자동화 가능
> https://azure.github.io/AKS-Construction/?deploy.deployItemKey=deployArmCli
>
> 혹은

```sh
 az deployment group create -g <your-resource-group>  --template-uri https://github.com/Azure/AKS-Construction/releases/download/0.9.0/main.json --parameters \
 resourceName=spring-cluster \
 upgradeChannel=stable \
 agentCountMax=20 \
 omsagent=true \
 retentionInDays=30 
```

## Kuberentes Context 설정

```sh
az login 
az aks get-credentials --resource-group <your-resource-group> --name <your-cluster>
kubectl get nodes
```

## 샘플 앱 배포

* `<Kubernetes resources>` > Create > Create a starter application
* 샘플앱 살펴보기

  ```sh
  kubectl run busybox -i --tty --image=busybox --restart=Never --rm -- sh
  kubectl run curl --rm -i --tty --image=curlimages/curl -- sh
  kubectl logs <pod>
  kubectl describe po <pod>
  kubectl get po -o yaml
  ```

## Spring Petclinic Microservice 코드

* 마이크로서비스로 분리, 각 서비스는 REST API로 통신, `api-gateway`가 Frontend 역할 및 API중재.

## 앱 빌드 패키징

```bash
mvn clean package -DskipTests 

export REPOSITORY_PREFIX=<your-registry>.azurecr.io/petclinic
cd spring-petclinic-customers-service && docker build -t ${REPOSITORY_PREFIX}/spring-petclinic-cloud-customers-service . && cd .. 
cd spring-petclinic-vets-service && docker build -t ${REPOSITORY_PREFIX}/spring-petclinic-cloud-vets-service . && cd .. 
cd spring-petclinic-visits-service && docker build -t ${REPOSITORY_PREFIX}/spring-petclinic-cloud-visits-service . && cd .. 
cd spring-petclinic-api-gateway && docker build -t ${REPOSITORY_PREFIX}/spring-petclinic-cloud-api-gateway . && cd .. 

```

> [!IMPORTANT]
>
> OSX M1 맥북에서 Docker 빌드할 때 ` --platform linux/amd64` 파라미터를 반드시 넣어야 함.
> 혹은 `buildx`를 통해 멀티 플랫폼 빌드 수행 https://www.docker.com/blog/how-to-rapidly-build-multi-architecture-images-with-buildx/

혹은 `spring-boot:build-image` goal 사용
  
```bash
export REPOSITORY_PREFIX=<your-registry>.azurecr.io/petclinic
mvn spring-boot:build-image -DREPOSITORY_PREFIX=${REPOSITORY_PREFIX} -DskipTests
```

## 컨테이너 레지스트리에 이미지 배포

```bash

export REPOSITORY_PREFIX=<your-registry>.azurecr.io/petclinic
az acr login --name <your-regtistry>

docker push ${REPOSITORY_PREFIX}/spring-petclinic-cloud-customers-service:latest
docker push ${REPOSITORY_PREFIX}/spring-petclinic-cloud-vets-service:latest
docker push ${REPOSITORY_PREFIX}/spring-petclinic-cloud-visits-service:latest
docker push ${REPOSITORY_PREFIX}/spring-petclinic-cloud-api-gateway:latest
```

## 개발계 구성

### 네임스페이스 생성

```bash
kubectl create namespace spring-petclinic
```

### OSS mySQL DB StatefulSet로 설치

```sh
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install vets-db-mysql bitnami/mysql --namespace spring-petclinic --version 8 --set auth.database=service_instance_db
helm install visits-db-mysql bitnami/mysql --namespace spring-petclinic  --version 8 --set auth.database=service_instance_db
helm install customers-db-mysql bitnami/mysql --namespace spring-petclinic  --version 8 --set auth.database=service_instance_db 
```

### Role 및 Role Binding 생성

Helm Chart내 Template에 정의되어 있음. (설명 필요)

### K8S 샘플 manifests파일 설명

### (선택)Container Registry Service Principal 생성

* 외부 ACR을 연결할때만 필요, AKS와 Attach했으면 필요없음.
  
> [!NOTE]

```bash
#!/bin/bash
# This script requires Azure CLI version 2.25.0 or later. Check version with `az --version`.

# Modify for your environment.
# ACR_NAME: The name of your Azure Container Registry
# SERVICE_PRINCIPAL_NAME: Must be unique within your AD tenant

export containerRegistry=<your-registry>
export servicePrincipal=<your-registry>-sp

ACR_NAME=$containerRegistry
SERVICE_PRINCIPAL_NAME=$servicePrincipal

# Obtain the full registry ID
ACR_REGISTRY_ID=$(az acr show --name $ACR_NAME --query "id" --output tsv)
# echo $registryId

# Create the service principal with rights scoped to the registry.
# Default permissions are for docker pull access. Modify the '--role'
# argument value as desired:
# acrpull:     pull only
# acrpush:     push and pull
# owner:       push, pull, and assign roles
PASSWORD=$(az ad sp create-for-rbac --name $SERVICE_PRINCIPAL_NAME --scopes $ACR_REGISTRY_ID --role acrpull --query "password" --output tsv)
USER_NAME=$(az ad sp list --display-name $SERVICE_PRINCIPAL_NAME --query "[].appId" --output tsv)

# Output the service principal's credentials; use these in your services and
# applications to authenticate to the container registry.
echo "Service principal ID: $USER_NAME"
echo "Service principal password: $PASSWORD"

```

#### (선택) ACR접속위한 secret생성

* 외부 ACR을 연결할때만 필요, AKS와 Attach했으면 필요없음.

```sh
kubectl create secret docker-registry regcred \
  --namespace spring-petclinic \
  --docker-server=springpetacr.azurecr.io \
  --docker-username=springpetacrsp \
  --docker-password=k4Q8Q~ebKNedjwPcoxgHqlPbhpYno.OJ6R-kSamU \
  --dry-run=client -o yaml 

```

* `regcred`이름으로 imagePullSecret을 사용

> [!NOTE]
>
> 위 구문에  `> ./manifests/init-namespace/02-regcreds.yaml` 를 추가하여 yaml로 만들어 놓을 수 있음.

### Helm Chart 샘플 생성

```sh
cd charts
helm create spring-petclinic
```

> [!NOTE]
>
> [draft](https://learn.microsoft.com/ko-kr/azure/aks/draft) 도구를 사용하여 자동으로 생성할 수 있음
> [Helm Library Chart](https://helm.sh/docs/topics/library_charts/)를 사용하여 쉽게 공통화를 쉽게 하고 개발자가 쉽게 끌어쓸수 있음
> Helm Guide는 [여기](https://github.com/HakjunMIN/azure-petclinic/blob/main/helm-library-guide.md)를 참고

### `charts` 디렉토리 분석

```sh
helm template petclinic-dev charts/petclinic --namespace spring-petclinic 
```

### values.yaml 내 이미지정보 수정

```yaml
vets:
  image:
    repository: <your-registry>.azurecr.io/petclinic/spring-petclinic-cloud-vets-service
    tag: latest
 
customers:
  image:
    repository: <your-registry>.azurecr.io/petclinic/spring-petclinic-cloud-customers-service
    tag: latest 

visits:
  image:
    repository: <your-registry>.azurecr.io/petclinic/spring-petclinic-cloud-visits-service
    tag: latest

api-gateway:
  image:
    repository: <your-registry>.azurecr.io/petclinic/spring-petclinic-cloud-api-gateway
    tag: latest
...
```  

### Helm Chart로 앱 배포

```sh
# helm upgrade --install <릴리즈명> <차트>
helm upgrade --install petclinic-release charts/petclinic --namespace spring-petclinic
```

## API 테스트

* [`test.http`](./test.http) 파일로 API테스트.

> [!NOTE]
>
> VSCode의 [REST Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) 추천

* 클러스터 내 DNS로 API테스트 수행

```sh
kubectl run curl --rm -i --tty --image=curlimages/curl:7.73.0 -- sh
$ curl http://customers-service.spring-petclinic.svc.cluster.local:8080/owners
```

* 서비스 테스트

  * api-gateway의 EXTERNAL-IP로 웹브라우저에서 테스트

  ```bash
  kubectl get svc
  NAME                          TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)        AGE
  api-gateway                   LoadBalancer   10.0.40.187    20.196.249.134   80:30807/TCP   44h
  customers-db-mysql            ClusterIP      10.0.159.153   <none>           3306/TCP       44h
  customers-db-mysql-headless   ClusterIP      None           <none>           3306/TCP       44h
  ...

  ```

## 스테이지계 환경 구성

### 스테이지 네임스페이스 생성

```sh
kubectl create namespace spring-petclinic-stage
```

### Azure Database for mySQL

* Azure Portal에서 `flexible db`로 생성

  * `service_instance_db` DB생성. `Admin username`과 `Password`는 별도 메모 필요.

* `service-instance-db` DB 생성

```sh
az mysql flexible-server db create --resource-group <your-resource-group> --server-name <your-mysql> --database-name service_instance_db

```

* Portal에서 `<your-mysql>` > Settings > Connect > Connect from your app > JDBC용 URL 참고

> [!IMPORTANT]
>
> mySQL서비스와 SSL통신을 하기 위해 인증서를 지정해야 함.
> 커넥션 스트링에서 인증서를 다음과 같이 지정함.
> `sslmode=verify-full&&sslfactory=org.mysqlql.ssl.SingleCertValidatingFactory&sslfactoryarg=classpath:BaltimoreCyberTrustRoot.crt.pem` 
> `BaltimoreCyberTrustRoot.crt.pem`는 각 마이크로서비스 별 `src/main/resources`에 있음.

### Application Insights

* Portal > Application Insights > Create. Resource Mode를 `Workspace-base`로 설정
* `Instrumentation Key` 필요
* 각 마이크로서비스 별 `pom.xml`에 아래 설정 추가

```xml
<!-- App Insight -->
<dependency>
    <groupId>com.microsoft.azure</groupId>
    <artifactId>applicationinsights-runtime-attach</artifactId>
    <version>${appcliation-insights.version}</version>
</dependency>
```

* (선택) 각 마이크로서비스 별 `*Application.java` 코드에 아래 로직 추가

```java
import com.microsoft.applicationinsights.attach.ApplicationInsights;
...
@SpringBootApplication
@EnableConfigurationProperties(VetsProperties.class)
public class VetsServiceApplication {
      public static void main(String[] args) {
            ApplicationInsights.attach();
            SpringApplication.run(VetsServiceApplication.class, args);
      }
}
```

* `Deployment` 환경 변수에 `APPINSIGHTS_INSTRUMENTATIONKEY` 설정

  * `values-stage.yaml`에 아래 설정 추가

  ```yaml

  env:
    - name: APPINSIGHTS_INSTRUMENTATIONKEY
      value: <your-instrumentation-key>
  ```

## Azure KeyVault

* AKS에서 Secret Store CSI Driver와 Managed ID를 활성화 시킴

```bash
export aks=<your-cluster>
export rg=<your-resource-group>
az aks enable-addons -a azure-keyvault-secrets-provider -n $aks -g $rg
az aks update -n $aks -g $rg --enable-managed-identity
```

### Azure KeyVault 생성

* 리전, 이름, Standard Tier로 나머지는 디폴트 설정으로 생성

* 클러스터에 `--enable-managed-identity`를 활성화하면 아래와 같이 objectId (Managed ID)를 얻을 수 있음.
  
```json
 "identity": {
        "clientId": "90e35a2c-3a2e-495a-88a6-9ca1cd5d710a",
        "objectId": "668c37cb-ee54-44bf-bc42-03e420240b5d",
        "resourceId": "/subscriptions/2f2d6dff-65ac-45fc-9180-bad1e786a763/resourcegroups/~~~~"
     }
```

* KeyVault 서비스에 secret permission을 위 AKS managed ID에 할당함
  
```bash
  az keyvault set-policy -n <your-keyvault> --secret-permissions get --object-id 668c37cb-ee54-44bf-bc42-03e420240b5d
```

### mySQL 계정/비밀번호 `secret`으로 저장

* KeyVault에 아래와 같이 secret을 저장함

```sh
az keyvault secret set --vault-name <your-keyvault> --name mysql-user --value <user>

az keyvault secret set --vault-name <your-keyvault> --name mysql-pass --value <password>
```

### Secret Driver Class 구성을 위한 yaml추가

#### Secret Driver Class Manifest 파일 [secretproviderclass](charts/petclinic/templates/secret-provider-class.yaml) 수정

* `userAssignedIdentityID`에 위 Managed ID의 `clientId`를 입력
* `tenantID`: 계정의 TenantID 입력
  * CLI로 확인

  ```bash
   az account tenant list
  ```

* `secret-provider-class.yaml` 샘플

```yaml
(생략)
...
spec:
  provider: azure
  secretObjects:                             
  - data:
    - key: mysql-user                          
      objectName: mysql-user
    - key: mysql-pass                          
      objectName: mysql-pass                      
    secretName: dbsecret                    
    type: Opaque  

  parameters:
    usePodIdentity: "false"
    useVMManagedIdentity: "true"
    userAssignedIdentityID: "<clientId>"
    keyvaultName: "<your-keyvault>"
    cloudName: ""
    objects:  |
      array:
        - |
          objectName: mysql-user
          objectType: secret
          objectVersion: ""
        - |
          objectName: mysql-pass
          objectType: secret
          objectVersion: "" 
    tenantId: "<your-tenant-id>"
```  

* 생성된 `SecretProviderClass`를 `Volume`으로 Mount. 이 항목은 values.yaml에서 정의할 수 있음. 이 프로젝트는 스테이지계만 KeyVault를 사용하므로 `values-stage.yaml`에 정의함.

* Volume, Volume Mount 설정 (values-stage.yaml)

```yaml
(생략)

...
 volumes:
  - name: secrets-store01-inline
    csi:
      driver: secrets-store.csi.k8s.io
      readOnly: true
      volumeAttributes:
        secretProviderClass: "azure-secret"      
  volumeMounts:
  - name: secrets-store01-inline
    mountPath: "/mnt/secrets-store"
    readOnly: true
```

* mySQL 사용자 및 비밀번호는 위 Secret Provider Class로 생성된 `dbsecret` Object 사용 (values-stage.yaml)
  
```yaml
...
env  
  - name: SPRING_DATASOURCE_USERNAME
    valueFrom:
      secretKeyRef:
        name: dbsecret
        key: mysql-user
  - name: SPRING_DATASOURCE_PASSWORD
    valueFrom:
      secretKeyRef:
        name: dbsecret
        key: mysql-pass  
```

### Application Gateway 생성

* `<your-kubernetes>` > Settings> Networking > Application Gateway ingress controller Enable ingress controller > 신규로 생성

### Ingress 생성

* 스테이지 환경만 Ingress생성 및 Application Gateway 연결
* `deployment`에 `ingress`용 `annotations`인 `kubernetes.io/ingress.class: azure/application-gateway` 추가 
  * `values-stage.yaml` 샘플

  ```yaml
  api-gateway:
    env:
    - name: SPRING_PROFILES_ACTIVE         
      value: "stage"     
    ingress:
      enabled: true
      annotations: 
        kubernetes.io/ingress.class: azure/application-gateway
      hosts:
        - host:
          paths:
            - path: /
              pathType: Exact
      tls: []

  ```

## Azure AppConfiguration 설정

* Portal > App Configuration > Create
* `Free` Tier 선택
* Operations > Import/Export > Import > [`application-for-app-config.yaml`](application-for-appconfig.yaml) 파일 선택
* Settings > Access keys > read only용 Connection String 복사
* 각 마이크로서비스 별 `bootstrap.yaml`에 아래 설정 추가

```yaml
spring:
  config:
    activate:
      on-profile: stage
  cloud:
    config:
      enabled: false
    kubernetes:
      reload:
        strategy: restart-context
        enabled: true
    azure:
      appconfiguration:
        enabled: true
        stores:
          - connection-string: "<your-appconfigration-connection-string>"
```

### 완성된 Stage용 value file 확인

* [values-stage.yaml](./charts/petclinic/values-stage.yaml)

### Helm Chart로 스테이지용 앱 배포

> [!IMPORTANT]
>
> 가장 나중에 선언된 선언 값이 우선순위가 높고 Overriding됨.
> 빈 값으로 선언하지 않도록 주의!
>
> `helm upgrade --install <릴리즈명> <차트> -f <환경별 구성정보> -f <리전별 구성정보> ...-f <구성정보>`

```sh
ns spring-petclinic-stage
helm upgrade --install petclinic-stage charts/petclinic -f charts/petclinic/values-stage.yaml --namespace spring-petclinic-stage
```

## Azure DevOps를 이용한 CI/CD는 별도 프로젝트 참고

* [Azure DevOps를 이용한 CI/CD](https://github.com/HakjunMIN/spring-petclinic-monolith)
