// As per https://github.com/Azure/bicep/issues/2189#issuecomment-815962675 this file is being used as a UDF
// Takes a subnet range and returns the AzFirewall private Ip address

@description('A subnet address for the Azure Firewall')
param vnetFirewallSubnetAddressPrefix string

var subnetOctets  = split(vnetFirewallSubnetAddressPrefix,'.')
var hostIdOctet = '4'

output FirewallPrivateIp string = '${subnetOctets[0]***REMOVED***.${subnetOctets[1]***REMOVED***.${subnetOctets[2]***REMOVED***.${hostIdOctet***REMOVED***'
