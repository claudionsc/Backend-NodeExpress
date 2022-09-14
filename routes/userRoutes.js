const fs = require('fs')//lidar com arquivos file system
const { join } = fs //lidar com pasta de arquivos

const filePath = join(__dirname, 'users.json')//interação com bd, armazenar usuarios
//junção do nome do diretorio da rota de usuários e o nome do arquivo dos usuários

const getUsers = () => {//função pra pegar os usuarios
    const data = fs.existsSync(filePath)//verificar se existe o arquivo
        ? fs.readFileSync(filePath)//se existir, leia de maneira assíncrona
        : []//se n existir, retornar obj vazio

        try{
            return JSON.parse(data)//fzr o parse com os dados
        } catch (error) {
            return []//se der erro, retornar vazio
        }
}

// função para salvar o usuário. recebe uma função com parametro os dados dos usuarios
//escrever o arquivo, filePath, transformar em json
//add o objeto com main=s nenhum parametro
//tabular os dados com \t
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

//função que retorna os dados dos usuários

const userRoutes = (app) => {//o app vai como dependência
    app.route('/users/:id?')//criar routa user, com id como opcional
    .get((req, res) => {
        const users = getUsers //ler os usuários

        res.send({ users })// enia um objeto com os usuarios
    })
}

module.exports = userRoutes