# Solução de Cluster Docker Swarm para graylog e elastic usando réplicas

Essa é uma solução desenvolvida para montar um laboratório de graylog utilizando dois clusters docker swarm.

Requisitos Mínimos - 5 máquinas virtuais com 2GB de RAM e 2 Cores cada. Todas as máquinas devem ter o Docker instalado e compartilharem da mesma rede(No meu caso as máquinas estão entre os ips 172.27.11.(10-14).
NOTA: Os ips devem ser ajustados de acordo com a realidade da sua infraestrutura montada!!
Neste repositório também terá um modelo de VagrantFile na qual usei para montar localmente a infraestrutura do laboratório, o mesmo também já realiza a instalação do Docker, caso não seja utilizado é necessário fazer a instalação do docker nas máquinas do seu ambiente.

Serão montados 2 clusters utilizando docker swarm:

1-O primeiro cluster(com 2 máquinas, todas masters, ip 172.27.11.10) consiste em 2 tipos de containers, sendo:

1.1-Traefik-(Atuará como balanceardor das requisições do graylog com o elasticsearch).

1.2-Elasticsearch

-O Traefik atuará em modo global e o Elastic terá 3 réplicas no cluster, sendo 2 master e 2 data.

2-O segundo cluster(com 3 máquinas, todas masters) consiste em 4 tipos de containers, sendo:

2.1-Traefik-(Atuará como balanceardor das comunicações dos servidores com o graylog).

2.2-Graylog

2.3-MongoDB

OBS: Caso tenha interesse de ter uma visão geral do seu cluster de modo gráfico, ir ao final dessa documentação e fazer o deploy do visualizer, após o deploy acesso via navegador responderá pelo ip do cluster na porta 8080.

----------------------------Criando o primeiro cluster(Elasticsearch)---------------------------
1-Identificar as duas máquinas do primeiro cluster(no meu caso foram as máquinas de IP final 10 e 11)

2-Acessar a primeira máquina e inicializar o cluster com o comando "docker swarm init --advertise-addr 172.27.11.10" e a adicionar a segunda máquina ao cluster.

3-Alterar o vm.max_map_count das duas máquinas do cluster através do comando: "sudo sysctl -w vm.max_map_count=262144"(Caso a máquina seja reiniciada será necessário executar o comando novamente. Para alterar permamentemente acessar o arquivo /etc/sysctl.conf e adicionar a informação manualmente)

4-Criar a rede "elk" no seu ambiente com o comando "docker network create --driver=overlay elk"

5-Adicionar as stacks elastic/traefik.yml e elastic/elastic.yml no seu ambiente.

6-Realizar o deploy da stack traefik.yml e elastic.yml(respectivamente) no cluster através do comando "docker stack deploy -c $Stack $NomeDoServiço"

7-Avaliar os serviços em execução através do comando docker service ls ou pelo navegador através dos links:

-http://172.27.11.10:9200/

-http://172.27.11.10:9200/_cluster/health?pretty

----------------------------Criando o segundo cluster(Graylog)---------------------------

1-Identificar as três máquinas do primeiro cluster(no meu caso foram as máquinas de IP final 12, 13 e 14)

2-Acessar a primeira máquina e inicializar o cluster com o comando "docker swarm init --advertise-addr 172.27.11.12" e a adicionar a segunda e terceira máquina ao cluster.

3-Criar a rede "graylog" no seu ambiente com o comando "docker network create --driver=overlay graylog"

4-Adicionar as stacks graylog/traefik.yml e graylog/graylog.yml no seu ambiente.

5-Editar a stack graylog.yml de acordo com o seu ambiente, Não alterar a linha 52 nem 106, as mesmas operam a nivel do própio container. acessar o arquivo .env e editar conforme informações abaixo:

GRAYLOG_PASSWORD_SECRET=$SenhaDoUsuarioAdmin
GRAYLOG_ROOT_PASSWORD_SHA2=$SenhaDoUsuarioAdminEmSha2

Para gerar o sha2 da senha usar o comando em um terminal:
"echo -n $SenhaDoUsuarioAdmin | shasum -a 256"

6-Realizar o deploy da stack traefik.yml e elastic.yml(respectivamente) no cluster através do comando "docker stack deploy -c $Stack $NomeDoServiço"

7-Avaliar os serviços em execução através do comando docker service ls ou pelo navegador através do link:

-http://172.27.11.12:9000/

By: Jonathan Costa de Abrantes e Lucas Santos André

Deploy do Visualizer: "docker service create --name=viz --publish=8080:8080/tcp --constraint=node.role==manager --mount=type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock dockersamples/visualizer"
