{{/*
Expand the name of the chart.
*/***REMOVED******REMOVED***
{{- define "app.name" -***REMOVED******REMOVED***
{{- default .Chart.Name  | trunc 63 | trimSuffix "-" ***REMOVED******REMOVED***
{{- end ***REMOVED******REMOVED***

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/***REMOVED******REMOVED***
{{- define "app.fullname" -***REMOVED******REMOVED***
{{- if .Values.fullnameOverride ***REMOVED******REMOVED***
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" ***REMOVED******REMOVED***
{{- else ***REMOVED******REMOVED***
{{- $name := default .Chart.Name .Values.nameOverride ***REMOVED******REMOVED***
{{- if contains $name .Release.Name ***REMOVED******REMOVED***
{{- .Release.Name | trunc 63 | trimSuffix "-" ***REMOVED******REMOVED***
{{- else ***REMOVED******REMOVED***
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" ***REMOVED******REMOVED***
{{- end ***REMOVED******REMOVED***
{{- end ***REMOVED******REMOVED***
{{- end ***REMOVED******REMOVED***

{{/*
Common labels
*/***REMOVED******REMOVED***
{{- define "app.labels" -***REMOVED******REMOVED***
{{ include "app.selectorLabels" . ***REMOVED******REMOVED***
app.kubernetes.io/version: {{ .Chart.AppVersion | quote ***REMOVED******REMOVED***
app.kubernetes.io/managed-by: {{ .Release.Service ***REMOVED******REMOVED***
{{- end ***REMOVED******REMOVED***

{{/*
Selector labels
*/***REMOVED******REMOVED***
{{- define "app.selectorLabels" -***REMOVED******REMOVED***
app: {{ include "app.name" . ***REMOVED******REMOVED***
app.kubernetes.io/name: {{ include "app.name" . ***REMOVED******REMOVED***
app.kubernetes.io/instance: {{ .Release.Name ***REMOVED******REMOVED***
{{- end ***REMOVED******REMOVED***

{{/*
Create the name of the service account to use
*/***REMOVED******REMOVED***
{{- define "app.serviceAccountName" -***REMOVED******REMOVED***
{{- if .Values.serviceAccount.create ***REMOVED******REMOVED***
{{- default (include "app.fullname" .) .Values.serviceAccount.name ***REMOVED******REMOVED***
{{- else ***REMOVED******REMOVED***
{{- default "default" .Values.serviceAccount.name ***REMOVED******REMOVED***
{{- end ***REMOVED******REMOVED***
{{- end ***REMOVED******REMOVED***
