# Solução de Cluster Docker Swarm para graylog e elastic usando réplicas

Requisitos Mínimos - 5 máquinas virtuais com 2GB de RAM e 2 Cores cada. Todas as máquinas devem ter o Docker instalado.

Essa é uma solução desenvolvida para montar um laboratório de graylog utilizando dois clusters docker swarm.

O primeiro cluster consiste em 2 tipos de containers, sendo:

1-Traefik-(Atuará como balanceardor das comunicações do graylog com o elasticsearch).
2-Elasticsearch



O cluster consiste em 4 containers, sendo:

1-MongoDB
2-Elasticsearch
3-grayloggeral(tratador dos logs)
4-graylogmaster(Interface web)

Para utilizar o mesmo:

1-Altere o nome das variáveis em example.env de acordo com:

GRAYLOG_PASSWORD_SECRET=testando4linux123 #SenhaDoUsuarioAdmin
GRAYLOG_ROOT_PASSWORD_SHA2=8b06a9887ea5058d703e17d895432c8e7a078a29591240afe6275fe4dd098a5c #SenhaDoUsuarioAdminEmSha2
Para gerar o sha2 da senha usar o comando em um terminal:
echo -n (senha) | shasum -a 256

2-Alterar também a linha 64 apontando o endereço do seu cluster swarm

Criar a rede em modo overlay com o comando

docker network create --driver=overlay elk

By: Jonathan Costa de Abrantes