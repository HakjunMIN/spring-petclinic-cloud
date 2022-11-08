//Minimum Bicep version required : v0.4.1124

@minLength(2)
@description('The location to use for the deployment. defaults to Resource Groups location.')
param location string = resourceGroup().location

@minLength(3)
@maxLength(20)
@description('Used to name all resources')
param resourceName string
 
/*
Resource sections
1. Networking
2. DNS
3. Key Vault
4. Container Registry
5. Firewall
6. Application Gateway
7. AKS
8. Monitoring / Log Analytics
*/


/*.__   __.  _______ .___________.____    __    ____  ______   .______       __  ___  __  .__   __.   _______
|  \ |  | |   ____||           |\   \  /  \  /   / /  __  \  |   _  \     |  |/  / |  | |  \ |  |  /  _____|
|   \|  | |  |__   `---|  |----` \   \/    \/   / |  |  |  | |  |_)  |    |  '  /  |  | |   \|  | |  |  __
|  . `  | |   __|      |  |       \            /  |  |  |  | |      /     |    <   |  | |  . `  | |  | |_ |
|  |\   | |  |____     |  |        \    /\    /   |  `--'  | |  |\  \----.|  .  \  |  | |  |\   | |  |__| |
|__| \__| |_______|    |__|         \__/  \__/     \______/  | _| `._____||__|\__\ |__| |__| \__|  \______| */
//Networking can either be one of: custom / byo / default

@description('Are you providing your own vNet CIDR blocks')
param custom_vnet bool = false

@description('Full resource id path of an existing subnet to use for AKS')
param byoAKSSubnetId string = ''

@description('Full resource id path of an existing subnet to use for Application Gateway')
param byoAGWSubnetId string = ''

//--- Custom or BYO networking requires BYO AKS User Identity
var aks_byo_identity = custom_vnet || !empty(byoAKSSubnetId)
resource uai 'Microsoft.ManagedIdentity/userAssignedIdentities@2018-11-30' = if (aks_byo_identity) {
  name: 'id-aks-${resourceName***REMOVED***'
  location: location
***REMOVED***

//----------------------------------------------------- BYO Vnet
var existingAksVnetRG = !empty(byoAKSSubnetId) ? (length(split(byoAKSSubnetId, '/')) ***REMOVED*** 4 ? split(byoAKSSubnetId, '/')[4] : '') : ''

module aksnetcontrib './aksnetcontrib.bicep' = if (!empty(byoAKSSubnetId)) {
  name: 'addAksNetContributor'
  scope: resourceGroup(existingAksVnetRG)
  params: {
    byoAKSSubnetId: byoAKSSubnetId
    user_identity_principalId: aks_byo_identity ? uai.properties.principalId : ''
    user_identity_name: uai.name
    user_identity_rg: resourceGroup().name
  ***REMOVED***
***REMOVED***

var existingAGWSubnetName = !empty(byoAGWSubnetId) ? (length(split(byoAGWSubnetId, '/')) ***REMOVED*** 10 ? split(byoAGWSubnetId, '/')[10] : '') : ''
var existingAGWVnetName = !empty(byoAGWSubnetId) ? (length(split(byoAGWSubnetId, '/')) ***REMOVED*** 9 ? split(byoAGWSubnetId, '/')[8] : '') : ''
var existingAGWVnetRG = !empty(byoAGWSubnetId) ? (length(split(byoAGWSubnetId, '/')) ***REMOVED*** 9 ? split(byoAGWSubnetId, '/')[4] : '') : ''

resource existingAgwVnet 'Microsoft.Network/virtualNetworks@2021-02-01' existing = if (!empty(byoAGWSubnetId)) {
  name: existingAGWVnetName
  scope: resourceGroup(existingAGWVnetRG)
***REMOVED***
resource existingAGWSubnet 'Microsoft.Network/virtualNetworks/subnets@2020-11-01' existing = if (!empty(byoAGWSubnetId)) {
 parent: existingAgwVnet
 name: existingAGWSubnetName
***REMOVED***

//------------------------------------------------------ Create custom vnet
@minLength(9)
@maxLength(18)
@description('The address range for the custom vnet')
param vnetAddressPrefix string = '10.240.0.0/16'

@minLength(9)
@maxLength(18)
@description('The address range for AKS in your custom vnet')
param vnetAksSubnetAddressPrefix string = '10.240.0.0/22'

@minLength(9)
@maxLength(18)
@description('The address range for the App Gateway in your custom vnet')
param vnetAppGatewaySubnetAddressPrefix string = '10.240.4.0/26'

@minLength(9)
@maxLength(18)
@description('The address range for the ACR in your custom vnet')
param acrAgentPoolSubnetAddressPrefix string = '10.240.4.64/26'

@minLength(9)
@maxLength(18)
@description('The address range for Azure Bastion in your custom vnet')
param bastionSubnetAddressPrefix string = '10.240.4.128/26'

@minLength(9)
@maxLength(18)
@description('The address range for private link in your custom vnet')
param privateLinkSubnetAddressPrefix string = '10.240.4.192/26'

@minLength(9)
@maxLength(18)
@description('The address range for Azure Firewall in your custom vnet')
param vnetFirewallSubnetAddressPrefix string = '10.240.50.0/24'

@description('Enable support for private links')
param privateLinks bool = false

@description('Enable support for ACR private pool')
param acrPrivatePool bool = false

@description('Deploy Azure Bastion to your vnet. (works with Custom Networking only, not BYO)')
param bastion bool = false

@description('Deploy NSGs to your vnet. (works with Custom Networking only, not BYO)')
param CreateNetworkSecurityGroups bool = false

module network './network.bicep' = if (custom_vnet) {
  name: 'network'
  params: {
    resourceName: resourceName
    location: location
    vnetAddressPrefix: vnetAddressPrefix
    aksPrincipleId: aks_byo_identity ? uai.properties.principalId : ''
    vnetAksSubnetAddressPrefix: vnetAksSubnetAddressPrefix
    ingressApplicationGateway: ingressApplicationGateway
    vnetAppGatewaySubnetAddressPrefix: vnetAppGatewaySubnetAddressPrefix
    azureFirewalls: azureFirewalls
    vnetFirewallSubnetAddressPrefix: vnetFirewallSubnetAddressPrefix
    privateLinks: privateLinks
    privateLinkSubnetAddressPrefix: privateLinkSubnetAddressPrefix
    privateLinkAcrId: privateLinks && !empty(registries_sku) ? acr.id : ''
    privateLinkAkvId: privateLinks && createKV ? kv.id : ''
    acrPrivatePool: acrPrivatePool
    acrAgentPoolSubnetAddressPrefix: acrAgentPoolSubnetAddressPrefix
    bastion: bastion
    bastionSubnetAddressPrefix: bastionSubnetAddressPrefix
    availabilityZones: availabilityZones
    workspaceDiagsId: createLaw ? aks_law.id : ''
    networkSecurityGroups: CreateNetworkSecurityGroups
    ingressApplicationGatewayPublic: empty(privateIpApplicationGateway)
  ***REMOVED***
***REMOVED***
output CustomVnetId string = custom_vnet ? network.outputs.vnetId : ''
output CustomVnetPrivateLinkSubnetId string = custom_vnet ? network.outputs.privateLinkSubnetId : ''

//var appGatewaySubnetAddressPrefix = !empty(byoAGWSubnetId) ? existingAGWSubnet.properties.addressPrefix : vnetAppGatewaySubnetAddressPrefix
var aksSubnetId = custom_vnet ? network.outputs.aksSubnetId : byoAKSSubnetId
var appGwSubnetId = ingressApplicationGateway ? (custom_vnet ? network.outputs.appGwSubnetId : byoAGWSubnetId) : ''




/*______  .__   __.      _______.    ________    ______   .__   __.  _______      _______.
|       \ |  \ |  |     /       |   |       /   /  __  \  |  \ |  | |   ____|    /       |
|  .--.  ||   \|  |    |   (----`   `---/  /   |  |  |  | |   \|  | |  |__      |   (----`
|  |  |  ||  . `  |     \   \          /  /    |  |  |  | |  . `  | |   __|      \   \
|  '--'  ||  |\   | .----)   |        /  /----.|  `--'  | |  |\   | |  |____ .----)   |
|_______/ |__| \__| |_______/        /________| \______/  |__| \__| |_______||_______/    */

@description('The full Azure resource ID of the DNS zone to use for the AKS cluster')
param dnsZoneId string = ''
var dnsZoneRg = !empty(dnsZoneId) ? split(dnsZoneId, '/')[4] : ''
var dnsZoneName = !empty(dnsZoneId) ? split(dnsZoneId, '/')[8] : ''
var isPrivate = !empty(dnsZoneId) ? split(dnsZoneId, '/')[7] == 'privateDnsZones' : false

module dnsZone './dnsZone.bicep' = if (!empty(dnsZoneId)) {
  name: 'addDnsContributor'
  scope: resourceGroup(dnsZoneRg)
  params: {
    dnsZoneName: dnsZoneName
    isPrivate: isPrivate
    vnetId: isPrivate ? (!empty(byoAKSSubnetId) ? split(byoAKSSubnetId, '/subnets')[0] : (custom_vnet ? network.outputs.vnetId : '')) : ''
    principalId: any(aks.properties.identityProfile.kubeletidentity).objectId
  ***REMOVED***
***REMOVED***

/*__  __  _______ ____    ____    ____    ____  ___      __    __   __      .___________.
|  |/  / |   ____|\   \  /   /    \   \  /   / /   \    |  |  |  | |  |     |           |
|  '  /  |  |__    \   \/   /      \   \/   / /  ^  \   |  |  |  | |  |     `---|  |----`
|    <   |   __|    \_    _/        \      / /  /_\  \  |  |  |  | |  |         |  |
|  .  \  |  |____     |  |           \    / /  _____  \ |  `--'  | |  `----.    |  |
|__|\__\ |_______|    |__|            \__/ /__/     \__\ \______/  |_______|    |__|     */

@description('Installs the AKS KV CSI provider')
param azureKeyvaultSecretsProvider bool = false

@description('Enables Open Service Mesh')
param openServiceMeshAddon bool = false

@description('Creates a Key Vault')
param createKV bool = false

@description('If soft delete protection is enabled')
param KeyVaultSoftDelete bool = true

@description('If purge protection is enabled')
param KeyVaultPurgeProtection bool = true

@description('Add IP to KV firewall allow-list')
param kvIPAllowlist array = []

var akvRawName = 'kv-${replace(resourceName, '-', '')***REMOVED***${uniqueString(resourceGroup().id, resourceName)***REMOVED***'
var akvName = length(akvRawName) ***REMOVED*** 24 ? substring(akvRawName, 0, 24) : akvRawName

var kvIPRules = [for kvIp in kvIPAllowlist: {
  value: kvIp
***REMOVED***]

resource kv 'Microsoft.KeyVault/vaults@2021-06-01-preview' = if (createKV) {
  name: akvName
  location: location
  properties: {
    tenantId: subscription().tenantId
    sku: {
      family: 'A'
      name: 'standard'
    ***REMOVED***
    // publicNetworkAccess:  whether the vault will accept traffic from public internet. If set to 'disabled' all traffic except private endpoint traffic and that that originates from trusted services will be blocked.
    publicNetworkAccess: privateLinks && empty(kvIPAllowlist) ? 'disabled' : 'enabled'

    networkAcls: privateLinks && !empty(kvIPAllowlist) ? {
      bypass: 'AzureServices'
      defaultAction: 'Deny'
      ipRules: kvIPRules
      virtualNetworkRules: []
    ***REMOVED*** : {***REMOVED***

    //enabledForTemplateDeployment: true
    enableRbacAuthorization: true
    enabledForDeployment: false
    enabledForDiskEncryption: false
    enabledForTemplateDeployment: false
    enableSoftDelete: KeyVaultSoftDelete
    enablePurgeProtection: KeyVaultPurgeProtection ? true : json('null')
  ***REMOVED***
***REMOVED***

var keyVaultSecretsUserRole = resourceId('Microsoft.Authorization/roleDefinitions', '4633458b-17de-408a-b874-0445c86b69e6')
resource kvAppGwSecretsUserRole 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = if (createKV && appgwKVIntegration) {
  scope: kv
  name: guid(aks.id, 'AppGw', keyVaultSecretsUserRole)
  properties: {
    roleDefinitionId: keyVaultSecretsUserRole
    principalType: 'ServicePrincipal'
    principalId: deployAppGw ? appGwIdentity.properties.principalId : ''
  ***REMOVED***
***REMOVED***

resource kvCSIdriverSecretsUserRole 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = if (createKV && azureKeyvaultSecretsProvider) {
  scope: kv
  name: guid(aks.id, 'CSIDriver', keyVaultSecretsUserRole)
  properties: {
    roleDefinitionId: keyVaultSecretsUserRole
    principalType: 'ServicePrincipal'
    principalId: aks.properties.addonProfiles.azureKeyvaultSecretsProvider.identity.objectId
  ***REMOVED***
***REMOVED***

@description('The principal ID of the service principal that has access to the Key Vault')
param kvOfficerRolePrincipalId string = ''
var keyVaultSecretsOfficerRole = resourceId('Microsoft.Authorization/roleDefinitions', 'b86a8fe4-44ce-4948-aee5-eccb2c155cd7')
resource kvUserSecretOfficerRole 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = if (createKV && !empty(kvOfficerRolePrincipalId)) {
  scope: kv
  name: guid(aks.id, 'usersecret', keyVaultSecretsOfficerRole)
  properties: {
    roleDefinitionId: keyVaultSecretsOfficerRole
    principalType: 'User'
    principalId: kvOfficerRolePrincipalId
  ***REMOVED***
***REMOVED***


var keyVaultCertsOfficerRole = resourceId('Microsoft.Authorization/roleDefinitions', 'a4417e6f-fecd-4de8-b567-7b0420556985')
resource kvUserCertsOfficerRole 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = if (createKV && !empty(kvOfficerRolePrincipalId)) {
  scope: kv
  name: guid(aks.id, 'usercert', keyVaultCertsOfficerRole)
  properties: {
    roleDefinitionId: keyVaultCertsOfficerRole
    principalType: 'User'
    principalId: kvOfficerRolePrincipalId
  ***REMOVED***
***REMOVED***

output keyVaultName string = createKV ? kv.name : ''
output keyVaultId string = createKV ? kv.id : ''

resource kvDiags 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = if (createLaw && createKV) {
  name: 'kvDiags'
  scope: kv
  properties: {
    workspaceId:aks_law.id
    logs: [
      {
        category: 'AuditEvent'
  ***REMOVED***
***REMOVED***
    ]
    metrics: [
      {
        category: 'AllMetrics'
  ***REMOVED***
***REMOVED***
    ]
  ***REMOVED***
***REMOVED***


/*   ___           ______     .______
    /   \         /      |    |   _  \
   /  ^  \       |  ,----'    |  |_)  |
  /  /_\  \      |  |         |      /
 /  _____  \   __|  `----. __ |  |\  \----. __
/__/     \__\ (__)\______|(__)| _| `._____|(__)*/

@allowed([
  ''
  'Basic'
  'Standard'
  'Premium'
])
@description('The SKU to use for the Container Registry')
param registries_sku string = ''

@description('Enable the ACR Content Trust Policy, SKU must be set to Premium')
param enableACRTrustPolicy bool = false
var acrContentTrustEnabled = enableACRTrustPolicy && registries_sku == 'Premium' ? 'enabled' : 'disabled'

//param enableACRZoneRedundancy bool = true
var acrZoneRedundancyEnabled = !empty(availabilityZones) && registries_sku == 'Premium' ? 'Enabled' : 'Disabled'

@description('Enable removing of untagged manifests from ACR')
param acrUntaggedRetentionPolicyEnabled bool = false

@description('The number of days to retain untagged manifests for')
param acrUntaggedRetentionPolicy int = 30

var acrName = 'cr${replace(resourceName, '-', '')***REMOVED***${uniqueString(resourceGroup().id, resourceName)***REMOVED***'

resource acr 'Microsoft.ContainerRegistry/registries@2021-06-01-preview' = if (!empty(registries_sku)) {
  name: acrName
  location: location
  sku: {
    #disable-next-line BCP036 //Disabling validation of this parameter to cope with empty string to indicate no ACR required.
    name: registries_sku
  ***REMOVED***
  properties: {
    policies: {
      trustPolicy: enableACRTrustPolicy ? {
        status: acrContentTrustEnabled
        type: 'Notary'
***REMOVED*** : {***REMOVED***
      retentionPolicy: acrUntaggedRetentionPolicyEnabled ? {
        status: 'enabled'
        days: acrUntaggedRetentionPolicy
***REMOVED*** : json('null')
    ***REMOVED***
    publicNetworkAccess: privateLinks /* && empty(acrIPWhitelist)*/ ? 'Disabled' : 'Enabled'
    zoneRedundancy: acrZoneRedundancyEnabled
    /*
    networkRuleSet: {
      defaultAction: 'Deny'

      ipRules: empty(acrIPWhitelist) ? [] : [
          {
            action: 'Allow'
            value: acrIPWhitelist
  ***REMOVED***
      ]
      virtualNetworkRules: []
    ***REMOVED***
    */
  ***REMOVED***
***REMOVED***
output containerRegistryName string = !empty(registries_sku) ? acr.name : ''
output containerRegistryId string = !empty(registries_sku) ? acr.id : ''

resource acrDiags 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = if (createLaw && !empty(registries_sku)) {
  name: 'acrDiags'
  scope: acr
  properties: {
    workspaceId:aks_law.id
    logs: [
      {
        category: 'ContainerRegistryRepositoryEvents'
  ***REMOVED***
***REMOVED***
      {
        category: 'ContainerRegistryLoginEvents'
  ***REMOVED***
***REMOVED***
    ]
    metrics: [
      {
        category: 'AllMetrics'
  ***REMOVED***
        timeGrain: 'PT1M'
***REMOVED***
    ]
  ***REMOVED***
***REMOVED***

//resource acrPool 'Microsoft.ContainerRegistry/registries/agentPools@2019-06-01-preview' = if (custom_vnet && (!empty(registries_sku)) && privateLinks && acrPrivatePool) {
module acrPool 'acragentpool.bicep' = if (custom_vnet && (!empty(registries_sku)) && privateLinks && acrPrivatePool) {
  name: 'acrprivatepool'
  params: {
    acrName: acr.name
    acrPoolSubnetId: custom_vnet ? network.outputs.acrPoolSubnetId : ''
    location: location
  ***REMOVED***
***REMOVED***

var AcrPullRole = resourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d')
var KubeletObjectId = any(aks.properties.identityProfile.kubeletidentity).objectId

resource aks_acr_pull 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = if (!empty(registries_sku)) {
  scope: acr // Use when specifying a scope that is different than the deployment scope
  name: guid(aks.id, 'Acr', AcrPullRole)
  properties: {
    roleDefinitionId: AcrPullRole
    principalType: 'ServicePrincipal'
    principalId: KubeletObjectId
  ***REMOVED***
***REMOVED***

var AcrPushRole = resourceId('Microsoft.Authorization/roleDefinitions', '8311e382-0749-4cb8-b61a-304f252e45ec')

@description('The principal ID of the service principal to assign the push role to the ACR')
param acrPushRolePrincipalId string = ''

resource aks_acr_push 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = if (!empty(registries_sku) && !empty(acrPushRolePrincipalId)) {
  scope: acr // Use when specifying a scope that is different than the deployment scope
  name: guid(aks.id, 'Acr', AcrPushRole)
  properties: {
    roleDefinitionId: AcrPushRole
    principalType: 'User'
    principalId: acrPushRolePrincipalId
  ***REMOVED***
***REMOVED***

/*______  __  .______       _______ ____    __    ____  ___       __       __
|   ____||  | |   _  \     |   ____|\   \  /  \  /   / /   \     |  |     |  |
|  |__   |  | |  |_)  |    |  |__    \   \/    \/   / /  ^  \    |  |     |  |
|   __|  |  | |      /     |   __|    \            / /  /_\  \   |  |     |  |
|  |     |  | |  |\  \----.|  |____    \    /\    / /  _____  \  |  `----.|  `----.
|__|     |__| | _| `._____||_______|    \__/  \__/ /__/     \__\ |_______||_______|*/

@description('Create an Azure Firewall')
param azureFirewalls bool = false

@description('Add application rules to the firewall for certificate management.')
param certManagerFW bool = false

// @allowed([
//   'AllowAllIn'
//   'AllowAcrSubnetIn'
//   ''
// ])
// @description('Allow Http traffic (80/443) into AKS from specific sources')
// param inboundHttpFW string = ''

module firewall './firewall.bicep' = if (azureFirewalls && custom_vnet) {
  name: 'firewall'
  params: {
    resourceName: resourceName
    location: location
    workspaceDiagsId: createLaw ? aks_law.id : ''
    fwSubnetId: azureFirewalls && custom_vnet ? network.outputs.fwSubnetId : ''
    vnetAksSubnetAddressPrefix: vnetAksSubnetAddressPrefix
    certManagerFW: certManagerFW
    appDnsZoneName: dnsZoneName
    acrPrivatePool: acrPrivatePool
    acrAgentPoolSubnetAddressPrefix: acrAgentPoolSubnetAddressPrefix
    // inboundHttpFW: inboundHttpFW
    availabilityZones: availabilityZones
  ***REMOVED***
***REMOVED***

/*   ___      .______   .______          _______ ____    __    ____
    /   \     |   _  \  |   _  \        /  _____|\   \  /  \  /   /
   /  ^  \    |  |_)  | |  |_)  |      |  |  __   \   \/    \/   /
  /  /_\  \   |   ___/  |   ___/       |  | |_ |   \            /
 /  _____  \  |  |      |  |     __    |  |__| |    \    /\    / __
/__/     \__\ | _|      | _|    (__)    \______|     \__/  \__/ (__)*/

@description('Create an Application Gateway')
param ingressApplicationGateway bool = false

@description('The number of applciation gateway instances')
param appGWcount int = 2

@description('The maximum number of application gateway instances')
param appGWmaxCount int = 0

@maxLength(15)
@description('A known private ip in the Application Gateway subnet range to be allocated for internal traffic')
param privateIpApplicationGateway string = ''

@description('Enable key vault integration for application gateway')
param appgwKVIntegration bool = false

@allowed([
  'Standard_v2'
  'WAF_v2'
])
@description('The SKU for AppGw')
param appGWsku string = 'WAF_v2'

@description('Enable the WAF Firewall, valid for WAF_v2 SKUs')
param appGWenableFirewall bool = true

var deployAppGw = ingressApplicationGateway && (custom_vnet || !empty(byoAGWSubnetId))
var appGWenableWafFirewall = appGWsku=='Standard_v2' ? false : appGWenableFirewall

// If integrating App Gateway with KeyVault, create a Identity App Gateway will use to access keyvault
// 'identity' is always created (adding: "|| deployAppGw") until this is fixed:
// https://github.com/Azure/bicep/issues/387#issuecomment-885671296
resource appGwIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2018-11-30' = if (deployAppGw) {
  name: 'id-appgw-${resourceName***REMOVED***'
  location: location
***REMOVED***

var appgwName = 'agw-${resourceName***REMOVED***'
var appgwResourceId = deployAppGw ? resourceId('Microsoft.Network/applicationGateways', '${appgwName***REMOVED***') : ''

resource appgwpip 'Microsoft.Network/publicIPAddresses@2021-02-01' = if (deployAppGw) {
  name: 'pip-agw-${resourceName***REMOVED***'
  location: location
  sku: {
    name: 'Standard'
  ***REMOVED***
  zones: !empty(availabilityZones) ? availabilityZones : []
  properties: {
    publicIPAllocationMethod: 'Static'
  ***REMOVED***
***REMOVED***

var frontendPublicIpConfig = {
  properties: {
    publicIPAddress: {
      id: appgwpip.id
    ***REMOVED***
  ***REMOVED***
  name: 'appGatewayFrontendIP'
***REMOVED***

var frontendPrivateIpConfig = {
  properties: {
    privateIPAllocationMethod: 'Static'
    privateIPAddress: privateIpApplicationGateway
    subnet: {
      id: appGwSubnetId
    ***REMOVED***
  ***REMOVED***
  name: 'appGatewayPrivateIP'
***REMOVED***

@allowed([
  'Prevention'
  'Detection'
])
param appGwFirewallMode string = 'Prevention'

var appGwFirewallConfigOwasp = {
  enabled: appGWenableWafFirewall
  firewallMode: appGwFirewallMode
  ruleSetType: 'OWASP'
  ruleSetVersion: '3.2'
  requestBodyCheck: true
  maxRequestBodySizeInKb: 128
  disabledRuleGroups: []
***REMOVED***

var appGWskuObj = union({
  name: appGWsku
  tier: appGWsku
***REMOVED***, appGWmaxCount == 0 ? {
  capacity: appGWcount
***REMOVED*** : {***REMOVED***)

// ugh, need to create a variable with the app gateway properies, because of the conditional key 'autoscaleConfiguration'
var appgwProperties = union({
  sku: appGWskuObj
  sslPolicy: {
    policyType: 'Predefined'
    policyName: 'AppGwSslPolicy20170401S'
  ***REMOVED***
  webApplicationFirewallConfiguration: appGWenableWafFirewall ? appGwFirewallConfigOwasp : json('null')
  gatewayIPConfigurations: [
    {
      name: 'besubnet'
      properties: {
        subnet: {
          id: appGwSubnetId
  ***REMOVED***
***REMOVED***
    ***REMOVED***
  ]
  frontendIPConfigurations: empty(privateIpApplicationGateway) ? array(frontendPublicIpConfig) : concat(array(frontendPublicIpConfig), array(frontendPrivateIpConfig))
  frontendPorts: [
    {
      name: 'appGatewayFrontendPort'
      properties: {
        port: 80
***REMOVED***
    ***REMOVED***
  ]
  backendAddressPools: [
    {
      name: 'defaultaddresspool'
    ***REMOVED***
  ]
  backendHttpSettingsCollection: [
    {
      name: 'defaulthttpsetting'
      properties: {
        port: 80
        protocol: 'Http'
        cookieBasedAffinity: 'Disabled'
        requestTimeout: 30
        pickHostNameFromBackendAddress: true
***REMOVED***
    ***REMOVED***
  ]
  httpListeners: [
    {
      name: 'hlisten'
      properties: {
        frontendIPConfiguration: {
          id: empty(privateIpApplicationGateway) ? '${appgwResourceId***REMOVED***/frontendIPConfigurations/appGatewayFrontendIP' : '${appgwResourceId***REMOVED***/frontendIPConfigurations/appGatewayPrivateIP'
  ***REMOVED***
        frontendPort: {
          id: '${appgwResourceId***REMOVED***/frontendPorts/appGatewayFrontendPort'
  ***REMOVED***
        protocol: 'Http'
***REMOVED***
    ***REMOVED***
  ]
  requestRoutingRules: [
    {
      name: 'appGwRoutingRuleName'
      properties: {
        ruleType: 'Basic'
        httpListener: {
          id: '${appgwResourceId***REMOVED***/httpListeners/hlisten'
  ***REMOVED***
        backendAddressPool: {
          id: '${appgwResourceId***REMOVED***/backendAddressPools/defaultaddresspool'
  ***REMOVED***
        backendHttpSettings: {
          id: '${appgwResourceId***REMOVED***/backendHttpSettingsCollection/defaulthttpsetting'
  ***REMOVED***
***REMOVED***
    ***REMOVED***
  ]
***REMOVED***, appGWmaxCount ***REMOVED*** 0 ? {
  autoscaleConfiguration: {
    minCapacity: appGWcount
    maxCapacity: appGWmaxCount
  ***REMOVED***
***REMOVED*** : {***REMOVED***)

// 'identity' is always set until this is fixed: https://github.com/Azure/bicep/issues/387#issuecomment-885671296
resource appgw 'Microsoft.Network/applicationGateways@2021-02-01' = if (deployAppGw) {
  name: appgwName
  location: location
  zones: !empty(availabilityZones) ? availabilityZones : []
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${appGwIdentity.id***REMOVED***': {***REMOVED***
    ***REMOVED***
  ***REMOVED***
  properties: appgwProperties
***REMOVED***

// DEPLOY_APPGW_ADDON This is a curcuit breaker to NOT deploy the appgw addon for BYO subnet, due to the error: IngressApplicationGateway addon cannot find Application Gateway
var DEPLOY_APPGW_ADDON = ingressApplicationGateway && empty(byoAGWSubnetId)
var contributor = resourceId('Microsoft.Authorization/roleDefinitions', 'b24988ac-6180-42a0-ab88-20f7382dd24c')
// https://docs.microsoft.com/en-us/azure/role-based-access-control/role-assignments-template#new-service-principal
// AGIC's identity requires "Contributor" permission over Application Gateway.
resource appGwAGICContrib 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = if (DEPLOY_APPGW_ADDON && deployAppGw) {
  scope: appgw
  name: guid(aks.id, 'Agic', contributor)
  properties: {
    roleDefinitionId: contributor
    principalType: 'ServicePrincipal'
    principalId: aks.properties.addonProfiles.ingressApplicationGateway.identity.objectId
  ***REMOVED***
***REMOVED***

// AGIC's identity requires "Reader" permission over Application Gateway's resource group.
var reader = resourceId('Microsoft.Authorization/roleDefinitions', 'acdd72a7-3385-48ef-bd42-f606fba81ae7')
resource appGwAGICRGReader 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = if (DEPLOY_APPGW_ADDON && deployAppGw) {
  scope: resourceGroup()
  name: guid(aks.id, 'Agic', reader)
  properties: {
    roleDefinitionId: reader
    principalType: 'ServicePrincipal'
    principalId: aks.properties.addonProfiles.ingressApplicationGateway.identity.objectId
  ***REMOVED***
***REMOVED***

// AGIC's identity requires "Managed Identity Operator" permission over the user assigned identity of Application Gateway.
var managedIdentityOperator = resourceId('Microsoft.Authorization/roleDefinitions', 'f1a07417-d97a-45cb-824c-7a7467783830')
resource appGwAGICMIOp 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = if (DEPLOY_APPGW_ADDON &&  deployAppGw) {
  scope: appGwIdentity
  name: guid(aks.id, 'Agic', managedIdentityOperator)
  properties: {
    roleDefinitionId: managedIdentityOperator
    principalType: 'ServicePrincipal'
    principalId: aks.properties.addonProfiles.ingressApplicationGateway.identity.objectId
  ***REMOVED***
***REMOVED***

// AppGW Diagnostics
resource appgw_Diag 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = if (createLaw && deployAppGw) {
  scope: appgw
  name: 'appgwDiag'
  properties: {
    workspaceId: aks_law.id
    logs: [
      {
        category: 'ApplicationGatewayAccessLog'
  ***REMOVED***
***REMOVED***
      {
        category: 'ApplicationGatewayPerformanceLog'
  ***REMOVED***
***REMOVED***
      {
        category: 'ApplicationGatewayFirewallLog'
  ***REMOVED***
***REMOVED***
    ]
  ***REMOVED***
***REMOVED***

// =================================================

// Prevent error: AGIC Identity needs atleast has 'Contributor' access to Application Gateway and 'Reader' access to Application Gateway's Resource Group

output ApplicationGatewayName string = deployAppGw ? appgw.name : ''

/*_  ___  __    __  .______    _______ .______      .__   __.  _______ .___________. _______      _______.
|  |/  / |  |  |  | |   _  \  |   ____||   _  \     |  \ |  | |   ____||           ||   ____|    /       |
|  '  /  |  |  |  | |  |_)  | |  |__   |  |_)  |    |   \|  | |  |__   `---|  |----`|  |__      |   (----`
|    <   |  |  |  | |   _  <  |   __|  |      /     |  . `  | |   __|      |  |     |   __|      \   \
|  .  \  |  `--'  | |  |_)  | |  |____ |  |\  \----.|  |\   | |  |____     |  |     |  |____ .----)   |
|__|\__\  \______/  |______/  |_______|| _| `._____||__| \__| |_______|    |__|     |_______||_______/ */

@description('DNS prefix. Defaults to {resourceName***REMOVED***-dns')
param dnsPrefix string = '${resourceName***REMOVED***-dns'

@description('Kubernetes Version')
param kubernetesVersion string = '1.23.12'

@description('Enable Azure AD integration on AKS')
param enable_aad bool = false

@description('The ID of the Azure AD tenant')
param aad_tenant_id string = ''

@description('Create, and use a new Log Analytics workspace for AKS logs')
param omsagent bool = false

@description('Enable RBAC using AAD')
param enableAzureRBAC bool = false

@allowed([
  ''
  'none'
  'patch'
  'stable'
  'rapid'
  'node-image'
])
@description('AKS upgrade channel')
param upgradeChannel string = ''

@allowed([
  'Ephemeral'
  'Managed'
])
@description('OS disk type')
param osDiskType string = 'Ephemeral'

@description('VM SKU')
param agentVMSize string = 'Standard_DS3_v2'

@description('Disk size in GB')
param osDiskSizeGB int = 0

@description('The number of agents for the user node pool')
param agentCount int = 3

@description('The maximum number of nodes for the user node pool')
param agentCountMax int = 0
var autoScale = agentCountMax ***REMOVED*** agentCount

@description('The maximum number of pods per node.')
param maxPods int = 30

@allowed([
  'azure'
  'kubenet'
])
@description('The network plugin type')
param networkPlugin string = 'azure'

@allowed([
  ''
  'azure'
  'calico'
])
@description('The network policy to use.')
param networkPolicy string = ''

@allowed([
  ''
  'audit'
  'deny'
])
@description('Enable the Azure Policy addon')
param azurepolicy string = ''

@allowed([
  'Baseline'
  'Restricted'
])
param azurePolicyInitiative string = 'Baseline'

@description('Enable the git ops addon')
param gitops string = ''

@description('The IP addresses that are allowed to access the API server')
param authorizedIPRanges array = []

@description('Enable private cluster')
param enablePrivateCluster bool = false

@description('The zones to use for a node pool')
param availabilityZones array = []

@description('Disable local K8S accounts for AAD enabled clusters')
param AksDisableLocalAccounts bool = false

@description('Use the paid sku for SLA rather than SLO')
param AksPaidSkuForSLA bool = false

@minLength(9)
@maxLength(18)
@description('The address range to use for pods')
param podCidr string = '10.240.100.0/24'

@minLength(9)
@maxLength(18)
@description('The address range to use for services')
param serviceCidr string = '172.10.0.0/16'

@minLength(7)
@maxLength(15)
@description('The IP address to reserve for DNS')
param dnsServiceIP string = '172.10.0.10'

@minLength(9)
@maxLength(18)
@description('The address range to use for the docker bridge')
param dockerBridgeCidr string = '172.17.0.1/16'

@description('Enable Microsoft Defender for Containers (currently preview)')
param DefenderForContainers bool = false

@description('Only use the system node pool')
param JustUseSystemPool bool = false

@allowed([
  'Cost-Optimised'
  'Standard'
  'HighSpec'
  'Custom'
])
@description('The System Pool Preset sizing')
param SystemPoolType string = 'Cost-Optimised'

@description('A custom system pool spec')
param SystemPoolCustomPreset object = {***REMOVED***

param AutoscaleProfile object = {
  'balance-similar-node-groups': 'true'
  expander: 'random'
  'max-empty-bulk-delete': '10'
  'max-graceful-termination-sec': '600'
  'max-node-provision-time': '15m'
  'max-total-unready-percentage': '45'
  'new-pod-scale-up-delay': '0s'
  'ok-total-unready-count': '3'
  'scale-down-delay-after-add': '10m'
  'scale-down-delay-after-delete': '20s'
  'scale-down-delay-after-failure': '3m'
  'scale-down-unneeded-time': '10m'
  'scale-down-unready-time': '20m'
  'scale-down-utilization-threshold': '0.5'
  'scan-interval': '10s'
  'skip-nodes-with-local-storage': 'true'
  'skip-nodes-with-system-pods': 'true'
***REMOVED***

@description('System Pool presets are derived from the recommended system pool specs')
var systemPoolPresets = {
  'Cost-Optimised' : {
    vmSize: 'Standard_B4ms'
    count: 1
    minCount: 1
    maxCount: 3
    enableAutoScaling: true
    availabilityZones: []
  ***REMOVED***
  Standard : {
    vmSize: 'Standard_DS2_v2'
    count: 3
    minCount: 3
    maxCount: 5
    enableAutoScaling: true
    availabilityZones: [
      '1'
      '2'
      '3'
    ]
  ***REMOVED***
  HighSpec : {
    vmSize: 'Standard_D4s_v3'
    count: 3
    minCount: 3
    maxCount: 5
    enableAutoScaling: true
    availabilityZones: [
      '1'
      '2'
      '3'
    ]
  ***REMOVED***
***REMOVED***

var systemPoolBase = {
  name: 'npsystem'
  mode: 'System'
  osType: 'Linux'
  maxPods: 30
  type: 'VirtualMachineScaleSets'
  vnetSubnetID: !empty(aksSubnetId) ? aksSubnetId : json('null')
  upgradeSettings: {
    maxSurge: '33%'
  ***REMOVED***
  nodeTaints: [
    JustUseSystemPool ? '' : 'CriticalAddonsOnly=true:NoSchedule'
  ]
***REMOVED***

var userPoolVmProfile = {
  vmSize: agentVMSize
  count: agentCount
  minCount: autoScale ? agentCount : json('null')
  maxCount: autoScale ? agentCountMax : json('null')
  enableAutoScaling: autoScale
  availabilityZones: !empty(availabilityZones) ? availabilityZones : null
***REMOVED***

var agentPoolProfileUser = union({
  name: 'npuser01'
  mode: 'User'
  osDiskType: osDiskType
  osDiskSizeGB: osDiskSizeGB
  osType: 'Linux'
  maxPods: maxPods
  type: 'VirtualMachineScaleSets'
  vnetSubnetID: !empty(aksSubnetId) ? aksSubnetId : json('null')
  upgradeSettings: {
    maxSurge: '33%'
  ***REMOVED***
***REMOVED***, userPoolVmProfile)

var agentPoolProfiles = JustUseSystemPool ? array(union(systemPoolBase, userPoolVmProfile)) : concat(array(union(systemPoolBase, SystemPoolType=='Custom' && SystemPoolCustomPreset != {***REMOVED*** ? SystemPoolCustomPreset : systemPoolPresets[SystemPoolType])), array(agentPoolProfileUser))

var akssku = AksPaidSkuForSLA ? 'Paid' : 'Free'


var aks_addons = {
  omsagent: {
    enabled: createLaw && omsagent
  ***REMOVED*** {
      logAnalyticsWorkspaceResourceID: createLaw && omsagent ? aks_law.id : json('null')
    ***REMOVED***
  ***REMOVED***
  gitops: {
    //    config": null,
    enabled: !empty(gitops)
    //    identity: {
    //      clientId: 'xxx',
    //      objectId: 'xxx',
    //      resourceId: '/subscriptions/95efa97a-9b5d-4f74-9f75-a3396e23344d/resourcegroups/xxx/providers/Microsoft.ManagedIdentity/userAssignedIdentities/xxx'
    //    ***REMOVED***
  ***REMOVED***
  azurepolicy: {
  ***REMOVED*** {
      version: !empty(azurepolicy) ? 'v2' : json('null')
    ***REMOVED***
    enabled: !empty(azurepolicy)
  ***REMOVED***
  azureKeyvaultSecretsProvider: {
  ***REMOVED*** {
      enableSecretRotation: 'false'
    ***REMOVED***
    enabled: azureKeyvaultSecretsProvider
  ***REMOVED***
  openServiceMesh: {
    enabled: openServiceMeshAddon
  ***REMOVED*** {***REMOVED***
  ***REMOVED***
***REMOVED***

var aks_addons1 = DEPLOY_APPGW_ADDON && ingressApplicationGateway ? union(aks_addons, deployAppGw ? {
  ingressApplicationGateway: {
  ***REMOVED*** {
      applicationGatewayId: appgw.id
    ***REMOVED***
    enabled: true
  ***REMOVED***
***REMOVED*** : {
  // AKS RP will deploy the AppGateway for us (not creating custom or BYO VNET)
  ingressApplicationGateway: {
    enabled: true
  ***REMOVED*** {
      applicationGatewayName: appgwName
      subnetCIDR: '10.2.0.0/16'
    ***REMOVED***
  ***REMOVED***
***REMOVED***) : aks_addons


var aks_identity = {
  type: 'UserAssigned'
  userAssignedIdentities: {
    '${uai.id***REMOVED***': {***REMOVED***
  ***REMOVED***
***REMOVED***

var aksProperties = {
  kubernetesVersion: kubernetesVersion
  enableRBAC: true
  dnsPrefix: dnsPrefix
  aadProfile: enable_aad ? {
    managed: true
    enableAzureRBAC: enableAzureRBAC
    tenantID: aad_tenant_id
  ***REMOVED*** : null
  apiServerAccessProfile: !empty(authorizedIPRanges) ? {
    authorizedIPRanges: authorizedIPRanges
  ***REMOVED*** : {
    enablePrivateCluster: enablePrivateCluster
    privateDNSZone: enablePrivateCluster ? 'none' : ''
    enablePrivateClusterPublicFQDN: enablePrivateCluster
  ***REMOVED***
  agentPoolProfiles: agentPoolProfiles
  networkProfile: {
    loadBalancerSku: 'standard'
    networkPlugin: networkPlugin
    #disable-next-line BCP036 //Disabling validation of this parameter to cope with empty string to indicate no Network Policy required.
    networkPolicy: networkPolicy
    podCidr: podCidr
    serviceCidr: serviceCidr
    dnsServiceIP: dnsServiceIP
    dockerBridgeCidr: dockerBridgeCidr
  ***REMOVED***
  disableLocalAccounts: AksDisableLocalAccounts && enable_aad
  autoUpgradeProfile: !empty(upgradeChannel) ? {
    upgradeChannel: upgradeChannel
  ***REMOVED*** : {***REMOVED***
  addonProfiles: !empty(aks_addons1) ? aks_addons1 : aks_addons
  autoScalerProfile: autoScale ? AutoscaleProfile : {***REMOVED***
***REMOVED***

@description('Needing to seperately declare and union this because of https://github.com/Azure/AKS/issues/2774')
var azureDefenderSecurityProfile = {
  securityProfile : {
    azureDefender: {
***REMOVED***
      logAnalyticsWorkspaceResourceId: aks_law.id
    ***REMOVED***
  ***REMOVED***
***REMOVED***

resource aks 'Microsoft.ContainerService/managedClusters@2021-10-01' = {
  name: 'aks-${resourceName***REMOVED***'
  location: location
  properties: DefenderForContainers && omsagent ? union(aksProperties,azureDefenderSecurityProfile) : aksProperties
  identity: aks_byo_identity ? aks_identity : {
    type: 'SystemAssigned'
  ***REMOVED***
  sku: {
    name: 'Basic'
    tier: akssku
  ***REMOVED***
***REMOVED***
output aksClusterName string = aks.name

var policySetBaseline = '/providers/Microsoft.Authorization/policySetDefinitions/a8640138-9b0a-4a28-b8cb-1666c838647d'
var policySetRestrictive = '/providers/Microsoft.Authorization/policySetDefinitions/42b8ef37-b724-4e24-bbc8-7a7708edfe00'

resource aks_policies 'Microsoft.Authorization/policyAssignments@2020-09-01' = if (!empty(azurepolicy)) {
  name: '${resourceName***REMOVED***-${azurePolicyInitiative***REMOVED***'
  location: location
  properties: {
    policyDefinitionId: azurePolicyInitiative == 'Baseline' ? policySetBaseline : policySetRestrictive
  ***REMOVED*** {
      excludedNamespaces: {
        value: [
            'kube-system'
            'gatekeeper-system'
            'azure-arc'
            'cluster-baseline-setting'
        ]
***REMOVED***
      effect: {
        value: azurepolicy
***REMOVED***
    ***REMOVED***
    metadata: {
      assignedBy: 'Aks Construction'
    ***REMOVED***
    displayName: 'Kubernetes cluster pod security ${azurePolicyInitiative***REMOVED*** standards for Linux-based workloads'
    description: 'As per: https://github.com/Azure/azure-policy/blob/master/built-in-policies/policySetDefinitions/Kubernetes/'
  ***REMOVED***
***REMOVED***

@description('The principal ID to assign the AKS admin role.')
param adminprincipleid string = ''
// for AAD Integrated Cluster wusing 'enableAzureRBAC', add Cluster admin to the current user!
var buildInAKSRBACClusterAdmin = resourceId('Microsoft.Authorization/roleDefinitions', 'b1ff04bb-8a4e-4dc4-8eb5-8693973ce19b')
resource aks_admin_role_assignment 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = if (enableAzureRBAC && !empty(adminprincipleid)) {
  scope: aks // Use when specifying a scope that is different than the deployment scope
  name: guid(aks.id, 'aksadmin', buildInAKSRBACClusterAdmin)
  properties: {
    roleDefinitionId: buildInAKSRBACClusterAdmin
    principalType: 'User'
    principalId: adminprincipleid
  ***REMOVED***
***REMOVED***

//---------------------------------------------------------------------------------- gitops (to apply the post-helm packages to the cluster)
// WAITING FOR PUBLIC PREVIEW
// https://docs.microsoft.com/en-gb/azure/azure-arc/kubernetes/use-gitops-connected-cluster#using-azure-cli
/*
resource gitops 'Microsoft.KubernetesConfiguration/sourceControlConfigurations@2019-11-01-preview' = if (false) {
  name: 'bla'
  location: 'bla'
***REMOVED***
*/

/*__  ___.   ______   .__   __.  __  .___________.  ______   .______       __  .__   __.   _______
|   \/   |  /  __  \  |  \ |  | |  | |           | /  __  \  |   _  \     |  | |  \ |  |  /  _____|
|  \  /  | |  |  |  | |   \|  | |  | `---|  |----`|  |  |  | |  |_)  |    |  | |   \|  | |  |  __
|  |\/|  | |  |  |  | |  . `  | |  |     |  |     |  |  |  | |      /     |  | |  . `  | |  | |_ |
|  |  |  | |  `--'  | |  |\   | |  |     |  |     |  `--'  | |  |\  \----.|  | |  |\   | |  |__| |
|__|  |__|  \______/  |__| \__| |__|     |__|      \______/  | _| `._____||__| |__| \__|  \______| */


@description('Diagnostic categories to log')
param AksDiagCategories array = [
  'cluster-autoscaler'
  'kube-controller-manager'
  'kube-audit-admin'
  'guard'
]

resource AksDiags 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' =  if (createLaw && omsagent)  {
  name: 'aksDiags'
  scope: aks
  properties: {
    workspaceId: aks_law.id
    logs: [for aksDiagCategory in AksDiagCategories: {
      category: aksDiagCategory
***REMOVED***
    ***REMOVED***]
    metrics: [
      {
        category: 'AllMetrics'
  ***REMOVED***
***REMOVED***
    ]
  ***REMOVED***
***REMOVED***

@description('Enable Metric Alerts')
param createAksMetricAlerts bool = true

@allowed([
  'Short'
  'Long'
])
@description('Which Metric polling frequency model to use')
param AksMetricAlertMetricFrequencyModel string = 'Long'

var AlertFrequencyLookup = {
  Short: {
    evalFrequency: 'PT1M'
    windowSize: 'PT5M'
  ***REMOVED***
  Long: {
    evalFrequency: 'PT15M'
    windowSize: 'PT1H'
  ***REMOVED***
***REMOVED***
var AlertFrequency = AlertFrequencyLookup[AksMetricAlertMetricFrequencyModel]

module aksmetricalerts './aksmetricalerts.bicep' = if (createLaw) {
  name: 'aksmetricalerts'
  scope: resourceGroup()
  params: {
    clusterName: aks.name
    logAnalyticsWorkspaceName: aks_law.name
    metricAlertsEnabled: createAksMetricAlerts
    evalFrequency: AlertFrequency.evalFrequency
    windowSize: AlertFrequency.windowSize
    alertSeverity: 'Informational'
    logAnalyticsWorkspaceLocation: location
  ***REMOVED***
***REMOVED***

//---------------------------------------------------------------------------------- Container Insights

@description('The Log Analytics retention period')
param retentionInDays int = 30

var aks_law_name = 'log-${resourceName***REMOVED***'

var createLaw = (omsagent || deployAppGw || azureFirewalls)

resource aks_law 'Microsoft.OperationalInsights/workspaces@2021-06-01' = if (createLaw) {
  name: aks_law_name
  location: location
  properties: {
    retentionInDays: retentionInDays
  ***REMOVED***
***REMOVED***

//This role assignment enables AKS-***REMOVED***LA Fast Alerting experience
var MonitoringMetricsPublisherRole = resourceId('Microsoft.Authorization/roleDefinitions', '3913510d-42f4-4e42-8a64-420c390055eb')
resource FastAlertingRole_Aks_Law 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = if (omsagent) {
  scope: aks
  name: guid(aks.id, 'omsagent', MonitoringMetricsPublisherRole)
  properties: {
    roleDefinitionId: MonitoringMetricsPublisherRole
    principalId: aks.properties.addonProfiles.omsagent.identity.objectId
    principalType: 'ServicePrincipal'
  ***REMOVED***
***REMOVED***

output LogAnalyticsName string = (createLaw) ? aks_law.name : ''
output LogAnalyticsGuid string = (createLaw) ? aks_law.properties.customerId : ''
output LogAnalyticsId string = (createLaw) ? aks_law.id : ''

//ACSCII Art link : https://textkool.com/en/ascii-art-generator?hl=default&vl=default&font=Star%20Wars&text=changeme
