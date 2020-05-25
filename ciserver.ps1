$CIP=($env:CIP)
Param(
   [string]$collectionurl = "https://dev.azure.com/gestionix-boa", 
   [string]$project = "gx-sandbox-pipeline",  #Variable Group which needs to be updated
   [string]$variableName = "CIPSERVER", #The specific variable which needs to be updated
   [string]$user = "Gestionix",
   [string]$token = "k4wcabkpjiyrkh6ag4vyrgacm66phucsbidvxsre3nhy4de2fq2a"
)
#switch ($STAGE)
#{
#    'Dev' { $variablegroupid = '94' }
#    'Test' { $variablegroupid = '95' }
#    'Staging' { $variablegroupid = '103' }
#    'Production' { $variablegroupid = '104'}
#}
$variablegroupid = '102'
# Base64-encodes the Personal Access Token (PAT) appropriately
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $user,$token)))
$baseUri = "$collectionurl/$project/_apis/distributedtask/variablegroups/$($variablegroupid)?api-version=5.0-preview.1"
$vgresponse = Invoke-RestMethod -Method Get -Uri $baseUri -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} 
# Set new value for the specific variable
$vgresponse.variables.$variableName.value = "$CIP"
####****************** update the modified object **************************
$json = @($vgresponse) | ConvertTo-Json -Depth 99
$updatedvg = Invoke-RestMethod -Uri $baseUri -Method Put -Body $json -ContentType "application/json" -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)}
Cls
write-host "==========================================================" 
Write-host "The value of Varialbe '$variableName' is updated to" $updatedvg.variables.$variableName.value
write-host "=========================================================="
$STAGE=($env:STAGE)
Write-output "Set the CIPSERVER from powershell to $CIP on the $STAGE"
exit