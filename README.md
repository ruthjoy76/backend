# REST

- Restful HTTP API
  -Representational State Transfer, aka REST
- Architectural style for building scalable web apps

URL verb functionality
"/notes" GET > fetches all resources
"/notes/10" GET > fetches single resource
"/notes" POST > create a new resource
"/notes/10" DELETE > delete a single resource  
"/notes/10" PUT > updates single resource
"/notes/10" PATCH > replace single resource

Status Code
200 - ok
201 - Created
204 - No content has been created

400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found

500 - Internal Server Error
504 - Gateway Timeout