param resourceName string
param location string = resourceGroup().location

param aksPrincipleId string = ''

param vnetAddressPrefix string
param vnetAksSubnetAddressPrefix string

//Nsg
param workspaceDiagsId string = ''
param networkSecurityGroups bool = true

//Firewall
param azureFirewalls bool = false
param vnetFirewallSubnetAddressPrefix string = ''

//Ingress
param ingressApplicationGateway bool = false
param ingressApplicationGatewayPublic bool = false
param vnetAppGatewaySubnetAddressPrefix string =''

//Private Link
param privateLinks bool = false
param privateLinkSubnetAddressPrefix string = ''
param privateLinkAcrId string = ''
param privateLinkAkvId string = ''

//ACR
param acrPrivatePool bool = false
param acrAgentPoolSubnetAddressPrefix string = ''

//Bastion
param bastion bool =false
param bastionSubnetAddressPrefix string = ''

@description('Used by the Bastion Public IP')
param availabilityZones array = []


var bastion_subnet_name = 'AzureBastionSubnet'
var bastion_subnet = {
  name: bastion_subnet_name
  properties: {
    addressPrefix: bastionSubnetAddressPrefix
  ***REMOVED***
***REMOVED***

var acrpool_subnet_name = 'acrpool-sn'
var acrpool_subnet = {
  name: acrpool_subnet_name
  properties: {
    addressPrefix: acrAgentPoolSubnetAddressPrefix
  ***REMOVED***
***REMOVED***

var private_link_subnet_name = 'privatelinks-sn'
var private_link_subnet = {
  name: private_link_subnet_name
  properties: {
    addressPrefix: privateLinkSubnetAddressPrefix
    privateEndpointNetworkPolicies: 'Disabled'
    privateLinkServiceNetworkPolicies: 'Enabled'
  ***REMOVED***
***REMOVED***

var appgw_subnet_name = 'appgw-sn'
var appgw_baseSubnet = {
  name: appgw_subnet_name
  properties: {
    addressPrefix: vnetAppGatewaySubnetAddressPrefix
  ***REMOVED***
***REMOVED***

var appGw_nsg = {
  properties: {
    networkSecurityGroup: {
      id: nsgAppGw.outputs.nsgId
    ***REMOVED***
  ***REMOVED***
***REMOVED***

var appgw_subnet = ingressApplicationGateway && networkSecurityGroups ? union(appgw_baseSubnet,appGw_nsg) : appgw_baseSubnet

var fw_subnet_name = 'AzureFirewallSubnet' // Required by FW
var fw_subnet = {
  name: fw_subnet_name
  properties: {
    addressPrefix: vnetFirewallSubnetAddressPrefix
  ***REMOVED***
***REMOVED***

/// ---- Firewall VNET config
module calcAzFwIp './calcAzFwIp.bicep' = if (azureFirewalls) {
  name: 'calcAzFwIp'
  params: {
    vnetFirewallSubnetAddressPrefix: vnetFirewallSubnetAddressPrefix
  ***REMOVED***
***REMOVED***

var routeFwTableName = 'rt-afw-${resourceName***REMOVED***'
resource vnet_udr 'Microsoft.Network/routeTables@2021-02-01' = if (azureFirewalls) {
  name: routeFwTableName
  location: location
  properties: {
    routes: [
      {
        name: 'AKSNodesEgress'
        properties: {
          addressPrefix: '0.0.0.0/1'
          nextHopType: 'VirtualAppliance'
          nextHopIpAddress: azureFirewalls ? calcAzFwIp.outputs.FirewallPrivateIp : null
  ***REMOVED***
***REMOVED***
    ]
  ***REMOVED***
***REMOVED***

var aks_subnet_name = 'aks-sn'
var aks_subnet =  {
  name: aks_subnet_name
  properties: union({
      addressPrefix: vnetAksSubnetAddressPrefix
    ***REMOVED***, privateLinks ? {
      privateEndpointNetworkPolicies: 'Disabled'
      privateLinkServiceNetworkPolicies: 'Enabled'
    ***REMOVED*** : {***REMOVED***, azureFirewalls ? {
      routeTable: {
        id: vnet_udr.id //resourceId('Microsoft.Network/routeTables', routeFwTableName)
***REMOVED***
    ***REMOVED***: {***REMOVED***)
***REMOVED***

var subnets_1 = azureFirewalls ? concat(array(aks_subnet), array(fw_subnet)) : array(aks_subnet)
var subnets_2 = privateLinks ? concat(array(subnets_1), array(private_link_subnet)) : array(subnets_1)
var subnets_3 = acrPrivatePool ? concat(array(subnets_2), array(acrpool_subnet)) : array(subnets_2)
var subnets_4 = bastion ? concat(array(subnets_3), array(bastion_subnet)) : array(subnets_3)

// DONT create appgw subnet, the addon will create it for us

var final_subnets = ingressApplicationGateway ? concat(array(subnets_4), array(appgw_subnet)) : array(subnets_4)

var vnetName = 'vnet-${resourceName***REMOVED***'
resource vnet 'Microsoft.Network/virtualNetworks@2021-02-01' = {
  name: vnetName
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: [
        vnetAddressPrefix
      ]
    ***REMOVED***
    subnets: final_subnets
  ***REMOVED***
***REMOVED***
output vnetId string = vnet.id
output vnetName string = vnet.name
output aksSubnetId string = resourceId('Microsoft.Network/virtualNetworks/subnets', vnet.name, aks_subnet_name)
output fwSubnetId string = azureFirewalls ? '${vnet.id***REMOVED***/subnets/${fw_subnet_name***REMOVED***' : ''
output acrPoolSubnetId string = acrPrivatePool ? '${vnet.id***REMOVED***/subnets/${acrpool_subnet_name***REMOVED***' : ''
output appGwSubnetId string = resourceId('Microsoft.Network/virtualNetworks/subnets', vnet.name, appgw_subnet_name)
output privateLinkSubnetId string = resourceId('Microsoft.Network/virtualNetworks/subnets', vnet.name, private_link_subnet_name)

var networkContributorRole = resourceId('Microsoft.Authorization/roleDefinitions', '4d97b98b-1d4f-4787-a291-c67834d212e7')

resource aks_vnet_cont 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = if (!empty(aksPrincipleId)) {
  name: guid('${vnet.name***REMOVED***/${aks_subnet_name***REMOVED***/Microsoft.Authorization/${guid(resourceGroup().id, vnetName, aks_subnet_name)***REMOVED***')
  properties: {
    roleDefinitionId: networkContributorRole
    principalId: aksPrincipleId
    principalType: 'ServicePrincipal'
  ***REMOVED***
***REMOVED***


/*   --------------------------------------------------------------------------  Private Link for ACR      */
var privateLinkAcrName = 'pl-acr-${resourceName***REMOVED***'
resource privateLinkAcr 'Microsoft.Network/privateEndpoints@2021-03-01' = if (!empty(privateLinkAcrId)) {
  name: privateLinkAcrName
  location: location
  properties: {
    //customNetworkInterfaceName: 'nic-${privateLinkAcrName***REMOVED***' needs AllowPrivateEndpointCustomNicName registered in subscription in order to rename
    privateLinkServiceConnections: [
      {
        name: 'Acr-Connection'
        properties: {
          privateLinkServiceId: privateLinkAcrId
          groupIds: [
            'registry'
          ]
  ***REMOVED***
***REMOVED***
    ]
    subnet: {
      id: '${vnet.id***REMOVED***/subnets/${private_link_subnet_name***REMOVED***'
    ***REMOVED***
  ***REMOVED***
***REMOVED***

resource privateDnsAcr 'Microsoft.Network/privateDnsZones@2020-06-01' = if (!empty(privateLinkAcrId))  {
  name: 'privatelink.azurecr.io'
  location: 'global'
***REMOVED***

var privateDnsAcrLinkName = 'vnet-dnscr-${resourceName***REMOVED***'
resource privateDnsAcrLink 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2020-06-01' = if (!empty(privateLinkAcrId))  {
  parent: privateDnsAcr
  name: privateDnsAcrLinkName
  location: 'global'
  properties: {
    registrationEnabled: false
    virtualNetwork: {
      id: vnet.id
    ***REMOVED***
  ***REMOVED***
***REMOVED***

resource privateDnsAcrZoneGroup 'Microsoft.Network/privateEndpoints/privateDnsZoneGroups@2021-03-01' = if (!empty(privateLinkAcrId))  {
  parent: privateLinkAcr
  name: 'default'
  properties: {
    privateDnsZoneConfigs: [
      {
        name: 'vnet-pl-acr'
        properties: {
          privateDnsZoneId: privateDnsAcr.id
  ***REMOVED***
***REMOVED***
    ]
  ***REMOVED***
***REMOVED***


/*   --------------------------------------------------------------------------  Private Link for KeyVault      */
var privateLinkAkvName = 'pl-akv-${resourceName***REMOVED***'
resource privateLinkAkv 'Microsoft.Network/privateEndpoints@2021-03-01' = if (!empty(privateLinkAkvId)) {
  name: privateLinkAkvName
  location: location
  properties: {
    //customNetworkInterfaceName: 'nic-${privateLinkAkvName***REMOVED***' needs AllowPrivateEndpointCustomNicName registered in subscription in order to rename
    privateLinkServiceConnections: [
      {
        name: 'Akv-Connection'
        properties: {
          privateLinkServiceId: privateLinkAkvId
          groupIds: [
            'vault'
          ]
  ***REMOVED***
***REMOVED***
    ]
    subnet: {
      id: '${vnet.id***REMOVED***/subnets/${private_link_subnet_name***REMOVED***'
    ***REMOVED***
  ***REMOVED***
***REMOVED***

resource privateDnsAkv 'Microsoft.Network/privateDnsZones@2020-06-01' = if (!empty(privateLinkAkvId))  {
  name: 'privatelink.vaultcore.azure.net'
  location: 'global'
***REMOVED***

var privateDnsAkvLinkName = 'vnet-dnscr-${resourceName***REMOVED***'
resource privateDnsAkvLink 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2020-06-01' = if (!empty(privateLinkAkvId))  {
  parent: privateDnsAkv
  name: privateDnsAkvLinkName
  location: 'global'
  properties: {
    registrationEnabled: false
    virtualNetwork: {
      id: vnet.id
    ***REMOVED***
  ***REMOVED***
***REMOVED***

resource privateDnsAkvZoneGroup 'Microsoft.Network/privateEndpoints/privateDnsZoneGroups@2021-03-01' = if (!empty(privateLinkAkvId))  {
  parent: privateLinkAkv
  name: 'default'
  properties: {
    privateDnsZoneConfigs: [
      {
        name: 'vnet-pl-akv'
        properties: {
          privateDnsZoneId: privateDnsAkv.id
  ***REMOVED***
***REMOVED***
    ]
  ***REMOVED***
***REMOVED***

param bastionHostName string = 'bas-${resourceName***REMOVED***'
var publicIpAddressName = 'pip-${bastionHostName***REMOVED***'

resource bastionPip 'Microsoft.Network/publicIPAddresses@2021-03-01' = if(bastion) {
  name: publicIpAddressName
  location: location
  sku: {
    name: 'Standard'
  ***REMOVED***
  zones: !empty(availabilityZones) ? availabilityZones : []
  properties: {
    publicIPAllocationMethod: 'Static'
  ***REMOVED***
***REMOVED***

resource bastionHost 'Microsoft.Network/bastionHosts@2020-05-01' = if(bastion) {
  name: bastionHostName
  location: location
  properties: {
    ipConfigurations: [
      {
        name: 'IpConf'
        properties: {
          subnet: {
            id: '${vnet.id***REMOVED***/subnets/${bastion_subnet_name***REMOVED***'
    ***REMOVED***
          publicIPAddress: {
            id: bastionPip.id
    ***REMOVED***
  ***REMOVED***
***REMOVED***
    ]
  ***REMOVED***
***REMOVED***

module nsgAppGw 'nsgAppGw.bicep' = if(ingressApplicationGateway && networkSecurityGroups) {
  name: 'nsgAppGw'
  params: {
    location: location
    resourceName: resourceName
    workspaceDiagsId: workspaceDiagsId
    allowInternetHttpIn: ingressApplicationGatewayPublic
  ***REMOVED***
***REMOVED***
