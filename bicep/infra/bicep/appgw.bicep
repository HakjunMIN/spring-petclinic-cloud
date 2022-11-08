param resourceName string
param location string
param appGwSubnetId string
param privateIpApplicationGateway string
param availabilityZones array
param userAssignedIdentity string
param workspaceId string
param appGWcount int
param appGWmaxCount int

var appgwName = 'agw-${resourceName***REMOVED***'
var appgwResourceId = resourceId('Microsoft.Network/applicationGateways', '${appgwName***REMOVED***')

resource appgwpip 'Microsoft.Network/publicIPAddresses@2020-07-01' = {
  name: 'pip-agw-${resourceName***REMOVED***'
  location: location
  sku: {
    name: 'Standard'
  ***REMOVED***
  properties: {
    publicIPAllocationMethod: 'Static'
  ***REMOVED***
***REMOVED***

var frontendPublicIpConfig = {
  properties: {
    publicIPAddress: {
      id: '${appgwpip.id***REMOVED***'
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

var tier = 'WAF_v2'
var appGWsku = union({
  name: tier
  tier: tier
***REMOVED***, appGWmaxCount == 0 ? {
  capacity: appGWcount
***REMOVED*** : {***REMOVED***)

// ugh, need to create a variable with the app gateway properies, because of the conditional key 'autoscaleConfiguration'
var appgwProperties = union({
  sku: appGWsku
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
          id: '${appgwResourceId***REMOVED***/frontendIPConfigurations/appGatewayFrontendIP'
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

var appGwZones = !empty(availabilityZones) ? availabilityZones : []

// 'identity' is always set until this is fixed:
// https://github.com/Azure/bicep/issues/387#issuecomment-885671296
resource appgw 'Microsoft.Network/applicationGateways@2020-07-01' = if (!empty(userAssignedIdentity)) {
  name: appgwName
  location: location
  zones: appGwZones
  identity: !empty(userAssignedIdentity) ? {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${userAssignedIdentity***REMOVED***': {***REMOVED***
    ***REMOVED***
  ***REMOVED*** : {***REMOVED***
  properties: appgwProperties
***REMOVED***

param agicPrincipleId string
var contributor = resourceId('Microsoft.Authorization/roleDefinitions', 'b24988ac-6180-42a0-ab88-20f7382dd24c')
// https://docs.microsoft.com/en-us/azure/role-based-access-control/role-assignments-template#new-service-principal
resource appGwAGICContrib 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  scope: appgw
  name: guid(resourceGroup().id, appgwName, 'appgwcont')
  properties: {
    roleDefinitionId: contributor
    principalType: 'ServicePrincipal'
    principalId: agicPrincipleId
  ***REMOVED***
***REMOVED***

var reader = resourceId('Microsoft.Authorization/roleDefinitions', 'acdd72a7-3385-48ef-bd42-f606fba81ae7')
resource appGwAGICRGReader 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  scope: resourceGroup()
  name: guid(resourceGroup().id, appgwName, 'rgread')
  properties: {
    roleDefinitionId: reader
    principalType: 'ServicePrincipal'
    principalId: agicPrincipleId
  ***REMOVED***
***REMOVED***

output appgwId string = appgw.id
output ApplicationGatewayName string = appgw.name

// ------------------------------------------------------------------ AppGW Diagnostics
var diagProperties = {
  workspaceId: workspaceId
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
resource appgw_Diag 'Microsoft.Insights/diagnosticSettings@2017-05-01-preview' = if (!empty(workspaceId)) {
  scope: appgw
  name: 'appgwDiag'
  properties: diagProperties
***REMOVED***
