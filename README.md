
# Description

Esse projeto é uma api simples que resolve o problema proposto no desafio técnico da Dock

## System Requirements

- _Node_: version >= 16.16
- _NPM_: version >= 8.11
- _NestJs_: >= 9.0.0
- _Docker_: version >= 20.10
- _Docker Compose_: version >= 1.29

## Installation

```bash
npm install
```

- Sei que nao é a melhor pratica, mas o .env será versionado para facilitar a execucão e teste

```bash
docker-compose up -d
```

## Running the app

```bash

# watch mode
$ npm run dev


```

## Informações

- Inicialmente eu queria dockerizar toda a aplicação e não apenas o banco, mas tive alguns problemas com o fato de ter criado uma lib para desacoplar o database como um módulo, então acabei dockerizando apenas o banco como já é de costume. Pensei em dividir a api em microservices, porém ao analisar melhor, notei que nada iria escalar de forma a  gerar essa necessidade, com isso eu teria um trabalho "desnecessário" e pensando em tempo de implementação e projeto eu entendo que nao é válido. Eu pensei em fazer em JavaScript, mas o TypeScript me da uma tipagem e isso facilita projetos grandes como é o caso dos projetos da Dock, outro ponto foi a escolha do NestJs, pois considero um dos mais completos frameworks.
- Gosto de ressaltar que tentei seguir um padrão de commits semelhante ao conventional commits e um padrão de branchs tambem.
