## Teste de admissão para Dev Node.js - BitX

### Instalando as dependências

Depois de clonar o repositório, executar:  

    $ yarn install  

ou  

    $ npm install  
    
para instalar as dependências.

### Iniciando o MongoDB

Nesse caso, utilizei uma imagem pronta do Docker. Com o `docker` e o `docker-compose` instalados, é só executar:  

    $ docker-compose up -d  
    
para baixar a imagem (mongo:4.0.9) e levantar o container.  

### Iniciando o servidor

Basta executar:  

    $ yarn run dev  
    
### Testando as rotas

Antes de começar, vale lembrar que os dados retornados pelas queries a seguir foram inseridos manualmente. Portanto, os resultados dependem dos dados inseridos durante o teste.

#### Cadastrando um novo console

    $ curl --request POST \
      --url http://localhost:8000/console \
      --header 'content-type: application/json' \
      --data '{
	    "name": "Play Station 2",
	    "company": "Sony"
      }'
      
deve retornar:  

    $ { success: true }
    
#### Cadastrando um novo jogo

    $ curl --request POST \
      --url http://localhost:8000/game \
      --header 'content-type: application/json' \
      --data '{
      "name": "Black",
      "console_name": "Play Station 2"
      }'

deve retornar:  

    $ { success: true }  
    
#### Listando todos os consoles

    $ curl --request GET \
      --url http://localhost:8000/consoles

deve retornar:  

    $ {
        "sucess": true,
        "data": [
         {
            "id": "5cd5d27dcb05973e1cf5c0d0",
            "name": "Nintendo 64",
            "company": "Nintendo"
          },
          {
            "id": "5cd5dffac8251347230d7448",
            "name": "Play Station",
            "company": "Sony"
          },
          {
            "id": "5cd5e734712430484128bd7d",
            "name": "Play Station 2",
            "company": "Sony"
          }
        ]
      }
    
#### Listando todos os jogos

    $ curl --request GET \
      --url http://localhost:8000/games
      
deve retornar:

    $ {
        "sucess": true,
        "data": [
          {
            "id": "5cd5d292cb05973e1cf5c0d1",
            "name": "Pokémon Platinum",
            "console_name": "Nintendo DS"
          },
          {
            "id": "5cd5d3896d2ee03e9c8810a3",
            "name": "Pokémon Diamond",
            "console_name": "Nintendo DS"
          },
          {
            "id": "5cd5e726712430484128bd7c",
            "name": "God of War",
            "console_name": "Play Station 2"
          },
          {
            "id": "5cd5f7113b904d4da273441f",
            "name": "Black",
            "console_name": "Play Station 2"
          }
        ]
      }

#### Listando consoles por nome

    $ curl --request GET \
      --url http://localhost:8000/console/Nintendo%20DS

deve retornar: 

    $ {
        "success": true,
        "data": {
          "id": "5cd5d274cb05973e1cf5c0cf",
          "name": "Nintendo DS",
          "company": "Nintendo"
        }
      }
      
#### Listando jogos por nome

    $ curl --request GET \
      --url http://localhost:8000/game/Pok%C3%A9mon%20Platinum
      
deve retornar:  

    $ {
        "success": true,
        "data": {
          "id": "5cd5d274cb05973e1cf5c0cf",
          "name": "Nintendo DS",
          "company": "Nintendo"
        }
      }
      
#### Listando jogos por console

    $ curl --request GET \
      --url http://localhost:8000/games/Play%20Station%202
      
deve retornar:

    $ {
        "sucess": true,
        "data": [
          {
            "id": "5cd5e726712430484128bd7c",
            "name": "God of War",
            "console_name": "Play Station 2"
          },
          {
            "id": "5cd5f7113b904d4da273441f",
            "name": "Black",
            "console_name": "Play Station 2"
          }
        ]
      }
