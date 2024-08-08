# Loan Simulation - Graphical User Interface (GUI)

## Projeto
Este projeto consiste na interface front-end desenvolvida em Next.js que faz parte do projeto "loan-simulation". Esta Web Application permite simular empréstimos para pessoas físicas, levando em consideração o estado do usuário e as taxas de juros específicas de cada região. O objetivo é proporcionar uma experiência amigável e eficiente para a simulação de empréstimos, oferecendo informações detalhadas e personalizadas para cada simulação realizada. O repositório da API pode ser acessado através do seguinte link: [loan-simulation-api](https://github.com/luizottavioc/loan-simulation-api)

## Tecnologias
Este projeto foi construído utilizando as seguintes tecnologias:
- **Next.js**;
- **TypeScript**;
- **Tailwind CSS**;
- **Axios**;
- **React Hook Form**.

## Estrutura de Pastas
A estrutura do projeto é organizada da seguinte forma dentro da pasta `/src`:
- **/app**: Contém as páginas da aplicação e é responsável por renderizar os componentes que compõem a interface do usuário. No caso deste projeto, uma única página.
- **/components**: Pasta dedicada aos componentes reutilizáveis da aplicação. Esses componentes auxiliam na construção das páginas, permitindo a reutilização de elementos comuns das páginas.
- **/services**: Contém a lógica de negócios da aplicação. Aqui estão os serviços desacoplados, como [loan.service](./src/services/loan.service.ts), [uf.service](./src/services/uf.service.ts), [http.service](./src/services/http.service.ts), entre outros. Esta separação permite a realização de testes unitários isolados, aumentando a confiabilidade do código.
- **/types**: Centraliza as convenções da aplicação em TypeScript. Inclui interfaces e tipos utilizados em toda a aplicação, garantindo consistência e facilitando a manutenção do código.
- **/utils**: Pasta para utilidades gerais da aplicação. Contém funções e helpers que serão amplamente utilizados em diferentes partes do projeto, proporcionando uma base sólida de operações comuns.

## Deploy Local
Para rodar o projeto localmente, siga os passos abaixo:

### Dependências
- **Node.js**: v21.7.3
- **npm**: v10.5.0

### Passos para Deploy Local
1. **Clone o repositório**:
    ```bash
    git clone git@github.com:luizottavioc/loan-simulation-gui.git
    ```

2. **Instale as dependências**:
    Navegue até a pasta do projeto e execute o comando abaixo para instalar todas as dependências necessárias:
    ```bash
    npm install
    ```

3. **Configure o ambiente**:
    Copie o arquivo `.env.example` e renomeie-o para `.env.local`. Isso definirá as variáveis de ambiente necessárias para a aplicação:
    ```bash
    cp .env.example .env.local
    ```

4. **Inicie o servidor de desenvolvimento**:
    Após configurar o ambiente, execute o comando abaixo para iniciar o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
    Isso iniciará o servidor local na porta padrão (geralmente `http://localhost:3000`), onde você poderá acessar e interagir com a aplicação.

