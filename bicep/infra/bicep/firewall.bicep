param resourceName string
param location string = resourceGroup().location
param workspaceDiagsId string = ''
param fwSubnetId string
param vnetAksSubnetAddressPrefix string
param certManagerFW bool = false
param acrPrivatePool bool = false
param acrAgentPoolSubnetAddressPrefix string = ''
param availabilityZones array = []

var firewallPublicIpName = 'pip-afw-${resourceName***REMOVED***'

resource fw_pip 'Microsoft.Network/publicIPAddresses@2021-03-01' = {
  name: firewallPublicIpName
  location: location
  sku: {
    name: 'Standard'
  ***REMOVED***
  zones: !empty(availabilityZones) ? availabilityZones : []
  properties: {
    publicIPAllocationMethod: 'Static'
    publicIPAddressVersion: 'IPv4'
  ***REMOVED***
***REMOVED***

resource fwDiags 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = if (!empty(workspaceDiagsId)) {
  scope: fw
  name: 'fwDiags'
  properties: {
    workspaceId: workspaceDiagsId
    logs: [
      {
        category: 'AzureFirewallApplicationRule'
  ***REMOVED***
        retentionPolicy: {
          days: 10
    ***REMOVED***
  ***REMOVED***
***REMOVED***
      {
        category: 'AzureFirewallNetworkRule'
  ***REMOVED***
        retentionPolicy: {
          days: 10
    ***REMOVED***
  ***REMOVED***
***REMOVED***
    ]
    metrics: [
      {
        category: 'AllMetrics'
  ***REMOVED***
        retentionPolicy: {
    ***REMOVED***
          days: 0
  ***REMOVED***
***REMOVED***
    ]
  ***REMOVED***
***REMOVED***

@description('Whitelist dnsZone name (required by cert-manager validation process)')
param appDnsZoneName string = ''

var fw_name = 'afw-${resourceName***REMOVED***'
resource fw 'Microsoft.Network/azureFirewalls@2021-03-01' = {
  name: fw_name
  location: location
  zones: !empty(availabilityZones) ? availabilityZones : []
  properties: {
    ipConfigurations: [
      {
        name: 'IpConf1'
        properties: {
          subnet: {
            id: fwSubnetId
    ***REMOVED***
          publicIPAddress: {
            id: fw_pip.id
    ***REMOVED***
  ***REMOVED***
***REMOVED***
    ]
    threatIntelMode: 'Alert'
    firewallPolicy: {
      id: fwPolicy.id

    ***REMOVED***
    applicationRuleCollections: []
    networkRuleCollections: []
  ***REMOVED***
***REMOVED***

resource fwPolicy 'Microsoft.Network/firewallPolicies@2020-11-01' = {
  name: 'afwp-${resourceName***REMOVED***'
  location: location
  properties: {
    sku: {
      tier: 'Standard'
    ***REMOVED***
    threatIntelMode: 'Alert'
    threatIntelWhitelist: {
      fqdns: []
      ipAddresses: []
    ***REMOVED***
  ***REMOVED***
***REMOVED***

resource fwpRules 'Microsoft.Network/firewallPolicies/ruleCollectionGroups@2020-11-01' = {
  parent: fwPolicy
  name: 'AKSConstructionRuleGroup'
  properties: {
    priority: 200
    ruleCollections:  [
      {
        ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
        name: 'CoreAksNetEgress'
        priority: 100
        action: {
          type: 'Allow'
  ***REMOVED***
        rules: concat([
          {
            name: 'ControlPlaneTCP'
            ruleType: 'NetworkRule'
            ipProtocols: [
              'TCP'
            ]
            sourceAddresses: [
              vnetAksSubnetAddressPrefix
            ]
            destinationAddresses: [
              'AzureCloud.${location***REMOVED***'
            ]
            destinationPorts: [
              '9000' /* For tunneled secure communication between the nodes and the control plane. */
              '22'
            ]
    ***REMOVED***
          {
            name: 'ControlPlaneUDP'
            ruleType: 'NetworkRule'
            ipProtocols: [
              'UDP'
            ]
            sourceAddresses: [
              vnetAksSubnetAddressPrefix
            ]
            destinationAddresses: [
              'AzureCloud.${location***REMOVED***'
            ]
            destinationPorts: [
              '1194' /* For tunneled secure communication between the nodes and the control plane. */
            ]
    ***REMOVED***
          {
            name: 'AzureMonitorForContainers'
            ruleType: 'NetworkRule'
            ipProtocols: [
              'TCP'
            ]
            sourceAddresses: [
              vnetAksSubnetAddressPrefix
            ]
            destinationAddresses: [
              'AzureMonitor'
            ]
            destinationPorts: [
              '443'
            ]
    ***REMOVED***
        ], acrPrivatePool ? [
          {
            name: 'acr-agentpool'
            ruleType: 'NetworkRule'
            ipProtocols: [
              'TCP'
            ]
            sourceAddresses: [
              acrAgentPoolSubnetAddressPrefix
            ]
            destinationAddresses: [
              'AzureKeyVault'
              'Storage'
              'EventHub'
              'AzureActiveDirectory'
              'AzureMonitor'
            ]
            destinationPorts: [
              '443'
            ]
    ***REMOVED***
        ]:[])
***REMOVED***
      {
        ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
        name: 'CoreAksHttpEgress'
        priority: 400
        action: {
          type: 'Allow'
  ***REMOVED***
        rules: concat([
            {
              name: 'aks'
              ruleType: 'ApplicationRule'
              protocols: [
                {
                  port: 443
                  protocolType: 'Https'
          ***REMOVED***
                {
                  port: 80
                  protocolType: 'Http'
          ***REMOVED***
              ]
              targetFqdns: []
              fqdnTags: [
                'AzureKubernetesService'
              ]
              sourceAddresses: [
                vnetAksSubnetAddressPrefix
              ]
      ***REMOVED***
          ], certManagerFW ? [
            {
              name: 'certman-quay'
              ruleType: 'ApplicationRule'
              protocols: [
                {
                  port: 443
                  protocolType: 'Https'
          ***REMOVED***
                {
                  port: 80
                  protocolType: 'Http'
          ***REMOVED***
              ]
              targetFqdns: [
                'quay.io'
                '*.quay.io'
              ]
              sourceAddresses: [
                vnetAksSubnetAddressPrefix
              ]
      ***REMOVED***
            {
              name: 'certman-letsencrypt'
              ruleType: 'ApplicationRule'
              protocols: [
                {
                  port: 443
                  protocolType: 'Https'
          ***REMOVED***
                {
                  port: 80
                  protocolType: 'Http'
          ***REMOVED***
              ]
              targetFqdns: [
                'letsencrypt.org'
                '*.letsencrypt.org'
              ]
              sourceAddresses: [
                vnetAksSubnetAddressPrefix
              ]
      ***REMOVED***
          ] : [], certManagerFW && !empty(appDnsZoneName) ? [
            {
              name: 'certman-appDnsZoneName'
              ruleType: 'ApplicationRule'
              protocols: [
                {
                  port: 443
                  protocolType: 'Https'
          ***REMOVED***
                {
                  port: 80
                  protocolType: 'Http'
          ***REMOVED***
              ]
              targetFqdns: [
                appDnsZoneName
                '*.${appDnsZoneName***REMOVED***'
              ]
              sourceAddresses: [
                vnetAksSubnetAddressPrefix
              ]
      ***REMOVED***
          ] : [])
***REMOVED***
    ]
  ***REMOVED***
***REMOVED***
