# Instruções do projeto

## Contexto

- Este é um site estático em HTML, CSS e JavaScript vanilla, com Bootstrap 5.3 carregado por CDN.
- Não há documentação, dependências locais, scripts de build ou testes automatizados configurados. Não invente comandos de build/teste; valide as mudanças no navegador.
- `index.html` define a estrutura da página e carrega os estilos e scripts.

## Arquitetura

- O sistema deve ser baseado em componentes pequenos, com responsabilidades claras e interfaces explícitas. Separe, por exemplo, filtros, estatísticas, cards de servidor e modal de detalhes; evite concentrar estado, eventos e renderização em um único arquivo.
- Cada componente deve encapsular sua renderização e os eventos da própria interface, sem depender de variáveis globais compartilhadas quando houver uma alternativa local simples.
- `js/api-client.js` é obrigatório e deve centralizar todas as chamadas HTTP: URL base, headers, `fetch`, leitura das respostas e tratamento de erros. Componentes e demais módulos não devem chamar `fetch` diretamente nem duplicar detalhes de transporte.
- Mantenha `app.js` como ponto de composição e inicialização, não como implementação de todos os componentes ou da comunicação com a API.
- O código atual ainda usa scripts clássicos, funções globais e chamadas HTTP em `api.js` e `app.js`; ele não é uma arquitetura formal de componentes. Faça a migração incremental, sem refatorações amplas não relacionadas. Se adotar módulos ES, atualize os imports/exports e a entrada em `index.html` de forma consistente; não misture dependências implícitas de ordem de scripts com módulos.
- Preserve Bootstrap e os arquivos separados por responsabilidade. Use HTML semântico e mantenha acessibilidade por teclado, rótulos e estados visíveis.

## Segurança e validação

- Trate respostas da API como dados não confiáveis. Prefira `textContent` e APIs do DOM; ao usar templates HTML, escape os valores antes de inseri-los para evitar injeção de markup.
- Não coloque segredos ou credenciais privadas no JavaScript executado no navegador.
- Após mudanças, verifique no navegador a lista, atualização, filtros, estatísticas e modal afetados; confira também o layout em tela estreita e erros de rede/console. Considere que a API externa pode exigir conectividade e CORS.
- Para novas páginas públicas, considere os requisitos aplicáveis de privacidade, cookies e termos de serviço.
