#!/bin/bash
echo "Iniciando simulacion de ataque al endpoint /auth/login..."

for i in {1..10}
do
echo -n "Peticion #$i: "
curl -s -w "HTTP Status: %{http_code}\n" \
     -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{ "username": "admin", "password": "123"}  | grep -E "message|HTTP Status"
done