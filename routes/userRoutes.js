const fs = require('fs')//lidar com arquivos file system
const { join } = require('path') //lidar com pasta de arquivos

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
        const users = getUsers() //ler os usuários

        res.send({ users })// envia um objeto com os usuarios
    })
    .post((req, res) => {
        const users = getUsers()
        
        users.push(req.body)//inserir registros
        saveUser(users)//usar objeto atualizado e enviar pro json

        res.status(200).send('OK')
    })
    .put((req, res) => {//atualizar
        const users = getUsers()

        saveUser(users.map(user => {//função map pra criar um novo obj atualizando esse
            if (user.id === req.params.id) {//se o user id atual for igual ao parâmetro
                return {//retorna um obj com o usuario atual mesclando os novos dados de usuarios passados
                    ...user,
                    ...req.body
                }
            }
            return user// se não, retorna um usuário sem alterações
        }))
        res.status(200).send('OK')
    })
    .delete((req, res) => {//deletar
        const users = getUsers()

        saveUser(users.filter(user => user.id !== req.params.id))//salva todos os users, menos o com id diferente do parâmetro

        res.status(200).send('OK')
    })
}

module.exports = userRoutes